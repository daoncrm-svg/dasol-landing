# Secure Vibe Coding Skill

## Purpose
이 스킬은 바이브 코딩으로 만든 서비스나 AI가 생성한 코드/설정을 **출시 가능한 수준으로 보안 점검·보완**하기 위한 전용 보안 규칙이다. 속도보다 **기본 보안 통제의 누락 방지**를 우선한다.

## Core Principle
- 기본값은 **deny by default** 다.
- 인증(authentication)과 인가(authorization)를 구분한다.
- UI에서 숨기는 것만으로는 보호가 아니다. **항상 서버에서 다시 검증**한다.
- AI가 만든 코드와 설정은 **신뢰하지 않고 검증 대상**으로 본다.
- 권한 오류를 없애기 위해 RLS, CORS, auth 미들웨어를 느슨하게 푸는 방식은 금지한다.
- 비밀값은 클라이언트, Git, 로그, 에러 메시지에 노출되면 실패다.
- 결제·권한·데이터 조회·관리자 기능은 모두 **서버 기준 원본 데이터**로 검증한다.
- 사용자에게는 일반화된 오류만 보여주고, 상세 원인은 서버 로그에 남긴다.

## When To Use
다음 작업에서 항상 사용한다.
- Cursor / Claude Code / GPT / Gemini / Copilot / Windsurf / Replit Agent / Lovable / Bolt / v0 등으로 만든 앱 검토
- MVP 출시 전 보안 점검
- Supabase / Firebase / Neon / PlanetScale / Postgres 기반 SaaS 검토
- Next.js / React / Node.js / Express / FastAPI / NestJS / serverless app 검토
- Stripe / Toss / 포트원 등 결제 기능이 있는 서비스 검토
- 인증/권한/비밀값/파일업로드/웹훅/API 보안 점검

## Non-Negotiable Security Invariants
모든 수정안은 아래 조건을 만족해야 한다.

### 1) Authentication / Session
- 인증을 직접 구현하지 말고 검증된 라이브러리나 서비스 사용을 우선한다.
- 로그인, 회원가입, 비밀번호 재설정, magic link, OTP, MFA 흐름을 각각 점검한다.
- 세션 쿠키를 쓴다면 `HttpOnly`, `Secure`, `SameSite` 설정을 확인한다.
- 관리자 계정에는 MFA 또는 그에 준하는 강한 보호 수단을 우선 적용한다.
- 로그인 시도, OTP, 비밀번호 재설정 요청에는 rate limit / abuse protection 이 있어야 한다.

### 2) Authorization
- 모든 민감 경로, API, 서버 액션, edge function, admin action 에 대해 서버측 인가 검사를 강제한다.
- “로그인했는가?”만 확인하지 말고 “이 사용자가 이 리소스에 이 작업을 해도 되는가?”를 확인한다.
- 경로 난독화(`/admin-hidden-123`)는 보조 수단일 뿐, 실제 통제 수단으로 간주하지 않는다.
- URL 직접 접근, ID 변경(IDOR/BOLA), role 변조, 타 사용자 데이터 조회를 항상 테스트한다.

### 3) Data Isolation (Supabase / Postgres)
- 외부에 노출되는 스키마/테이블에는 RLS를 활성화한다.
- `SELECT / INSERT / UPDATE / DELETE` 각각에 대해 정책을 분리 점검한다.
- 정책이 없거나 지나치게 넓은 정책(`USING (true)`, `WITH CHECK (true)` 등)은 실패로 본다.
- `service_role` 또는 비밀키는 서버 전용이다. 클라이언트 번들, 브라우저, 모바일 앱에 두면 안 된다.
- 공개 가능한 키(예: publishable / anon)도 **RLS가 올바를 때만** 허용된다.
- 서비스 롤을 쓰는 서버 클라이언트와 사용자 세션 클라이언트를 분리한다.
- raw SQL 로 만든 테이블은 RLS가 자동으로 켜지지 않을 수 있으므로 별도 확인한다.

### 4) Secrets / Environment Variables
- 모든 `.env*` 파일은 기본적으로 버전 관리 제외 처리한다.
- `NEXT_PUBLIC_*` 와 같은 public prefix 는 **공개 값**으로 취급한다.
- 클라이언트 코드, HTML, JS bundle, source map, 로그, 에러 메시지, README, 예제 코드에 비밀값이 있으면 실패다.
- 유출 흔적이 발견되면 즉시 rotate 절차를 안내한다.
- `.cursorignore`, `.gitignore`, IDE ignore 규칙만으로는 비밀 보호가 완료된 것으로 간주하지 않는다.

