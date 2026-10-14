export type ComponentCategory = 'all' | 'form' | 'feedback' | 'navigation' | 'data';

export interface PropItem {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface DosAndDont {
  do: string;
  dont: string;
}

export interface GalleryComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  source: string;
  description: string;
  htmlSnippet: string;
  reactSnippet: string;
  vueSnippet?: string;
  callout?: {
    type: 'note' | 'tip' | 'warning';
    title: string;
    text: string;
  };
  propsSpec?: PropItem[];
  useCases: string[];
  usagePatterns: string[];
  dosAndDonts: DosAndDont[];
  relatedPatternIds: string[];
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
    useCases: [
      '폼 제출, 송금, 회원가입 등 한 화면의 가장 핵심적인 단일 전환 행동 (Primary CTA)',
      '다이얼로그 모달 내 취소, 이전 단계 등 보조 액션 (Secondary / Outline)',
      '회원 탈퇴, 데이터 영구 삭제, 주문 취소 등 파괴적 액션 (Destructive)',
      '비동기 API 요청 통신 중 중복 클릭을 방지하고 상태를 전달하는 로딩 스피너 (Loading)'
    ],
    usagePatterns: [
      '화면(또는 뷰포트)당 단 1개의 Primary 버튼만 배치하여 사용자의 시각적 위계와 인지 과부하를 방지합니다.',
      '확인/취소 버튼 그룹 배치 시 엄지손가락 접근성을 고려하여 우측(또는 모바일 최하단)에 주 액션을 배치합니다.',
      '모바일 터치 타깃 영역은 최소 44x44px 이상을 보장하여 오터치를 예방합니다.'
    ],
    dosAndDonts: [
      {
        do: '"저장하기", "계좌로 송금하기", "장바구니 담기"와 같이 명확한 동사형 라벨을 사용합니다.',
        dont: '"확인", "클릭", "네"와 같이 사용자가 버튼 클릭 후 일어날 결과를 예측하기 어려운 모호한 라벨을 쓰지 마세요.'
      },
      {
        do: '로딩 중일 때는 버튼 너비가 줄어들거나 텍스트가 깜빡이지 않도록 인라인 스피너를 유지합니다.',
        dont: '로딩 상태인데도 사용자가 버튼을 2번 연속 클릭할 수 있게 방치하지 마세요.'
      }
    ],
    relatedPatternIds: ['fintech-transfer', 'ecommerce-checkout', 'saas-dashboard', 'developer-docs'],
    propsSpec: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost'", defaultValue: "'primary'", description: '버튼의 시각적 강조 스타일' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: '버튼 패딩 및 글자 크기' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: '로딩 스피너 활성화 및 상호작용 차단' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '클릭 차단 및 불투명도 축소' }
    ],
    htmlSnippet: `<button class="atom-btn atom-btn-primary">Primary Action</button>
<button class="atom-btn atom-btn-secondary">Secondary</button>
<button class="atom-btn atom-btn-outline">Outline</button>
<button class="atom-btn atom-btn-destructive">Delete</button>`,
    reactSnippet: `import { Button } from '@/components/ui/button';

export function ButtonDemo() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">저장하기</Button>
      <Button variant="outline">취소</Button>
      <Button variant="destructive">영구 삭제</Button>
      <Button loading>처리 중...</Button>
    </div>
  );
}`,
    vueSnippet: `<template>
  <div class="flex gap-2">
    <AtomButton variant="primary">저장하기</AtomButton>
    <AtomButton variant="outline">취소</AtomButton>
    <AtomButton :loading="isLoading">처리 중...</AtomButton>
  </div>
</template>`
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
    useCases: [
      '이메일, 비밀번호, 성명, 주소 등 표준 텍스트 정보 수집',
      '금액, 전화번호, 6자리 SMS OTP 인증 등 숫자 전용 입력',
      '실시간 자동완성 및 태그 칩이 연동되는 검색 입력창',
      '다국어 텍스트, 장문의 문의사항 입력 텍스트에어리어'
    ],
    usagePatterns: [
      '플레이스홀더(Placeholder)는 예시를 보여주는 용도로만 쓰고 라벨(Label)을 절대 대체하지 않습니다.',
      '오류 발생 시 테두리 색상 변화뿐만 아니라 인풋 하단에 명확한 에러 사유 텍스트를 반드시 함께 제공합니다.',
      '모바일 환경에서는 type="email", inputmode="numeric" 등을 명시하여 적절한 가상 키보드가 뜨도록 돕습니다.'
    ],
    dosAndDonts: [
      {
        do: '오타를 쉽게 정정할 수 있도록 우측에 원클릭 지우기(X) 클리어 버튼을 배치합니다.',
        dont: '사용자가 타이핑하는 글자 수마다 매번 화면을 깜빡거리며 유효성 경고를 띄우지 마세요(디바운스 필요).'
      }
    ],
    relatedPatternIds: ['kyc-verification', 'fintech-transfer', 'search-empty', 'blog-editor'],
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
    reactSnippet: `import { Input } from '@/components/ui/input';

export function InputDemo() {
  return (
    <Input
      label="이메일 주소"
      type="email"
      placeholder="name@company.com"
      error="유효한 이메일 형식을 입력하세요."
      clearable
    />
  );
}`,
    vueSnippet: `<template>
  <AtomInput
    v-model="email"
    label="이메일 주소"
    placeholder="name@company.com"
    :error="emailError"
  />
</template>`
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
    useCases: [
      '알림 On/Off, 다크모드, 생체인증 활성화 등 즉시 반영되는 환경설정 (Switch)',
      '회원가입 약관 필수/선택 동의 및 전체 동의 토글 (Checkbox)',
      '쇼핑몰 장바구니 상품 전체 선택 및 개별 선택',
      '단일 옵션 중 반드시 하나만 골라야 하는 결제 수단/배송지 선택 (Radio)'
    ],
    usagePatterns: [
      '스위치는 누르는 즉시 시스템에 반영되는 설정에 쓰고, 체크박스는 폼 전송 버튼을 누를 때까지 보류되는 선택에 씁니다.',
      '터치 영역을 작은 체크박스 네모에만 한정하지 않고 텍스트 라벨 전체로 확장하여 클릭 편의성을 높입니다.'
    ],
    dosAndDonts: [
      {
        do: '전체 동의 체크박스 선택 시 하위 자식 체크박스들이 일괄 동기화되도록 구현합니다.',
        dont: '마케팅 선택 동의를 필수 동의와 묶어 전체 동의를 강제하지 마세요.'
      }
    ],
    relatedPatternIds: ['kyc-verification', 'ecommerce-checkout', 'onboarding-wizard'],
    propsSpec: [
      { name: 'checked', type: 'boolean', defaultValue: 'false', description: '활성화 선택 여부' },
      { name: 'onChange', type: '(checked: boolean) => void', defaultValue: 'undefined', description: '상태 변경 이벤트 콜백' },
      { name: 'label', type: 'string', defaultValue: 'undefined', description: '인라인 라벨 텍스트' }
    ],
    htmlSnippet: `<label class="atom-switch">
  <input type="checkbox" checked />
  <span class="atom-slider"></span>
</label>`,
    reactSnippet: `import { Switch, Checkbox } from '@/components/ui/selection';

export function SelectionDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Switch checked={isEnabled} onChange={setIsEnabled} label="야간 푸시 알림 수신" />
      <Checkbox checked={isAgreed} onChange={setIsAgreed} label="이용약관 전체 동의" />
    </div>
  );
}`,
    vueSnippet: `<template>
  <AtomSwitch v-model="notifications" label="알림 수신" />
  <AtomCheckbox v-model="termsAll" label="약관 전체 동의" />
</template>`
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
    useCases: [
      '데이터 영구 삭제, 서비스 탈퇴 등 되돌릴 수 없는 행동 직전 2단계 확인',
      '송금 최종 단계에서 수취인 이름, 계좌, 금액을 최종 확인하는 다이얼로그',
      '신분증 촬영 안내, 약관 전문 읽기 팝업',
      '세션 만료 경고 및 로그인 연장 알림'
    ],
    usagePatterns: [
      'ESC 키 입력 또는 모달 바깥 백드롭 터치 시 즉각 모달이 닫히도록 닫기 인터랙션을 보장합니다.',
      '모달 오픈 시 백그라운드 본문 스크롤(Scroll Lock)을 잠가 이중 스크롤 충돌을 방지합니다.'
    ],
    dosAndDonts: [
      {
        do: '모달이 닫히면 이전에 모달을 열었던 트리거 버튼으로 포커스를 복귀시킵니다.',
        dont: '확인 모달 위에 또 다른 모달을 2중, 3중으로 겹쳐 띄우지 마세요.'
      }
    ],
    relatedPatternIds: ['fintech-transfer', 'blog-editor', 'flight-booking'],
    propsSpec: [
      { name: 'open', type: 'boolean', defaultValue: 'false', description: '다이얼로그 노출 여부' },
      { name: 'onClose', type: '() => void', defaultValue: 'undefined', description: 'ESC 또는 바깥 클릭 시 닫기 콜백' },
      { name: 'title', type: 'string', defaultValue: "''", description: '다이얼로그 헤더 제목' }
    ],
    htmlSnippet: `<div class="atom-modal-backdrop">
  <div class="atom-modal" role="dialog" aria-modal="true">
    <h3 class="atom-modal-title">정말 삭제하시겠습니까?</h3>
    <p class="atom-modal-body">삭제된 데이터는 복구할 수 없습니다.</p>
    <div class="atom-modal-actions">
      <button class="atom-btn atom-btn-outline">취소</button>
      <button class="atom-btn atom-btn-destructive">삭제</button>
    </div>
  </div>
</div>`,
    reactSnippet: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ModalDemo({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>송금 정보를 확인해주세요</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-neutral-500">김토스님에게 500,000원을 송금합니다.</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button variant="primary" onClick={onClose}>송금 실행</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
    vueSnippet: `<template>
  <AtomDialog v-model="isOpen" title="확인">
    <p>진행하시겠습니까?</p>
  </AtomDialog>
</template>`
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
    useCases: [
      '지도 앱에서 특정 핀을 탭했을 때 하단에서 올라오는 매장 상세 정보 (네이버/카카오 지도 스타일)',
      '쇼핑몰 복합 필터(가격대, 브랜드, 배송 조건) 설정 드로어',
      '모바일 햄버거 메뉴 클릭 시 우측에서 슬라이드되는 글로벌 내비게이션',
      'SNS 피드 댓글 목록 및 작성 시트'
    ],
    usagePatterns: [
      '하단 시트 상단에 시각적 핸들러 바(Handle Bar)를 배치하여 드래그 가능한 인터페이스임을 암시합니다.',
      '1단(요약 120px) ➔ 2단(반 화면 50%) ➔ 3단(전체 화면 90%) 스냅 포인트를 제공합니다.'
    ],
    dosAndDonts: [
      {
        do: '시트를 아래로 쓸어내리는(Swipe Down) 제스처로 쉽게 닫을 수 있게 합니다.',
        dont: '지도 화면 전체를 완전히 덮어버려 사용자가 현재 위치 맥락을 잃지 않게 하세요.'
      }
    ],
    relatedPatternIds: ['map-location', 'ecommerce-checkout'],
    propsSpec: [
      { name: 'open', type: 'boolean', defaultValue: 'false', description: '시트 오픈 상태' },
      { name: 'side', type: "'bottom' | 'right' | 'left' | 'top'", defaultValue: "'bottom'", description: '슬라이드 인 진입 방향' }
    ],
    htmlSnippet: `<div class="atom-sheet atom-sheet-bottom">
  <div class="atom-sheet-handle"></div>
  <div class="atom-sheet-content">
    <h3>블루보틀 성수점</h3>
    <p>영업 중 · 21:00 마감</p>
  </div>
</div>`,
    reactSnippet: `import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function SheetDemo({ isOpen, onClose }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>상세 필터 옵션</SheetTitle>
        </SheetHeader>
        <div className="py-4">옵션 항목들...</div>
      </SheetContent>
    </Sheet>
  );
}`,
    vueSnippet: `<template>
  <AtomSheet v-model="isSheetOpen" side="bottom">
    <div>시트 내용</div>
  </AtomSheet>
</template>`
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
    useCases: [
      '새 버전 기능 업데이트 및 시스템 정기 점검 공지',
      '폼 전송 후 발생한 서버 에러 목록 일괄 공지',
      '회원가입 완료 및 이메일 인증 링크 전송 피드백',
      '결제 실패 또는 일시적 네트워크 끊김 경고'
    ],
    usagePatterns: [
      '메시지 성격에 맞는 4대 시각 테마(Info, Success, Warning, Danger)를 엄격히 준수합니다.',
      '중요한 작업 플로우를 완전히 가로막는 모달 대신, 인라인으로 흐름을 방해하지 않는 알림에 사용합니다.'
    ],
    dosAndDonts: [
      {
        do: '닫기(X) 버튼을 제공하여 사용자가 확인한 메시지를 직접 숨길 수 있게 합니다.',
        dont: '페이지 접속 시 화면의 절반을 차지하는 거대한 경고 배너로 본문을 가리지 마세요.'
      }
    ],
    relatedPatternIds: ['chat-support', 'file-uploader', 'developer-docs'],
    propsSpec: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: "'info'", description: '알림 테마 및 아이콘 색상' },
      { name: 'dismissible', type: 'boolean', defaultValue: 'true', description: '닫기(X) 버튼 표시 여부' }
    ],
    htmlSnippet: `<div class="atom-alert atom-alert-info">
  <span class="atom-icon">ℹ️</span>
  <div>새로운 토큰 시스템이 적용되었습니다.</div>
</div>`,
    reactSnippet: `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function AlertDemo() {
  return (
    <Alert variant="info" dismissible>
      <AlertTitle>알림 안내</AlertTitle>
      <AlertDescription>새로운 업데이트 버전이 배포되었습니다.</AlertDescription>
    </Alert>
  );
}`,
    vueSnippet: `<template>
  <AtomAlert variant="info" dismissible>
    업데이트가 완료되었습니다.
  </AtomAlert>
</template>`
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
    useCases: [
      '대시보드 성과 지표 기간 필터 (오늘 / 7일 / 30일 / 90일)',
      '항공권 여정 선택 (왕복 / 편도 / 다구간)',
      '개발 문서 코드 언어 전환 (React / Vue / Vanilla)',
      '계정 관리 서브페이지 (프로필 / 비밀번호 / 결제수단)'
    ],
    usagePatterns: [
      '탭 클릭 시 전체 페이지 리로드가 발생하지 않고 해당 패널 영역만 즉시 교체되어야 합니다.',
      '최대 4~5개 이하의 상호 배타적인 뷰를 전환할 때만 탭을 사용합니다.'
    ],
    dosAndDonts: [
      {
        do: '현재 활성화된 탭에 고대비 배경과 브랜드 하이라이트 인디케이터를 부여합니다.',
        dont: '가로 스크롤이 들어가는 복잡한 다단 탭을 모바일 뷰에 무리하게 넣지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'flight-booking', 'developer-docs'],
    propsSpec: [
      { name: 'defaultValue', type: 'string', defaultValue: 'undefined', description: '초기 활성화 탭 식별값' },
      { name: 'onChange', type: '(tab: string) => void', defaultValue: 'undefined', description: '탭 전환 시 콜백' }
    ],
    htmlSnippet: `<div class="atom-tabs">
  <button class="atom-tab active">계정 설정</button>
  <button class="atom-tab">보안</button>
  <button class="atom-tab">결제 수단</button>
</div>`,
    reactSnippet: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="analytics">분석</TabsTrigger>
        <TabsTrigger value="reports">보고서</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">개요 내용...</TabsContent>
    </Tabs>
  );
}`,
    vueSnippet: `<template>
  <AtomTabs v-model="currentTab" :tabs="['개요', '분석', '설정']" />
