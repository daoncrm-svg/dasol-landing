# Google Ads 성과형 홈페이지 분석 리포트

- 작성일: 2026-03-13
- 대상 사이트: 다솔대부중개 랜딩페이지 저장소 현재 상태 기준
- 최우선 KPI: DB 품질 우선
- 전제: Search 캠페인 + PMax 병행 가능성, 금융/대출 리드 생성 업종

## 1. 결론 요약

### 한 줄 결론
Google Ads 성과가 잘 나오는 홈페이지는 `광고 문맥과 1:1로 맞는 랜딩 구조`, `광고 클릭을 CRM 품질 데이터까지 연결하는 측정 구조`, `정책/신뢰/모바일 UX가 안정적인 페이지 품질`을 동시에 갖춘 홈페이지다.

### 이 프로젝트 기준 최종 판단
- `랜딩페이지 1장`만으로도 테스트는 가능하지만, `PMax + Search AI Max + DB 품질 최적화`를 목표로 하면 장기적으로는 부족하다.
- 추천 최소 구조는 `신뢰형 메인 1개 + 의도별 상세 LP 3~6개 + 개인정보/정책 페이지 + noindex 완료 페이지`다.
- SEO는 블로그형 확장보다 `광고용 URL을 Google이 더 정확하게 읽고 확장하도록 만드는 기술/구조 SEO`가 우선이다.
- 측정은 `raw lead submit`만으로 끝내면 안 되고 `qualified lead` 또는 `converted lead`까지 Google Ads로 되돌려야 AI 입찰 성능이 좋아진다.

## 2. Google 공식 문서 기준으로 본 핵심 해석

### 2.1 Search AI Max를 쓰면 페이지 텍스트와 URL 구조의 중요도가 올라간다
- Google은 AI Max for Search를 `search term matching`과 `asset optimization`의 결합으로 설명한다.
- AI Max 설정에서는 `text customization`, `URL exclusions`, `URL inclusions` 같은 제어가 가능하다.
- 즉, 광고가 더 많은 검색어와 더 다양한 메시지 조합으로 확장될수록, 사이트 안의 페이지들이 `의도별로 분리`되어 있고 `본문 문맥이 분명`해야 한다.
- 결론: AI Max를 쓸수록 `한 페이지에 모든 메시지를 우겨 넣는 구조`보다 `의도별 상세 LP` 구조가 유리하다.

### 2.2 PMax는 Final URL Expansion 때문에 더더욱 목적별 페이지군이 필요하다
- Google은 PMax에서 `Final URL expansion`이 기본 활성 상태라고 설명한다.
- 켜져 있으면 Google이 사용자의 검색 의도에 맞춰 더 적절한 랜딩 URL로 보내고, 랜딩 내용을 바탕으로 동적 텍스트를 만들 수 있다.
- 동시에 Google은 `exclude가 필요한 URL은 URL exclusion으로 제외`하라고 명시한다.
- 결론: PMax 운영 시 `privacy`, `complete`, 비상업 페이지, 중복 페이지, 의도 불명 페이지를 제외`하고, 대신 상업적 intent가 분명한 페이지를 여러 개 준비`하는 구조가 맞다.

### 2.3 리드 업종은 전환 목표를 더 정교하게 잡아야 한다
- Google은 고품질 리드 운영 문서에서 `lead to sale journey를 매핑하고`, 입찰 목표를 `qualified lead`, `converted lead`, `book appointment`, `request quote`처럼 실제 비즈니스 가치에 더 가까운 액션으로 잡으라고 권장한다.
- 동일 문서에서 `multiple stages를 한 번에 최적화 목표로 섞지 말라`고 안내한다.
- 결론: 이 사이트는 `raw form submit`를 보조 전환으로 두고, 실제 최적화 목표는 `qualified lead` 또는 `converted lead`로 올리는 구조가 가장 맞다.

### 2.4 리드 업종은 first-party data와 오프라인 업로드가 핵심이다
- Google은 오프라인 전환 도입 전이라면 `enhanced conversions for leads`부터 시작하라고 명시한다.
- 또 `Data Manager`가 가장 빠르고 쉬운 설정 경로라고 설명한다.
- Google Click ID만 쓰는 기본 업로드보다 `GCLID + first-party data`를 함께 쓰는 구조가 더 정확하고 더 durable하다고 설명한다.
- 결론: DB 수집이 최우선이라면, 홈페이지는 단순 폼 페이지가 아니라 `광고 식별자 + 고객 1st party 데이터 + CRM 상태값`을 모두 보존하는 측정 인터페이스를 가져야 한다.

