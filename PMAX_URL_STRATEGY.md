# PMax / AI Max URL 전략

## 1. PMax Final URL Expansion 허용 URL 목록

| URL | 용도 | PMax 허용 |
|-----|------|-----------|
| `/` (index.html) | 메인 브랜드 허브 | ✅ 허용 |
| `/mortgage.html` | 부동산 담보대출 종합 LP | ✅ 허용 |
| `/apartment.html` | 아파트 담보대출 전용 LP | ✅ 허용 |
| `/refinance.html` | 후순위/대환대출 전용 LP | ✅ 허용 |
| `/business.html` | 사업자/비주거용 담보대출 LP | ✅ 허용 |

## 2. PMax URL Exclusion 목록

| URL | 이유 | Exclusion |
|-----|------|-----------|
| `/complete.html` | 전환 완료 페이지 (noindex) | ❌ 제외 |
| `/privacy.html` | 개인정보처리방침 (비전환) | ❌ 제외 |

## 3. AI Max URL 전략

### Inclusions
- `/mortgage.html` — "부동산담보대출", "담보대출" 등 일반 검색의도
- `/apartment.html` — "아파트담보대출", "아파트후순위", "KB시세대출" 등
- `/refinance.html` — "대환대출", "후순위대출", "이자절감" 등
- `/business.html` — "사업자대출", "토지담보", "상가대출", "공장대출" 등
- `/` — 브랜드 검색 ("다솔", "다솔대부중개")

### Exclusions
- `/complete.html`
- `/privacy.html`

## 4. 키워드 ↔ LP 매핑 가이드

| 키워드 의도 | 추천 LP | 이유 |
|------------|---------|------|
| 아파트담보대출, KB시세대출 | apartment.html | 아파트 특화 FAQ/조건 |
| 부동산담보대출, 주택담보대출 | mortgage.html | 종합 담보대출 |
| 후순위대출, 대환대출, 이자절감 | refinance.html | 대환 특화 |
| 사업자대출, 토지담보, 상가대출 | business.html | 사업자 특화 |
| 다솔, 다솔대부중개 | index.html | 브랜드 허브 |
