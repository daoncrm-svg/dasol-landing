# 바이브 코딩 보안 리서치 요약

작성일: 2026-03-11 (Asia/Seoul)

## 1. 결론
원래의 5개 체크리스트는 출발점으로는 좋지만, 실제 운영 서비스 기준으로는 부족하다. 특히 다음이 빠지면 사고가 난다.

- 세션/쿠키 보안
- CSRF, CORS, 보안 헤더
- brute force / credential stuffing 방어
- IDOR/BOLA, function-level authorization 테스트
- 파일 업로드 / URL fetch / webhook 보안
- dependency / secrets scanning / pre-deploy scan
- 로그/알림/백업/복구
- AI 특화 리스크(권한 완화 패치, prompt injection, 교차검증 부재)

## 2. 원본 5개 항목 평가

### A. 어드민 페이지 URL 직접 접근 방지
맞는 방향이지만 “경로를 덜 예측 가능하게 만든다”는 것은 핵심 보안 통제가 아니다. 진짜 핵심은 서버측 인가, middleware, RBAC/ABAC, admin action 보호, 직접 URL 접근 테스트다.

### B. Supabase RLS 활성화
매우 중요하다. 하지만 “RLS 켜기”만으로 끝나지 않는다. 각 테이블/동작(SELECT/INSERT/UPDATE/DELETE)별 정책, service-role 분리, raw SQL 테이블 누락, overly permissive policy 점검이 같이 필요하다.

### C. 환경 변수 노출 방지
정확한 문제 인식이다. 다만 Next.js 같은 스택에서는 `NEXT_PUBLIC_*` 자체가 공개 전제라는 점, `.env` git 제외, secret scanning, 누출 후 rotate 절차까지 묶어야 한다.

### D. 결제 금액 서버 검증
정답이다. 여기에 더해 플랜, 할인, 수량, 좌석 수, entitlement, webhook 기반 후처리도 서버 기준으로 점검해야 한다.

### E. 에러 메시지 정보 유출 방지
필수다. 여기에 로그 민감정보 금지, 보안 이벤트 기록, 중앙 수집과 경보까지 포함해야 실무 수준이 된다.

## 3. 공식 문서에서 확인된 핵심 포인트

### OWASP
- Broken Access Control 은 여전히 최상위 위험군이다.
- force browsing, URL tampering, IDOR/BOLA, admin page 직접 접근은 전형적인 사례다.
- 보안 설정 실수와 과도한 에러 노출도 대표 위험이다.

### Supabase
- 공개 스키마에는 RLS 를 항상 활성화해야 한다.
- anon/publishable key 는 RLS 전제 하에 공개 가능하지만, service_role / secret key 는 RLS 를 우회하므로 백엔드 전용이다.
- Security Advisor 로 RLS 누락, overly permissive policy, 익명 sign-in 허용 등을 점검할 수 있다.
- auth rate limit, MFA, email confirmation, OTP expiry 같은 운영 설정도 중요하다.

### Next.js / 프런트엔드 환경변수
- `NEXT_PUBLIC_*` 는 빌드 시 클라이언트 번들에 포함된다.
- 즉, 이 prefix 를 붙인 값은 사실상 공개 정보다.

### Stripe
- 가격/금액 검증은 서버에서 해야 한다.
- Checkout Session 같은 결제 세션도 서버에서 생성하는 흐름이 기본이다.
- 권한 부여나 주문 처리도 서버 webhook 기준으로 처리하는 편이 안정적이다.

## 4. 최신 커뮤니티 시그널

### Reddit에서 반복적으로 보이는 패턴
- Supabase service role 키를 클라이언트나 저장소에 넣는 실수
- RLS 누락 또는 `USING (true)` 같은 과도한 정책
- CORS `*` 로 문제를 덮는 패턴
- UI 가드만 있고 API/admin action 은 무방비인 구조
- `.env` 커밋, source map 노출, insecure headers

### Threads에서 보이는 공통 체크리스트
- API rate limit
- RLS
- auth form CAPTCHA
- Vercel WAF
- 파일별 security checklist 또는 security agent 사용

### 유튜브/세미나/플랫폼 메시지
- “보안은 vibe 를 죽이는 게 아니라, 출시 후 망가지는 것을 막는 체크리스트다”라는 메시지가 반복된다.
- Supabase, Aikido, GitHub AppSec, AWS re:Inforce 등에서 공통적으로 authz, secrets, rate limit, pre-deploy scan, DAST/runtime validation 을 강조한다.

## 5. 전문 블로그/벤더/보안팀의 공통 결론
- 인간 검토 없는 AI 코드는 신뢰하면 안 된다.
- guardrail(자동화 검사) 없이는 속도가 위험으로 바뀐다.
- 가장 큰 문제는 코드 스타일보다 **권한, 비밀값, 설정, 공급망**이다.
- static analysis, dependency audit, secret scanning, runtime validation 을 함께 써야 한다.

## 6. AI 코드 품질 관련 최신 리서치 포인트
- 2025 Veracode 보고서는 AI 생성 코드가 약 45%의 테스트에서 보안 취약한 선택을 했다고 요약한다.
- 더 큰 모델/새 모델이 반드시 더 안전하지는 않았다.
- 다른 연구는 반복적인 AI 재작성 과정에서 몇 번만 지나도 치명적 취약점 비율이 증가할 수 있음을 보여준다.

## 7. 실무용으로 확장된 체크리스트
출시 전 최소 15개를 본다.

1. 서버측 authn/authz 존재 여부
2. direct object access / IDOR/BOLA 테스트
3. Supabase RLS / policy / service-role 분리
4. 환경변수/secret 노출 여부
5. secret scanning + push protection
6. 결제 금액/플랜/권한 서버 검증
7. rate limiting / credential stuffing 방어
8. MFA / 관리자 보호
9. CORS / CSRF / 보안 헤더
10. 에러 메시지 / 로그 정보 유출 방지
11. 파일 업로드 보안
12. SSRF / URL fetch / webhook 검토
13. dependency audit / SAST / pre-deploy scan
14. WAF / bot protection / CAPTCHA
15. backup / PITR / restore readiness

## 8. skill.md 설계 포인트
좋은 skill.md 는 “이렇게 코드를 짜라”보다 아래를 강하게 가져가야 한다.

- 절대 약화하면 안 되는 보안 불변식
- 하드 실패 조건(Critical)
- 스택별 예외 처리 규칙
- 필수 검증 테스트
- 증거 기반 보고 포맷
- 출시 차단 기준

## 9. 가장 위험한 오해
- “admin URL 안 알려주면 안전하다”
- “RLS만 켜면 끝이다”
- “public env도 대충 숨겨져 있다”
- “MVP는 보안 나중에”
- “문제 생기면 AI가 고쳐주겠지”

## 10. 추천 운영 방식
- 1차 생성: 기능 구현
- 2차 패스: 보안 하드닝
- 3차 패스: 다른 모델/스캐너로 교차검증
- 4차 패스: 직접 테스트(권한 우회, 가격 변조, 비밀값 노출)
- 5차 패스: 출시 전 체크리스트 서명

## 11. 추천 산출물
- `/docs/security-checklist.md`
- `/docs/threat-model.md`
- `SKILL.md` 또는 `.cursor/rules/security.mdc`
- CI 의 secret scanning / SAST / dependency audit 설정
- pre-launch manual test sheet