### 2.5 검색광고에서는 랜딩페이지 경험이 여전히 중요하다
- Google은 Search Quality Score의 구성요소 중 하나로 `Landing page experience`를 명시한다.
- 이 항목은 `사용자 기대와 맞는지`, `광고 문구와 랜딩 메시지가 일관적인지`, `유용한지`와 직접 연결된다.
- 결론: 검색광고에서 좋은 홈페이지는 예쁜 홈페이지가 아니라 `검색어/광고문구/랜딩 H1/본문/CTA가 같은 약속을 하는 홈페이지`다.

### 2.6 정책과 신뢰는 성과 문제이기도 하다
- Google Ads Destination Requirements는 랜딩페이지가 `functional, useful, easy to navigate`해야 한다고 본다.
- Misrepresentation 정책은 사업자 정보, 자격, 서비스 성격, 수수료/조건 표현이 오해를 일으키면 강하게 제재한다.
- South Korea 금융서비스 검증 문서는 금융서비스 광고와 관련해 국가별 검증 프로세스가 존재함을 분명히 한다.
- 결론: 금융 리드 업종에서는 `신뢰정보를 footer에만 두는 구조`보다 `hero/CTA 인접 구간에도 명확히 보이는 구조`가 승인 안정성과 전환율 모두에 유리하다.

## 3. Google Ads 성과가 잘 나오는 홈페이지의 조건

### 3.1 사이트 구조

#### 권장 구조
- 메인 페이지 1개
  - 브랜드 신뢰
  - 전체 상품 범주 소개
  - 대표 CTA
  - 주요 차별점 요약
- 의도별 상세 LP 3~6개
  - 아파트담보
  - 주택담보
  - 후순위/추가대출
  - 대환
  - 사업자/비주거용
- 보조 페이지
  - 개인정보처리방침
  - 사업자/등록/검증/고지 관련 페이지 또는 섹션
  - 완료 페이지(`noindex`)

#### 왜 멀티페이지가 더 맞는가
- Search는 검색 의도가 명확히 갈라진다.
- AI Max는 텍스트와 URL을 더 넓게 활용한다.
- PMax는 Final URL Expansion으로 더 적합한 URL을 찾는다.
- 금융 리드 업종은 신뢰와 상세 조건 설명이 중요해서 한 페이지에 모든 의도를 담으면 메시지 초점이 흐려진다.

#### 언제 단일 랜딩이 가능한가
- 캠페인 구조가 아직 단순하다.
- 상품군이 사실상 1개다.
- 테스트 예산이 작고 메시지를 빠르게 검증하는 초기 단계다.
- 이 경우에도 단일 페이지는 `중간 단계`로만 보고, 성과가 나면 intent page로 분화하는 것이 맞다.

### 3.2 페이지마다 반드시 있어야 하는 요소
- 광고 문구와 일치하는 H1
- 첫 화면 CTA
- 전화 CTA와 폼 CTA 병행
- 대상 고객/가능 조건/불가 조건
- 필요 서류
- 진행 절차
- 자주 묻는 질문
- 실제 상담 방식과 응답 시간
- 사업자/등록/연락처/개인정보 안내
- 상담/심사/수수료 관련 핵심 고지

### 3.3 UX 원칙
- 모바일 첫 화면에 `혜택 + 신뢰 + CTA`가 같이 보여야 한다.
- 폼은 최소 필드 유지가 맞다.
- 대신 품질 방어 장치가 필요하다.
  - reCAPTCHA
  - 서버측 검증
  - 중복 제출 차단
  - 영업시간 고지
  - 즉시 전화 버튼
- `더 많이 받는 폼`과 `더 좋은 리드를 받는 폼`은 다르다.
- Google lead form asset도 `More volume`과 `More qualified`를 구분해 제공한다.
- 따라서 웹 폼도 같은 철학으로 설계해야 한다.

### 3.4 SEO 원칙
- 우선순위는 `기술 SEO`다.
- 필수 요소:
  - crawlable HTML
  - canonical
  - sitemap
  - absolute URL
  - 내부 링크
  - structured data
  - 모바일 성능
  - 광고 제외 URL 정리
- Google Search Central 기준 Core Web Vitals 목표:
  - LCP 2.5초 이하
  - INP 200ms 이하
  - CLS 0.1 이하
- canonical은 `hint`이며, sitemap/내부링크/canonical이 같은 URL을 가리키도록 맞추는 것이 좋다.
- 광고용 사이트에서는 블로그 양산보다 `검색 intent와 바로 맞닿는 상업 페이지`를 먼저 늘리는 것이 더 실용적이다.

## 4. 이 저장소 현재 상태 진단

### 4.1 잘 되어 있는 점
- 이미 `index.html`, `mortgage.html`, `privacy.html`, `complete.html`, `sitemap.xml` 구조를 갖고 있어 멀티페이지로 가기 쉬운 상태다.
- 완료 페이지가 분리되어 있고 `noindex`가 걸려 있어 전환 완료 URL 관리 방향은 맞다.
- Google Ads 전환 스크립트와 완료 페이지 전환 이벤트가 이미 있다.
- Supabase 저장과 외부 webhook 전송 흐름이 이미 연결되어 있다.

