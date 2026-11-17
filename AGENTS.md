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