</template>`
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
    useCases: [
      '신규 기능 알림 칩 ("NEW", "BETA")',
      '실시간 웹소켓 서버 연결 상태 ("온라인", "오프라인")',
      '주문 및 심사 처리 상태 ("결제완료", "배송중", "심사대기")',
      '장바구니 및 알림 벨 안 읽은 메시지 카운트 뱃지'
    ],
    usagePatterns: [
      '상태 변화가 실시간일 경우 초록색 펄스(Pulse) 도트 애니메이션을 함께 조합합니다.',
      '캡슐 형태의 둥근 모서리(--atom-radius-full)와 작은 폰트(--atom-font-body-2)를 유지합니다.'
    ],
    dosAndDonts: [
      {
        do: '성공은 초록, 경고는 주황, 위험은 빨강 등 표준적인 색상 의미를 일관되게 지킵니다.',
        dont: '텍스트가 2줄 이상 넘어가는 긴 문장을 뱃지 안에 욱여넣지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'chat-support', 'developer-docs'],
    propsSpec: [
      { name: 'variant', type: "'primary' | 'success' | 'warning' | 'danger' | 'neutral'", defaultValue: "'primary'", description: '배지 색상 스타일' },
      { name: 'pulse', type: 'boolean', defaultValue: 'false', description: '실시간 연결 펄스 애니메이션 도트 표시' }
    ],
    htmlSnippet: `<span class="atom-badge atom-badge-primary">NEW</span>
