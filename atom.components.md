# 🧱 AtomSystem UI Components Guide (atom.components.md)

> W3C DTCG 표준 토큰과 결합된 고접근성 0KB 런타임 UI 원자/분자 컴포넌트 규격서입니다.  
> 모든 컴포넌트는 `components/ui/`에서 import하여 사용합니다.

---

## 📦 컴포넌트 목록 및 사용법

### 1. Button (`components/ui/Button.tsx`)
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">확인</Button>
<Button variant="secondary">보조 액션</Button>
<Button variant="outline">테두리 버튼</Button>
<Button variant="ghost">고스트 버튼</Button>
<Button variant="destructive">삭제</Button>
<Button loading>처리 중...</Button>
```
- **Variants**: `primary`, `secondary`, `outline`, `ghost`, `destructive`
- **Sizes**: `sm`, `md`, `lg`
- **A11y**: `aria-disabled`, 키보드 엔터/스페이스 포커스 링 보장

### 2. Card (`components/ui/Card.tsx`)
```tsx
import { Card } from '@/components/ui';

<Card className="p-5 border border-(--border-subtle) bg-(--bg-primary)">
  <h3>카드 제목</h3>
  <p>카드 본문</p>
</Card>
```
- 1px 시맨틱 보더와 토큰 기반 곡률(`--radius`) 적용

### 3. Badge (`components/ui/Badge.tsx`)
```tsx
import { Badge } from '@/components/ui';

<Badge variant="primary">추천</Badge>
<Badge variant="secondary">일반</Badge>
<Badge variant="success">+14.8%</Badge>
<Badge variant="warning">점검 예정</Badge>
<Badge variant="destructive">실패</Badge>
```

### 4. Input (`components/ui/Input.tsx`)
```tsx
import { Input } from '@/components/ui';

<Input
  placeholder="이메일 주소 입력"
  status="default" // "error" | "success"
  errorMessage="올바른 이메일 형식이 아닙니다."
/>
```

### 5. Table (`components/ui/Table.tsx`)
```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>사용자</TableHead>
      <TableHead>플랜</TableHead>
      <TableHead>상태</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>홍길동</TableCell>
      <TableCell>Pro</TableCell>
      <TableCell><Badge variant="success">활성</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 6. Tabs (`components/ui/Tabs.tsx`)
```tsx
import { TabsList, TabsTrigger } from '@/components/ui';

<TabsList>
  <TabsTrigger active={tab === '1'} onClick={() => setTab('1')}>월간</TabsTrigger>
  <TabsTrigger active={tab === '2'} onClick={() => setTab('2')}>연간</TabsTrigger>
</TabsList>
```

### 7. Switch (`components/ui/Switch.tsx`)
```tsx
import { Switch } from '@/components/ui';

<Switch checked={enabled} onChange={setEnabled} label="알림 받기" />
```

### 8. Modal (`components/ui/Modal.tsx`)
```tsx
import { Modal } from '@/components/ui';

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="확인">
  <p>정말 삭제하시겠습니까?</p>
</Modal>
```
- **A11y**: `role="dialog"`, `aria-modal="true"`, ESC 키 누름 시 자동 닫기

### 9. Container (`components/ui/Container.tsx`)
```tsx
import { Container } from '@/components/ui';

<Container size="xl" gutters center>
  <h1>대시보드</h1>
</Container>
```
- **연동 토큰**: `--atom-container-sm` (640px), `--atom-container-md` (768px), `--atom-container-lg` (1024px), `--atom-container-xl` (1280px), `--atom-container-2xl` (1536px), `--atom-layout-gutter` (16px/24px)
- **용도**: 모든 페이지의 표준 가로폭 및 안전 여백 통일 (하드코딩 금지)

### 10. Layout (`components/ui/Layout.tsx`)
```tsx
import { Layout, Container, Stack, Grid, Section } from '@/components/ui';

<Layout>
  <Layout.Header sticky>헤더 네비바</Layout.Header>
  <Layout.Content>
    <Container size="xl">
      <Section spacing="md">
        <Stack gap="6">
          <Grid cols={3} gap="4">
            <Card>1</Card>
            <Card>2</Card>
            <Card>3</Card>
          </Grid>
        </Stack>
      </Section>
    </Container>
  </Layout.Content>
  <Layout.Footer>푸터</Layout.Footer>
</Layout>
```
- **연동 토큰**: `--atom-space-*` (4px, 8px, 12px, 16px, 24px, 32px), `Section` spacing 토큰
- **용도**: 전역 페이지 쉘 구조화 및 스택/그리드 기반의 제로 하드코딩 여백 배치

### 11. NativeSelect (`components/ui/Select.tsx`)
```tsx
import { NativeSelect } from '@/components/ui';

<NativeSelect value={selected} onChange={(e) => setSelected(e.target.value)}>
  <option value="opt1">옵션 1</option>
  <option value="opt2">옵션 2</option>
</NativeSelect>
```

### 12. Textarea (`components/ui/Textarea.tsx`)
```tsx
import { Textarea } from '@/components/ui';

<Textarea label="상세 내용" rows={4} placeholder="내용을 입력하세요" />
```

### 13. Checkbox (`components/ui/Checkbox.tsx`)
```tsx
import { Checkbox } from '@/components/ui';

<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} label="필수 약관 동의" />
```

