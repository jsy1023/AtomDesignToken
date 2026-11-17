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

새로운 화면을 구현하거나 기존 코드를 검토할 때 아래 치환 규칙을 100% 준수합니다:

### 1) 버튼 계열
- ❌ `<button>`, `<button type="button">`
- ⭕ `<Button variant="primary | secondary | outline | ghost | destructive | success | warning" size="sm | md | lg">`
```tsx
import { Button } from '@/components/ui';

// 올바른 예시
<Button variant="primary" size="md" onClick={handleSave}>저장하기</Button>
<Button variant="outline" size="sm">취소</Button>
<Button variant="ghost" size="sm" isIconOnly><Copy className="w-4 h-4" /></Button>
```

### 2) 입력 및 텍스트 폼 계열
- ❌ `<input type="text | email | password | search">` ➔ ⭕ `<Input label="..." error="..." helperText="..." />`
- ❌ `<textarea>` ➔ ⭕ `<Textarea label="..." rows={4} />`
- ❌ `<select>` ➔ ⭕ `<NativeSelect>` (자식 `<option>` 태그 호환) 또는 `<Select options={[...]} />`
- ❌ `<input type="checkbox">` ➔ ⭕ `<Checkbox label="약관에 동의합니다" />`
- ❌ 임의 토글 스위치 `<div>` ➔ ⭕ `<Switch checked={val} onCheckedChange={setVal} />`
```tsx
import { Input, Textarea, NativeSelect, Checkbox, Switch } from '@/components/ui';

<Input placeholder="이메일을 입력하세요" />
<NativeSelect value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="admin">Admin</option>
  <option value="editor">Editor</option>
</NativeSelect>
<Textarea rows={3} label="상세 설명" />
<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} label="필수 동의" />
<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
```

### 3) 표 / 데이터 그리드 계열
- ❌ `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- ⭕ `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>`
```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>항목명</TableHead>
      <TableHead>값</TableHead>
      <TableHead className="text-right">관리</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-semibold">Primary Color</TableCell>
      <TableCell className="font-mono">#3182f6</TableCell>
      <TableCell className="text-right"><Button variant="ghost" size="sm">수정</Button></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 4) 서피스, 팝업, 네비게이션 계열
- ❌ 임의 보더 박스 `<div class="rounded-lg border ...">` ➔ ⭕ `<Card className="p-4">`
- ❌ 임의 모달 팝업 `<div class="fixed inset-0 ...">` ➔ ⭕ `<Modal isOpen={isOpen} onClose={...}>`
- ❌ 상단 네비게이션 ➔ ⭕ `<Navbar><NavbarBrand>...</NavbarBrand></Navbar>`
- ❌ 좌측 사이드바 ➔ ⭕ `<Sidebar><SidebarHeader>...</SidebarHeader></Sidebar>`
- ❌ 상태 칩/태그 ➔ ⭕ `<Badge variant="primary | success | warning | destructive | neutral">`

---

## 🧩 2. Component-First 원칙 (신규 컴포넌트 필요 시)

만약 기획상 필요한 컴포넌트가 `@/components/ui`에 존재하지 않을 때:
1. **절대 금지**: 페이지(`page.tsx`)나 특정 기능 컴포넌트 내부에 인라인 날림 태그로 임시 구현하지 않습니다.
2. **필수 절차**:
   - `components/ui/[ComponentName].tsx`에 고접근성 원자 컴포넌트를 먼저 생성합니다.
   - `components/ui/index.ts`에 `export * from './[ComponentName]';`을 추가합니다.
   - `scripts/generate-package-distribution.ts`에도 동일하게 등록하여 라이브러리 빌드 시 보존되도록 합니다.
   - 생성한 공식 컴포넌트를 목적 페이지에서 import하여 조립합니다.

---

## ⚡ 3. 자동 검증 및 CI 명령어

작업 완료 후 반드시 아래 명령어를 순차 실행하여 무결성을 검증합니다:

```bash
# 1. 원시 HTML 태그 및 비공인 컨트롤 유입 검사 (0건이어야 통과)
npm run lint:components

# 2. TypeScript 타입 무결성 검증
npx tsc --noEmit

# 3. 라이브러리 배포 패키지 빌드 검증
npm run build:lib
```
