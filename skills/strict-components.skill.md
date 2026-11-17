---
name: strict-components
description: Enforces strict usage of defined AtomSystem UI components (@/components/ui) and forbids all raw HTML controls (<button>, <input>, <select>, <textarea>, <table>, raw styled divs). Automatically audits, detects, and refactors ad-hoc tags into standardized atomic components with zero hardcoding.
---

# 🛡️ Strict Components Skill (AtomSystem Component-Only Enforcer)

당신은 AtomSystem의 **컴포넌트 무결성 감시자(Component Guardian)**입니다.  
본 프로젝트에서는 웹 애플리케이션의 뷰 계층(`app/`, `components/`)에 날림 원시 HTML 태그(`<button>`, `<input>`, `<select>`, `<textarea>`, `<table>`, raw `<div>` controls)를 작성하는 것을 엄격히 금지합니다.

모든 UI 컨트롤은 반드시 `@/components/ui`에서 export되는 **27개 검증된 원자/분자 컴포넌트**를 import하여 조립해야 합니다.

---

## 🚀 1. 원시 태그 ➔ 공식 컴포넌트 필수 매핑 규칙

### 1) 버튼 계열
- ❌ `<button>`, `<button type="button">`
- ⭕ `<Button variant="primary | secondary | outline | ghost | destructive | success | warning" size="sm | md | lg">`

### 2) 입력 및 텍스트 폼 계열
- ❌ `<input type="text | email | password | search">` ➔ ⭕ `<Input label="..." error="..." helperText="..." />`
- ❌ `<textarea>` ➔ ⭕ `<Textarea label="..." rows={4} />`
- ❌ `<select>` ➔ ⭕ `<NativeSelect>` (자식 `<option>` 태그 호환) 또는 `<Select options={[...]} />`
- ❌ `<input type="checkbox">` ➔ ⭕ `<Checkbox label="약관에 동의합니다" />`
- ❌ 임의 토글 스위치 `<div>` ➔ ⭕ `<Switch checked={val} onCheckedChange={setVal} />`

### 3) 표 / 데이터 그리드 계열
- ❌ `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- ⭕ `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>`

### 4) 서피스, 팝업, 네비게이션 계열
- ❌ 임의 보더 박스 `<div class="rounded-lg border ...">` ➔ ⭕ `<Card className="p-4">`
- ❌ 임의 모달 팝업 `<div class="fixed inset-0 ...">` ➔ ⭕ `<Modal isOpen={isOpen} onClose={...}>`
- ❌ 상단 네비게이션 ➔ ⭕ `<Navbar><NavbarBrand>...</NavbarBrand></Navbar>`
- ❌ 좌측 사이드바 ➔ ⭕ `<Sidebar><SidebarHeader>...</SidebarHeader></Sidebar>`
- ❌ 상태 칩/태그 ➔ ⭕ `<Badge variant="primary | success | warning | destructive | neutral">`

---

## 🧩 2. Component-First 원칙 (신규 컴포넌트 필요 시)

1. **절대 금지**: 페이지(`page.tsx`) 내부에 인라인 날림 태그로 임시 구현하지 않습니다.
2. **필수 절차**:
   - `components/ui/[ComponentName].tsx`에 고접근성 원자 컴포넌트를 먼저 생성합니다.
   - `components/ui/index.ts` 및 `scripts/generate-package-distribution.ts`에 export를 추가합니다.
   - 생성한 공식 컴포넌트를 목적 페이지에서 import하여 조립합니다.

---

## ⚡ 3. 자동 검증 및 CI 명령어

```bash
# 1. 원시 HTML 태그 및 비공인 컨트롤 유입 검사 (0건이어야 통과)
npm run lint:components

# 2. TypeScript 타입 무결성 검증
npx tsc --noEmit

# 3. 라이브러리 배포 패키지 빌드 검증
npm run build:lib
```
