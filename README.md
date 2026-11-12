# AtomSystem (`atomsystem`)

> **Universal Design Token & Agent-Driven UI System**  
> React, Vue, Svelte, Pure HTML 어디서든 즉시 동작하는 W3C DTCG 호환 디자인 시스템 & 로컬 토큰 스튜디오

[![npm version](https://img.shields.io/npm/v/atomsystem.svg)](https://www.npmjs.com/package/atomsystem)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ⚡ 빠른 시작 (Quick Start)

### 1. 패키지 설치

```bash
npm install atomsystem
```

---

### 2. 프로젝트 초기화 (CLI)

프로젝트 루트에서 `init` 명령을 실행하면 AI Agent 전용 가이드라인, 4단계 레고 조립 규격, W3C DTCG 토큰 파일이 한 번에 자동 세팅됩니다.

```bash
npx atomsystem init
```

생성되는 파일:
- `AGENTS.md` / `CLAUDE.md` / `.cursorrules`: 범용 AI 어시스턴트(Antigravity, Cursor, Claude Code, Copilot 등) 공통 지침
- `.agents/skills/atomsystem/SKILL.md`: AI Agent 자동 분석 및 토큰 구축 스킬
- `atom.design.md` & `tokens/token.json`: 브랜드, 타이포그래피, 컬러, 여백, 곡률 W3C DTCG 표준 명세
- `atom.components.md`: 원자/분자 UI 컴포넌트 명세
- `atom.blocks.md`: 실시간 차트, AI 챗 등 완성형 블록 명세
- `atom.uxPattern.md`: 폼 검증, 결제 플로우, 로딩 상태 등 표준 UX 패턴 가이드
- `css/atom-ui.css`: 0KB 제로 런타임 시맨틱 순수 CSS

---

## 🎨 로컬 토큰 스튜디오 (Local Token Studio GUI)

설치 후 별도의 설정 없이 **로컬에서 직접 디자인 토큰을 변경하고 스타일을 실시간 재컴파일**할 수 있는 내장 웹 GUI 도구를 제공합니다.

```bash
# 로컬 토큰 스튜디오 GUI 실행 (기본 포트: 4000)
npx atomsystem studio

# 또는 다른 포트로 실행
npx atomsystem studio --port=5000
```

1. **브라우저 접속**: `http://localhost:4000`에 접속합니다.
2. **시각적 편집**: 컬러 피커 및 셀렉터를 통해 브랜드 색상, 서피스 배경, 모서리 곡률(Radius)을 직접 변경합니다.
3. **원클릭 저장 & 0ms 자동 컴파일**:
   - `tokens/token.json`에 최신 W3C 토큰이 저장됩니다.
   - 동시에 `css/atom-ui.css`가 제로 런타임 CSS 변수로 자동 재컴파일됩니다.

```bash
# 터미널에서 CLI로 직접 CSS 재컴파일 시
npx atomsystem build:tokens
```

---

## 📦 컴포넌트 & 블록 추가 (CLI Add)

원하는 컴포넌트나 블록을 프로젝트에 소스 코드로 직접 내려받아 커스텀할 수 있습니다 (Component-First 원칙 보장).

```bash
# 지원 항목 목록 확인
npx atomsystem list

# 개별 컴포넌트 추가
npx atomsystem add button
npx atomsystem add container
npx atomsystem add layout

# 완성형 디자인 블록 추가 (필요 컴포넌트 자동 의존성 복사)
npx atomsystem add realtime-chart
npx atomsystem add interactive-chat
npx atomsystem add pricing-table
```

---

## 💻 사용 방법 (Usage)

### 1) CSS 스타일 불러오기

앱의 최상단 진입점(예: Next.js `layout.tsx`, Vue `main.js`, 또는 `index.html`)에 AtomSystem의 범용 CSS를 추가합니다.

#### React / Next.js
```tsx
import 'atomsystem/css/atom-ui.css';
```

#### Pure HTML / Vanilla JS
```html
<link rel="stylesheet" href="node_modules/atomsystem/css/atom-ui.css">
```

---

### 2) UI 컴포넌트 & 레이아웃 사용

프레임워크에 구애받지 않고 클래스명만으로 즉시 동작하거나, React 컴포넌트를 import하여 사용할 수 있습니다.

#### React 컴포넌트 Import
```tsx
import { Button, Card, Badge, Container, Layout, Stack, Grid } from 'atomsystem';

export function Example() {
  return (
    <Container size="xl">
      <Card variant="interactive">
        <Badge variant="primary">New</Badge>
        <h3>대시보드</h3>
        <Button variant="primary" size="md">시작하기</Button>
      </Card>
    </Container>
  );
}
```

#### 순수 시맨틱 CSS 클래스 (HTML / Vue / Vanilla JS)
```html
<!-- 버튼 -->
<button class="atom-btn atom-btn-primary">확인</button>
<button class="atom-btn atom-btn-outline">취소</button>

<!-- 카드 -->
<div class="atom-card atom-card-interactive">
  <h2 class="atom-title-2">계좌 송금</h2>
  <p class="atom-body-2">수수료 없는 간편 송금 서비스</p>
</div>
```

---

### 3) 3,800+ 무료 오픈소스 아이콘 시스템 연동

Lucide 아이콘 풀세트(3,875개)를 지원하며, 시스템 및 테마 에디터와 완벽하게 연동됩니다.

```tsx
import { Sparkles, Heart, Search } from 'lucide-react';

export function IconWidget() {
  return (
    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-(--radius) bg-(--bg-secondary) text-(--text-primary)">
      <Sparkles className="w-4 h-4 text-(--accent-primary)" />
      <span>AI 추천</span>
    </button>
  );
}
```

---

### 4) 다국어(i18n) 지원

한국어(`ko`), 영어(`en`), 일본어(`ja`) 3개 국어를 기본 지원하며 헤더 스위처를 통해 즉시 전환할 수 있습니다.

---

### 5) AI Agent 연동 (Agent-Driven UI)

`npx atomsystem init`으로 초기화된 프로젝트에서는 AI 코딩 어시스턴트(Antigravity, Cursor, Claude Code 등)에게 말로만 작업 지시를 내릴 수 있습니다:

```text
"atom.design.md의 색상 토큰과 atom.blocks.md의 realtime-chart 구조를 참고해서 
주식 시세 대시보드 화면을 만들어줘."
```

AI Agent는 자동으로 디자인 토큰과 컴포넌트 우선(Component-First) 레고 조립 파이프라인을 준수하여 일관된 고품질 UI 코드를 생성합니다.

---

## 🛠️ CLI 명령어 요약

| 명령어 | 설명 |
| :--- | :--- |
| `npx atomsystem init` | AI 지침서, 4단계 규격서, W3C 토큰, CSS 초기화 |
| `npx atomsystem studio` | 로컬 웹 토큰 스튜디오(GUI) 실행 (`http://localhost:4000`) |
| `npx atomsystem build:tokens` | `tokens/token.json`을 `css/atom-ui.css`로 일괄 재컴파일 |
| `npx atomsystem add <name>` | 컴포넌트(`button`, `container`, `layout` 등) 또는 블록 다운로드 |
| `npx atomsystem list` | 추가 가능한 모든 컴포넌트 및 디자인 블록 목록 출력 |

---

## 📦 패키지 Exports 요약

| 경로 | 설명 |
| :--- | :--- |
| `atomsystem` | 토큰 데이터 모델, 컴포넌트 스펙, 테마 엔진 |
| `atomsystem/css/atom-ui.css` | 전역 스타일 및 제로 런타임 시맨틱 UI 클래스 |
| `atomsystem/components/*` | React UI 컴포넌트 (`Button`, `Card`, `Input`, `Container`, `Layout` 등) |
| `atomsystem/blocks/*` | 레고 조합 완성형 블록 (`RealtimeChart`, `InteractiveChat` 등) |
| `atomsystem/token.json` | W3C DTCG 포맷 단일 진실 공급원(SSOT) 토큰 파일 |
| `atomsystem/design.md` | 마크다운 기반 디자인 시스템 가이드 규격 |
| `atomsystem/uxPattern.md` | 마크다운 기반 UX 인터랙션 패턴 가이드 |
| `atomsystem/skill` | AI Coding Agent 자동화 스킬 정의서 |

---

## 📄 라이선스

MIT License © 2026 [AtomGround](https://system.atomground.com)
