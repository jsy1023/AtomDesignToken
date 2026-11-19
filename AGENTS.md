# 🏛️ AtomSystem Universal AI Coding Guidelines

> 이 프로젝트는 **AtomSystem (Universal Design Token & Agentic UI System)**을 공식 디자인 시스템으로 채택하고 있습니다.  
> 모든 AI 어시스턴트(Cursor, Claude, Copilot, Antigravity, Windsurf 등)는 새로운 UI를 구현하거나 기존 코드를 리팩토링할 때 아래 원칙을 **절대적으로 준수**해야 합니다.

---

## 🚀 1. 핵심 아키텍처: 4단계 레고 조립 파이프라인

```
[1. W3C DTCG Tokens] ──> [2. UI Components] ──> [3. Content Blocks] ──> [4. UX Patterns / Templates]
 (CSS 변수: 색상/간격)     (Button, Card, Badge)   (RealtimeChart, Chat)     (Dashboard, Checkout)
```

1. **Tokens (`atom.design.md`, `tokens/token.json`)**:
   - 모든 색상, 간격, 보더, 폰트 크기는 반드시 CSS 변수(`var(--text-primary)`, `var(--bg-primary)`, `var(--border-subtle)` 등)를 사용합니다.
   - **하드코딩 절대 금지**: `text-blue-500`, `bg-[#123456]`, `p-[13px]`, `border-gray-200` 등 임의의 인라인 값 사용을 엄격히 금지합니다.
2. **Components (`atom.components.md`, `components/ui/`)**:
   - 화면을 구성하는 공식 원자입니다 (`Button`, `Card`, `Badge`, `Input`, `NativeSelect`, `Table`, `Tabs`, `Switch`, `Modal`, `Checkbox`, `Navbar`, `Sidebar` 등).
   - **원시 태그 사용 전면 금지**: 날림 원시 태그(`<button>`, `<input>`, `<select>`, `<textarea>`, `<table>`, `<div class="rounded-lg ...">`)를 작성하는 것을 엄격히 금지하며, 반드시 검증된 `components/ui/` 컴포넌트를 import하여 조립합니다.
3. **Blocks (`atom.blocks.md`, `components/blocks/`)**:
   - 컴포넌트들을 조립하여 완성한 독립 기능형 콘텐츠 블록입니다 (`realtime-chart`, `interactive-chat`, `pricing-table`, `card-list`, `file-explorer` 등).
   - 블록에 필요한 새 컴포넌트가 없다면, 컴포넌트를 먼저 `components/ui/`에 신설하고 블록을 조립합니다 (**Component-First 원칙**).
4. **UX Patterns & Templates (`atom.uxPattern.md`)**:
   - 완성된 블록과 레이아웃을 조립하여 완성형 사용자 경험(대시보드, 폼 유효성, 결제 플로우 등)을 구축합니다.

---

## 🧬 2. 모든 컴포넌트 불변 3대 아키텍처: [Type · Variable · Status]

모든 컴포넌트(Button, Badge, Card, Input, Modal, Tabs, Table 등)는 예외 없이 아래 **3대 계층 구조**를 엄격히 준수해야 하며, 사용자가 "컴포넌트화를 해달라"고 요청했을 때 AI는 반드시 이 과정을 거쳐야 합니다:

```
[Type (새로운 디자인 외형)] ➔ [Variable (디자인 세부 옵션/변경)] ➔ [Status (상호작용 인터랙션)]
```

### 1) Type (새로운 디자인의 컴포넌트 외형)
- **정의**: 형태와 조형, 뼈대 자체가 다른 **새로운 디자인 양식**입니다.
- **예시**:
  - `Button`: `Solid`(솔리드 채움형), `Outline`(외곽선형), `Ghost`(고스트 투명형), `Soft`(연한 배경형), `Pill`(라운드형), `Elevated`(그림자 입체형)
  - `Card`: `Outlined`(기본 테두리형), `Elevated`(그림자형), `Flat`(평면형), `Accent-Border`(강조 라인형)
  - `Badge`: `Solid`(채움형), `Subtle`(연한 배경형), `Outline`(테두리형), `Dot`(점 인디케이터형)
  - `Input`: `Outlined`(테두리형), `Filled`(배경형), `Underlined`(밑줄형)

### 2) Variable (기존 디자인의 세부 옵션 / 변경)
- **정의**: 특정 Type 디자인 내부에서 선택할 수 있는 **세부 설정 및 옵션 변형**입니다.
- **포함 요소**:
  - **`system` (시맨틱 색상 연동)**: 디자인 테마의 시스템 토큰을 가져와 적용 (`primary`, `destructive`/위험, `warning`/경고, `success`/성공, `info`/안내, `neutral`/중립)
  - **`slots / layout` (구조적 변경)**: 왼쪽 아이콘(`icon-left`), 오른쪽 아이콘(`icon-right`), 아이콘 단독(`icon-only`), 아바타 포함, 서브라벨 포함 여부 등
  - **`size / metrics` (규격)**: `sm`, `md`, `lg` 등 패딩 및 크기 변경

