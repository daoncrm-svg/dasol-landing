---
title: "실무형 랜딩페이지 UI/UX SKILL"
version: "2.0"
updated: "2026-03-11"
language: "ko"
scope: "홈페이지/랜딩페이지 구조, 카피, UI 시스템, 접근성, 전환 최적화"
---

# SKILL.MD — 실무형 랜딩페이지 UI/UX 설계 기준서

## 0. 이 문서의 목적

이 문서는 **“예쁜 시안”보다 “이해되는 화면, 믿게 만드는 화면, 행동하게 만드는 화면”**을 만드는 기준서다.  
특히 아래 4가지를 최우선으로 둔다.

1. **명확성** — 5초 안에 “누구를 위한 무엇인지” 이해되어야 한다.
2. **신뢰** — 실제 증거, 실제 이미지, 실제 사용자 맥락이 보여야 한다.
3. **낮은 마찰** — CTA, 폼, 내비게이션, 콘텐츠 밀도가 행동을 방해하면 안 된다.
4. **일관성** — 타이포, 간격, 색상, 상태, 상호작용이 시스템처럼 움직여야 한다.

---

## 1. 이 SKILL이 다루는 대상

이 기준서는 아래 페이지에 적용한다.

- SaaS / AI / 생산성 / B2B 서비스 랜딩페이지
- 로컬 서비스 / 상담 / 예약 / 견적형 리드젠 페이지
- 브랜드 소개형 홈페이지
- 에이전시 / 포트폴리오 사이트의 메인 페이지

### 중요한 구분

**홈페이지와 캠페인 랜딩페이지는 비슷하지만 동일하지 않다.**

- **홈페이지**는 탐색, 브랜드 이해, 여러 경로 안내 역할이 있다.
- **캠페인 랜딩페이지**는 한 가지 전환 목표에 집중한다.

따라서 **광고/캠페인용 랜딩페이지**는 보통:
- 내비게이션을 줄이고,
- CTA를 하나로 좁히고,
- 메시지 매칭을 더 강하게 가져간다.

---

## 2. 우선순위 원칙

디자인 결정을 할 때는 아래 순서로 판단한다.

### 2.1 항상 먼저 볼 것
1. 이 페이지의 **주 전환 목표가 하나로 정의되어 있는가**
2. 첫 화면에서 **누구를 위한 어떤 결과**인지 보이는가
3. 신뢰를 줄 **실제 증거**가 있는가
4. CTA가 시각적으로 가장 분명한가
5. 모바일에서 CTA와 핵심 메시지가 살아있는가

### 2.2 그 다음 볼 것
6. 타이포와 간격이 정리되어 있는가
7. 색이 과하지 않고 계층이 분명한가
8. 인터랙션이 내용을 돕는가
9. 페이지가 빠르고 가볍게 느껴지는가
10. 테스트 가능한 구조인가

---

## 3. 규칙의 강도 구분

이 문서의 규칙은 전부 같은 강도가 아니다.

### 고정 기준
거의 항상 지켜야 하는 기준

- 명확한 value proposition
- 한 페이지의 **주 전환 1개**
- 정상 텍스트 대비 **4.5:1 이상**
- 버튼/터치 타깃 **44~48px 이상**
- 오류를 **색상만으로** 전달하지 않기
- 실제 증거가 없다면 과장하지 않기

### 강한 권장
대부분의 실무에서 가장 안정적으로 작동하는 기준

- 8px 중심 리듬 + 4px 미세조정
- 12 / 8 / 4 컬럼 사고방식
- Hero 직후 또는 Hero 내부의 trust/proof
- CTA 반복 배치
- 본문 줄 길이 50~75자 내외
- 1~2개 폰트 패밀리, 제한된 색상 수

### 상황 의존
업종 / 트래픽 / 브랜드 톤 / 구매 의도에 따라 바뀌는 기준

- Hero에 폼을 넣을지 여부
- 다크 테마 사용
- 섹션 수
- Sticky CTA 강도
- Testimonial slider
- Full image hero / cinematic layout
- 장문의 세일즈 페이지 여부

---

## 4. 작업 시작 전에 반드시 정의할 입력값

페이지를 만들기 전에 아래 항목을 먼저 정리한다.

| 항목 | 질문 |
| --- | --- |
| Audience | 누구를 위한 페이지인가 |
| Traffic source | 어디에서 들어오는가 (광고, 검색, SNS, 직접유입) |
| Awareness | 사용자가 문제를 알고 들어오는가, 비교 단계인가 |
| Primary conversion | 신청 / 상담 / 데모 / 구매 / 전화 / 가입 중 무엇인가 |
| Main objection | 사람들이 가장 먼저 의심하는 것은 무엇인가 |
| Proof available | 후기, 숫자, 사례, 로고, 스크린샷 중 무엇이 있는가 |
| Visual asset | 실제 제품 화면, 실제 작업 사진, 실제 공간 사진이 있는가 |
| Device priority | 모바일 우선인가, 데스크톱 우선인가 |
| Brand tone | 차분한가, 공격적인가, 전문적인가, 친근한가 |

### 입력값이 없을 때의 기본 가정
- 낯선 브랜드의 **콜드 트래픽**
- 모바일 + 데스크톱 모두 중요
- 사용자는 길게 읽지 않고 **스캔**
- 신뢰는 늦게가 아니라 **초반에** 필요
- 페이지는 “설명”보다 “판단 보조” 역할을 해야 함

---

## 5. 가장 안정적인 기본 구조

### 5.1 범용 랜딩 흐름 (냉한 트래픽 기준)

```text
Header
Hero
Hero Proof / Trust Bar
Benefits or Problem → Solution
How it works
Use cases / Features
Case study / Testimonials
FAQ
Final CTA
Footer
```

### 5.2 이 흐름이 안정적인 이유

이 구조는 보통 아래 순서로 작동한다.

```text
무엇인지 이해
→ 나와 관련 있는지 판단
→ 믿을 근거 확인
→ 어떻게 작동하는지 이해
→ 의심 제거
→ 행동
```

