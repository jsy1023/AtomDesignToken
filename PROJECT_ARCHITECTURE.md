# 🏛️ AtomDesignToken (`atomsystem`) 프로젝트 전체 분석 및 아키텍처 가이드

> **이 문서는 `AtomDesignToken` 저장소의 전체 구조, 핵심 아키텍처, 주요 모듈, CLI/Studio 빌드 파이프라인 및 개발 원칙을 정리한 종합 개요서입니다.**

---

## 1. 프로젝트 개요

`AtomDesignToken`(npm 패키지명: `atomsystem`, 현재 버전 `0.15.0`)은 **W3C DTCG 표준 디자인 토큰**을 단일 진실 공급원(SSOT)으로 삼아, **AI 코딩 어시스턴트와 개발자가 하드코딩 없이(Zero-Hardcoding) 일관된 UI를 조립할 수 있도록 설계된 유니버설 디자인 시스템 및 CLI/GUI 툴킷**입니다.

이 저장소는 크게 **두 가지 역할**을 동시에 수행하는 하이브리드 구조로 되어 있습니다.
1. **웹 문서 및 인터랙티브 카탈로그 (`Next.js 15 App Router`)**: 토큰, 컴포넌트, 블록, UX 패턴, 스튜디오를 탐색하고 미리 볼 수 있는 다국어(`next-intl`) 웹 애플리케이션.
2. **npm 라이브러리 및 CLI 도구 (`tsup` + `esbuild` 번들)**: 외부 프로젝트에 `npx atomsystem init`, `studio`, `refactor`, `add`, `analyze` 등의 기능을 제공하는 패키지(`dist/`).

### 주요 기술 스택
- **프레임워크 / 런타임**: Next.js 15 (`^15.0.3`), React 19 (`^19.2.5`), TypeScript (`^5.9.3`)
- **스타일링**: Tailwind CSS v4 (`^4.2.2`, `@tailwindcss/postcss`), Zero-Runtime CSS 변수 (`css/atom-ui.css`)
- **토큰 / 스키마**: `style-dictionary` (`^4.2.0`), `sd-tailwindcss-transformer`, `@tokens-studio/sd-transforms`, `zod` (`^4.3.6`)
- **다국어(i18n)**: `next-intl` (`^4.15.0`)
- **빌드 / 번들링**: `tsup` (라이브러리 CJS/ESM + CLI), `esbuild` + `postcss` (독립 실행형 Local Studio SPA)
- **테스트 / 품질 검증**: Playwright (`@playwright/test`), Vitest (`vitest`), 커스텀 컴포넌트 린터 (`scripts/lint-components.cjs`)

---

## 2. 핵심 설계 철학 및 아키텍처

### 2-1. 4단계 레고 조립 파이프라인
모든 UI 자산은 아래 4계층의 단방향 의존성으로 구성됩니다.

```text
[1. W3C DTCG Tokens] ──> [2. UI Components] ──> [3. Content Blocks] ──> [4. UX Patterns / UseCases]
 (tokens/tokens.json)     (components/ui/)       (components/blocks/)     (components/patterns/, usecases/)
```

1. **Tokens (`tokens/tokens.json`, `atom.design.md`)**: 색상, 타이포그래피, 간격, 곡률 등을 CSS 시맨틱 변수(`var(--bg-primary)`, `var(--text-primary)`, `var(--accent-primary)` 등)로 정의합니다.
2. **Components (`components/ui/`, `atom.components.md`)**: `<button>`, `<input>`, `<table>` 등 원시 HTML 태그 직접 사용을 금지하고, `@/components/ui`의 표준 원자 컴포넌트(`Button`, `Input`, `Card`, `Modal`, `Table` 등)만 사용합니다.
3. **Blocks (`components/blocks/`, `atom.blocks.md`)**: 원자 컴포넌트를 조합한 독립 기능형 블록입니다 (`RealtimeChartBlock`, `InteractiveChatBlock`, `PricingPlanBlock`, `FileExplorerBlock` 등).
4. **UX Patterns & UseCases (`components/patterns/`, `components/usecases/`, `atom.uxPattern.md`)**: 실제 서비스 화면에 투입되는 완성형 레이아웃 및 사용자 흐름입니다 (`EnterpriseDashboardUseCase` 등).

### 2-2. 컴포넌트 3대 계층 모델 (`[Type · Variable · Status]`)
모든 UI 컴포넌트는 파편화를 막기 위해 다음 3단계 구조로 설계됩니다.
- **Type (외형/골격)**: `Solid`, `Outline`, `Ghost`, `Soft`, `Pill`, `Elevated` 등 디자인 양식
- **Variable (세부 옵션)**:
  - `system`: 시맨틱 테마 토큰 연동 (`primary`, `destructive`, `warning`, `success`, `info`, `neutral`)
  - `slots / layout`: 아이콘 슬롯(`icon-left`, `icon-right`, `icon-only`), 아바타 등
  - `size / metrics`: `sm`, `md`, `lg` 규격
