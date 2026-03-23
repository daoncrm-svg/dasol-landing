# Google Ads API 연결 준비 메모

## 필요한 값
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_ADS_CLIENT_ID`
- `GOOGLE_ADS_CLIENT_SECRET`
- `GOOGLE_ADS_REFRESH_TOKEN`
- `GOOGLE_ADS_CUSTOMER_ID`
- `GOOGLE_ADS_LOGIN_CUSTOMER_ID` (MCC면 권장)

## 환경변수 예시
`.env.example`에 항목을 추가해두었음.

## 준비되면 바로 할 수 있는 것
1. 캠페인별 최근 7일 성과 조회
2. PMax / Search 분리 성과 조회
3. 전환 액션 점검
4. 검색어/자산/예산 진단용 쿼리 추가

## 임시 실행 스크립트
`tools/google-ads-report.js`

### 실행 예시
```powershell
$env:GOOGLE_ADS_DEVELOPER_TOKEN='...'
$env:GOOGLE_ADS_CLIENT_ID='...'
$env:GOOGLE_ADS_CLIENT_SECRET='...'
$env:GOOGLE_ADS_REFRESH_TOKEN='...'
$env:GOOGLE_ADS_CUSTOMER_ID='1234567890'
node tools/google-ads-report.js
```

## 주의
- 현재 스크립트는 읽기 전용 조회용
- 기본 API 버전은 `v18`
- MCC 하위 계정 조회면 `GOOGLE_ADS_LOGIN_CUSTOMER_ID`도 넣는 게 안전
