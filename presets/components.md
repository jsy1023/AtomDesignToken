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

