export type ComponentCategory = 'all' | 'form' | 'feedback' | 'navigation' | 'data';

export interface GalleryComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  source: string;
  description: string;
  htmlSnippet: string;
  reactSnippet: string;
}

export const GALLERY_COMPONENTS: GalleryComponent[] = [
  {
    id: 'button',
    name: '버튼 (Button Variants)',
    category: 'form',
    source: 'shadcn + bootstrap',
    description: 'Primary, Secondary, Outline, Ghost, Destructive, Loading 등 상태별 버튼 풀세트',
    htmlSnippet: `<button class="atom-btn atom-btn-primary">Primary</button>
<button class="atom-btn atom-btn-secondary">Secondary</button>
<button class="atom-btn atom-btn-outline">Outline</button>
<button class="atom-btn atom-btn-destructive">Destructive</button>`,
    reactSnippet: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>`
  },
  {
    id: 'input',
    name: '인풋 필드 (Input with Status)',
    category: 'form',
    source: 'shadcn + bootstrap',
    description: '플로팅 라벨, 필수값 인디케이터, 유효성 통과 및 에러 피드백 인풋',
    htmlSnippet: `<div class="atom-form-group">
  <label class="atom-label">이메일 주소</label>
  <input type="email" class="atom-input" placeholder="name@company.com" />
</div>`,
    reactSnippet: `<Input label="이메일 주소" placeholder="name@company.com" error="이메일 형식이 올바르지 않습니다." />`
  },
  {
    id: 'selection',
    name: '스위치 & 체크박스 (Switch & Checkbox)',
    category: 'form',
    source: 'shadcn + bootstrap',
    description: '부트스트랩 스위치 토글, shadcn 스타일 체크박스 및 라디오 그룹',
    htmlSnippet: `<label class="atom-switch">
  <input type="checkbox" checked />
  <span class="atom-slider"></span>
</label>`,
    reactSnippet: `<Switch checked={enabled} onChange={setEnabled} />
<Checkbox checked={agreed} onChange={setAgreed} label="약관 동의" />`
  },
  {
    id: 'dialog',
    name: '모달 다이얼로그 (Modal / Dialog)',
    category: 'feedback',
    source: 'shadcn + bootstrap',
    description: '접근성(A11y aria-modal, ESC 닫기)을 보장하는 중앙 팝업 다이얼로그',
    htmlSnippet: `<div class="atom-modal-backdrop">
  <div class="atom-modal" role="dialog" aria-modal="true">
    <h3 class="atom-modal-title">확인</h3>
    <p class="atom-modal-body">진행하시겠습니까?</p>
  </div>
</div>`,
    reactSnippet: `<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader><DialogTitle>확인</DialogTitle></DialogHeader>
  </DialogContent>
</Dialog>`
  },
  {
    id: 'sheet',
    name: '바텀시트 & 사이드 드로어 (Sheet / Drawer)',
    category: 'feedback',
    source: 'shadcn + bootstrap',
    description: '모바일 하단 바텀시트 및 데스크톱 우측 슬라이드 패널',
    htmlSnippet: `<div class="atom-sheet atom-sheet-bottom">
  <div class="atom-sheet-handle"></div>
  <div class="atom-sheet-content">필터 옵션</div>
</div>`,
    reactSnippet: `<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent side="bottom"><SheetHeader><SheetTitle>필터</SheetTitle></SheetHeader></SheetContent>
</Sheet>`
  },
  {
    id: 'alert',
    name: '알림 콜아웃 (Alert Callout)',
    category: 'feedback',
    source: 'shadcn + bootstrap',
    description: '부트스트랩 alert-dismissible 및 shadcn Callout 정보/성공/에러 알림',
    htmlSnippet: `<div class="atom-alert atom-alert-info">
  <span class="atom-icon">ℹ️</span>
  <div>새로운 기능이 배포되었습니다.</div>
</div>`,
    reactSnippet: `<Alert variant="info">
  <AlertTitle>알림</AlertTitle>
  <AlertDescription>새로운 업데이트가 배포되었습니다.</AlertDescription>
</Alert>`
  },
  {
    id: 'tabs',
    name: '세그먼트 탭스 (Segment Tabs)',
    category: 'navigation',
    source: 'shadcn + bootstrap',
    description: '세그먼트 컨트롤 형태 및 언더라인형 표준 탭 내비게이션',
    htmlSnippet: `<div class="atom-tabs">
  <button class="atom-tab active">계정</button>
  <button class="atom-tab">비밀번호</button>
</div>`,
    reactSnippet: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
  </TabsList>
</Tabs>`
  },
  {
    id: 'badge',
    name: '상태 배지 (Pill Badge)',
    category: 'data',
    source: 'shadcn + bootstrap',
    description: '상태 식별 펄스 도트 뱃지, 버전 태그, 캡슐형 칩',
    htmlSnippet: `<span class="atom-badge atom-badge-primary">NEW</span>
<span class="atom-badge atom-badge-success">활성</span>
<span class="atom-badge atom-badge-warning">대기</span>`,
    reactSnippet: `<Badge variant="primary">NEW</Badge>
<Badge variant="success">온라인</Badge>`
  },
  {
    id: 'card',
    name: '인터랙티브 카드 (Card Surface)',
    category: 'data',
    source: 'shadcn + bootstrap',
    description: '음영 및 테두리 서피스, 호버 리프트 인터랙션이 내장된 범용 카드',
    htmlSnippet: `<div class="atom-card atom-card-interactive">
  <h4 class="atom-card-title">계좌 잔액</h4>
  <p class="atom-card-body">1,500,000원</p>
</div>`,
    reactSnippet: `<Card>
  <CardHeader><CardTitle>계좌 잔액</CardTitle></CardHeader>
  <CardContent>1,500,000원</CardContent>
</Card>`
  },
  {
    id: 'table',
    name: '데이터 테이블 (Responsive Table)',
    category: 'data',
    source: 'shadcn + bootstrap',
    description: '부트스트랩 table-hover 및 shadcn 스타일 클린 반응형 데이터 테이블',
    htmlSnippet: `<table class="atom-table">
  <thead><tr><th>이름</th><th>상태</th><th>역할</th></tr></thead>
  <tbody><tr><td>김민수</td><td>정상</td><td>관리자</td></tr></tbody>
</table>`,
    reactSnippet: `<Table>
  <TableHeader><TableRow><TableHead>이름</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>김민수</TableCell></TableRow></TableBody>
</Table>`
  }
];
