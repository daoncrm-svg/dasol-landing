# Antigravity Agent Rules

 이 문서는 Antigravity IDE 환경 내에서 에이전트가 코딩을 수행할 때 반드시 준수해야 하는 행동 규칙(Rules)입니다.

## 1. 계획 우선 (Planning First)
- 새로운 작업(미션)이 주어지면 코드부터 작성하지 않습니다.
- 항상 `implementation_plan.md` 파일을 먼저 생성하거나 업데이트하여 세부 단계, 추정 소요 시간, 고려할 리스크 및 아키텍처 설계를 문서화합니다.
- 계획이 완료되고 (사용자 확인을 거친 후) 실행 모드로 전환합니다.

## 2. Vibe Coding 원칙
- 라인 단위의 수동 코딩을 지양하고, 미션 단위로 목표를 설정해 에이전트가 파일 시스템, 터미널, 브라우저를 오가며 작업을 수행하도록 합니다.
- 백엔드와 프론트엔드 작업이 독립적일 경우, 가능한 병렬(`// parallel`)로 실행합니다.

## 3. 테스트 및 검증 강제
- 코드를 작성한 후에는 반드시 테스트를 돌리며(`// turbo` 활용), 테스트가 통과될 때까지 코드를 수정하는 '자동 테스트 루프'를 작동시킵니다.
- 프론트엔드 변경 사항이 있을 경우, chrome-devtools MCP 또는 브라우저 캡처/녹화를 통해 UI와 성능을 시각적으로 검증하고 그 결과를 `walkthrough.md`에 남깁니다.

## 4. 기술 스택 일관성 (System Rules 준수)
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, MUI v5
- **Backend**: Python 3.12, FastAPI, Pydantic, SQLModel 또는 SQLAlchemy, PostgreSQL, asyncpg
- 백엔드는 DDD 및 레이어드 아키텍처, 프론트엔드는 서버/클라이언트 컴포넌트 분리 원칙을 준수합니다.