### 5.3 업종별 권장 변형

#### A. SaaS / AI / B2B
```text
Minimal Header
Hero (headline + screenshot + CTA)
Hero Proof
Pain / Outcome
How it works
Use cases
Testimonials / logos / case study
FAQ
Final CTA
Footer
```

#### B. 로컬 서비스 / 상담 / 리드젠
```text
Sticky Header (phone / CTA)
Hero (service + region + CTA or short form)
Trust Bar
Reviews
Service explanation
Process / before-after
FAQ
Final CTA / contact
Footer
```

#### C. 브랜드 / 포트폴리오 / 크리에이티브
```text
Header
Hero
Signature work / proof
Approach / philosophy
Selected projects
Process
Testimonials
Contact CTA
Footer
```

### 5.4 구조 관련 실무 룰
- **모든 페이지가 같은 섹션 수를 가질 필요는 없다.**
- 콘텐츠가 많다고 좋은 것이 아니다.  
  섹션은 **“이해 / 신뢰 / 의심 제거”에 기여할 때만** 남긴다.
- 복잡한 상품일수록 긴 페이지가 가능하지만, 그래도 **주 전환은 하나**로 잡는다.
- 긴 페이지는 **2~3개 섹션마다 CTA를 반복**한다.
- 광고 전용 랜딩페이지라면 상단 내비게이션은 최소화한다.
- 홈페이지라면 브랜드 탐색용 내비게이션을 조금 더 남겨도 되지만, 첫 화면의 핵심 CTA는 흐리지 않는다.

---

## 6. Hero 설계 공식

Hero는 페이지 전체의 성패를 좌우한다.  
좋은 Hero는 첫 화면에서 아래 4가지를 답해야 한다.

1. **누구를 위한 서비스인가**
2. **무슨 결과를 주는가**
3. **왜 믿을 수 있는가**
4. **다음 행동은 무엇인가**

### 6.1 추천 Hero 템플릿

```text
[Eyebrow / category / audience]
[H1: 누구 + 결과 + 차별점]
[Subcopy: 1~2문장]
[Primary CTA]
[Secondary CTA - 선택]
[Hero proof: 로고 / 숫자 / 리뷰 / 보안 / 짧은 GIF]
[Visual: 실제 화면 / 실제 사용 장면 / 전후 비교]
```

### 6.2 H1 공식
가장 잘 먹히는 H1은 아래 요소를 조합한다.

```text
대상 + 결과 + 차별점/속도/방식
```

예시:
- 마케팅 팀을 위한 **광고 인사이트 자동 요약 도구**
- 상담 전환이 낮은 병원을 위한 **홈페이지 구조 재설계**
- 엑셀과 카톡으로 일하던 팀을 위한 **실시간 업무 대시보드**

### 6.3 Subcopy 공식
Subcopy는 긴 설명문이 아니라 **판단 보조 문장**이다.

```text
현재 문제 + 우리 방식 + 기대 결과
```

예시:
- 경쟁사 변화를 직접 찾느라 시간을 쓰지 마세요.  
  가격, 메시지, 리뷰 변화를 자동 감지해 중요한 변화만 보여줍니다.

### 6.4 Hero 실무 룰
- H1은 **결과 중심**으로 쓴다. 기능명 나열 금지
- Subcopy는 보통 **1~2문장**이면 충분하다
- Hero CTA는 **주 행동 1개**가 원칙이다
- Secondary CTA가 필요하면 시각적으로 약하게 둔다
- 브랜드를 처음 보는 사람이라면 **proof를 Hero 근처에 바로 배치**한다
- 제품 UI가 핵심이면 **실제 스크린샷**이 가장 강하다
- 서비스업이면 **실제 작업 사진 / before-after / 지역성**이 강하다
- 스크린샷이 너무 작아서 안 읽히면, 전체 대시보드보다 **핵심 영역을 확대**한다
- Hero 시각물은 장식이 아니라 **설명 역할**을 해야 한다

### 6.5 5초 테스트
아래 질문에 5초 안에 답이 나오지 않으면 Hero를 다시 써야 한다.

- 이건 누구를 위한 건가?
- 그래서 내가 얻는 건 뭔가?
- 왜 믿어야 하지?
- 지금 뭘 누르면 되지?

---

## 7. Hero 레이아웃 패턴

### 7.1 가장 많이 쓰는 4가지

#### 1) Text Left + Image Right
SaaS, B2B, AI, 생산성 도구에 가장 안정적

```text
[headline text]   [product screenshot / image]
[subcopy]
[CTA]
```

#### 2) Center Hero
간결한 메시지, 앱/스타트업, 소규모 브랜드에 적합

```text
headline
subcopy
CTA
visual
```

#### 3) Full Visual Hero
브랜드/패션/라이프스타일/크리에이티브에 적합  
단, 메시지 가독성과 대비를 반드시 확보해야 함

#### 4) Split Screen
포트폴리오, 에이전시, 실험적 브랜드 페이지에 적합  
단, 전환 중심 페이지에서는 시선 분산에 주의

### 7.2 선택 기준
- **실제 제품 UI가 핵심**이면 1번
- **메시지가 가장 강한 상품**이면 2번
- **브랜드 감성이 주 자산**이면 3번
- **포트폴리오/비주얼 작업물**이면 4번

### 7.3 추천 우선순위
특별한 이유가 없다면 아래 순서로 먼저 검토한다.

1. Text Left + Image Right
2. Center Hero
3. Split
4. Full Visual

---

## 8. 카피라이팅 원칙

실무에서는 디자인보다 카피가 더 자주 문제를 만든다.  
특히 AI/테크 페이지는 아래 실수를 자주 한다.

### 8.1 피해야 할 문장
- next-gen
- seamless
- innovative
- AI-powered solution
- end-to-end
- all-in-one platform

이런 말은 의미가 아예 없지는 않지만, **사용자 입장에서 결과가 보이지 않는다.**