### 4.2 성과를 막는 핵심 리스크

#### 리스크 1. 측정이 `raw lead` 수준에서 멈춰 있다
- 현재 저장 payload에는 아래 필드가 없다.
  - `gclid`
  - `gbraid`
  - `wbraid`
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_term`
  - `utm_content`
  - `referrer`
  - `landing_url`
  - `device_type`
- 이 상태에서는 `어떤 광고 클릭이 실제 좋은 DB로 이어졌는지` Google에게 되돌려주기 어렵다.
- DB를 많이 모아도 학습 신호가 얕아서 Smart Bidding 품질이 제한된다.

#### 리스크 2. 폼 진입점이 많지만 공통 측정 표준이 약하다
- 홈에는 4개, 상세 페이지에는 3개의 폼이 있다.
- 폼이 여러 개 있는 것 자체는 나쁘지 않다.
- 문제는 `form variant`별 성과 차이, 기기별 성과 차이, 위치별 품질 차이를 지금 구조에서는 충분히 분석하기 어렵다는 점이다.

#### 리스크 3. 운영 도메인/정규 URL 체계가 아직 완성되지 않았다
- `sitemap.xml`은 현재 `https://dasol-landing.vercel.app/`를 기준으로 잡고 있다.
- 반면 canonical 전략은 아직 고정되지 않았다.
- PMax Final URL Expansion과 Search AI Max URL 제어를 제대로 쓰려면 운영 도메인 기준의 URL 정책이 먼저 정리돼야 한다.

#### 리스크 4. 금융업종 신뢰 요소를 광고 최적화 관점으로 재배치할 필요가 있다
- footer에 사업자/등록 정보가 있는 방향은 맞다.
- 하지만 금융/대출 리드에서는 사용자가 폼 직전에 가장 불안해한다.
- 따라서 `hero`, `첫 CTA 아래`, `최종 폼 주변`에 신뢰 배지를 재노출하는 편이 전환율과 승인 안정성에 더 좋다.

## 5. 랜딩페이지 하나로 충분한가, 멀티페이지가 필요한가

### 현재 프로젝트 기준 판단
`멀티페이지가 필요하다.`

### 이유
- 현재 상품군이 1개가 아니다.
- Search 광고는 검색 의도가 다르면 랜딩 메시지도 달라져야 한다.
- AI Max와 PMax는 URL과 페이지 문맥을 적극적으로 활용한다.
- 금융 리드 업종은 조건 설명과 신뢰 요소가 중요해서, 메시지를 좁힌 상세 LP가 더 유리하다.

### 권장 페이지 트리
- `/` : 브랜드형 메인 + 전체 상품 안내
- `/mortgage.html` : 부동산담보 대표 LP
- 추가 상세 LP 3~5개
  - 아파트담보
  - 후순위/추가대출
  - 대환
  - 사업자/비주거용
  - 승인사례/조건비교형 페이지 중 1개
- `/privacy.html`
- `/complete.html` (`noindex`, 광고 확장 제외)

## 6. 측정/DB 스키마 권장안

### 필수 저장 필드
| 구분 | 필드 |
| --- | --- |
| 식별 | `lead_id`, `submitted_at`, `source_page`, `landing_url` |
| 광고 식별자 | `gclid`, `gbraid`, `wbraid` |
| UTM | `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` |
| 유입 문맥 | `referrer`, `device_type` |
| 고객 정보 | `name`, `phone`, `loan_type` |
| 동의/품질 | `consent_status`, `is_duplicate`, `validation_status` |
| CRM 단계 | `lead_stage`, `qualified_at`, `won_at`, `revenue_value` |

### 전환 액션 체계
- `raw lead`
  - 폼 제출 완료
  - 보조 전환
- `qualified lead`
  - 상담 가능, 허위/중복/무관 리드 제외
  - 주 최적화 목표 후보 1
- `converted lead`
  - 실제 승인 또는 계약에 가까운 상태
  - 주 최적화 목표 후보 2

### 실무 권장
- 초반에는 `raw lead + qualified lead`를 함께 측정한다.
- 볼륨이 충분해지면 `qualified lead`를 주 입찰 목표로 올린다.
- 가능하면 `converted lead` 또는 매출값까지 업로드해 value-based bidding으로 발전시킨다.

## 7. 실행 우선순위

### 1순위. 측정 보강
- 모든 폼에 click ID, UTM, referrer, landing URL 저장
- `qualified lead` 상태값 정의
- Enhanced Conversions for Leads 설계
- Data Manager 또는 동등 파이프라인 준비

