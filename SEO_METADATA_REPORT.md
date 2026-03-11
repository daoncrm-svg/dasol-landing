# 메타데이터 SEO 리서치 및 현재 랜딩페이지 진단

## 목적과 기준
- 이 문서는 `메타데이터 SEO`에서 실제로 공통 검증되는 원칙만 남기기 위해 작성했다.
- 우선순위는 `Google Search Central 최신 문서 -> Open Graph/X 공식 문서 -> Reddit/GitHub 커뮤니티 재확인` 순서로 두었다.
- 대상은 한국어 단일 랜딩페이지이며, 핵심 목표는 `Google 검색 노출 품질`과 `소셜 공유 미리보기 품질`이다.

## 공통적으로 검증되는 핵심 원칙

### 1. `title`은 짧고 설명적이며 페이지마다 고유해야 한다
- Google은 모든 페이지에 `<title>`이 있어야 하고, 설명적이며 간결해야 하며, 반복 문구와 키워드 스터핑을 피하라고 안내한다.
- 실무에서 가장 많이 재작성되는 경우는 다음 패턴이다.
- 페이지 실내용보다 사이트 공통 보일러플레이트가 더 강한 경우
- 제목이 너무 장황하거나 키워드 반복이 심한 경우
- 제목과 페이지 본문/H1 의도가 어긋나는 경우
- 고정 길이 규칙인 `60자`는 절대 기준이 아니다. 핵심은 길이가 아니라 `의미 일치`와 `재작성 가능성 감소`다.

### 2. `meta description`은 랭킹용이 아니라 스니펫/CTR용이다
- Google은 설명 메타 태그를 랭킹 신호로 보지 않는다고 명시한다.
- 다만 검색 결과에서 설명문으로 활용될 수 있으므로, 실제 페이지 내용을 요약하는 자연어 문장으로 작성하는 것이 유효하다.
- 커뮤니티 합의도 거의 동일하다. 설명 메타는 순위 상승 버튼이 아니라 `클릭 전 기대치 정렬`과 `CTR 개선` 용도에 가깝다.
- Google이 설명문을 자주 재작성하므로, 메타 설명은 `통제`가 아니라 `좋은 기본 후보안 제공`으로 이해하는 게 맞다.

### 3. `canonical`은 절대 URL 하나만 명확하게 유지해야 한다
- Google은 canonical 신호를 여러 방식에서 일관되게 맞추라고 안내한다.
- 실무 기준으로는 `head의 canonical`, 내부 링크, 사이트맵, Open Graph URL이 서로 같은 대표 URL 전략을 반영해야 한다.
- 잘못된 canonical은 메타 최적화 실수 중 가장 해로운 편이다. 도메인이 확정되지 않았으면 억지로 넣지 않는 편이 더 안전하다.
- `robots.txt`를 canonical 대용으로 쓰면 안 된다.

### 4. `robots`는 기본값 선언보다 필요한 제어만 써야 한다
- `index,follow`는 기본 동작이므로 굳이 쓰지 않는다.
- 실제로 의미 있는 메타 robots 제어는 `noindex`, `nosnippet`, `max-snippet`, `max-image-preview` 같은 값이다.
- 페이지 단위 robots 메타를 기대하는 URL을 `robots.txt`로 막아버리면 검색 엔진이 그 메타를 읽지 못할 수 있다.

### 5. Open Graph와 Twitter Cards는 검색 랭킹용이 아니라 공유 미리보기용이다
- Open Graph 핵심 세트는 `og:title`, `og:type`, `og:image`, `og:url`이다.
- 실무에서는 여기에 `og:description`, `og:site_name`, `og:locale`, `og:image:alt`를 더해 완성도를 높인다.
- X 카드에서는 최소한 `twitter:card`가 필요하고, 보통 `twitter:title`, `twitter:description`, `twitter:image`를 함께 맞춘다.
- 커뮤니티에서 반복되는 문제는 `상대 경로 이미지`, `잘못된 metadata base`, `프리뷰 환경 도메인이 박힌 OG 이미지`, `body 뒤쪽으로 밀린 메타`, `클라이언트 렌더링 후 주입된 메타`다.

### 6. 구조화 데이터는 `지원되는 타입`만 넣어야 한다
- 홈에서 우선 검토할 값은 `WebSite(name, url, alternateName)`다.
- 사업자 신원을 외부 공개 정보와 맞춰 검증할 수 있을 때만 `Organization` 또는 더 구체적인 타입을 붙이는 것이 안전하다.
- 이 랜딩은 금융 상담 랜딩이므로 블로그/미디어용 스키마나 기사형 스키마를 추천하지 않는다.
- `FAQPage`는 현재 Google에서 정부/보건 분야의 권위 사이트 중심으로 제한되어 있어, 일반 금융 랜딩에서 리치 결과를 기대하기 어렵다.

### 7. 기술 위생이 메타데이터 품질을 좌우한다
- 메타데이터는 `초기 HTML`, `유효한 head`, `중복 없는 단일 값`이 가장 중요하다.
- Google 문서와 커뮤니티 모두 `클라이언트 사이드 후주입`, `view-source에는 없고 devtools에는만 있는 태그`, `body 이동`, `잘못된 URL base`를 반복적인 실패 원인으로 언급한다.
- 특히 social crawler는 Google보다 보수적인 경우가 많아, 초기 응답에 제대로 박혀 있지 않으면 미리보기 실패가 흔하다.

### 8. 제외해야 할 항목
- `<meta name="keywords">`
- 제목/설명 키워드 스터핑
- 의미 없는 `index,follow` 선언
- 실제 URL/브랜드/사업자 검증 없이 넣는 구조화 데이터
- JS에서 나중에 주입하는 canonical/robots/OG 값