### 8.2 좋은 카피의 특징
- **누구에게** 쓰는지 드러난다
- **무슨 결과**가 생기는지 보인다
- **왜 다른지** 1개는 드러난다
- **증거**가 붙는다
- 너무 많은 기능을 한 문단에 밀어 넣지 않는다

### 8.3 카피 작성 순서
1. 고객이 원한 결과
2. 현재 불편 / 문제
3. 우리가 주는 변화
4. 방식 / 메커니즘
5. 증거
6. 행동 유도

### 8.4 섹션 제목도 결과 중심으로
나쁜 예:
- Why choose us
- Features
- Solutions
- Our process

좋은 예:
- 광고비 낭비를 줄이는 3가지 방식
- 전화 문의가 늘어나는 구조만 남겼습니다
- 경쟁사 변화만 골라서 보여주는 이유
- 상담 전 망설임을 줄이는 실제 사례

### 8.5 브랜드 톤
브랜드 말투는 있어야 하지만, **명확성을 이기면 안 된다.**

실무적으로 가장 안전한 방식:
- H1 = 명확하게
- Subcopy = 약간의 톤
- 후기 / 사례 / 섹션 카피 = 브랜드 보이스 강화

---

## 9. 타이포그래피 공식

### 9.1 현실적인 기본값
실무에서는 특정 픽셀값 하나보다 **계층, 가독성, 줄 길이**가 더 중요하다.

#### 추천 기본 범위
- **Body**: 16px~18px
- **Small**: 13px~14px
- **H1**: 48px~64px (데스크톱)
- **H2**: 32px~44px
- **H3**: 24px~32px
- **Mobile H1**: 32px~40px
- **Mobile Body**: 15px~17px

### 9.2 스케일
- 시작점은 **16px 또는 18px**
- 스케일은 **1.2 ~ 1.333** 정도가 가장 무난
- 단, 모든 프로젝트에 기계적으로 강제하지 말고 **한 줄 수와 컨테이너 폭**을 같이 본다

### 9.3 줄 간격
- **본문**: 1.5 ~ 1.7
- **제목**: 1.15 ~ 1.3
- **짧은 카드 텍스트**: 1.4 ~ 1.6

### 9.4 줄 길이
- 본문은 **50~75자** 내외가 가장 읽기 편하다
- 긴 설명문은 화면 전체 폭으로 깔지 말고 **읽기 폭**을 제한한다
- 긴 줄일수록 line-height를 조금 더 준다

### 9.5 실무 룰
- 폰트 패밀리는 **1개 또는 2개**로 제한
- 계층은 폰트 변경보다 **크기, 굵기, 색 대비, 여백**으로 먼저 만든다
- 긴 제목은 큰 글씨보다 **좋은 줄바꿈**이 중요하다
- 얇은 폰트(weight 300 이하)는 본문에서 피한다
- 회색 본문은 너무 연하게 잡지 않는다

### 9.6 추천 토큰 예시
```css
:root {
  --fs-body: 1rem;      /* 16px */
  --fs-body-lg: 1.125rem; /* 18px */
  --fs-small: 0.875rem; /* 14px */

  --fs-h1: clamp(2rem, 4vw, 4rem);
  --fs-h2: clamp(1.75rem, 3vw, 2.75rem);
  --fs-h3: clamp(1.375rem, 2vw, 2rem);
  --fs-h4: clamp(1.125rem, 1.5vw, 1.5rem);

  --lh-body: 1.6;
  --lh-heading: 1.2;
}
```

---

## 10. 8px 그리드 + 4px 미세조정

사용자 초안의 8px 시스템은 여전히 매우 유효하다.  
다만 실무에서는 **8px 중심 리듬 위에 4px 미세조정**을 섞는 방식이 가장 현실적이다.

### 10.1 추천 간격 체계
```text
4
8
12
16
24
32
40
48
64
80
96
120
```

### 10.2 적용 방식
- **4px**: 미세 조정, 아이콘/텍스트 간격, 작은 상태 요소
- **8px 이상**: 대부분의 패딩/마진/컴포넌트 간격
- **24 / 32 / 40 / 48**: 카드/블록 내부 리듬
- **64 / 80 / 96 / 120**: 섹션 간 리듬

### 10.3 추천 기본값
| 요소 | 추천값 |
| --- | --- |
| 카드 내부 padding | 24px 또는 32px |
| 카드 간 gap | 16px 또는 24px |
| 입력 필드/버튼 내부 좌우 padding | 16px~24px |
| 섹션 상하 여백 | 72px~120px |
| 모바일 섹션 상하 여백 | 40px~72px |

### 10.4 실무 팁
- 여백이 정리되면 디자인이 갑자기 “프로처럼” 보인다
- spacing은 많이 만드는 것이 아니라 **적게 정의하고 반복**하는 것이 핵심
- 같은 깊이의 요소는 같은 여백을 써서 리듬을 만든다
- 카드 세 개를 나란히 놓을 때는 **카드 자체보다 카드 사이 gap**이 더 중요하다

### 10.5 추천 토큰 예시
```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-30: 120px;
}
```

---

## 11. Grid 시스템

### 11.1 기본 프레임
실무에서 가장 보편적인 사고방식은 여전히 다음이다.

```text
Desktop  12 columns
Tablet    8 columns
Mobile    4 columns
```

### 11.2 주의할 점
이 수치는 **절대 법칙**이 아니라 **구조를 잡기 쉬운 기본 프레임**이다.

즉,
- 12컬럼을 쓰되,
- 실제 중요한 것은 **컬럼 수 자체보다 정렬, 거터, 읽기 폭, 반복성**이다.

### 11.3 가장 자주 쓰는 배치
- 3 column cards
- 4 column feature grid
- 2 column comparison / text-image split
- 6 / 6 hero split
- 모바일 1 column stack

### 11.4 실무 팁
- 데스크톱에서 3개 카드가 좋아 보여도 모바일에서는 1개로 내려가는 것이 보통 더 낫다
- 문단 폭은 그리드보다 **읽기 길이**를 먼저 본다
- 모든 섹션을 full width로 만들면 오히려 산만해진다
- 그리드는 “정렬 장치”이지 “창의성 억압 장치”가 아니다