### 5) Payments / Billing
- 클라이언트가 보내는 금액, 할인율, 플랜명, 권한 상승 값을 신뢰하지 않는다.
- 결제 금액/플랜/수량/할인/권한 부여는 서버에서 canonical source(DB 또는 결제 provider price ID) 기준으로 계산한다.
- 결제 완료 후 권한 부여/구독 활성화는 가능하면 서버 webhook 이벤트를 기준으로 처리한다.
- 무료 체험, 쿠폰, 좌석 수, 플랜 업그레이드/다운그레이드 같은 business logic abuse 를 점검한다.

### 6) API / Browser Security
- 민감 API는 strict CORS allowlist 를 사용한다. 문제 해결용 `*` 는 금지한다.
- 쿠키 인증 기반 state-changing 요청에는 CSRF 방어를 적용한다.
- 보안 헤더(CSP, HSTS, frame protection, MIME sniffing 방지, referrer 정책 등)를 점검한다.
- 에러 응답/콘솔/네트워크/소스맵에서 내부 경로, 스택트레이스, 테이블명, 쿼리 구조를 숨긴다.

### 7) Input / Output / Risky Features
- 모든 입력값은 서버에서 검증한다.
- 사용자 출력은 context-aware escaping / sanitization 으로 XSS 를 막는다.
- 파일 업로드가 있으면 확장자 allowlist, MIME/type 검사, 파일명 재작성, 크기 제한, 저장 위치 분리, 권한 검사를 한다.
- 사용자 입력 URL 을 서버가 fetch 하거나 webhook/callback/import 기능이 있으면 SSRF 위험을 점검한다.
- SQL/NoSQL/command/template injection 가능성을 검토한다.

### 8) Supply Chain / CI / Quality Gates
- SAST, secrets scanning, dependency audit, IaC/container scan 중 가능한 항목을 CI 또는 pre-deploy 단계에 넣는다.
- `npm audit` 또는 동등 도구, CodeQL 또는 동등 SAST, secret scanning/push protection 을 우선 적용한다.
- AI가 추천한 신규 패키지는 평판, 유지보수 상태, 최근 업데이트, 다운로드 수, 권한 범위를 확인한다.

### 9) Logging / Monitoring / Recovery
- 인증 실패, 인가 실패, 관리자 작업, 권한 변경, 결제 상태 변경, 대량 export/delete 는 반드시 로그 대상이다.
- 비밀번호, 세션 ID, access token, API key, DB connection string, 암호화 키는 로그 금지다.
- 보안 이벤트를 중앙 수집 또는 모니터링 대상으로 둔다.
- 백업/복구, PITR 또는 최소한의 restore 절차를 확인한다.

### 10) AI-Specific Guardrails
- AI가 만든 auth/RLS/CORS/결제/비밀값/배포 설정은 항상 인간이 검토한다.
- “동작하게 만들기” 위해 보안 통제를 끄거나 약화시키는 패치는 금지한다.
- 하나의 모델이 만든 결과를 다른 모델/스캐너/체크리스트로 교차 검증한다.
- 에이전트/도구 호출 권한은 최소 권한 원칙을 따른다.
- LLM 기능이 들어간 제품은 prompt injection, sensitive info disclosure, tool permission boundary 를 추가로 점검한다.

## Required Workflow
작업 시 항상 아래 순서를 따른다.

### Step 1. Stack Discovery
- 프레임워크, 배포 플랫폼, DB, 인증 방식, 결제 모듈, 파일 업로드, webhook, LLM 기능 유무를 식별한다.
- 클라이언트/서버/edge/serverless 경계를 먼저 그린다.

### Step 2. Threat Model Snapshot
아래 질문에 답한다.
- 누가 공격자인가? 익명 사용자 / 일반 사용자 / 내부자 / 자동화 봇 / 프롬프트 주입자
- 보호 자산은 무엇인가? PII / 결제 권한 / admin action / API credits / 비밀값 / 모델 컨텍스트
- 가장 위험한 흐름은 무엇인가? 로그인 / 비밀번호 재설정 / admin / billing / file upload / URL fetch / webhook

### Step 3. Hard-Fail Scan
다음 항목은 하나라도 걸리면 즉시 Critical 또는 High 로 보고한다.
- 클라이언트에 `service_role`, secret key, DB admin credential 노출
- RLS 비활성화 또는 과도하게 넓은 정책
- 관리자/API 인가가 UI 가드에만 존재
- 결제 금액을 클라이언트 값으로 직접 사용
- wildcard CORS 로 민감 API 개방
- 상세 스택트레이스/내부 경로/토큰 노출
- 비밀번호 재설정/OTP/magic link 남용 방지 부재
- 공개 업로드 기능에서 확장자/MIME/크기 제한 부재
- 사용자 제공 URL fetch 에 대한 SSRF 방어 부재

### Step 4. Stack-Specific Review
#### Next.js
- `NEXT_PUBLIC_*` 사용값은 모두 공개 전제인지 확인한다.
- server action / route handler / middleware 에 인가가 있는지 확인한다.
- source map, debug mode, verbose error page 배포 여부를 확인한다.