### 2순위. 의도별 페이지 구조 확장
- 메인은 브랜드/신뢰 중심
- 상세 LP는 검색 의도별로 분화
- PMax/AI Max에 허용할 URL과 제외할 URL 문서화

### 3순위. 신뢰/정책/검증 보강
- 사업자/등록/광고주 정보 재배치
- 개인정보/동의/수수료/심사 관련 고지 정리
- South Korea 금융서비스 검증 절차 확인

### 4순위. 기술 SEO 정비
- canonical 확정
- sitemap 운영 도메인 정렬
- structured data 검수
- Core Web Vitals 점검

## 8. 검증 체크리스트

### 광고 구조
- 각 광고군이 대응 LP에 명확히 매핑되는가
- PMax URL expansion 허용 URL과 제외 URL이 문서화되어 있는가
- AI Max URL exclusions/inclusions 전략이 있는가

### 측정
- 모든 폼 제출에 click ID와 UTM이 저장되는가
- 완료 페이지 전환이 1회만 집계되는가
- raw lead / qualified lead / converted lead가 분리되는가
- 오프라인 상태값을 Google Ads로 되돌릴 수 있는가

### 정책/신뢰
- 랜딩페이지가 기능적으로 정상 동작하는가
- 연락처, 사업자 정보, 서비스 설명이 과장 없이 일관적인가
- 개인정보처리방침 링크가 모든 폼 인접 영역에 있는가
- 금융서비스 검증 대상 여부를 확인했는가

### SEO/기술
- canonical, sitemap, 내부링크가 같은 운영 URL을 가리키는가
- noindex 대상이 명확한가
- Core Web Vitals 목표를 충족하는가
- 모바일 첫 화면에서 CTA가 즉시 보이는가

## 9. 이 프로젝트에 대한 최종 제안

### 추천 방향
- 메인은 유지하되 `브랜드/신뢰 허브` 역할로 더 명확히 정리한다.
- `mortgage.html`은 유지하되 더 세분화된 하위 LP의 상위 페이지로 쓴다.
- 단일 폼 수집 사이트에서 `광고-CRM-품질 최적화 사이트`로 진화해야 한다.

### 가장 중요한 한 가지
이 사이트의 다음 병목은 디자인이 아니라 `측정 구조`다.

지금도 리드는 받을 수 있지만, `어떤 유입이 좋은 DB인지`를 Google Ads에 충분히 되돌려주지 못하고 있다.  
DB 품질을 최우선 KPI로 둘 것이라면, 홈페이지는 단순 랜딩페이지가 아니라 `광고 식별자와 CRM 품질 단계가 이어지는 측정 시스템`이어야 한다.

## 10. 참고한 Google 공식 문서
- Google Ads Highlights of 2025  
  https://support.google.com/google-ads/answer/16756291
- Google Marketing Live 2025: Your roundup of announcements  
  https://support.google.com/google-ads/answer/16290177
- About AI Max Experiments  
  https://support.google.com/google-ads/answer/16450159
- Set up AI Max in Google Ads  
  https://support.google.com/google-ads/answer/15909989?hl=en
- About text customization in Search campaigns  
  https://support.google.com/google-ads/answer/11259373?hl=en
- About Performance Max campaigns  
  https://support.google.com/google-ads/answer/10724817/about-performance-max-campaigns
- About Final URL expansion in Performance Max  
  https://support.google.com/google-ads/answer/14337539?hl=en
- Best practices for URL expansion in Performance Max campaigns  
  https://support.google.com/google-ads/answer/15995647?hl=en
- About Quality Score for Search campaigns  
  https://support.google.com/google-ads/answer/6167118?hl=en
- Using Quality Score to improve your performance  
  https://support.google.com/google-ads/answer/13738235?hl=en
- About offline conversion imports  
  https://support.google.com/google-ads/answer/2998031
- About enhanced conversions for leads  
  https://support.google.com/google-ads/answer/15713840?hl=en
- Best practices for generating high-quality leads  
  https://support.google.com/google-ads/answer/13489421
- About lead form assets  
  https://support.google.com/google-ads/answer/10089406?hl=en
- Create lead form assets  
  https://support.google.com/google-ads/answer/16726130?hl=en
- Destination mismatch / Destination requirements  
  https://support.google.com/adspolicy/answer/16428020
- Misrepresentation  
  https://support.google.com/adspolicy/answer/190438
- Financial services verification - South Korea  
  https://support.google.com/adspolicy/answer/15332527?co=GENIE.CountryCode%3DKR&hl=en
- How to specify a canonical URL with rel="canonical" and other methods  
  https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Understanding Core Web Vitals and Google search results  
  https://developers.google.com/search/docs/appearance/core-web-vitals
- Build and submit a sitemap  
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