---

## 12. CTA 버튼 공식

### 12.1 원칙
좋은 CTA는 **행동과 결과**를 같이 설명한다.

### 12.2 나쁜 예
- Learn more
- Submit
- Start now
- Click here
- Get started

### 12.3 좋은 예
- 무료 상담 신청
- 가능 여부 1분 안에 확인
- 실제 데모 요청
- 가격 안내 받기
- 실제 대시보드 보기
- 지금 전화로 문의
- 12개 사례집 받기

### 12.4 CTA 라벨 공식
```text
동사 + 결과/목적지
```

예시:
- 신청하기 ❌
- 무료 진단 신청하기 ✅

- 시작하기 ❌
- 14일 무료 체험 시작하기 ✅

### 12.5 버튼 디자인 기본값
- **높이**: 44px~52px
- **모바일 터치 기준**: 44px 이상, 가능하면 48px 전후
- **padding**: 12px 20px ~ 14px 24px
- **radius**: 8px~12px
- **primary button**: solid fill
- **secondary button**: outline 또는 text

### 12.6 CTA 시각적 계층
- 한 화면에 **진짜 primary는 하나**
- 보조 CTA가 있더라도 색, 대비, 무게로 명확히 차등
- CTA보다 장식이 더 튀면 안 된다
- 어두운 배경에서는 CTA가 묻히지 않게 **명도 대비**를 확보한다

### 12.7 CTA 배치
- Hero
- 주요 proof 뒤
- 긴 설명이 끝나는 지점
- FAQ 뒤
- Footer 직전 final CTA

### 12.8 페이지 유형별 CTA
#### SaaS
- 데모 요청
- 무료 체험
- 실제 화면 보기

#### 리드젠 / 상담
- 상담 신청
- 지금 전화
- 무료 견적 받기

#### 포트폴리오 / 에이전시
- 프로젝트 문의
- 포트폴리오 요청
- 미팅 예약

---

## 13. Trust / Proof 설계

페이지를 처음 보는 사람은 당신을 믿지 않는다.  
따라서 **trust는 중간이 아니라 초반에 들어가야 한다.**

### 13.1 가장 강한 proof 순서
1. **실제 결과 숫자**
2. **실제 고객/브랜드 로고**
3. **이름/직책/회사명이 있는 후기**
4. **짧은 사례 요약**
5. **보안/인증/라이선스/업계 자격**
6. **실제 제품 화면 / 실제 작업 결과**

### 13.2 좋은 proof의 조건
- 구체적이다
- 실명 또는 실존 맥락이 있다
- 과장보다 검증 가능성이 높다
- 타깃과 관련 있다
- CTA 근처에 있다

### 13.3 Hero proof 추천
아래 중 **1개만 강하게** 써도 충분하다.
- “1,200+ 팀 사용 중”
- “OOO, OOO, OOO가 선택한”
- 별점 + 리뷰 수
- 대표 후기 1개
- 보안/인증 배지
- 전후 비교 GIF

### 13.4 후기 설계 팁
- 이름, 직책, 회사, 지역이 있으면 신뢰가 올라간다
- 가능하면 사진을 붙인다
- **“좋아요”형 후기보다 “무슨 변화가 있었는지”** 말하는 후기가 더 강하다
- 후기 10개를 슬라이드로 돌리는 것보다, **강한 후기 2~3개를 정적으로 보여주는 편**이 더 안전한 경우가 많다

### 13.5 local/service proof 팁
- 리뷰 수
- 실제 작업 사진
- 지역명
- 자격/보험/업력
- 전/후 비교
- 전화번호, 주소, 운영시간

---

## 14. Benefits / Features / Cards 구성

실무에서 가장 흔한 실수는 **feature를 benefit보다 먼저 말하는 것**이다.

### 14.1 기본 순서
```text
결과
→ 왜 필요한지
→ 어떤 방식으로 가능한지
→ 세부 기능
```

### 14.2 Section 구조 기본형
```text
section title
section supporting copy
content grid / list / visual
```

### 14.3 추천 섹션 공식
- 제목: 결과 중심
- 설명: 1~2문장
- 콘텐츠: 카드 / 리스트 / 비교 / 시각자료

### 14.4 카드 UI 기본 구조
```text
icon / image
title
1줄 결과 설명
짧은 supporting text
(optional) CTA
```

### 14.5 카드 실무 룰
- 카드마다 문장 길이를 비슷하게 맞춘다
- 모든 카드가 똑같은 비중이면 페이지가 밋밋해진다
- 중요한 카드 하나는 **크기나 강조색**으로 조금 더 무게를 줘도 된다
- 카드 설명이 4줄을 넘기면 카드보다 **리스트나 상세 섹션**이 더 적합할 수 있다
- 카드 안에 CTA를 다 넣으면 시선이 찢어진다.  
  정말 이동이 필요한 카드에만 CTA를 넣는다

### 14.6 카드 디자인 기본값
- padding: 24px~32px
- radius: 12px~16px
- gap: 16px~24px
- border 또는 soft shadow
- 제목 > 설명 > 보조 요소의 시각적 계층 확보

---

## 15. 이미지 사용 규칙

AI 느낌이 나는 사이트는 대개 시각물이 문제다.  
주된 원인은 **장식 이미지 위주**이기 때문이다.

### 15.1 피해야 할 이미지
- 억지로 웃는 스톡 모델
- 노트북 보며 회의하는 사람
- 너무 매끈한 가짜 대시보드
- 브랜드와 상관없는 추상 3D 오브젝트 남발
- 실제 제품과 전혀 맞지 않는 이미지

### 15.2 더 좋은 이미지
- 실제 제품 화면
- 실제 첫 사용 장면
- 실제 작업 과정
- 실제 고객 결과 화면
- 실제 공간 / 실제 시공 사진
- before / after
- 창업자 / 팀 / 작업 장면 (필요 시)

### 15.3 이미지 선택 기준
이미지마다 아래 질문을 한다.