<span class="atom-badge atom-badge-success">활성</span>
<span class="atom-badge atom-badge-warning">대기</span>`,
    reactSnippet: `import { Badge } from '@/components/ui/badge';

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge variant="primary">v1.2.4</Badge>
      <Badge variant="success" pulse>온라인</Badge>
      <Badge variant="warning">심사 대기중</Badge>
    </div>
  );
}`,
    vueSnippet: `<template>
  <AtomBadge variant="success" pulse>온라인</AtomBadge>
</template>`
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
    useCases: [
      'SaaS 비즈니스 4대 핵심 지표(MRR, MAU, Churn) 요약 카드',
      '핀테크 은행 계좌 잔액 및 보유 자산 현황 서피스',
      '이커머스 쇼핑몰 상품 썸네일/가격/평점 갤러리 카드',
      '온보딩 위저드 사용자 직무 선택 라디오 카드'
    ],
    usagePatterns: [
      '클릭 가능한 카드에는 마우스 호버 시 미세하게 위로 떠오르는(-2px) 리프트 효과와 테두리 하이라이트를 부여합니다.',
      '카드 내부 패딩을 16px~24px로 넉넉히 주어 정보의 시각적 호흡을 돕습니다.'
    ],
    dosAndDonts: [
      {
        do: '서로 다른 카테고리의 정보를 별개의 독립된 카드로 시각적으로 그룹핑합니다.',
        dont: '카드 안에 과도하게 복잡한 중첩 카드나 수십 개의 액션을 난잡하게 배치하지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'onboarding-wizard', 'map-location'],
    propsSpec: [
      { name: 'interactive', type: 'boolean', defaultValue: 'false', description: '호버 리프트 및 클릭 피드백 활성화' }
    ],
    htmlSnippet: `<div class="atom-card atom-card-interactive">
  <h4 class="atom-card-title">계좌 잔액</h4>
  <p class="atom-card-body">1,500,000원</p>
