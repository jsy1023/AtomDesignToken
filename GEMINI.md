# 🏛️ AtomDesignToken AI 개발 가이드 (GEMINI.md)

이 문서는 AI Agent가 본 프로젝트(AtomDesignToken)의 코드를 작성, 리팩토링, 기능 확장할 때 반드시 준수해야 하는 **객체지향 개발(OOP) 및 설계 지침**입니다.

---

## 1. 핵심 설계 철학: 객체지향 프로그래밍 (OOP) & SOLID 원칙

모든 개발 및 코드 변경 시, 임시방편적인 절차적 하드코딩을 엄격히 금지하며 아래 객체지향 원칙을 필수적으로 적용합니다.

### 1) 단일 책임 원칙 (SRP: Single Responsibility Principle)
- **하나의 클래스/함수/컴포넌트는 오직 하나의 책임(관심사)**만을 가져야 합니다.
- **UI 컴포넌트**: 화면 렌더링과 사용자 인터랙션 피드백에만 집중합니다. (비즈니스 규칙, 원천 데이터 정의, 복잡한 파싱 로직을 컴포넌트 내부에 직접 인라인으로 작성하지 않습니다.)
- **데이터 모듈 (`lib/data/`)**: 도메인 엔티티 정의, 데이터 검증, 단일 진실 공급원(SSOT) 역할에만 전념합니다.
- **도메인 서비스 / 유틸리티 (`lib/services/`, `lib/utils/`)**: 순수 가공, 포맷팅, 프롬프트 생성 등의 비즈니스 로직을 전담합니다.

### 2) 캡슐화 & 단일 진실 공급원 (SSOT: Single Source of Truth)
- 데이터 모델과 상태는 전용 도메인 계층에 캡슐화하여 은닉하고, 외부에 공개된 인터페이스/게터를 통해서만 접근합니다.
- **중복 하드코딩 엄격 금지**: 특정 페이지(`page.tsx`) 내에서 데이터(토큰 목록, UX 패턴 목록, 컴포넌트 목록 등)를 자체적으로 선언하여 파편화하지 않습니다. 모든 도메인 데이터는 반드시 공유 계층(`lib/data/...`)에서 import하여 사용합니다.

### 3) 개방-폐쇄 원칙 (OCP: Open-Closed Principle)
- 기존 코드를 수정하지 않고도 새로운 기능(새로운 디자인 토큰, 신규 UX 패턴, 신규 컴포넌트)을 확장할 수 있어야 합니다.
- 데이터 레이어에 새 항목이 추가되었을 때, 갤러리/카탈로그/스튜디오 위저드가 별도의 하드코딩된 switch/case 문 변경 없이 자동으로 동기화되도록 다형성 및 매핑 구조를 유지합니다.

### 4) 인터페이스 분리 및 의존성 역전 (ISP & DIP)
- 컴포넌트나 모듈은 자신이 사용하지 않는 거대한 인터페이스에 의존하지 않고, 명확하게 분리된 인터페이스(`TokenItem`, `PatternItem`, `GalleryComponent` 등)에 의존합니다.
- UI 계층은 구체적인 구현 세부사항이 아닌 추상화된 모델 인터페이스와 계약(Contract)에 의존합니다.

---

## 2. 프로젝트 실천 지침 (Implementation Guidelines)

### A. 4대 전문 에이전트 협업 체계 (Design System Task Force)
본 프로젝트는 **`토큰 → 컴포넌트 → 블록 → 템플릿` 레고 조립 파이프라인**을 따르며, 아래 4대 역할이 엄격히 분리되어 동작합니다:
1. **토큰 감시자 (`token-guardian`)**: W3C DTCG 표준 토큰 체계 무결성 감시 및 하드코딩 유입 차단.
2. **컴포넌트 생성자 (`component-architect`)**: `components/ui/`에 순수 원자/분자 단위 고접근성 컴포넌트 개발.
3. **블록/UX 디자이너 (`block-designer`)**: 검증된 컴포넌트들을 조립하여 완성형 블록 및 템플릿(UX 패턴) 구축. (컴포넌트 우선 원칙 준수)
4. **문서/총괄 큐레이터 (`docs-curator`)**: 레고 조립 파이프라인 문서화, 카탈로그 동기화 및 E2E/타입 검증.

### B. 레이어드 아키텍처 준수
```
app/ (View Layer)
  └── UI 렌더링, 라우팅, 사용자 이벤트 핸들링 전담
lib/
  ├── data/ (SSOT Data Layer)
  │     └── tokens.ts, components.ts, patterns.ts (도메인 데이터 및 모델 규격)
  ├── services/ (Domain Logic & Services)
  │     └── 프롬프트 생성기, 토큰 컴파일러 등 비즈니스 로직
  └── utils/ (Shared Utilities)
        └── 클립보드 복사, 포맷팅 등 재사용 순수 함수
components/ (Presentation Layer)
  └── 고도로 캡슐화되고 재사용 가능한 UI 아톰/몰레큘 컴포넌트
```

### C. 거대 컴포넌트(God Component) 금지
- 500줄 이상의 거대한 모놀리식 컴포넌트 작성을 지양합니다.
- 화면이 복잡해질 경우 역할별로 서브 컴포넌트(헤더, 사이드바, 프리뷰어, 코드 패널 등)로 분할하고 조합(Composition) 패턴을 활용합니다.

### D. 테스팅 표준: Playwright 기반 E2E 및 인터랙션 검증
- 본 프로젝트의 모든 UI 화면 및 핵심 비즈니스 로직 연동(페이지 렌더링, 파일 업로드, 트리 조작, 검색 및 모달 인터랙션 등) 검증은 **Playwright(`@playwright/test`)**를 공식 도구로 채택하여 진행합니다.
- 테스트 작성 시 하드코딩된 대기(`waitForTimeout`)를 지양하고, 웹 표준 로케이터(`getByRole`, `getByPlaceholder`, `getByText`)와 웹 안정성 대기(Web-First Assertions: `expect(locator).toBeVisible()`)를 준수합니다.

