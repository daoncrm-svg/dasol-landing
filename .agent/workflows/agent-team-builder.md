---
description: 외부 스킬(Skills) 기반 다중 에이전트 팀 구성 및 병렬 작업화
---

이 워크플로우는 글로벌 지식 베이스에 저장된 외부 에이전트 스킬 카탈로그를 스캔하여, 사용자의 지시에 맞춰 드림팀(팀 조합)을 짜고 병렬 작업을 수행하는 패턴입니다.

## 1단계: 에이전트 스킬 카탈로그 스캔 (Skill Discovery) — 반드시 수행할 것!
> **필수 참조 파일:** `C:\Users\ksj86\.gemini\antigravity\knowledge\awesome-agent-skills\README.md`

이 단계를 절대 건너뛰지 마세요. 반드시 위 경로의 README.md 파일을 view_file 도구로 열어 읽고, 현재 미션에 가장 적합한 전문가 스킬(팀/카테고리)을 최소 2~3개 찾아서 사용자에게 보고해야 합니다.

수행 절차:
1. 위 README.md 파일을 view_file로 열어서 전체 카탈로그를 스캔합니다.
2. 사용자의 미션과 매칭되는 스킬 카테고리 및 구체적 스킬을 식별합니다.
3. 찾아낸 스킬의 이름, 출처(팀), 깃허브 링크를 사용자에게 팀 편성표로 보여줍니다.

추가로 워크스페이스 내의 `.agent/skills/` 디렉토리에 로컬 스킬이 있다면 함께 스캔합니다.

## 2단계: 팀 구성 계획 (Team Formation)
사용자의 지시(예: "데이터 스키마 통합해 줘")에 따라 1단계에서 색출한 스킬들 중 최적의 조합을 선별하여 `implementation_plan.md`에 파트 분배표를 작성합니다.
(예: Backend-DB-Skill, Frontend-Type-Skill, QA-Test-Skill)

## 3단계: 드림팀 병렬 작업 시작 (Parallel Multi-Skill Execution)
배정된 스킬 룰셋(Prompt)을 각 도구 호출(Tool Call)에 개별 적용하여 다음을 병렬로 수행합니다.
// parallel
3-1. [Backend-DB-Skill]: Pydantic 스키마 및 Alembic/SQLModel 마이그레이션 작성
// parallel
3-2. [Frontend-Type-Skill]: Next.js에서 사용할 TypeScript 인터페이스(Zod 등) 및 API Fetcher 동시 작성
// parallel
3-3. [QA-Test-Skill]: 통합 스키마에 대한 `pytest` 모의 데이터 및 테스트 유닛 동시 작성

## 4단계: 자동화 실행 및 통합 리뷰 (QA Review)
// turbo
테스트 스크립트를 자동 실행하고 그 결과값을 기반으로 발생한 타입/스키마 오류를 스킬 간 피드백 루프를 통해 자동 반영합니다. 완료 시 `walkthrough.md`에 리포트를 생성합니다.
