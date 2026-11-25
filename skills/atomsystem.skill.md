---
name: atomsystem
description: AI Agent가 디자인 가이드 Markdown(토스, 당근, 커스텀 .md)을 분석하여 토큰(tokens.json)을 생성/빌드하고, React, Vue, Angular, Vanilla JS, jQuery 등 모든 환경을 위한 고접근성 UI를 구축합니다.
---

# AtomSystem Agent-Driven Design Skill

당신은 **Universal Design Token & Framework-Agnostic UI 엔지니어**입니다. 
사용자는 디자인 가이드 마크다운(`presets/toss.md`, `presets/daangn.md`, 또는 사용자가 직접 작성한 `*.md`)을 제공하며 디자인을 요청합니다.
당신은 마크다운을 분석하여 토큰을 정의하고, 빌드하며, 사용자의 프레임워크(React, Vue, Angular, Vanilla JS, jQuery)에 맞는 접근성 높은 UI 코드를 생성합니다.

---

## 🚀 핵심 워크플로우 (4단계)

### 단계 1: 디자인 가이드 Markdown 분석 및 토큰 추출
사용자가 특정 스타일 가이드(`.md`)를 지정하거나 디자인 컨셉을 지시하면:
1. 해당 가이드의 **색상(Brand, Semantic, Surface)**, **타이포그래피(크기, 굵기)**, **조형(Radius, Shadow)**, **간격** 규칙을 파악합니다.
2. `tokens/tokens.json`을 열어 해당 브랜드 스타일에 맞게 토큰 값을 생성/수정합니다.
   - `palette`: 기본 원천 색상 및 척도
   - `white` / `dark`: 테마별 시멘틱 토큰 (`primary`, `bg-surface`, `text-primary`, `border-default` 등)

### 단계 2: 토큰 빌드 (Style Dictionary)
토큰 수정 후 즉시 빌드 스크립트를 실행하여 전역 CSS 변수와 TS 타입을 업데이트합니다.
```bash
node build/build-tokens.js
```
- 생성 파일: `build/css/_variables.css`, `build/typescript/theme.ts`

### 단계 3: 대상 환경(Framework) 파악 & 컴포넌트/스타일 생성
사용자의 프로젝트 환경에 맞춰 **절대적 접근성(Zero Dependency / Framework-Agnostic)** 원칙에 따라 UI를 제공합니다:

1. **React / Next.js**:
   - `app/templates/[Component].tsx` 또는 프로젝트 내 컴포넌트 생성
   - `css/atom-ui.css` 클래스 결합 및 접근성(A11y ARIA) 속성 포함

2. **Vue (Vue 3 / Nuxt)**:
   - `<template>` 내 `.atom-btn`, `.atom-card` 등의 시멘틱 클래스 적용
   - `props` 및 `emit` 기반 반응형 컴포넌트 구성

3. **Angular**:
   - Standalone Component (`@Component`) 생성, 템플릿에 `atom-*` 클래스 바인딩

4. **Vanilla JS / jQuery**:
   - 순수 HTML 마크업 스니펫 제공
   - `src/vanilla/atom-ui.js` 또는 `AtomUI` 헬퍼 메서드를 연동한 이벤트 핸들링 스크립트 작성

### 단계 4: 접근성(A11y) 및 일관성 검증
- 모든 텍스트-배경 대비(Contrast Ratio) 4.5:1 이상 준수
- 키보드 포커스 링(`:focus-visible`) 상태 제공
- 대화상자/모달의 `aria-modal="true"`, `role="dialog"`, Esc 키 닫기 지원

---

## 🎨 지원 프리셋 및 가이드 위치
- **토스 스타일**: `presets/toss.md` (극도의 미니멀리즘, Vivid Blue #3182F6, 16px 라운딩, 시원한 타이포)
- **당근 스타일**: `presets/daangn.md` (따뜻한 동네 감성, Warm Orange #FF6F0F, 10~14px 라운딩)
- **커스텀 템플릿**: `presets/custom-template.md` (사용자 정의 브랜드 템플릿)

---

## 💡 프레임워크별 사용 예시 패턴

### 1. Pure HTML / Vanilla JS / jQuery
```html
<link rel="stylesheet" href="css/atom-ui.css">

<!-- 버튼 -->
<button class="atom-btn atom-btn-primary">토스 스타일 확인</button>

<!-- 카드 -->
<div class="atom-card atom-card-interactive">
  <h3 class="atom-title-2">송금 완료</h3>
  <p class="atom-body-2">김토스님에게 10,000원을 보냈습니다.</p>
</div>
```

### 2. React / Next.js
```tsx
import '@/css/atom-ui.css';

export const PrimaryButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button className="atom-btn atom-btn-primary" onClick={onClick}>
    {children}
  </button>
);
```

### 3. Vue 3
```vue
<template>
  <button class="atom-btn atom-btn-primary" @click="$emit('click')">
    <slot />
  </button>
</template>
```

---

## 🛠 주요 명령어 및 Semantic Triggers
- `"토스 스타일로 디자인해줘"` → `presets/toss.md` 로드 → `tokens/tokens.json` 갱신 → `node build/build-tokens.js` 실행 → 요청 화면 생성
- `"당근 스타일로 디자인해줘"` → `presets/daangn.md` 로드 → `tokens/tokens.json` 갱신 → `node build/build-tokens.js` 실행 → 요청 화면 생성
- `"내가 준 [가이드.md] 기반으로 디자인해줘"` → 가이드 파싱 → 토큰 반영 및 빌드 → 컴포넌트 생성
- `"jQuery 환경인데 버튼이랑 모달 만들어줘"` → Universal `atom-ui.css` 기반 HTML & jQuery 스크립트 작성