### 14. Navbar & Sidebar (`components/ui/Navbar.tsx`, `components/ui/Sidebar.tsx`)
```tsx
import { Navbar, NavbarBrand, NavbarNav, NavbarLink, NavbarActions, NavbarToggle, NavbarMobileMenu, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
```

### 15. Universal Nav & NavItem (`components/ui/Nav.tsx`)
```tsx
import { Nav, NavItem, NavLink, NavDropdown, NavDropdownItem } from '@/components/ui';

// 1. 알약형 필터 (Pills)
<Nav variant="pills" size="sm">
  <NavItem active><NavLink asButton active>전체</NavLink></NavItem>
  <NavItem><NavLink asButton>디자인</NavLink></NavItem>
  <NavItem><NavLink asButton>엔지니어링</NavLink></NavItem>
</Nav>

// 2. 2-Depth 계층 드롭다운 (Dropdown)
<Nav variant="default">
  <NavItem>
    <NavDropdown label="라이브러리">
      <NavDropdownItem title="토큰" description="W3C DTCG 표준 사양" />
      <NavDropdownItem title="컴포넌트" description="28개 원자/분자 UI" />
    </NavDropdown>
  </NavItem>
</Nav>
```

### 16. Universal SideMenu (`components/ui/SideMenu.tsx`)
```tsx
import { SideMenu, SideMenuGroup, SideMenuItem, SideSubMenu, Badge } from '@/components/ui';

<SideMenu variant="default" size="md">
  <SideMenuGroup label="메인 메뉴">
    <SideMenuItem active label="대시보드" badge={<Badge variant="primary">Live</Badge>} />
    <SideMenuItem label="토큰 카탈로그" />
  </SideMenuGroup>
  <SideMenuGroup label="환경설정" collapsible defaultOpen>
    <SideSubMenu label="디자인 시스템" defaultOpen>
      <SideMenuItem label="색상 팔레트" />
      <SideMenuItem label="타이포그래피" />
    </SideSubMenu>
  </SideMenuGroup>
</SideMenu>
```

### 17. Vector Data Chart (`components/ui/Chart.tsx`)
```tsx
import { Chart } from '@/components/ui';

const data = [
  { label: '1월', value: 120 },
  { label: '2월', value: 180 },
  { label: '3월', value: 150 },
  { label: '4월', value: 240 },
  { label: '5월', value: 310 },
];

<Chart type="area" variant="primary" data={data} height={200} />
<Chart type="bar" variant="success" data={data} height={180} />
```
- **Types**: `line`, `bar`, `area`
- **Variants**: `primary`, `secondary`, `success`, `danger`, `warning`
- **Features**: W3C DTCG 시맨틱 토큰 1:1 결합, SVG 기반 0KB 외부 번들, 인터랙티브 포인트/호버 툴팁

### 18. Slide-over Drawer / Offcanvas (`components/ui/Offcanvas.tsx`)
```tsx
import { useState } from 'react';
import { Offcanvas, Button } from '@/components/ui';

const [isOpen, setIsOpen] = useState(false);

<Button variant="primary" onClick={() => setIsOpen(true)}>서랍 열기</Button>
<Offcanvas
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  placement="right"
  size="md"
  title="상세 속성 인스펙터"
  description="선택한 항목의 세부 설정 및 속성을 편집합니다."
  footer={
    <div className="flex justify-end gap-2">
      <Button variant="secondary" onClick={() => setIsOpen(false)}>취소</Button>
      <Button variant="primary">저장</Button>
    </div>
  }
>
  <div className="space-y-4">
    <p>본문 콘텐츠 및 입력 폼 컴포넌트</p>
  </div>
</Offcanvas>
```
- **Placements**: `left`, `right`, `top`, `bottom`
- **Sizes**: `sm`, `md`, `lg`, `full`
- **Features**: Escape 키 바인딩, 백드롭 클릭 차단/허용 제어, 인라인 임베딩 모드(`inline={true}`) 지원, 0 Raw HTML(모든 액션 Button 캡슐화)

### 19. Floating Toast Notification (`components/ui/Toast.tsx`)
```tsx
import { Toast } from '@/components/ui';

<Toast
  variant="success"
  title="저장 완료"
  description="변경 사항이 안전하게 클라우드에 동기화되었습니다."
  onClose={() => {}}
/>

<Toast
  variant="action"
  title="항목 삭제됨"
  description="선택한 프로젝트가 휴지통으로 이동되었습니다."
  action={{
    label: '실행 취소',
    onClick: () => handleUndo(),
  }}
  onClose={() => {}}
/>
```
- **Variants**: `info`, `success`, `warning`, `danger`, `action`
- **Features**: W3C DTCG 시맨틱 토큰 1:1 결합, 시맨틱 아이콘 자동 설정, 실행 취소(Undo) 액션 슬롯, 자동 소멸(`duration`) 타이머, 0 Raw HTML(모든 액션 Button 캡슐화)

---

## 🚫 원시 태그 금지 강제 규칙 (Zero-Raw-HTML-Tags Enforcement)
- 날림 태그(`<button>`, `<input>`, `<select>`, `<textarea>`, `<table>`) 사용을 엄격히 금지합니다.
- 모든 화면은 반드시 위 공식 컴포넌트를 import하여 조립해야 하며, CI 파이프라인에서 `npm run lint:components`로 상시 검증됩니다.