### E. 'refactor' 하드코딩 자동 탐지 및 토큰 치환 프로토콜 (Zero-Hardcoding Guarantee)
사용자가 `"refactor"`, `"하드코딩 정리해줘"`, 또는 이와 유사한 요청을 하거나 소스코드를 점검할 때, AI는 예외 없이 아래 절차로 모든 하드코딩 안티패턴을 탐색하여 시맨틱 토큰 변수로 치환해야 합니다:
1. **하드코딩 탐색 대상 안티패턴**:
   - 임의 HEX/RGB 색상 (`#3182f6`, `#ffffff` 등)
   - Tailwind 기본 컬러 유입 (`text-blue-500`, `bg-gray-100`, `border-neutral-200` 등)
   - 임의 픽셀(px) 인라인 간격 (`p-[13px]`, `gap-[11px]` 등)
   - 임의 곡률/그림자 (`rounded-[7px]` 등)
2. **시맨틱 토큰 매핑 사전**:
   - 배경/서피스: `bg-(--bg-primary)`, `bg-(--bg-secondary)`, `bg-(--bg-tertiary)`
   - 텍스트/라벨: `text-(--text-primary)`, `text-(--text-secondary)`, `text-(--text-muted)`
   - 액션/브랜드: `bg-(--accent-primary)`, `text-(--accent-primary)`, `border-(--accent-primary)`
   - 보더/구분선: `border-(--border-subtle)`, `border-(--border-strong)`
   - 곡률: `rounded-(--radius-sm)`, `rounded-(--radius)`, `rounded-(--radius-lg)`

### F. 정의된 컴포넌트 강제 규칙 (Zero-Raw-HTML-Tags Guarantee)
- 애플리케이션의 모든 뷰 계층(`app/`, `components/`)에서는 원시 태그(`<button>`, `<input>`, `<select>`, `<textarea>`, `<table>`)의 직접 작성을 엄격히 금지합니다.
- 반드시 `@/components/ui`에서 내보내는 검증된 27개 컴포넌트를 import하여 사용합니다:
  - `<button>` ➔ `<Button variant="..." size="...">`
  - `<input>` ➔ `<Input ... />`
  - `<select>` ➔ `<NativeSelect ... />` 또는 `<Select options={...} />`
  - `<textarea>` ➔ `<Textarea ... />`
  - `<table>` ➔ `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>`
  - `<input type="checkbox">` ➔ `<Checkbox label="..." />`
  - 토글 div ➔ `<Switch checked={...} onCheckedChange={...} />`
- **자동 검증 명령어**: `npm run lint:components` (CI/CD 및 리팩토링 검증 시 원시 태그 발견 즉시 실패 처리)

### G. 컴포넌트화 불변 3대 아키텍처: [Type · Variable · Status]
모든 컴포넌트(Button, Badge, Card, Input, Modal, Tabs, Table 등) 및 사용자 요청에 따른 "컴포넌트화" 수행 시 반드시 아래 3단계를 거칩니다:
1. **Type (새로운 디자인의 컴포넌트 외형)**:
   - 본질적인 형태와 조형, 뼈대가 다른 새로운 디자인 양식을 정의합니다.
   - 예: Button의 `Solid`, `Outline`, `Ghost`, `Soft`, `Pill` / Card의 `Outlined`, `Elevated`, `Flat`, `Accent-Border` 등.
2. **Variable (기존 디자인의 세부 옵션 / 변경)**:
   - 특정 Type 디자인 내에서 변경되는 세부 속성 및 레이아웃 옵션입니다.
   - **`system`**: 디자인 테마의 시스템 토큰 연동 (Primary, Destructive/위험, Warning/경고, Success/성공, Info/안내, Neutral/중립)
   - **`slots / layout`**: 아이콘 포함 여부(`icon-left`, `icon-right`, `icon-only`, `none`), 아바타, 뱃지 등 서브 요소 결합
   - **`size / metrics`**: `sm`, `md`, `lg` 등 패딩 및 규격 옵션
3. **Status (사용자 인터랙션 / 상호작용)**:
   - 사용자 행동 및 시스템 상태에 따른 인터랙션 피드백을 바인딩합니다.
   - `default`, `hover`, `active`, `focus`, `disabled`, `loading`

---

## 3. 작업 전/후 AI 점검 체크리스트
- [ ] 컴포넌트를 설계하거나 컴포넌트화 요청을 처리할 때 [Type ➔ Variable ➔ Status] 3단계를 엄격히 준수했는가?
- [ ] 색상 변경을 독립된 컴포넌트로 파편화하지 않고 `system` Variable(시맨틱 테마 토큰)로 처리했는가?
- [ ] 새 데이터를 추가할 때 개별 페이지에 하드코딩하지 않고 `lib/data/`의 공통 도메인 모델에 추가했는가?
- [ ] 컴포넌트가 렌더링 외의 과도한 데이터 가공 책임을 지고 있지 않은가?
- [ ] 임의의 HEX/RGB나 `text-blue-500` 등의 하드코딩이 0건이며 시맨틱 토큰 변수(`var(--...)`)를 사용했는가?
- [ ] `<button>`, `<input>`, `<select>`, `<table>` 등 원시 태그를 쓰지 않고 `@/components/ui` 컴포넌트만을 사용했는가?
- [ ] `npm run lint:components` 명령을 실행하여 원시 태그 0건을 통과했는가?
- [ ] `npx tsc --noEmit` 명령으로 타입 무결성을 확인했는가?