1. 이 이미지가 **무엇을 설명하는가**
2. 이 이미지가 **신뢰를 높이는가**
3. 이 이미지가 없어도 되는가, 꼭 필요한가
4. 이 이미지가 실제 경험과 **맞는가**

### 15.4 추천 비율
- Hero visual: 16:9 또는 자유 비율
- 콘텐츠 비주얼: 4:3
- 카드 썸네일: 1:1 또는 4:3
- 후기/아바타: 1:1

### 15.5 실무 팁
- 대시보드 전체를 보여주기보다 **핵심 부분 + callout**이 더 이해되기 쉽다
- 스크린샷은 실제 UI와 다르면 오히려 신뢰를 깬다
- 제품 화면이 핵심 자산이면, stock image보다 screenshot이 낫다
- 이미지 스타일(밝기, 배경, radius, shadow)을 통일한다
- 모바일에서는 이미지가 지나치게 길어져 CTA를 밀어내지 않게 한다

---

## 16. FAQ 설계

FAQ는 “있으면 좋은 섹션”이 아니라  
**의심을 제거하는 conversion 장치**로 봐야 한다.

### 16.1 FAQ에 넣어야 할 질문
- 가격은 어떻게 되나요
- 누구에게 적합한가요
- 도입/상담/작업은 얼마나 걸리나요
- 환불/취소/수정은 어떻게 되나요
- 개인정보/보안은 어떻게 처리하나요
- 경쟁 서비스와 뭐가 다른가요
- CTA를 누르면 다음에 무슨 일이 일어나나요

### 16.2 FAQ 실무 룰
- 5~8개 정도면 충분한 경우가 많다
- 답변은 **짧고 명확하게**
- 길어질 경우 FAQ에서 핵심만 답하고 상세 페이지로 연결
- 지원팀/영업팀/커뮤니티에서 실제로 많이 받는 질문을 우선 사용
- 구매 불안을 줄이는 질문을 앞쪽에 배치

### 16.3 위치
- 일반적으로 **Final CTA 바로 앞**
- 가격/상담/신청 폼이 핵심이면 그 근처에도 배치 가능
- 복잡한 제품이면 중간에 “구매 의심 제거용 FAQ”를 따로 둘 수도 있다

---

## 17. 폼 설계

폼은 전환을 받는 곳이기 때문에 “디자인 요소”가 아니라 “마찰 관리 장치”로 봐야 한다.

### 17.1 기본 원칙
- **정말 필요한 필드만 받는다**
- 상단 퍼널에서는 보통 **1~3개 필드**가 가장 무난
- single-column이 기본
- 쉬운 필드 → 어려운 필드 순서
- required / optional을 명확히 표시
- 에러는 바로 보여주되, 색상만으로 전달하지 않는다

### 17.2 Hero 폼이 잘 맞는 경우
- 긴급도 높은 서비스
- 전화/견적/예약이 주 전환
- 사용자가 이미 강한 의도를 갖고 들어오는 트래픽
- local service / compliance / emergency / clinic / consultation

### 17.3 Hero 폼이 덜 맞는 경우
- 제품 이해가 선행되어야 하는 SaaS
- 복잡한 B2B 솔루션
- 처음 보는 낯선 브랜드 + proof가 약한 경우

### 17.4 폼 UI 팁
- 입력 높이 44~52px
- label은 placeholder로 대체하지 않는 편이 안전
- 드롭다운 남발 금지
- 전화번호 / 이메일 등은 모바일 키보드 타입 맞추기
- submit 버튼은 필드와 시각적으로 분명히 구분
- 긴 폼은 단계 분할 또는 progressive disclosure 고려

---

## 18. 인터랙션 / 모션 패턴

모션은 “있으면 멋있는 것”이 아니라  
**상태 변화, 집중 유도, 이해 보조**를 할 때만 가치가 있다.

### 18.1 안전한 기본값
- Hover state
- Focus state
- Sticky header
- 아주 짧은 scroll reveal
- Accordion/FAQ transition
- Subtle card hover

### 18.2 신중하게 써야 할 것
- Parallax
- 과한 scroll reveal
- 글자 한 줄씩 늦게 뜨는 애니메이션
- Hero carousel
- 자동 슬라이더
- Scroll-jacking
- 3D 장식 효과

### 18.3 실무 원칙
- 모션은 **짧고, 미묘하고, 목적이 있어야** 한다
- 본문 읽기를 지연시키는 애니메이션은 피한다
- CTA 주변 모션은 내용보다 앞서지 않게 한다
- `prefers-reduced-motion`을 지원한다
- 다크 테마에서는 모션보다 **명도 대비와 focus zone**이 더 중요하다

### 18.4 추천 룰
- 페이지당 “와” 포인트는 1개면 충분
- 나머지는 기능적 움직임으로 해결
- Testimonial slider를 쓴다면 자동재생보다 수동 탐색이 안전하다

---

## 19. 색상 시스템

### 19.1 가장 현실적인 구조
색은 보통 아래 구조로 잡는다.

```text
Neutral
Brand / Primary
Accent
Status
```

### 19.2 왜 이렇게 잡는가
- Neutral: 대부분의 화면을 안정적으로 받쳐줌
- Brand: 주 정체성
- Accent: CTA, 핵심 지점, 포인트
- Status: success / warning / error / info

### 19.3 60-30-10 규칙
이건 **좋은 시작점**이지 절대 법칙은 아니다.

```text
60% neutral
30% primary
10% accent
```

#### 가장 안전한 해석
- 화면 대부분은 neutral
- 브랜드 색은 구조를 잡는 데 사용
- accent는 정말 중요한 행동/강조에만 사용

### 19.4 절대 우선 기준
- 텍스트 대비는 **4.5:1 이상**
- large text는 3:1 이상 가능
- 색상만으로 의미를 전달하지 않는다
- CTA는 배경과 확실히 구분되어야 한다

