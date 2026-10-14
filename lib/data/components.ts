export type ComponentCategory = 'all' | 'form' | 'feedback' | 'navigation' | 'data';

export interface PropItem {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface GalleryComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  source: string;
  description: string;
  htmlSnippet: string;
  reactSnippet: string;
  callout?: {
    type: 'note' | 'tip' | 'warning';
    title: string;
    text: string;
  };
  propsSpec?: PropItem[];
}

export const GALLERY_COMPONENTS: GalleryComponent[] = [
  {
    id: 'button',
    name: '버튼 (Button Variants)',
    category: 'form',
    source: 'shadcn + bootstrap',
    description: 'Primary, Secondary, Outline, Ghost, Destructive, Loading 등 상태별 버튼 풀세트',
    callout: {
      type: 'tip',
      title: '접근성(A11y) 가이드',
      text: '비활성화(Disabled) 상태일 때는 aria-disabled="true"와 함께 tabIndex={-1}을 지정하여 키보드 탐색 포커스를 방지하세요.'
    },
    propsSpec: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost'", defaultValue: "'primary'", description: '버튼의 시각적 강조 스타일' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: '버튼 패딩 및 글자 크기' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: '로딩 스피너 활성화 및 상호작용 차단' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '클릭 차단 및 불투명도 축소' }
    ],
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
    callout: {
      type: 'note',
      title: '폼 유효성 검사 규칙',
      text: '에러 발생 시 aria-invalid="true"와 aria-describedby="error-id"를 연결하여 스크린 리더에 오류 메시지를 전달합니다.'
    },
    propsSpec: [
      { name: 'label', type: 'string', defaultValue: 'undefined', description: '인풋 상단에 표시되는 텍스트 라벨' },
      { name: 'placeholder', type: 'string', defaultValue: "''", description: '입력 가이드 플레이스홀더' },
      { name: 'error', type: 'string', defaultValue: 'undefined', description: '에러 메시지 및 레드 테두리 상태 표시' },
      { name: 'clearable', type: 'boolean', defaultValue: 'true', description: '텍스트 원클릭 클리어(X) 버튼 노출' }
    ],
    htmlSnippet: `<div class="atom-form-group">
  <label class="atom-label">이메일 주소</label>
  <input type="email" class="atom-input" placeholder="name@company.com" />
  <span class="atom-error-text">유효한 이메일을 입력하세요.</span>
</div>`,
    reactSnippet: `<Input label="이메일 주소" placeholder="name@company.com" error="유효한 이메일을 입력하세요." />`
  },
  {
    id: 'selection',
    name: '스위치 & 체크박스 (Switch & Checkbox)',
    category: 'form',
    source: 'shadcn + bootstrap',
    description: '부트스트랩 스위치 토글, shadcn 스타일 체크박스 및 라디오 그룹',
    callout: {
      type: 'tip',
      title: '즉각 반응 피드백',
      text: '스위치 토글은 별도의 [저장] 버튼 없이도 상태가 즉시 저장되는 환경 설정 UX에 권장됩니다.'
    },
    propsSpec: [
      { name: 'checked', type: 'boolean', defaultValue: 'false', description: '활성화 선택 여부' },
      { name: 'onChange', type: '(checked: boolean) => void', defaultValue: 'undefined', description: '상태 변경 이벤트 콜백' },
      { name: 'label', type: 'string', defaultValue: 'undefined', description: '인라인 라벨 텍스트' }
    ],
    htmlSnippet: `<label class="atom-switch">
  <input type="checkbox" checked />
  <span class="atom-slider"></span>
</label>`,
    reactSnippet: `<Switch checked={enabled} onChange={setEnabled} label="알림 수신" />
<Checkbox checked={agreed} onChange={setAgreed} label="약관 전체 동의" />`
  },
  {
    id: 'dialog',
    name: '모달 다이얼로그 (Modal / Dialog)',
    category: 'feedback',
    source: 'shadcn + bootstrap',
    description: '접근성(A11y aria-modal, ESC 닫기)을 보장하는 중앙 팝업 다이얼로그',
    callout: {
      type: 'warning',
      title: '포커스 트랩(Focus Trap)',
      text: '모달이 열렸을 때 백드롭 바깥의 다른 요소로 Tab 포커스가 탈출하지 않도록 포커스 트랩을 필수 적용하세요.'
    },
    propsSpec: [
      { name: 'open', type: 'boolean', defaultValue: 'false', description: '다이얼로그 노출 여부' },
      { name: 'onClose', type: '() => void', defaultValue: 'undefined', description: 'ESC 또는 바깥 클릭 시 닫기 콜백' },
      { name: 'title', type: 'string', defaultValue: "''", description: '다이얼로그 헤더 제목' }
    ],
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
    callout: {
      type: 'note',
      title: '뷰포트 최적화',
      text: '모바일 뷰포트(768px 미만)에서는 bottom 바텀시트로, 데스크톱에서는 right 슬라이드 드로어로 자동 적응됩니다.'
    },
    propsSpec: [
      { name: 'open', type: 'boolean', defaultValue: 'false', description: '시트 오픈 상태' },
      { name: 'side', type: "'bottom' | 'right' | 'left' | 'top'", defaultValue: "'bottom'", description: '슬라이드 인 진입 방향' }
    ],
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
    callout: {
      type: 'tip',
      title: '스크린 리더 알림',
      text: '동적으로 추가되는 중요한 경고문구에는 role="alert" 또는 aria-live="assertive"를 선언하세요.'
    },
    propsSpec: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: "'info'", description: '알림 테마 및 아이콘 색상' },
      { name: 'dismissible', type: 'boolean', defaultValue: 'true', description: '닫기(X) 버튼 표시 여부' }
    ],
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
    callout: {
      type: 'note',
      title: '키보드 네비게이션',
      text: '좌우 방향키(ArrowLeft/ArrowRight)로 탭 간 이동이 가능해야 합니다 (WAI-ARIA Tabs 패턴).'
    },
    propsSpec: [
      { name: 'defaultValue', type: 'string', defaultValue: 'undefined', description: '초기 활성화 탭 식별값' },
      { name: 'onChange', type: '(tab: string) => void', defaultValue: 'undefined', description: '탭 전환 시 콜백' }
    ],
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
    callout: {
      type: 'tip',
      title: '색상 독립성',
      text: '색약자를 위해 단순 색상뿐만 아니라 아이콘이나 텍스트(예: "활성", "오프라인")를 함께 병기하세요.'
    },
    propsSpec: [
      { name: 'variant', type: "'primary' | 'success' | 'warning' | 'danger' | 'neutral'", defaultValue: "'primary'", description: '배지 색상 스타일' },
      { name: 'pulse', type: 'boolean', defaultValue: 'false', description: '실시간 연결 펄스 애니메이션 도트 표시' }
    ],
    htmlSnippet: `<span class="atom-badge atom-badge-primary">NEW</span>
<span class="atom-badge atom-badge-success">활성</span>
<span class="atom-badge atom-badge-warning">대기</span>`,
    reactSnippet: `<Badge variant="primary">NEW</Badge>
<Badge variant="success" pulse>온라인</Badge>`
  },
  {
    id: 'card',
    name: '인터랙티브 카드 (Card Surface)',
    category: 'data',
    source: 'shadcn + bootstrap',
    description: '음영 및 테두리 서피스, 호버 리프트 인터랙션이 내장된 범용 카드',
    callout: {
      type: 'note',
      title: '토큰 바인딩',
      text: '카드의 배경색은 --atom-bg-surface, 테두리는 --atom-border-subtle, 그림자는 --atom-shadow-sm 토큰과 연동됩니다.'
    },
    propsSpec: [
      { name: 'interactive', type: 'boolean', defaultValue: 'false', description: '호버 리프트 및 클릭 피드백 활성화' }
    ],
    htmlSnippet: `<div class="atom-card atom-card-interactive">
  <h4 class="atom-card-title">계좌 잔액</h4>
  <p class="atom-card-body">1,500,000원</p>
</div>`,
    reactSnippet: `<Card interactive>
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
    callout: {
      type: 'tip',
      title: '가로 스크롤 보호',
      text: '테이블 외곽에 overflow-x-auto를 래핑하여 모바일 뷰포트에서 페이지 전체가 깨지는 현상을 방지하세요.'
    },
    propsSpec: [
      { name: 'striped', type: 'boolean', defaultValue: 'false', description: '홀수 행 배경 스트라이프 효과' },
      { name: 'hoverable', type: 'boolean', defaultValue: 'true', description: '마우스 오버 시 행 하이라이트' }
    ],
    htmlSnippet: `<table class="atom-table">
  <thead><tr><th>이름</th><th>상태</th><th>역할</th></tr></thead>
  <tbody><tr><td>김민수</td><td>정상</td><td>관리자</td></tr></tbody>
</table>`,
    reactSnippet: `<Table hoverable>
  <TableHeader><TableRow><TableHead>이름</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>김민수</TableCell></TableRow></TableBody>
</Table>`
  }
];
