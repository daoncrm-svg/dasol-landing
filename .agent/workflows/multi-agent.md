---
description: 클로드 코드의 /agents 스타일 - 다중 역할(Role) 배정 및 병렬 작업 수행
---

이 워크플로우는 사용자의 지시를 분석하여 팀(Backend, Frontend, QA 등)을 구성하고, 각각의 역할을 맡아 독립적인 작업을 동시에(병렬로) 수행하는 멀티 에이전트 시뮬레이션입니다.

1. 미션 해체 및 에이전트 팀 구성 (Task Breakdown & Team Assignment)
사용자의 목표를 분석하여 필요한 가상 에이전트 팀 역할을 정의합니다. (예: DB 전문가, 프론트 UI 개발자, 백엔드 API 개발자, QA 테스터)
`implementation_plan.md`를 열고 각 에이전트가 맡을 영역과 생성할 파일 목록을 작성합니다.

2. 팀별 병렬 작업 수행 (Parallel Execution)
다음의 작업들을 반드시 툴 호출 병렬화(Parallel Tool Calling)를 사용하여 동시에 실행합니다:
// parallel
2-1. [데이터베이스 에이전트]: Pydantic/SQLModel 데이터베이스 모델 및 스키마 파일 생성
// parallel
2-2. [백엔드 에이전트]: FastAPI 라우터 및 서비스 로직 구성
// parallel
2-3. [프론트엔드 에이전트]: React/Next.js UI 컴포넌트 및 클라이언트 API 연동 함수 작성

3. 병합 및 정합성 검토 (QA Agent)
모든 파일 생성이 완료되면 QA 에이전트 역할을 맡아 백엔드 스키마와 프론트엔드 타입이 일치하는지 점검합니다. 필요한 경우 터미널에서 타입 검사(`tsc`)나 테스트(`pytest`)를 자동 실행합니다.
// turbo
4. 테스트 자동 실행 및 리포팅
테스트 결과를 바탕으로 수정이 필요하면 즉시 코드를 보완하고, 문제가 없다면 `walkthrough.md`에 팀 작업 결과를 요약 보고합니다.
