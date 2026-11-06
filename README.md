# AtomSystem (`atomsystem`)

> **Universal Design Token & Agent-Driven UI System**  
> React, Vue, Svelte, Pure HTML 어디서든 즉시 동작하는 W3C DTCG 호환 디자인 시스템

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

프로젝트 루트에서 `init` 명령을 실행하면 AI Agent 전용 스킬, 디자인 가이드, UX 패턴, 토큰 규격 파일이 한 번에 자동 세팅됩니다.

```bash
npx atomsystem init
```

생성되는 파일:
- `.agents/skills/atomsystem/SKILL.md`: AI Coding Agent(Antigravity, Cursor, Claude 등) 연동 스킬
- `atom.design.md`: 브랜드 및 타이포그래피, 컬러, 컴포넌트 디자인 가이드
- `atom.uxPattern.md`: 폼 검증, 모달 인터랙션, 로딩 상태 등 표준 UX 패턴 가이드
- `tokens/token.json`: W3C DTCG 표준 규격 디자인 토큰

---

## 🎨 사용 방법 (Usage)

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

### 2) UI 컴포넌트 & 시멘틱 클래스 사용

AtomSystem의 모든 컴포넌트는 프레임워크에 구애받지 않고 클래스명만으로 즉시 동작합니다.

#### 시멘틱 클래스 (HTML / JSX / Vue 공통)
```html
<!-- 버튼 -->
<button class="atom-btn atom-btn-primary">확인</button>
<button class="atom-btn atom-btn-outline">취소</button>

<!-- 카드 -->
<div class="atom-card atom-card-interactive">
  <h2 class="atom-title-2">계좌 송금</h2>
  <p class="atom-body-2">수수료 없는 간편 송금 서비스</p>
</div>

<!-- 인풋 -->
<div class="atom-input-group">
  <label class="atom-label">이메일</label>
  <input class="atom-input" type="email" placeholder="user@example.com" />
</div>
```

#### React 컴포넌트 직접 Import
```tsx
import { Button } from 'atomsystem/components/Button';
import { Card } from 'atomsystem/components/Card';
import { Badge } from 'atomsystem/components/Badge';

export function Example() {
  return (
    <Card variant="interactive">
      <Badge variant="primary">New</Badge>
      <h3>대시보드</h3>
      <Button variant="primary" size="md">시작하기</Button>
    </Card>
  );
}
```

---

### 3) 디자인 토큰 & 테마 엔진 활용 (JS / TS)

W3C DTCG 규격 JSON 및 토큰 메타데이터를 직접 import하여 사용할 수 있습니다.

```typescript
import { 
  BASE_COLOR_TOKENS, 
  TYPOGRAPHY_TOKENS, 
  RADIUS_TOKENS,
  generateCssVariables 
} from 'atomsystem';

// W3C 표준 JSON 직접 가져오기
import tokenJson from 'atomsystem/token.json';

// 동적 CSS Custom Properties 생성
const cssVars = generateCssVariables();
```

---

### 4) AI Agent 연동 (Agent-Driven UI)

`npx atomsystem init`으로 초기화된 프로젝트에서는 AI 코딩 어시스턴트(Antigravity, Cursor, GitHub Copilot 등)에게 마크다운 가이드 기반으로 작업 지시를 내릴 수 있습니다:

```text
"atom.design.md 가이드의 컬러와 atom.uxPattern.md의 모달 패턴을 준수해서 
회원가입 완료 모달 컴포넌트를 만들어줘."
```

AI Agent는 자동으로 디자인 토큰과 UX 표준을 적용하여 일관된 고품질 UI 코드를 생성합니다.

---

## 📦 패키지 Exports 요약

| 경로 | 설명 |
| :--- | :--- |
| `atomsystem` | 토큰 데이터 모델, 테마 엔진, 색상/타이포 유틸리티 |
| `atomsystem/css/atom-ui.css` | 전역 스타일 및 시멘틱 UI 클래스 (`.atom-btn`, `.atom-card` 등) |
| `atomsystem/components/*` | React UI 컴포넌트 (`Button`, `Card`, `Modal`, `Input`, `Badge`) |
| `atomsystem/token.json` | W3C DTCG 포맷 단일 진실 공급원 토큰 파일 |
| `atomsystem/design.md` | 마크다운 기반 디자인 시스템 가이드 규격 |
| `atomsystem/uxPattern.md` | 마크다운 기반 UX 인터랙션 패턴 가이드 |
| `atomsystem/skill` | AI Coding Agent 자동화 스킬 정의서 |

---

## 📄 라이선스

MIT License © 2026 [AtomGround](https://system.atomground.com)
