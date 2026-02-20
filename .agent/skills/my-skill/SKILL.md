---
name: atomsystem
description: Style Dictionary를 사용하여 tokens.json으로부터 디자인 시스템(CSS, TS)을 빌드하고, 이를 적용한 React 컴포넌트와 MDX 문서를 생성합니다.
---

# Atom System Design System Skill

당신은 디자인 시스템 엔지니어로서 디자인 토큰 기반의 UI 라이브러리를 구축하고 관리합니다. 사용자의 요청에 따라 다음 프로세스를 엄격히 준수하십시오.

### 1. 토큰 빌드 및 동기화 (Style Dictionary)
- `tokens/tokens.json`의 변경사항이 감지되거나 새로운 토큰이 정의되면, `node build/build-tokens.js`를 실행하여 다음 파일을 업데이트합니다.
  - `build/css/_variables.css`: CSS Custom Properties 생성
  - `build/typescript/theme.ts`: TypeScript 환경을 위한 디자인 토큰 객체 및 타입 생성

### 2. 컴포넌트 생성 및 참조 규칙
새로운 UI 요소(Atom) 생성 요청 시 다음 4가지 작업을 동시에 수행합니다:

1. **Component**: `app/templates/[ComponentName].tsx` 생성
   - `build/typescript/theme.ts`의 타입을 참조하여 Props를 구성합니다.
   - 접근성(A11y)과 재사용성을 고려한 React 컴포넌트로 작성합니다.

2. **Styling**: `css/[ComponentName].css` 생성
   - `build/css/_variables.css`에 정의된 CSS 변수만을 사용하여 스타일을 입힙니다.
   - 직접적인 하드코딩 값(Hex, Px 등) 사용을 지양합니다.

3. **Global Import**: `app/globals.css` 업데이트
   - 새로 생성된 `css/[ComponentName].css` 파일을 `@import` 구문을 사용하여 리스트 하단에 추가합니다.

4. **Documentation**: `markdown/[ComponentName].mdx` 생성
   - 컴포넌트의 사용 예시, Props 명세, 적용된 디자인 토큰 정보를 포함합니다.

### 3. 지식 기반 및 제약 사항
- **이미 존재하는 토큰**: 새로운 스타일 정의 전, 항상 `tokens/tokens.json`을 먼저 조회하여 재사용 가능한 토큰이 있는지 확인합니다.
- **컴포넌트 토큰 계층 구조 (Component Tokens)**: 컴포넌트의 각 요소(bg, text, border)와 상태(default, hover, disabled 등)는 테마(`white`, `dark`) 내부에서 컴포넌트 이름(예: `button`)으로 완전히 분리하여 관리합니다. 글로벌 토큰(`input`, `wrapper` 등)을 여러 컴포넌트에 억지로 섞어 쓰지 마십시오.
  - 계층 모범 사례: `[Theme] -> [Component] -> [Variant/Type] -> [Element] -> [State]` 
  - 예시: `"white": { "button": { "primary": { "bg": { "disabled": "{palette.color.blue.200}" } } } }`
- **일관성 유지**: 모든 색상, 간격, 타이포그래피는 반드시 빌드된 디자인 토큰 변수를 통해서만 적용되어야 합니다.
- **Next.js 최적화**: `app/` 디렉토리 구조를 따르므로, 클라이언트 컴포넌트가 필요한 경우 `'use client'` 지시어를 적절히 사용합니다.

### 4. 실행 가이드 (Semantic Trigger)
- "디자인 토큰 업데이트해줘" → Style Dictionary 빌드 스크립트 실행 제안.
- "[Name] 컴포넌트 만들어줘" → 위 4단계 프로세스 자동 실행.
- "[Name] 컴포넌트 스타일을 최적화 해줘" → 토큰 파일 점검 후 없으면 토큰 생성, 있으면 토큰 적용 후 스타일 최적화.
- "[Name] 과 관련된 mdx파일을 수정해줘" → 각 컴포넌트 상태별로 스타일 볼 수 있도록 작성 및 기존의 mdx 문서 참고하여 수정

- "기존 토큰 중에 [Color]와 비슷한 게 있어?" → JSON 파일을 검색하여 유사 토큰 추천 후 스타일 적용.
