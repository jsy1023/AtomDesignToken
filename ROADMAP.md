# 🗺️ AtomSystem 2.0 마스터 로드맵 (ROADMAP.md)

> **"하드코딩 없는 순수 토큰 생태계: 사람이든 AI든 레고처럼 조립하고, 말로 완성하는 프론트엔드 표준"**

---

## 🎯 1. 제품 비전 & 핵심 철학

AtomSystem은 단순한 UI 컴포넌트 라이브러리가 아닙니다.  
**디자인 토큰(Design Tokens)을 단일 진실 공급원(SSOT)으로 삼아, 개발자와 AI Agent 모두가 하드코딩 없이 완벽한 일관성의 UI/UX 솔루션을 제작할 수 있도록 지원하는 인프라 시스템**입니다.

### 3대 핵심 원칙 (Core Tenets)
1. **Zero-Hardcoding (하드코딩 원천 배제)**:
   - 임의의 HEX 컬러(`#3182f6`), 임의의 픽셀(`p-[13px]`), 비표준 보더 사용 금지.
   - 모든 스타일은 W3C DTCG 표준 토큰 및 시맨틱 CSS 변수(`var(--accent-primary)`, `var(--bg-primary)`)로 관리.
2. **Refactor-First (자가 치환 체계)**:
   - 사용자가 `"refactor"` 명령을 내리거나 CLI(`npx atomsystem refactor`)를 실행하면 프로젝트 내 모든 하드코딩 안티패턴을 탐색하여 표준 토큰으로 자동 치환.
3. **Agent-Native & Universal Ecosystem (어디서나 원클릭)**:
   - Cursor, Claude Code, Antigravity, Windsurf 등 모든 AI 코딩 에이전트 환경에서 Skill과 지침을 원클릭으로 설치 및 동기화.

---

## 🏛️ 2. 4단계 레고 조립 아키텍처

```
[1. W3C DTCG Tokens] ──> [2. UI Components] ──> [3. Content Blocks] ──> [4. Real-world UseCases]
 (CSS 변수: 색상/간격)     (Button, Card, Badge)   (RealtimeChart, Chat)     (Dashboard, SaaS Checkout)
```

1. **Tokens**: W3C DTCG 표준 규격(`tokens/tokens.json`, `css/atom-ui.css`).
2. **Components**: 고접근성 순수 원자/분자 컴포넌트 (`components/ui/`).
3. **Blocks**: 검증된 기능형 독립 블록 (`components/blocks/`).
4. **UseCases**: 실무 비즈니스 현장에 즉시 투입 가능한 완성형 경험 (`atom.uxPattern.md`).

---

## 🚀 3. 단계별 추진 마일스톤 (Milestones)

### Phase 1: Zero-Hardcoding & Refactor 엔진 (완료)
- [x] W3C DTCG 토큰 체계 및 시맨틱 CSS 변수 규격 수립
- [x] 로컬 스튜디오 GUI (`npx atomsystem studio`, 토큰-팔레트 바인딩, 컴포넌트 Variable 에디터)
- [x] **AI `refactor` 프로토콜 공식 명문화 (`GEMINI.md`, `AGENTS.md`)**
  - 인라인 스타일, 임의 HEX, Tailwind 인라인 클래스 자동 스캔 및 토큰 치환 규칙 탑재
- [x] **CLI 리팩토링 커맨드 (`npx atomsystem refactor`, `npx atomsystem analyze`) 개발**
  - 소스코드 내 하드코딩 탐지 리포트 및 자동 치환(`--fix`) 옵션, 기존 프로젝트 분석/임포트 제공

### Phase 2: 실전 비즈니스 UseCase 블록 확장
- [ ] **엔터프라이즈 SaaS 대시보드 UseCase** (KPI 지표, 반응형 데이터 그리드)
- [ ] **고접근성 복합 폼 & 필터링 UseCase** (멀티스텝 마법사, 유효성 검사)
- [ ] **실시간 모니터링 & 위젯 UseCase** (차트, 상태 인디케이터, 알림 피드)
- [ ] **AI 대화형 인터랙션 UseCase** (스트리밍 챗봇, 프롬프트 튜닝 패널)
- *모든 UseCase는 토큰 테마 변경 시 100% 실시간 반응 보장*

### Phase 3: AI Agent Skill 배포 및 원클릭 설치 생태계
- [ ] **Skill 패키징 고도화 (`skills/atomsystem.skill.md`)**
  - 디자이너 가이드 및 프론트엔드 코딩 규칙 통합
- [ ] **원클릭 설치 CLI 지원**
  - `npx atomsystem skill install` (Cursor `.cursorrules`, Claude `CLAUDE.md`, Antigravity `.agents/skills` 자동 주입)
- [ ] **Agent Marketplace 및 오픈소스 카탈로그 등록**

### Phase 4: 개발자 온보딩 및 오픈소스 공식 쇼케이스
- [ ] **공식 `README.md` 전면 개편**
  - 비전 소개, 30초 빠른 시작, 인터랙티브 데모 및 토큰 철학 안내
- [ ] **웹사이트 내 Library 카탈로그 강화**
  - 각 컴포넌트/UseCase별 실시간 토큰 바인딩 상태 확인 및 원클릭 복사
- [ ] **글로벌 다국어 지원 (KO / EN / JA) 완비**

### Phase 5: Figma ↔ Token 양방향 연동 플러그인 (Design & Code Bi-directional Sync)
- [x] **스튜디오 `tokens/tokens.json` ➔ Figma Variables 자동 로더 플러그인 개발**
  - 스튜디오에서 정의/조정한 50~900 색상 스케일, 사이즈, 모서리 곡률, 타이포그래피 토큰을 Figma Variables Collection으로 원클릭 동기화
- [ ] **Figma Variables ➔ `tokens/tokens.json` 내보내기 및 실시간 감시**
  - 디자이너가 피그마에서 작업한 토큰 변경사항을 W3C DTCG 표준 JSON 및 `atom-ui.css`로 자동 변환하여 개발 환경에 반영
- [ ] **디자인 <-> 개발 간 하드코딩 0% 무결성 검증 파이프라인 완성**

---

## 📈 4. 성공 지표 (Definition of Done)
1. **0% Hardcoding**: 프로젝트 및 생성 코드에서 임의의 HEX/인라인 픽셀 비율 0%.
2. **One-Command Setup**: `npx atomsystem init` 및 `npx atomsystem skill install`로 1분 내 환경 구축.
3. **One-Command Refactor**: `refactor` 명령 한 번으로 레거시 하드코딩 코드가 표준 토큰 기반 코드로 정밀 전환.