- **Status (상호작용 상태)**: `default`, `hover`, `active`, `focus`, `disabled`, `loading`

---

## 3. 디렉터리 구조 및 모듈별 역할

```text
AtomDesignToken/
├── app/                     # Next.js 15 App Router (웹 문서 & 카탈로그 View 계층)
├── components/              # UI 컴포넌트, 블록, 패턴, 스튜디오 UI
├── lib/                     # SSOT 데이터, 도메인 서비스, 토큰 시스템 엔진
├── src/                     # npm 배포용 라이브러리 진입점, CLI, 로컬 스튜디오 서버/SPA
├── scripts/                 # 빌드, 배포 생성, 린트, E2E 검증 스크립트
├── tokens/                  # 통합 토큰 SSOT (tokens/tokens.json)
├── css/                     # 컴파일된 Zero-Runtime CSS (css/atom-ui.css)
├── presets/ & skills/       # AI 에이전트용 지침 및 스킬 템플릿
├── e2e/ & examples/         # Playwright E2E 테스트 및 예제 프로젝트
└── AGENTS.md, GEMINI.md ... # AI 코딩 어시스턴트 규칙 파일
```

### 3-1. `app/` — Next.js 웹 애플리케이션
- `app/[locale]/`: 다국어 라우팅 기반 페이지 (`tokens`, `components`, `components/[id]`, `blocks`, `blocks/[id]`, `patterns`, `studio`, `principles`, `icons`, `layout`, `motion`, `dependencies`, `guide`)
- `app/api/tokens/route.ts`: 토큰 조회/처리 API 라우트

### 3-2. `components/` — Presentation 계층
- `components/ui/`: 34개 원자 UI 모듈이 `components/ui/index.ts`를 통해 export됩니다 (`Button`, `Input`, `Card`, `Badge`, `Modal`, `Calendar`, `Select`, `Accordion`, `Tooltip`, `Pagination`, `Radio`, `Slider`, `Avatar`, `Progress`, `Skeleton`, `Breadcrumb`, `Separator`, `Textarea`, `Tree`, `Table`, `Tabs`, `Switch`, `Container`, `Layout`, `Navbar`, `Sidebar`, `Checkbox`, `Nav`, `SideMenu`, `Chart`, `Offcanvas`, `Toast`, `TokenSelect`, `Alert`).
- `components/blocks/`: `CardListBlock`, `FileExplorerBlock`, `InteractiveChatBlock`, `MetricStatsBlock`, `PricingPlanBlock`, `RealtimeChartBlock`, `SliderShowcaseBlock` 등 기능형 블록.
- `components/studio/`: 웹 및 Local Studio GUI 컴포넌트.
- `components/patterns/`, `components/usecases/`, `components/docs/`, `components/editor/`, `components/guide/`, `components/common/`: 패턴, 유즈케이스, 문서화 및 에디터 보조 컴포넌트.

### 3-3. `lib/` — 도메인 데이터 및 비즈니스 로직
- `lib/data/` **(SSOT Data Layer)**: 페이지에 데이터를 하드코딩하지 않고 중앙에서 관리합니다.
  - `tokens.ts`, `components.ts`, `componentTokens.ts`, `blocks.ts`, `patterns.ts`, `studioData.ts`, `awesomeThemes.ts`, `themeData.ts`, `themeEditorDefaults.ts`, `motion.ts`, `navigation.ts`, `principles.ts`, `dependencies.ts`, `icons.ts`, `libraryGuideData.ts`
- `lib/tokens/` **(토큰 도메인 모델)**:
  - `AtomTokenSystem.ts`, `PaletteTokens.ts`, `ThemeTokens.ts`, `ComponentTokens.ts`, `TokenReferenceResolver.ts`, `types.ts`
- `lib/services/` **(Domain Services)**:
  - `studioEngine.ts`, `studioRegistryServer.ts`, `studioStore.ts`: 스튜디오 레지스트리 로드/저장/동기화
  - `themeEngine.ts`, `paletteGenerator.ts`: 테마/팔레트 생성 및 변환
  - `componentScaffold.ts`: 컴포넌트 스펙 기반 코드 스캐폴딩
- `lib/hooks/`, `lib/i18n/`, `lib/utils/`: 커스텀 훅, 국제화 설정, 공용 유틸리티.