## 현재 랜딩페이지 진단

### 적용 전 상태
- [index.html](c:/Users/ksj86/OneDrive/00_Project/다솔대부중개 랜딩페이지/index.html)에는 `title`과 `meta description`만 있었다.
- `canonical`, `og:url`, `absolute og:image`, `Twitter image`, `WebSite/Organization JSON-LD`, favicon 신호가 없었다.

### 이번에 적용한 항목
- `title`을 페이지 실제 의도와 더 가깝게 조정했다.
- `meta description`을 H1/히어로 카피와 더 맞게 다시 작성했다.
- `robots=max-image-preview:large`를 추가했다.
- `og:type`, `og:site_name`, `og:title`, `og:description`, `og:locale`을 추가했다.
- `twitter:card`, `twitter:title`, `twitter:description`을 추가했다.
- `favicon.svg`를 추가하고 head에 연결했다.
- HTML 주석으로 `도메인 미확정 상태에서는 canonical/og:url/absolute og:image를 추정값으로 넣지 말 것`을 남겼다.

### 이번에 보류한 항목과 이유
- `canonical`, `og:url`, `absolute og:image`
  - 레포 안에 프로덕션 도메인이 없어서 잘못 넣으면 더 해롭다.
  - 올바른 절대 URL이 정해지면 한 번에 채우는 것이 맞다.
- `WebSite JSON-LD`
  - `url`에 절대 URL이 필요하다.
- `Organization JSON-LD`
  - 현재 페이지 footer의 상호/전화 정보와 외부 공개 정보가 완전히 일치하지 않는다.
  - 구조화 데이터는 외부 공개 사실과 어긋나면 리치 결과 이전에 신뢰도 문제를 만든다.

### 현재 확인된 리스크
- footer에는 `대표번호 : 1877-9224`가 있고 CTA 영역에는 `1533-9817`이 반복된다.
- 외부 공개 정보에서는 등록번호 `2021-서울서초-0020`, 대표자 `정성원`, 주소 `서울특별시 서초구 강남대로34길 8 ...`, 대표번호 `1877-9224 / 1877-9816` 조합이 `담픽 대부중개`로 노출된다.
- 즉, 현재 이 페이지는 `브랜드명`, `대표번호`, `공개 사업자 정보` 기준으로 확인이 더 필요하다.
- 이 상태에서는 `Organization` 구조화 데이터와 canonical 대표 도메인을 섣불리 고정하지 않는 편이 안전하다.

## 도메인 확정 후 바로 해야 할 최종 메타 작업
1. `canonical`에 대표 홈 URL 1개를 절대 URL로 넣는다.
2. `og:url`을 canonical과 동일한 URL로 넣는다.
3. `og:image`와 `twitter:image`를 절대 HTTPS URL로 넣고 `og:image:alt`도 추가한다.
4. `WebSite` JSON-LD에 `name`, `url`, `alternateName`을 넣는다.
5. 사업자 정보가 실제 공개 정보와 일치할 때만 `Organization` JSON-LD를 추가한다.
6. `title`, `description`, canonical, `og:url`, 구조화 데이터의 URL 값이 모두 같은 대표 URL 전략을 반영하는지 다시 점검한다.

## 검증 절차
1. `view-source`에서 메타 태그가 모두 `head` 안에 있는지 확인한다.
2. 같은 성격의 태그가 중복되지 않는지 확인한다.
3. canonical, `og:url`, 내부 링크, 사이트맵 URL 전략이 모두 일치하는지 확인한다.
4. `Schema Markup Validator`와 `Rich Results Test`에서 구조화 데이터를 검증한다.
5. Google Search Console `URL Inspection`으로 실제 읽힌 메타와 재크롤 상태를 본다.
6. X/LinkedIn/Facebook 계열 공유 검사 도구에서 실제 미리보기를 확인한다.
7. 소셜 이미지 URL이 `200`, 절대 HTTPS, 크롤러 접근 가능 상태인지 확인한다.

## 참고 소스

### 공식 문서
- Google Search Central, Title links: https://developers.google.com/search/docs/appearance/title-link
- Google Search Central, Snippets / meta description: https://developers.google.com/search/docs/appearance/snippet
- Google Search Central, Canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central, Robots meta tag: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Google Search Central, JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google Search Central, Site names: https://developers.google.com/search/docs/appearance/site-names
- Google Search Central, Favicon: https://developers.google.com/search/docs/appearance/favicon
- Google Search Central, FAQPage structured data: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Open Graph protocol: https://ogp.me/
- X Cards Markup reference: https://developer.x.com/en/docs/x-for-websites/cards/overview/markup

### 커뮤니티 재확인
- GitHub, Next.js discussion on wrong social image host without explicit production base URL: https://github.com/vercel/next.js/discussions/57251
- GitHub, Next.js issue on LinkedIn Post Inspector not finding metadata reliably: https://github.com/vercel/next.js/issues/76746
- GitHub, Gatsby issue on Facebook Share Debugger not picking up React Helmet Open Graph data: https://github.com/gatsbyjs/gatsby/issues/22908
- Reddit, meta description is not a ranking factor but affects snippet/CTR consensus: https://www.reddit.com/r/SEO/comments/1nvtl5k
- Reddit, Google may ignore dynamic meta tags and generate description from page text when metadata is weak or injected late: https://www.reddit.com/r/TechSEO/comments/1krugxv
- Reddit, meta robots injected by JS is considered unreliable and should be validated in Search Console: https://www.reddit.com/r/TechSEO/comments/1kg117e

### 외부 공개 사업자 정보 확인용
- 공개 홈페이지/사업자 정보 노출 예시: https://dampick-online.co.kr/
- 등록번호/대표번호 공개 집계 예시: https://ezloan.io/l/fss/p/348
