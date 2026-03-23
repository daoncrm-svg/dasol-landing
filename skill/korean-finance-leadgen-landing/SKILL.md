---
name: korean-finance-leadgen-landing
description: Build or update Korean financial lead-generation landing sites that follow the same pattern as this repo: static multi-page HTML/CSS/JS, trust-first hero sections, repeated CTA forms, Google Ads tracking, Supabase/webhook lead capture, privacy/complete pages, and mobile-first conversion UX. Use when the user wants a mortgage, refinance, business-loan, or similar regulated 상담형 랜딩페이지 set.
---

# Korean Finance Leadgen Landing

이 스킬은 현재 저장소처럼 `광고 유입용 한국어 금융/대출 상담 랜딩 세트`를 다시 만들 때 사용한다.

기본 전제:
- 프레임워크보다 `정적 HTML + 공용 CSS + 공용 JS`가 우선이다.
- 페이지 목적은 브랜딩보다 `전화/폼 전환`이다.
- 첫 화면에서 `혜택 + 신뢰 + CTA`가 동시에 보여야 한다.
- 메인 허브 1장과 의도별 상세 LP 여러 장을 함께 설계한다.
- 개인정보/광고 추적/법적 고지는 화면 설계와 같은 우선순위로 다룬다.

## 언제 이 스킬을 쓸지

- 주택담보대출, 아파트담보대출, 후순위/대환, 사업자 담보대출 같은 `세부 의도가 갈리는` 광고용 LP 세트를 만들 때
- Google Ads, PMax, Search AI Max 같은 광고 운영을 염두에 둔 리드 수집 사이트를 만들 때
- 모바일 하단 고정 폼, 전화 CTA, 상담 완료 페이지, 개인정보처리방침까지 한 번에 갖춘 구조가 필요할 때
- React/Next 없이 빠르게 배포 가능한 정적 사이트가 더 적합할 때

## 기본 산출물

특별한 요구가 없으면 아래 구조를 기본값으로 둔다.

```text
index.html
mortgage.html
apartment.html
refinance.html
business.html
privacy.html
complete.html
sitemap.xml
assets/
  css/landing.css
  js/landing.js
  img/
```

페이지 역할:
- `index.html`: 브랜드 신뢰 허브 + 전체 상품 분기 + 리뷰/시뮬레이터
- 상세 LP: 검색 의도별 설명, FAQ, 최종 CTA
- `privacy.html`: 개인정보처리방침
- `complete.html`: `noindex` 완료 페이지 + 전환 이벤트 발화

단일 LP만 요청받더라도 아래는 웬만하면 유지한다.
- `privacy.html`
- `complete.html`
- 공용 `landing.css`, `landing.js`

## 시각 언어

현재 프로젝트에서 재사용할 핵심 스타일:
- 금융 서비스 신뢰 톤의 `화이트 + 블루 + 뉴트럴 그레이`
- 메인 포인트 컬러는 `#3182F6`
- 본문은 `Pretendard`, 헤드라인은 `IBM Plex Sans KR`
- 유리 느낌의 고정 헤더, 큰 라운드, 얕은 그림자, 카드형 정보 구조
- 히어로는 `강한 문장 1개 + 신뢰 배지 + 카드형 보조 메시지 + 인물/오브젝트 비주얼`
- 데스크톱과 모바일 모두 CTA가 항상 닿는 위치에 있어야 한다

디자인 규칙:
- 보라색 톤, 과한 그라디언트, 게임형 애니메이션은 쓰지 않는다
- 금융 서비스답게 깔끔하고 빠르게 읽히는 UI를 유지한다
- 섹션보다 카드와 타이포 계층으로 신뢰를 만든다

## 페이지 블루프린트

### 1. 메인 허브 페이지

권장 순서:

```text
Header/Nav
Hero
Trust Numbers
Intent/Product Cards
상품 상세 정보
진행 절차
시뮬레이터 또는 계산 보조 도구
후기/리뷰
FAQ
Final CTA
유의사항
Footer
Floating Form
Mobile Fixed Form
Desktop Fixed Bottom Bar
```

메인 허브에서는 다음 역할을 반드시 수행한다.
- 브랜드 신뢰를 먼저 확보한다
- 상세 LP로 사용자를 분기시킨다
- 숫자, 후기, 리뷰, 계산기처럼 `체류를 늘리는 장치`를 둔다

### 2. 상세 LP

현재 프로젝트의 상세 LP 공통 순서:

```text
Header/Nav
Hero
Trust Stats
왜 다솔인가 섹션
상품 상세 조건
진행 절차
FAQ
Final CTA
유의사항
Footer
Floating CTA
Mobile Fixed Form
Desktop Fixed Bottom Bar
```

상세 LP는 `같은 틀 + 다른 카피`로 끝내지 않는다.
각 페이지마다 최소 아래 4개 중 3개 이상은 달라져야 한다.

- H1과 hero 보조 문장
- 상품 설명 카드와 조건 표
- FAQ 클러스터
- CTA 문구
- 전용 계산/비교/진단 블록
- 전용 증거 블록

현재 프로젝트 기준 페이지 역할:
- `mortgage.html`: 가장 넓은 허브형 담보 안내
- `apartment.html`: KB시세/아파트 중심 상세 의도
- `refinance.html`: 금리 절감, 대환, 후순위 문제 해결
- `business.html`: 상가/토지/공장/사업자 담보

## 카피 원칙

- 첫 화면 H1은 `고객 문제 + 원하는 결과` 조합으로 쓴다
- 서브카피는 설명보다 `왜 지금 문의해야 하는지`를 짧게 정리한다
- CTA는 한 페이지에서 하나의 행동으로 수렴시킨다
- `무료`, `신용점수 영향 없음`, `등록번호`, `상담 가능 범위` 같은 신뢰 문구를 hero와 최종 CTA 둘 다에 둔다
- 변동성이 큰 수치나 심사 기준은 확정값처럼 쓰지 않는다