### 19.5 실제 실무 팁
- accent color는 **한 화면에 1개**가 가장 안전하다
- 여러 accent를 동시에 쓰면 primary action이 흐려진다
- 배경은 neutral 위주로 잡고, 시선 유도는 색보다 **대비 + 크기 + 위치**로 먼저 만든다
- 다크 UI에서는 mid-gray on dark-gray를 특히 조심한다

### 19.6 추천 팔레트 구조
```text
Primary
Primary Dark
Accent
Gray 50 ~ 900
Success
Warning
Error
Info
```

### 19.7 복붙용 예시 팔레트
```css
:root {
  --primary: #2563EB;
  --primary-dark: #1D4ED8;
  --accent: #F97316;

  --gray-50: #F8FAFC;
  --gray-100: #F1F5F9;
  --gray-200: #E2E8F0;
  --gray-300: #CBD5E1;
  --gray-400: #94A3B8;
  --gray-500: #64748B;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1F2937;
  --gray-900: #0F172A;

  --success: #22C55E;
  --warning: #F59E0B;
  --error:   #EF4444;
  --info:    #3B82F6;
}
```

### 19.8 추천 조합
#### 신뢰형 SaaS
- Blue + White + Gray

#### AI / Tech
- Purple + Dark + Soft Neutral

#### 생산성 / 핀테크
- Green + White + Gray

#### 공격적인 스타트업
- Orange + Navy

#### 프리미엄 브랜드
- Black + Warm Gold + Soft Off-white

### 19.9 다크 테마 실무 팁
- 다크 배경이면 **copy와 CTA 주변만 더 밝게** 잡는다
- accent는 1개만 두고 CTA/링크/핵심 지표에만 사용
- 연한 회색 본문을 너무 많이 쓰지 말고, 주요 카피는 충분히 밝게 유지
- 다크 테마는 “멋”보다 “가독성”이 먼저다

---

## 20. 상태 색상 / 인터랙션 상태

상태 색상은 꼭 정의한다.

```text
Success
Warning
Error
Info
```

### 실무 룰
- success는 완료 / 정상 상태
- warning은 주의 / 검토 필요
- error는 실패 / 즉시 수정 필요
- info는 안내 / 참고

### 주의
- warning과 error를 같은 무게로 쓰지 않는다
- 링크, 포커스, 에러, disabled 상태를 모두 구분한다
- form error는 **텍스트 + 아이콘 + 색상** 조합이 안전하다

---

## 21. Header / Footer 실무 규칙

### Header
캠페인 랜딩페이지에서는 보통 아래가 기본이다.

```text
Logo + Primary CTA
```

필요한 경우에만:
- phone number
- login
- anchor nav

### Header 실무 팁
- sticky header는 상담/전화/폼 유도형 페이지에서 강하다
- 너무 많은 메뉴는 랜딩페이지의 집중을 깨뜨린다
- 홈페이지라면 탐색을 위해 메뉴를 더 둘 수 있지만, first screen CTA는 살아야 한다

### Footer
Footer는 신뢰와 필수 정보 역할을 한다.

포함 권장:
- 회사명
- 연락처
- 주소 / 사업 정보
- 정책 링크
- 소셜 링크
- 저작권 정보

캠페인 랜딩페이지는 footer도 과도한 링크를 줄인다.

---

## 22. 홈페이지 vs 랜딩페이지 차이

| 항목 | 홈페이지 | 캠페인 랜딩페이지 |
| --- | --- | --- |
| 목적 | 브랜드 소개 + 탐색 | 단일 전환 |
| 내비게이션 | 상대적으로 많음 | 최소화 |
| CTA | 여러 경로 가능 | 주 CTA 1개 |
| 콘텐츠 범위 | 넓음 | 좁고 깊음 |
| 신뢰 요소 | 전체 분산 가능 | 초반 집중 필요 |
| 구조 | 다목적 | 집중형 |

### 실무 판단법
- 광고 / 검색 캠페인 전용이면 랜딩페이지로 본다
- 회사 대표 웹사이트면 홈페이지 성격이 섞일 수 있다
- 둘을 혼합할 때도 **첫 화면만큼은 랜딩 사고방식**을 적용한다

---

## 23. 모바일 우선 설계

모바일은 “나중에 줄이는 버전”이 아니라  
처음부터 고려해야 하는 주 무대다.

### 23.1 모바일 기본 원칙
- H1, Subcopy, CTA, proof가 첫 스크롤에 최대한 들어오게 한다
- 2컬럼 이상은 매우 신중하게
- 버튼과 폼은 손가락 기준으로 설계
- 텍스트 블록을 짧게 쪼갠다
- 시각 장식은 줄이고 핵심 시각물만 남긴다

### 23.2 모바일에서 특히 중요한 것
- CTA의 초기 가시성
- tap target 크기
- 스크린샷 readability
- 카드 높이 균형
- sticky CTA의 필요 여부
- 큰 전화 CTA (local service에서 특히 유효)

### 23.3 모바일 Hero 팁
- H1은 보통 2~4줄 안쪽
- Subcopy는 2문장 이하
- CTA는 한 번에 보이게
- 배경 효과보다 텍스트와 CTA 선명도 우선

---

## 24. 성능 / 구현 관점

랜딩페이지는 로딩이 느리면 디자인 품질이 좋아도 손해를 본다.

### 기본 원칙
- 첫 화면에 필요한 것만 먼저 보여준다
- Hero 이미지/비디오는 무겁지 않게
- 불필요한 JS/애니메이션/GIF를 줄인다
- CTA와 폼은 가능한 한 **핵심 기능이 JS 실패에 덜 의존**하게 만든다
- 측정할 전환 이벤트를 먼저 정의한다

### 테스트 우선순위
1. headline
2. hero visual
3. primary CTA copy
4. CTA 색/크기
5. form length
6. trust bar 유무
7. testimonial placement
8. FAQ placement

---

## 25. 흔히 망가지는 패턴