#### Supabase
- `public` 스키마의 모든 사용자 접근 테이블/뷰에 RLS 여부 점검
- 사용자별 정책이 `auth.uid()` 등으로 올바르게 제한되는지 확인
- service-role 서버 클라이언트 분리 여부 확인
- Security Advisor 경고 점검
- auth rate limits / MFA / email confirmation / OTP expiry 점검

#### Stripe
- Checkout Session / PaymentIntent 는 서버에서 생성
- 상품 가격/플랜/권한은 서버 기준 카탈로그 또는 DB 기준 검증
- 결제 완료 후 entitlement/provisioning 은 webhook 기반 검토
- 결제 실패/중복 처리/재시도 로직 확인

#### Vercel / Edge / CDN
- WAF, bot protection, deployment protection, preview exposure 여부 점검
- 환경변수 scope(Production/Preview/Development) 오배치 여부 점검

### Step 5. Verification Tests
최소한 아래 테스트 케이스를 포함한다.
- 로그인 없이 `/admin`, `/dashboard`, `/settings`, `/api/*` 직접 접근
- 사용자 A로 생성한 데이터가 사용자 B에서 조회/수정/삭제 가능한지
- request body / query param / hidden field / price ID 변조 테스트
- 브라우저 DevTools source/network/localStorage/cookies 에 비밀값이나 과도한 정보가 있는지
- 회원가입/로그인/비밀번호 재설정/OTP 에 rate limit 이 동작하는지
- CORS preflight 와 실제 cross-origin 요청이 제한되는지
- 파일 업로드 악성 확장자·초대형 파일·이중 확장자 테스트
- 외부 URL import/fetch/webhook callback 에 내부 주소 접근 가능 여부 테스트
- 배포 환경에서 상세 에러가 노출되지 않는지

### Step 6. Evidence-Based Remediation
수정 제안은 반드시 다음을 포함한다.
- 왜 위험한지
- 어떤 설정/코드가 원인인지
- 최소 변경으로 어떻게 고칠지
- 수정 후 어떻게 검증할지
- 남는 잔여 위험이 무엇인지

## Output Format
결과는 항상 아래 형식으로 정리한다.

1. **Executive Summary**
- 전체 위험 수준: Critical / High / Medium / Low
- 가장 위험한 3개 이슈
- 출시 차단 여부

2. **Findings**
각 이슈마다:
- Severity
- Category (Auth / AuthZ / RLS / Secrets / Payments / Headers / CORS / XSS / SSRF / Upload / Dependency / Logging / AI-specific)
- Evidence
- Impact
- Fix
- Verification steps

3. **Patch Plan**
- 즉시 수정 (오늘)
- 출시 전 수정
- 출시 후 단기 개선

4. **Security Regression Checklist**
- 재배포 전 다시 확인할 항목

## Red Flag Phrases
아래 표현이 보이면 위험 신호로 간주한다.
- “일단 동작하게 하려고 RLS 껐어요” 
- “에러가 나서 CORS 를 `*` 로 바꿨어요”
- “service role 키를 프론트에서 잠깐만 씁니다”
- “어드민 URL 이 복잡해서 괜찮아요”
- “가격은 프론트에서 계산해도 사용자가 안 바꿀 거예요”
- “에러 메시지는 개발 편의를 위해 그대로 보여줄게요”
- “이건 MVP 니까 나중에 보안 넣죠”

## Do Not Do
- 보안 통제를 끄는 방향으로 패치하지 않는다.
- 추측으로 “안전하다”고 단정하지 않는다.
- 클라이언트 숨김/조건부 렌더링을 보안 통제로 착각하지 않는다.
- 한두 개 케이스 통과만으로 전체 정책이 안전하다고 결론내리지 않는다.
- 민감 정보가 포함된 예시 코드나 실제 비밀값을 출력하지 않는다.

## Preferred Tooling Suggestions
- Auth: Clerk, Auth0, Supabase Auth, Lucia 등 검증된 솔루션 우선
- Secrets: GitHub secret scanning / push protection, GitGuardian ggshield 등
- SAST: CodeQL, Semgrep, 플랫폼 기본 scanner
- Dependency: npm audit, OWASP Dependency-Check, provider scanner
- Runtime / Edge: WAF, rate limiting, bot protection, CAPTCHA/Turnstile

## Minimum Release Gate
출시 전 최소 통과 조건:
- auth / authz / RLS / secrets / payment / error handling 검증 완료
- critical/high 이슈 0개
- security scan 결과 검토 완료
- secret leak check 완료
- dependency audit 완료
- rate limit / abuse protection 기본 적용
- backup 또는 restore 절차 확인

## One-Line Rule
**바이브 코딩의 기본 원칙은 “빨리 만들기”가 아니라 “빨리 만들되, 인증·인가·비밀값·결제·로그를 절대 추측으로 넘기지 않기”다.**