### 3-4. `src/` — npm 패키지, CLI 및 로컬 스튜디오 서버
- `src/index.ts`: `atomsystem` 패키지의 Public API 진입점 (`lib/data`, `lib/tokens`, `lib/services`, `refactorEngine`, `EnterpriseDashboardUseCase` 등 export).
- `src/cli.ts`: `npx atomsystem <command>` 실행기.
- `src/studioServer.ts`: `npx atomsystem studio` 실행 시 `localhost:4000`에서 동작하는 Node.js HTTP 서버. `/api/studio/registry` 등 API를 제공하고 `dist/studio/` 정적 SPA를 서빙합니다.
- `src/studioApp/main.tsx` + `src/studioApp/shims/`: Next.js 없이 브라우저에서 단독 실행되는 Local Studio SPA 엔트리와 심(`next-intl`, `next/navigation`, `@/i18n/routing`, `@/components/Header` 대체).
- `src/tokenCompiler.ts`: `tokens/tokens.json`을 `css/atom-ui.css`로 컴파일.
- `src/refactorEngine.ts`: 소스 코드 내 HEX 컬러, Tailwind 임의 색상(`text-blue-500` 등), 임의 px 간격 하드코딩을 탐지하고 CSS 변수로 치환.
- `src/projectAnalyzer.ts`: 기존 프로젝트를 스캔해 브랜드 색상과 컴포넌트 후보를 추출하고 Studio SSOT로 임포트.
- `src/cssLinker.ts`: 대상 프로젝트의 글로벌 CSS(`app/globals.css` 등)에 `css/atom-ui.css` 임포트를 자동 연결.

### 3-5. `scripts/` — 빌드 및 자동화 스크립트
- `scripts/build-studio-spa.mjs`: `esbuild` + `@tailwindcss/postcss`를 사용해 `src/studioApp/main.tsx`와 CSS를 `dist/studio/{index.html,studio.js,studio.css}`로 단독 번들링.
- `scripts/generate-package-distribution.ts`: 패키지 배포용 산출물 생성.
- `scripts/lint-components.cjs`: `app/`, `components/` 내 원시 HTML 태그(`<button>`, `<input>`, `<select>`, `<textarea>`, `<table>`) 직접 사용 여부 검사.
- `scripts/bump-version.ts`: 버전 일괄 업데이트.
- `scripts/test-*.mjs`: 테마 동기화, 폼, 패턴 UI 등 자동화 검증 스크립트.

---

## 4. CLI 명령어 요약 (`npx atomsystem`)

`src/cli.ts`에 정의된 주요 명령어는 다음과 같습니다.

| 명령어 | 설명 |
|---|---|
| `init` | `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.agents/skills/atomsystem/SKILL.md`, 4단계 스펙 문서(`atom.*.md`), `tokens/tokens.json`, `css/atom-ui.css`를 초기화하고 글로벌 CSS에 연결 |
| `studio` / `editor` | 로컬 웹 GUI(`http://localhost:4000`)를 실행해 토큰/컴포넌트를 시각적으로 편집하고 즉시 저장 |
| `refactor` / `refactor --fix` | 하드코딩된 색상/간격 안티패턴을 스캔하고 시맨틱 CSS 토큰으로 자동 치환 |
| `analyze` / `analyze --import` | 기존 코드베이스의 색상과 컴포넌트 패턴을 분석하여 Studio SSOT에 반영 |
| `submit` / `register` | 표준 `.atom.json` 컴포넌트 스펙을 제출해 컴포넌트 코드, 레지스트리, CSS를 자동 갱신 |
| `sync` | `components/ui/`를 스캔해 레지스트리 및 CSS 최신화 |
| `schema` | AI 컴포넌트 제출용 표준 JSON 스키마 출력 |
| `build:tokens` / `compile` | `tokens/tokens.json`을 `css/atom-ui.css`로 컴파일 |
| `add <name>` / `list` | 검증된 컴포넌트나 블록을 프로젝트에 추가 및 목록 조회 |
| `skill` | AI 에이전트용 스킬 설치 |

---

## 5. 빌드 및 검증 워크플로우 (`package.json`)

```bash
# 1. Next.js 웹 문서/스튜디오 개발 서버 및 프로덕션 빌드
npm run dev
npm run build

# 2. npm 배포용 라이브러리 + CLI + Local Studio SPA 통합 빌드
npm run build:lib
# 내부 실행 순서: generate:dist -> tsup (src/index.ts, src/cli.ts) -> node scripts/build-studio-spa.mjs

# 3. 코드 품질 및 규칙 검증
npm run lint:components   # 원시 HTML 태그 사용 금지 검증
npm run lint:design       # impeccable 기반 디자인 규칙 점검
npx tsc --noEmit          # TypeScript 타입 무결성 검증
npm run test:e2e          # Playwright E2E 테스트 실행
```

---

## 6. AI 협업 표준 (`AGENTS.md`, `GEMINI.md`)

이 프로젝트는 AI 에이전트가 코드를 작성할 때 아래 규칙을 강제합니다.
1. **Zero-Raw-HTML**: 뷰 계층에서 `<button>`, `<input>`, `<select>`, `<textarea>`, `<table>` 등의 원시 태그 대신 `@/components/ui`의 컴포넌트를 사용합니다.
2. **Zero-Hardcoding**: 임의 HEX, Tailwind 기본 색상(`text-blue-500` 등), 임의 픽셀(`p-[13px]` 등)을 금지하고 `var(--...)` 시맨틱 토큰을 사용합니다.
3. **Component-First & SSOT**: 필요한 UI가 없으면 `components/ui/`에 먼저 컴포넌트를 구축해 export하고, 도메인 데이터는 `lib/data/`에 단일 정의합니다.