### 3) Status (사용자 인터랙션 / 상호작용)
- **정의**: 사용자 동작(Action) 및 시스템 상태에 따른 **실시간 시각 피드백**입니다.
- **상태 목록**: `default`(기본), `hover`(마우스 오버), `active`(클릭/누름), `focus`(키보드 포커스 링), `disabled`(비활성 차단), `loading`(비동기 진행)

### 🤖 AI 컴포넌트화 강제 프로토콜 (Mandatory Componentization Rule)
사용자가 임의의 UI를 "컴포넌트화해줘"라고 요청하면 AI는 절대 임의의 단일 코드를 만들지 않고 다음 **4단계 절차**를 거쳐야 합니다:
1. **[1단계: Type 선언]**: 컴포넌트의 핵심 디자인 외형 양식(Solid, Outline, Ghost 등)을 정의합니다.
2. **[2단계: Variable 옵션화]**:
   - 색상은 반드시 `system` 옵션(Primary, Destructive, Warning, Success 등)으로 테마 토큰과 바인딩합니다.
   - 왼쪽/오른쪽 아이콘 슬롯, 크기(`size`) 등 옵션을 `Variable` 속성으로 구현합니다.
3. **[3단계: Status 바인딩]**: `default`, `hover`, `active`, `focus`, `disabled` 등 상호작용 상태별 토큰을 연결합니다.
4. **[4단계: @/components/ui 등록]**: 원자 단위로 캡슐화하고 표준 인터페이스를 export합니다.

---

## 🔒 2. 정의된 컴포넌트 강제 규칙 (Zero Raw HTML Elements Guarantee)

AI 어시스턴트는 화면을 구축할 때 **임의의 원시 HTML 인터랙티브 태그 작성을 엄격히 금지**하며, 반드시 아래 대응표에 따라 `@/components/ui`의 공식 컴포넌트를 사용해야 합니다:

| 금지되는 원시 태그/패턴 | 공식 대체 컴포넌트 (`@/components/ui`) | 올바른 사용 예시 |
|---|---|---|
| `<button>`, `<button type="...">` | `<Button variant="..." size="...">` | `<Button variant="primary">확인</Button>` |
| `<input type="text/password/search">` | `<Input ... />` | `<Input placeholder="검색어 입력" />` |
| `<select>`, `<option>` | `<NativeSelect>` 또는 `<Select options={...}>` | `<NativeSelect value={val} onChange={...}><option ...></NativeSelect>` |
| `<textarea>` | `<Textarea ... />` | `<Textarea rows={4} label="내용" />` |
| `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` | `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>` | `<Table><TableHeader><TableRow><TableHead>...</TableHead></TableRow></TableHeader>...</Table>` |
| `<input type="checkbox">` | `<Checkbox label="..." />` | `<Checkbox checked={agree} onChange={...} label="약관 동의" />` |
| 토글형 `<div class="w-12 h-6 ...">` | `<Switch checked={...} onCheckedChange={...} />` | `<Switch checked={isActive} onCheckedChange={setIsActive} />` |
| 배지형 `<span class="rounded px-2 ...">` | `<Badge variant="...">` | `<Badge variant="success">Active</Badge>` |
| 모달형 `<div class="fixed inset-0 ...">` | `<Modal isOpen={...} onClose={...}>` | `<Modal isOpen={open} onClose={() => setOpen(false)} title="...">` |
| 탭형 `<div class="flex gap-2">` 버튼 묶음 | `<Tabs>`, `<TabsList>`, `<TabsTrigger>`, `<TabsContent>` | `<Tabs defaultValue="tab1"><TabsList><TabsTrigger value="tab1">탭1</TabsTrigger></TabsList></Tabs>` |
| 상단/사이드 네비게이션 날림 마크업 | `<Navbar>`, `<Sidebar>` | `<Navbar><NavbarBrand>Logo</NavbarBrand>...</Navbar>` |

> [!CAUTION]
> **Component-First 원칙**: 필요한 UI 컴포넌트가 `@/components/ui`에 존재하지 않을 경우, 절대로 화면 페이지 내에 인라인으로 날림 태그를 구현하지 마십시오. 먼저 `components/ui/`에 원자 컴포넌트를 신설하고 `components/ui/index.ts`에 export한 뒤 페이지에서 import하여 사용하십시오.

