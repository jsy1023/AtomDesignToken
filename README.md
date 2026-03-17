# AtomSystem Design Token

AtomSystem은 **디자인 토큰(Design Tokens)**을 중심으로 UI 컴포넌트와 문서를 관리하는 현대적인 디자인 시스템 프레임워크입니다. `tokens.json`을 단일 진실 공급원(Single Source of Truth)으로 하여 CSS 변수와 TypeScript 타입을 자동으로 생성하고, 이를 기반으로 React 컴포넌트와 MDX 가이드를 구축합니다.

## ✨ 핵심 가치

- **Token-Driven Design**: 모든 스타일 값(색상, 간격, 타이포그래피 등)은 토큰으로 관리되어 디자인과 코드 간의 일관성을 유지합니다.
- **Automated Workflow**: Style Dictionary를 통해 토큰 변경 시 즉시 CSS 및 TS 파일이 업데이트됩니다.
- **Component-First Documentation**: 컴포넌트 생성과 동시에 MDX 문서가 연동되어 실시간 라이브러리 가이드를 제공합니다.
- **Multi-Theme Support**: 테마별 토큰 분리 관리를 통해 화이트/다크 모드 및 커스텀 테마를 손쉽게 지원합니다.

## 🛠 기술 스택

- **Core**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS 4, CSS Modules
- **Design Token**: Style Dictionary 4, Tokens Studio
- **Animation**: GSAP, @gsap/react
- **Documentation**: MDX

## 📂 프로젝트 구조

- `/tokens`: 디자인 토큰의 원천 데이터 (`tokens.json`)
- `/build`: 빌드된 토큰 결과물 (CSS Variables, TS Objects)
- `/app/templates`: 디자인 시스템의 핵심 React 컴포넌트
- `/css`: 각 컴포넌트의 스타일 시트
- `/markdown`: 컴포넌트 가이드 및 예시를 담은 MDX 파일
- `/cli`: 디자인 시스템 관리를 위한 CLI 도구

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 토큰 빌드 및 개발 서버 실행
`npm run dev`는 토큰을 먼저 빌드한 후 Next.js 개발 서버를 실행합니다.
```bash
npm run dev
```

### 3. 토큰만 빌드하기
```bash
npm run token-build
```

## 🔄 워크플로우

1.  **토큰 정의**: `tokens/tokens.json`에서 새로운 스타일 값이나 컴포넌트 토큰을 정의합니다.
2.  **토큰 빌드**: `npm run token-build`를 통해 `build/` 경로의 자산들을 업데이트합니다.
3.  **컴포넌트 구현**: `app/templates/`에서 빌드된 TS 타입을 참조하여 컴포넌트를 작성합니다.
4.  **문서화**: `markdown/`에서 MDX를 작성하여 컴포넌트 사용법을 기록합니다.

---
© 2026 [AtomGround](https://system.atomground.com). All rights reserved.