</div>`,
    reactSnippet: `import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function CardDemo() {
  return (
    <Card interactive>
      <CardHeader>
        <CardTitle>토스뱅크 자유적금</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₩ 12,450,000</div>
        <p className="text-xs text-neutral-500">연 4.5% 최고 금리 적용 중</p>
      </CardContent>
    </Card>
  );
}`,
    vueSnippet: `<template>
  <AtomCard interactive title="보유 자산">
    <div>₩ 12,450,000</div>
  </AtomCard>
</template>`
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
    useCases: [
      '회원 목록, 결제 내역, 주문서 로그 등 다중 컬럼 정형 데이터 조회',
      'API 엔드포인트 파라미터 및 Props 규격 명세서',
      '항공권 / 호텔 가격 및 옵션 비교표',
      '권한 매트릭스 설정 테이블'
    ],
    usagePatterns: [
      '행(Row)에 마우스오버 시 은은한 배경색 변화를 주어 현재 읽고 있는 행을 시각적으로 고정합니다.',
      '데이터가 0건일 때는 테이블이 텅 빈 채 깨지지 않도록 빈 상태(Empty State) 행을 중앙에 노출합니다.'
    ],
    dosAndDonts: [
      {
        do: '숫자 데이터는 우측 정렬, 텍스트 데이터는 좌측 정렬, 상태 뱃지는 중앙 정렬합니다.',
        dont: '모바일 화면에서 가로 스크롤 안내 없이 오른쪽 컬럼을 잘라먹지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'developer-docs'],
    propsSpec: [
      { name: 'striped', type: 'boolean', defaultValue: 'false', description: '홀수 행 배경 스트라이프 효과' },
      { name: 'hoverable', type: 'boolean', defaultValue: 'true', description: '마우스 오버 시 행 하이라이트' }
    ],
    htmlSnippet: `<table class="atom-table">
  <thead><tr><th>이름</th><th>상태</th><th>역할</th></tr></thead>
  <tbody><tr><td>김민수</td><td>정상</td><td>관리자</td></tr></tbody>
</table>`,
    reactSnippet: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export function TableDemo() {
  return (
    <Table hoverable>
      <TableHeader>
        <TableRow>
          <TableHead>사용자</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>김민수</TableCell>
          <TableCell>활성</TableCell>
          <TableCell>소유자</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
    vueSnippet: `<template>
  <AtomTable :headers="['이름', '상태']" :rows="userRows" hoverable />
</template>`
  }
];