### 🤖 AI 컴포넌트 표준 제출 & 스튜디오 자동 반영 프로토콜 (SSOT Registry)
로컬 스튜디오(`tokens/studio.registry.json`)가 프로젝트 전체 컴포넌트·토큰의 단일 기준(SSOT)입니다. 새로운 컴포넌트를 요청받으면 아래 표준 양식과 CLI/API를 통해 스튜디오 및 프로젝트 전체에 자동 반영하십시오:
1. **양식 확인**: `npx atomsystem schema` (표준 JSON 스펙) 또는 `npx atomsystem schema --prompt` 실행
2. **제출 및 자동 생성**:
   - CLI 제출: `npx atomsystem submit <component>.atom.json`
   - 또는 스튜디오 API 제출: `POST /api/studio/components` (혹은 `/studio` 좌측 상단 `+ AI 제출` 모달 사용)
   - 자동으로 `components/ui/<PascalName>.tsx`, `components/ui/index.ts`, `tokens/studio.registry.json`, `tokens/token.json`, `css/atom-ui.css`가 일괄 갱신되어 `/studio`와 `/components/<id>` 문서에 즉시 동기화됩니다.
3. **기존/수동 컴포넌트 동기화**: `npx atomsystem sync` (또는 `npx atomsystem studio` 실행)로 `components/ui/` 디렉토리를 스캔하여 레지스트리와 CSS를 최신화합니다.

---

## 🎨 3. 표준 시맨틱 CSS 변수 규격

| 용도 | 라이트 모드 | 다크 모드 | CSS 변수 표기 |
|---|---|---|---|
| 기본 배경 | `#ffffff` | `#0a0a0a` | `var(--bg-primary)` 또는 `bg-(--bg-primary)` |
| 보조 표면 | `#f9f9fb` | `#141414` | `var(--bg-secondary)` 또는 `bg-(--bg-secondary)` |
| 본문 텍스트 | `#111111` | `#ededed` | `var(--text-primary)` 또는 `text-(--text-primary)` |
| 보조 텍스트 | `#666666` | `#a0a0a0` | `var(--text-secondary)` 또는 `text-(--text-secondary)` |
| 옅은 보더 | `#eaeaea` | `#222222` | `var(--border-subtle)` 또는 `border-(--border-subtle)` |
| 강조 보더 | `#d4d4d8` | `#333333` | `var(--border-strong)` 또는 `border-(--border-strong)` |
| 브랜드/액션 | `#3182f6` | `#3182f6` | `var(--accent-primary)` 또는 `text-(--accent-primary)` |
| 성공 상태 | `#10b981` | `#10b981` | `var(--atom-color-success)` 또는 `text-(--atom-color-success)` |
| 경고 상태 | `#f59e0b` | `#f59e0b` | `var(--atom-color-warning)` 또는 `text-(--atom-color-warning)` |
| 위험/삭제 | `#ef4444` | `#ef4444` | `var(--atom-color-destructive)` 또는 `text-(--atom-color-destructive)` |
| 기본 곡률 | `6px` | `6px` | `var(--radius)` 또는 `rounded-(--radius)` |
| 작은 곡률 | `4px` | `4px` | `var(--radius-sm)` 또는 `rounded-(--radius-sm)` |

---

## 🛠️ 4. 하드코딩 자동 탐지 및 컴포넌트 검증 명령어
사용자가 `"refactor"`, `"하드코딩 정리해줘"`, 또는 코드 품질 점검을 요청하면 AI는 즉시 아래 검증 파이프라인을 실행합니다:
1. **컴포넌트 준수 검증**: `npm run lint:components` 실행 (원시 `<button>`, `<input>`, `<table>` 등 유입 시 즉시 빌드 실패)
2. **토큰 하드코딩 치환**:
   - HEX/RGB 컬러 (`#3182f6`, `#ffffff`) ➔ `var(--accent-primary)`, `var(--bg-primary)` 치환
   - Tailwind 임의 컬러 (`text-blue-500`, `bg-gray-100`) ➔ `text-(--text-primary)`, `bg-(--bg-secondary)` 치환
   - 임의 인라인 픽셀 간격 (`p-[13px]`, `gap-[15px]`) ➔ `p-(--space-3)`, `gap-(--space-4)` 치환
3. **타입스크립트 검증**: `npx tsc --noEmit` 실행하여 타입 무결성 확인

---

## 💡 5. AI 작업 시 필수 체크리스트
- [ ] `<button>`, `<input>`, `<select>`, `<textarea>`, `<table>` 등 원시 태그를 쓰지 않고 `@/components/ui`의 컴포넌트만을 사용했는가?
- [ ] 필요한 새 컴포넌트가 있을 때 `components/ui/`에 먼저 신설(Component-First)하고 import했는가?
- [ ] Tailwind 임의의 컬러(`blue-500`, `gray-100`)나 HEX를 하드코딩하지 않고 시맨틱 토큰 변수를 사용했는가?
- [ ] 복잡한 화면을 만들 때 `atom.blocks.md` 및 `atom.uxPattern.md`의 검증된 패턴을 따랐는가?
- [ ] 작업 완료 후 `npm run lint:components`와 `npx tsc --noEmit`를 실행하여 0 에러를 확인했는가?
