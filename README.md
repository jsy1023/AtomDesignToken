# AtomSystem: Agent-Driven Universal Design System

> **"사용자는 마크다운(.md)으로 스타일을 제시하고, Agent가 토큰과 UI를 완성합니다."**  
> React, Vue, Angular, Vanilla JS, jQuery 등 **모든 환경에서 즉시 동작하는 절대적 접근성의 디자인 시스템**

---

## 🌟 핵심 피보팅 비전 (Core Values)

1. **AI Agent-Driven Architecture**:
   - 사용자가 직접 수천 줄의 디자인 토큰 JSON을 손으로 작성하지 않습니다.
   - `presets/toss.md`, `presets/daangn.md` 또는 사용자의 커스텀 `.md` 가이드만 있으면 Agent가 토큰 정의부터 화면 개발까지 완벽히 수행합니다.
2. **Universal Accessibility (Framework-Agnostic)**:
   - React, Vue, Angular, Svelte, jQuery, 순수 Vanilla JS/HTML 어디서나 CSS 한 줄로 100% 호환됩니다.
3. **Single Source of Truth (Design Tokens)**:
   - W3C DTCG 호환 `tokens.json`을 Style Dictionary로 컴파일하여 CSS Custom Properties(`var(--atom-...)`) 및 TypeScript 타입으로 변환합니다.
4. **Zero Setup Friction**:
   - 다운로드 후 Agent에게 말만 걸면 디자인 시스템이 프로젝트에 맞춤 세팅됩니다.

---

## 📦 프리셋 (Design Presets)

프로젝트에 내장된 대표 디자인 가이드:
- 🔵 **Toss Style** (`presets/toss.md`): 미니멀리즘, Vivid Blue, 16px 볼드 라운딩, 시원한 여백
- 🟠 **Daangn Style** (`presets/daangn.md`): 따뜻하고 친근한 Warm Orange, 10~14px 소프트 라운딩
- 📝 **Custom Guide Template** (`presets/custom-template.md`): 나만의 브랜드 디자인 가이드 템플릿

---

## ⚡ 프레임워크 무관 빠른 시작 (Quick Start)

### 1. Pure HTML / Vanilla JS / jQuery
```html
<!-- 1. CSS 로드 -->
<link rel="stylesheet" href="node_modules/atomsystem/css/atom-ui.css">

<!-- 2. 시멘틱 클래스 즉시 사용 -->
<button class="atom-btn atom-btn-primary">확인</button>

<div class="atom-card atom-card-interactive">
  <h2 class="atom-title-2">환영합니다</h2>
  <p class="atom-body-2">어떤 프레임워크든 그대로 작동합니다.</p>
</div>
```

### 2. React / Next.js
```tsx
import 'atomsystem/css/atom-ui.css';

export function ActionCard() {
  return (
    <div className="atom-card">
      <h3 className="atom-title-2">계좌 송금</h3>
      <button className="atom-btn atom-btn-primary">보내기</button>
    </div>
  );
}
```

### 3. Vue 3
```vue
<template>
  <div class="atom-card">
    <button class="atom-btn atom-btn-primary" @click="handleClick">확인</button>
  </div>
</template>
```

### 4. Angular
```html
<button class="atom-btn atom-btn-primary" (click)="onConfirm()">확인</button>
```

---

## 🤖 Agent에게 작업 지시하기 (How to Prompt)

프로젝트 다운로드 후 AI Agent(Antigravity, Cursor, Claude 등)에게 아래와 같이 요청하세요:

```markdown
"presets/toss.md 가이드를 보고 디자인 토큰을 생성한 뒤,
송금 완료 대시보드 화면을 React(또는 Vue/jQuery/Vanilla)로 만들어줘."
```

```markdown
"my-brand.md 파일을 전달할게. 이 가이드에 맞춰 토큰을 빌드하고
로그인 폼 컴포넌트를 만들어줘."
```

Agent는 즉시:
1. 마크다운 가이드를 파싱하여 `tokens/tokens.json`을 갱신
2. `node build/build-tokens.js`로 CSS 변수 및 타입 컴파일
3. 해당 스타일에 완벽히 들어맞는 UI 코드를 즉시 작성합니다.

---

## 🛠 토큰 빌드 수동 실행

```bash
# 토큰 빌드 (CSS Custom Properties & TS Types 생성)
npm run token-build
```

---

## 📦 라이브러리 빌드 & NPM 패키징 (NPM Package Workflow)

AtomSystem은 NPM 배포 라이브러리입니다. 아래 명령어로 라이브러리를 빌드하거나 배포용 패키지를 검증할 수 있습니다:

```bash
# 1. 라이브러리 CJS, ESM, DTS 타입 빌드 (tsup)
npm run build:lib

# 2. 배포용 tarball 패키징 검증
npm run pack:lib
```

---

## 🚀 독립 실행형 예제 프로젝트 (Consumer Examples)

디자인 토큰 라이브러리를 외부 프로젝트에서 실제로 NPM 패키지로 설치하여 사용할 때의 동작을 검증하기 위한 독립 실행 예제들입니다:

### 1. SNMP MIB Browser (`examples/mib-browser`)
라이브러리(`atomsystem`)의 CSS 및 토큰 규격을 소비하여 개발된 독립 실행형 SNMP MIB 파서 & OID 계층 트리 검색엔진입니다.

```bash
# 독립 MIB 브라우저 실행 (포트 3001)
npm run example:mib

# 독립 MIB 브라우저 빌드
npm run example:mib:build

# 독립 MIB 브라우저 Playwright E2E 테스트
npm run example:mib:test
```

---

## 📂 디렉토리 구조

- `/src`: NPM 배포용 라이브러리 공용 API 진입점 (`index.ts`)
- `/dist`: 컴파일된 배포 번들 (CJS, ESM, DTS)
- `/css`: 프레임워크 독립적 범용 스타일시트 (`atom-ui.css`)
- `/presets`: 디자인 가이드 마크다운 (`toss.md`, `daangn.md`, `custom-template.md`)
- `/tokens`: 디자인 토큰 단일 진실 공급원 (`tokens.json`)
- `/examples`: 라이브러리를 외부 패키지로 참조하는 독립 실행형 예제 애플리케이션
  - `/examples/mib-browser`: SNMP MIB 파서 & OID 탐색기 독립 앱
- `/.agents/skills/tokens-skills`: Agent 전용 디자인 시스템 자동화 스킬

---
© 2026 [AtomGround](https://system.atomground.com). All rights reserved.
