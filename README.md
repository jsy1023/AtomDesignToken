# 🏛️ AtomSystem (`atomsystem`)

> **"하드코딩 없는 순수 토큰 생태계: 사람이든 AI든 레고처럼 조립하고, 말로 완성하는 프론트엔드 표준"**  
> **Universal Design Token & Agent-Driven UI System (Zero-Hardcoding Guarantee)**

[![npm version](https://img.shields.io/npm/v/atomsystem.svg)](https://www.npmjs.com/package/atomsystem)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Zero Hardcoding](https://img.shields.io/badge/Hardcoding-0%25-emerald.svg)](#-zero-hardcoding-refactor-엔진)
[![W3C DTCG](https://img.shields.io/badge/W3C_DTCG-Compliant-blue.svg)](https://design-tokens.github.io/community-group/format/)

---

## 💡 왜 AtomSystem인가? (Why AtomSystem?)

기존의 UI 개발과 AI 코딩 어시스턴트는 종종 **제각각의 임의 색상(`#3182f6`)과 불규칙한 인라인 여백(`p-[13px]`)**을 양산하여 디자인 시스템을 파편화시킵니다.

**AtomSystem은 이 문제를 원천적으로 해결합니다:**
1. **단일 진실 공급원(SSOT)**: 모든 스타일은 W3C DTCG 표준 토큰과 시맨틱 CSS 변수로 관리됩니다.
2. **Zero-Hardcoding Guarantee**: 프로젝트 내 임의의 HEX/px 하드코딩을 원천 금지하며, `refactor` 명령 한 번으로 100% 토큰 변환을 수행합니다.
3. **AI Agent 원클릭 동기화**: Cursor, Claude Code, Antigravity, Windsurf 어디서든 명령어 하나로 완벽한 토큰 규칙이 장착됩니다.

---

## 🏛️ 4단계 레고 조립 파이프라인

```
[1. W3C DTCG Tokens] ──> [2. UI Components] ──> [3. Content Blocks] ──> [4. Real-world UseCases]
 (CSS 변수: 색상/간격)     (Button, Card, Badge)   (RealtimeChart, Chat)     (Dashboard, SaaS Checkout)
```

1. **Tokens (`atom.design.md`, `tokens/tokens.json`)**:
   - 색상, 타이포그래피, 간격, 곡률을 시맨틱 CSS 변수(`var(--text-primary)`, `var(--bg-primary)`)로 정의.
2. **Components (`atom.components.md`, `components/ui/`)**:
   - 접근성(A11y)과 키보드 내비게이션이 완비된 고순도 원자 컴포넌트 (`Button`, `Card`, `Badge`, `Input`, `Tabs` 등).
3. **Blocks (`atom.blocks.md`, `components/blocks/`)**:
   - 컴포넌트들을 조립하여 완성한 독립 기능형 블록 (`realtime-chart`, `interactive-chat`, `pricing-table` 등).
4. **UseCases (`atom.uxPattern.md`)**:
   - 비즈니스 현장에 즉시 투입 가능한 완성형 경험 (엔터프라이즈 대시보드, 폼 유효성 마법사, 실시간 모니터링 등).

---

## ⚡ 빠른 시작 (Quick Start)

### 1. 프로젝트 초기화 (AI 지침 + 토큰 + 규격 일괄 세팅)
프로젝트 루트에서 `init`을 실행하면 디자인 토큰과 AI 지침이 한 번에 자동 구성됩니다.

```bash
npx atomsystem init
```

생성되는 자산:
- `AGENTS.md` / `CLAUDE.md` / `.cursorrules`: 모든 AI 어시스턴트가 준수하는 공통 토큰 조립 지침
- `.agents/skills/atomsystem/SKILL.md`: AI Agent 자동 분석 및 토큰 구축 스킬
- `tokens/tokens.json` & `atom.design.md`: W3C DTCG 규격 디자인 토큰
- `css/atom-ui.css`: 0KB 제로 런타임 시맨틱 순수 CSS

---

### 2. 하드코딩 자동 탐지 및 치환 (`refactor` 엔진)
기존 프로젝트에 남아있는 임의의 `#HEX` 컬러, `text-blue-500`, `p-[13px]` 등 모든 하드코딩 안티패턴을 탐색하여 시맨틱 토큰 변수로 100% 자동 치환합니다.

```bash
# 1) 하드코딩 패턴 스캔 및 리포트 (Dry Run)
npx atomsystem refactor

# 2) 표준 토큰으로 일괄 자동 치환 (Fix)
npx atomsystem refactor --fix
```

> **AI에게 직접 말로 지시할 수도 있습니다:**  
> *"refactor"* 또는 *"하드코딩 정리해줘"*라고 말하면, AI가 자동으로 `AGENTS.md`의 프로토콜에 따라 코드를 리팩토링합니다.

---

### 3. AI Agent Skill 원클릭 장착
Cursor, Claude Code, Antigravity 환경에 AtomSystem의 지침과 스킬을 언제든지 즉시 주입할 수 있습니다.

```bash
npx atomsystem skill install
```

---

### 4. 로컬 토큰 스튜디오 GUI (Local Studio)
별도의 복잡한 세팅 없이, 브라우저 GUI에서 직관적으로 토큰을 변경하고 프로젝트에 즉시 저장합니다.

```bash
npx atomsystem studio
```
- **접속**: `http://localhost:4000`
- **시각적 편집**: 브랜드 컬러, 서피스 배경, 모서리 곡률(Radius) 변경
- **컴포넌트 Variable 지원**: 하나의 컴포넌트(Button 등)에 대해 여러 가지 변형(Primary, Destructive, Pill)을 생성 및 이름 지정
- **원클릭 반영**: `tokens/tokens.json`과 `css/atom-ui.css`에 즉시 영구 반영

---

### 5. 컴포넌트 & 블록 소스 코드 추가 (CLI Add)
검증된 원자 컴포넌트와 완성형 블록을 내 프로젝트로 내려받습니다.

```bash
# 추가 가능한 항목 목록 확인
npx atomsystem list

# 원자 컴포넌트 추가
npx atomsystem add button
npx atomsystem add modal

# 완성형 블록 추가 (필요한 의존성 컴포넌트 자동 복사)
npx atomsystem add realtime-chart
npx atomsystem add interactive-chat
```

---

## 💻 코드 사용 예시

### 1) CSS 스타일 불러오기
```tsx
// Next.js layout.tsx, Vue main.js, 또는 index.html
import 'atomsystem/css/atom-ui.css';
```

### 2) React 컴포넌트
```tsx
import { Button, Card, Badge } from 'atomsystem';

export function DashboardWidget() {
  return (
    <Card className="p-(--space-4) bg-(--bg-primary) border border-(--border-subtle)">
      <Badge variant="primary">LIVE</Badge>
      <h3 className="text-(--text-primary) text-lg font-bold mt-2">매출 현황</h3>
      <p className="text-(--text-secondary) text-sm">실시간 데이터 스트리밍</p>
      <Button variant="primary" className="mt-4">
        자세히 보기
      </Button>
    </Card>
  );
}
```

### 3) 순수 HTML / Vanilla JS
```html
<div class="atom-card atom-card-interactive">
  <button class="atom-btn atom-btn-primary">확인</button>
  <button class="atom-btn atom-btn-outline">취소</button>
</div>
```

---

## 🛠️ CLI 명령어 요약

| 명령어 | 설명 |
| :--- | :--- |
| `npx atomsystem init` | AI 지침서, 4단계 규격서, W3C 토큰, CSS 초기 세팅 |
| `npx atomsystem refactor` | 소스코드 내 하드코딩 탐색 및 리포트 (`--fix`로 자동 치환) |
| `npx atomsystem skill install` | Cursor, Claude Code, Antigravity용 Agent Skill 설치 |
| `npx atomsystem studio` | 로컬 웹 토큰 스튜디오(GUI) 실행 (`http://localhost:4000`) |
| `npx atomsystem build:tokens` | `tokens/tokens.json`을 `css/atom-ui.css`로 컴파일 |
| `npx atomsystem add <name>` | 검증된 컴포넌트 또는 기능형 블록 소스 추가 |
| `npx atomsystem list` | 사용 가능한 컴포넌트 및 블록 전체 목록 출력 |

---

## 📄 라이선스
MIT License © 2026 [AtomGround](https://system.atomground.com)