| 문제 | 왜 안 좋은가 | 대안 |
| --- | --- | --- |
| 기능 나열형 Hero | 사용자는 결과를 못 본다 | 대상 + 결과 + proof로 재작성 |
| generic CTA | 다음 행동이 불명확 | 목적지/결과를 CTA 라벨에 넣기 |
| proof가 너무 늦게 나옴 | 낯선 브랜드를 못 믿음 | Hero 또는 Hero 아래로 당기기 |
| 섹션 과다 | 피로도 상승 | 하위 30% 섹션부터 삭제 검토 |
| 카드가 전부 동일 | 계층이 없다 | 중요한 메시지 1개를 더 강조 |
| stock/AI 이미지 | 신뢰 하락 | 실제 화면 / 실제 결과 이미지로 교체 |
| CTA보다 배경이 더 튐 | 클릭 유도가 약함 | CTA를 solid + 대비 강화 |
| 너무 많은 애니메이션 | 읽기 지연, 성능 저하 | hover / subtle reveal 정도로 제한 |
| 다크 테마 저대비 | 가독성 저하 | 밝은 focus zone, 높은 대비 확보 |
| FAQ가 형식적 | 의심 제거 실패 | 실제 objections 기준으로 재작성 |
| 긴 폼 | 마찰 증가 | 필드 축소 / 단계 분리 |
| hero slider | 핵심 메시지 희석 | 정적 Hero 우선 |

---

## 26. “AI 사이트 티”가 나는 특징과 해결법

### 자주 보이는 특징
- 문장이 너무 추상적
- 결과보다 기능/기술을 먼저 말함
- 모든 카드가 똑같음
- 이미지가 스톡 느낌
- CTA가 너무 일반적
- proof가 없음
- 브랜드 말투가 없음
- 페이지가 과하게 번쩍임
- 실제 경험보다 과장된 데모 화면

### 해결법
```text
추상 문장 → 구체적인 결과 문장
기능 나열 → 이득 중심 정리
동일 카드 반복 → 중요도 차등
스톡 이미지 → 실제 화면/실제 사진
generic CTA → 목적 기반 라벨
proof 없음 → 숫자/로고/후기/사례 추가
무색무취 톤 → 브랜드 문장 10%만 넣기
과한 인터랙션 → 절제
가짜 데모 → 실제 첫 경험과 맞추기
```

---

## 27. 실무용 기본 토큰 세트