피해야 할 것:
- 페이지마다 섹션 순서만 유지하고 문장만 바꾸는 수준
- 날짜 없는 최저금리, 최대 LTV, 승인률 남발
- 상품 구조를 모르는 상태에서 과도한 단정

## 광고/SEO 구조

모든 상업 페이지에 기본 적용:
- 고유 `title`, `meta description`, `canonical`
- `og:title`, `og:description`, `og:url`, `twitter:*`
- `FinancialService` JSON-LD
- 페이지별 전용 `FAQPage` JSON-LD
- 내부 링크와 `sitemap.xml` 정리

완료/정책 페이지:
- `complete.html`은 `noindex, nofollow`
- `privacy.html`도 광고 유입용 페이지가 아니면 `noindex`를 기본 검토

운영 규칙:
- `canonical`, `og:url`, 사이트맵 URL은 같은 도메인 전략을 써야 한다
- 광고용 멀티 LP에서는 각 페이지가 서로 다른 검색 의도와 정확히 매칭되어야 한다

## 폼/전환 구현 규칙

폼은 짧고 강하게 유지한다.

기본 필드:
- 이름
- 휴대폰 번호
- 상품/문의 유형 선택
- 개인정보 동의
- `source_page` 같은 내부 식별 필드

현재 프로젝트에서 재사용할 동작:
- 휴대폰 자동 포맷팅
- 동의 미체크 시 제출 차단
- 세션 내 동일 번호 중복 제출 감지
- 폼 위치별 `form_variant` 추적
- 제출 중/성공/실패 토스트 UI
- 완료 페이지 이동 전 `sessionStorage.completeData` 저장

권장 폼 배치:
- 메인 CTA 폼 1개
- 모바일 하단 고정 폼 1개
- 데스크톱 하단 고정 바 1개
- 필요 시 플로팅 폼 1개

## 추적/데이터 적재

공용 JS에는 아래를 우선 넣는다.

- `gclid`, `gbraid`, `wbraid`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `referrer`
- `landing_url`
- `device_type`

저장 원칙:
- URL 파라미터는 최초 세션 기준으로 `sessionStorage`에 저장한다
- 폼 제출 시 위 추적값을 리드 레코드에 함께 적재한다
- `source_page`, `form_variant`, `is_duplicate`를 같이 저장한다

적재 흐름 기본형:
1. 브라우저에서 추적 파라미터 수집
2. 폼 제출 시 Supabase 같은 DB에 insert
3. 필요하면 n8n/Zapier/webhook으로 추가 전달
4. 완료 페이지에서 Google Ads conversion 또는 enhanced conversions 발화

중요:
- 실제 키, anon key, webhook URL은 새 프로젝트에서 그대로 복사하지 않는다
- 새 빌드에서는 환경별 설정값으로 분리하는 편이 낫다

## 규제/신뢰 요소

현재 프로젝트의 핵심 패턴:
- 헤더/히어로/최종 CTA 근처에 전화번호와 등록 문구 반복 노출
- footer에 상호, 대표자, 사업자번호, 등록번호, 등록기관, 주소 정리
- `대출 시 신용평점 하락 가능`, `중개수수료 요구 불법` 같은 문구를 별도 박스로 강조
- 개인정보처리방침 전문 링크를 모든 주요 폼 근처에 배치

금융/대출 랜딩에서 추가로 지킬 것:
- 사업자 정보가 외부 공개 정보와 다르면 구조화 데이터와 카피를 먼저 정리한다
- 수치형 주장은 기준일 또는 변동 가능 문구를 붙인다
- 승인/심사/가능 여부는 상담 전 확정처럼 쓰지 않는다

## 구현 순서

1. 상품군과 광고 의도를 분해해 페이지 수를 정한다.
2. 메인 허브와 상세 LP의 역할을 먼저 나눈다.
3. 공용 `landing.css`, `landing.js`부터 만든다.
4. 모든 페이지에 공통 헤더, CTA, footer, 유의사항 구조를 넣는다.
5. 각 상세 LP마다 전용 H1, 설명, FAQ, 비교 포인트를 따로 작성한다.
6. 폼 제출, 추적 파라미터 저장, 완료 페이지 전환 이벤트를 연결한다.
7. 모바일 하단 고정 폼과 데스크톱 고정 CTA 바를 반드시 검증한다.
8. `privacy.html`, `complete.html`, `sitemap.xml`까지 마무리한다.

## 검수 체크리스트

- 첫 화면만 보고도 `무슨 서비스인지`, `누가 대상인지`, `무엇을 하면 되는지` 알 수 있는가
- 메인 허브와 상세 LP들이 서로 다른 검색 의도를 실제로 처리하는가
- 모든 CTA가 같은 전화번호와 같은 신뢰 문구를 쓰는가
- 모든 폼이 같은 추적 필드를 저장하는가
- 모바일에서 첫 CTA와 하단 고정 폼이 충돌하지 않는가
- `complete.html`이 `noindex`이며 전환 이벤트를 발화하는가
- 개인정보처리방침과 footer 법적 고지가 최신 정보와 일치하는가

## 기본 선택

별도 요구가 없으면 아래처럼 결정한다.

- 기술 스택: 정적 HTML/CSS/JS
- 스타일: Toss 계열 신뢰형 금융 UI
- 전환 방식: 전화 CTA + 짧은 폼 병행
- 페이지 수: 메인 1 + 상세 3~4 + 정책/완료
- 추적: Google Ads + UTM + DB 저장
- 데이터 저장: Supabase 또는 동등한 서버리스 저장소