```css
:root {
  /* Typography */
  --fs-body: 1rem;
  --fs-body-lg: 1.125rem;
  --fs-small: 0.875rem;
  --fs-h1: clamp(2rem, 4vw, 4rem);
  --fs-h2: clamp(1.75rem, 3vw, 2.75rem);
  --fs-h3: clamp(1.375rem, 2vw, 2rem);
  --fs-h4: clamp(1.125rem, 1.5vw, 1.5rem);

  --lh-body: 1.6;
  --lh-heading: 1.2;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-30: 120px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Button */
  --btn-height: 48px;

  /* Shadows */
  --shadow-soft: 0 4px 16px rgba(15, 23, 42, 0.08);
  --shadow-card: 0 8px 24px rgba(15, 23, 42, 0.10);

  /* Colors */
  --primary: #2563EB;
  --primary-dark: #1D4ED8;
  --accent: #F97316;

  --gray-50: #F8FAFC;
  --gray-100: #F1F5F9;
  --gray-200: #E2E8F0;
  --gray-300: #CBD5E1;
  --gray-400: #94A3B8;
  --gray-500: #64748B;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1F2937;
  --gray-900: #0F172A;

  --success: #22C55E;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

---

## 28. 업종별 빠른 권장안

### 28.1 SaaS / AI
- Hero에 실제 UI 또는 짧은 demo visual
- “기능”보다 “결과” 먼저
- Hero proof 필수
- CTA는 보통 `데모 요청`, `무료 체험`, `실제 화면 보기`
- Dark UI 가능하나 contrast와 CTA 가시성 우선
- testimonial slider보다 정적 proof 권장

### 28.2 로컬 서비스
- 지역명 + 서비스명 + CTA를 Hero에 바로
- 전화 CTA를 크게
- Hero 폼 또는 첫 스크롤 내 폼 고려
- 리뷰 / 자격 / 보험 / before-after 필수
- 가격보다 `무료 견적` framing이 더 자연스러운 경우 많음
- Header는 최소화

### 28.3 에이전시 / 포트폴리오
- 개성 있는 비주얼 가능
- 하지만 첫 화면에서 전문 영역과 결과는 분명해야 함
- 대표 프로젝트 2~4개를 먼저
- 프로세스, 후기, 문의 CTA
- 인터랙션은 보여주되 과시형 모션은 자제

---

## 29. 이 SKILL을 사용할 때의 출력 형식

이 SKILL로 랜딩페이지를 제안하거나 생성할 때는 아래 순서로 출력한다.

### 29.1 전략 요약
- Audience
- Traffic source
- Primary conversion
- Main objections
- Proof available
- Page type

### 29.2 구조 제안
각 섹션을 아래 형식으로 정리한다.

```text
섹션명
목적
핵심 카피
필요한 시각물
CTA 유무
```

### 29.3 Hero 초안 3개
- 보수형
- 결과 중심형
- 공격적/브랜드형

### 29.4 CTA 초안 3개
- primary
- secondary
- mobile / local variant

### 29.5 디자인 시스템 초안
- typography tokens
- spacing tokens
- color tokens
- button rules
- card rules
- form rules

### 29.6 mobile adjustments
- Hero 줄이기
- grid collapse
- CTA visibility
- sticky CTA 필요 여부

### 29.7 launch checklist
- proof
- accessibility
- speed
- form friction
- analytics / experiment ideas

---

## 30. 최종 QA 체크리스트

출시 전 아래를 체크한다.

### 전략
- [ ] 이 페이지의 주 전환 목표가 하나로 정의되어 있다
- [ ] 광고/검색 문구와 페이지 메시지가 맞는다
- [ ] 첫 화면에서 누구/무엇/결과가 보인다

### 카피
- [ ] H1이 결과 중심이다
- [ ] buzzword가 과하지 않다
- [ ] section title이 추상적이지 않다
- [ ] FAQ가 실제 objection을 다룬다

### 시각
- [ ] 실제 화면 또는 실제 증거가 있다
- [ ] CTA가 가장 눈에 띈다
- [ ] 색이 3~5개 역할 안에서 통제된다
- [ ] 카드가 전부 같은 무게로 보이지 않는다

### UX
- [ ] 모바일 첫 스크롤에서 CTA 접근이 가능하다
- [ ] 폼 필드가 과하지 않다
- [ ] tap target이 충분히 크다
- [ ] 내비게이션이 전환을 방해하지 않는다
- [ ] motion이 읽기를 지연시키지 않는다

### 접근성
- [ ] 일반 텍스트 대비 4.5:1 이상
- [ ] large text 대비 3:1 이상
- [ ] 에러를 색상만으로 전달하지 않는다
- [ ] reduced motion 대응이 있다
- [ ] 키보드 포커스가 보인다

### 신뢰
- [ ] 후기/숫자/로고/사례 중 하나 이상이 초반에 있다
- [ ] 후기의 실명/직책/회사/지역 등 구체성이 있다
- [ ] 과장된 claim에 비해 proof가 부족하지 않다

### 성능
- [ ] Hero 비주얼이 과도하게 무겁지 않다
- [ ] 첫 화면 로딩이 느리지 않다
- [ ] 핵심 CTA/폼이 안정적으로 동작한다

---

## 31. 빠른 실무 판단 문장

아래 문장을 기준으로 판단하면 실수가 많이 줄어든다.

- **“이 페이지는 예쁘기보다 먼저 이해되어야 한다.”**
- **“기능보다 결과를 먼저 말하라.”**
- **“낯선 브랜드일수록 proof를 빨리 보여줘야 한다.”**
- **“한 페이지에 진짜 CTA는 하나다.”**
- **“이미지는 장식이 아니라 설명과 신뢰 장치다.”**
- **“여백은 취향이 아니라 시스템이다.”**
- **“다크 테마보다 대비가 중요하다.”**
- **“모션은 내용보다 앞서면 안 된다.”**
- **“좋은 랜딩은 설명을 다 하는 페이지가 아니라, 올바른 판단을 빨리 돕는 페이지다.”**

---

## 32. 검증 메모 / 참고 소스

아래 소스들을 바탕으로 이 문서를 보정했다.  
성격은 크게 3가지다.

- **연구/가이드 기반**: NN/g, Baymard, W3C, Material, Shopify Polaris
- **CRO / 실무 블로그**: CXL, Unbounce, Webflow, Shopify
- **실무 커뮤니티 합의**: Reddit SaaS / PPC / webdev / microsaas

### 32.1 핵심 연구/가이드
- NN/g — Homepage Design: 5 Fundamental Principles  
  clear value proposition, scannable copy, homepage clarity
- Baymard — Readability: The Optimal Line Length  
  body text 50~75 characters
- Baymard — CTA wording pitfalls  
  generic CTA의 오해 가능성
- W3C WCAG 2.1/2.2  
  contrast, target size
- Material Design  
  48dp target, spacing increments, typography, reduced motion
- Shopify Polaris  
  color roles, attention hierarchy, WCAG-friendly form/input roles

### 32.2 CRO / 실무 블로그
- CXL — High-converting landing page anatomy  
  one action, clarity, proven structure
- Unbounce — Landing page best practices  
  message match, above-the-fold action, authentic proof, speed
- Shopify — High-converting landing pages / FAQ  
  value proposition, visuals, social proof, friction reduction
- Webflow — Optimization / website structure  
  single focus, primary conversion, testable elements, FAQ/testimonials/case studies

### 32.3 커뮤니티 실무 합의
- r/SaaS / r/microsaas  
  outcome-first hero, one CTA, real screenshot, proof early
- r/PPC  
  local service pages: short form, reviews early, call CTA, nav 최소화
- r/webdev  
  excessive fade-in / gimmick animation에 대한 피로감
- SaaS teardown style posts  
  generic CTA, no screenshot, no proof, feature dump에 대한 반복적 비판

### 32.4 참고 링크
- https://www.nngroup.com/articles/homepage-design-principles/
- https://baymard.com/blog/consumables-subscriptions-cta
- https://baymard.com/blog/line-length-readability
- https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- https://m3.material.io/foundations/designing/structure
- https://m3.material.io/styles/motion/transitions/applying-transitions
- https://polaris-react.shopify.com/design/colors/palettes-and-roles
- https://cxl.com/blog/how-to-build-a-high-converting-landing-page/
- https://cxl.com/blog/form-design-best-practices/
- https://unbounce.com/landing-page-articles/landing-page-best-practices/
- https://webflow.com/webflow-way/optimize-analyze/optimize
- https://webflow.com/blog/pages-on-a-website
- https://www.shopify.com/blog/high-converting-landing-pages
- https://www.shopify.com/blog/120928069-how-to-create-faq-page
- https://tailwindcss.com/docs/colors

- https://www.reddit.com/r/SaaS/comments/1k6lu9e/i_rebuilt_4_saas_landing_pages_this_month_heres/
- https://www.reddit.com/r/SaaS/comments/1r3dxxa/25_customers_who_love_the_product_but_i_think_my/
- https://www.reddit.com/r/microsaas/comments/1oety9r/i_studied_50_saas_landing_pages_to_figure_out_why/
- https://www.reddit.com/r/SaaS/comments/1qbmp97/what_i_learned_designing_a_darktheme_saas_landing/
- https://www.reddit.com/r/PPC/comments/1re9kut/bestperforming_landing_page_structure_for_local/
- https://www.reddit.com/r/PPC/comments/1op4bgd/ppc_landing_page_tips/
- https://www.reddit.com/r/webdev/comments/1m2gxnv/stop_adding_fade_in_animations/

---

## 33. 한 줄 결론

**좋은 랜딩페이지는 ‘정보를 많이 보여주는 페이지’가 아니라,  
‘올바른 사람에게 올바른 약속을 짧게 보여주고, 믿을 근거를 붙이고, 다음 행동을 쉽게 만드는 페이지’다.**