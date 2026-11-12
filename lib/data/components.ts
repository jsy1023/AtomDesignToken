export type ComponentCategory = 'all' | 'form' | 'feedback' | 'navigation' | 'data' | 'layout';

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
    description: '3단계 시각적 위계(Primary, Secondary, Ghost/Icon)와 시스템 시맨틱 상태(Brand, Success, Warning, Destructive)를 결합한 완성형 버튼 풀세트',
    callout: {
      type: 'tip',
      title: '버튼 3계층 위계 & 시스템 색상 매핑',
      text: '한 화면에는 단 1개의 Primary(주 행동) 버튼을 두고, 보조 행동은 Secondary/Outline, 부가 제어는 Ghost 또는 Icon-Only 버튼을 배치하세요. 색상은 임의 헥스가 아닌 브랜드(Primary), 성공(Green), 경고(Amber), 위험(Red) 시맨틱 토큰에 연동됩니다.'
    },
    useCases: [
      '화면의 가장 핵심적인 단일 전환 행동 - Primary CTA (저장, 결제, 회원가입 등 브랜드 색상)',
      '다이얼로그 모달 내 취소, 이전 단계 등 중립 보조 행동 - Secondary / Outline',
      '테이블 행 액션, 네비게이션 서브 메뉴, 툴바 등 시각적 부담을 줄여야 하는 부가 액션 - Ghost',
      '좋아요, 즐겨찾기, 닫기(X), 더보기(...) 등 공간 절약형 원자 버튼 - Icon-Only Button',
      '송금 완료, 승인, 상태 변경 등 긍정적 확정 행동 - Success (초록색)',
      '데이터 영구 삭제, 회원 탈퇴, 결제 취소 등 불가역적 파괴적 액션 - Destructive (빨간색)',
      '주의 확인, 임시 보관 파기 등 경고 수반 액션 - Warning (주황색)'
    ],
    usagePatterns: [
      '화면당 단 1개의 Primary 버튼만 배치하여 사용자의 시각적 위계와 인지 과부하를 방지합니다 (1-Primary 원칙).',
      '3계층 위계 규칙: Primary(주 행동, 솔리드) > Secondary/Outline(보조 행동, 테두리) > Ghost(최저 시각적 가중치, 투명 배경).',
      '시스템 상태 색상 규칙: 빨강=위험(Destructive), 주황=경고(Warning), 초록=성공(Success), Primary=브랜드(Primary CTA).',
      '아이콘 단독 버튼(isIconOnly)은 반드시 aria-label 속성을 함께 지정하여 스크린리더 접근성을 보장합니다.'
    ],
    dosAndDonts: [
      {
        do: '"저장하기", "계좌로 송금하기", "장바구니 담기"와 같이 명확한 동사형 라벨을 사용합니다.',
        dont: '"확인", "클릭", "네"와 같이 사용자가 버튼 클릭 후 일어날 결과를 예측하기 어려운 모호한 라벨을 쓰지 마세요.'
      },
      {
        do: '위험 행동(삭제)에는 Destructive(빨간색), 긍정 확정 행동에는 Success(초록색) 등 기능과 시맨틱 색상을 일치시킵니다.',
        dont: '단순 강조를 위해 일반 확인 버튼에 빨간색(Destructive)을 남발하여 사용자에게 불안감을 주지 마세요.'
      },
      {
        do: '로딩 중일 때는 버튼 너비가 줄어들거나 텍스트가 깜빡이지 않도록 인라인 스피너를 유지합니다.',
        dont: '로딩 상태인데도 사용자가 버튼을 2번 연속 클릭할 수 있게 방치하지 마세요.'
      }
    ],
    relatedPatternIds: ['fintech-transfer', 'ecommerce-checkout', 'saas-dashboard', 'developer-docs'],
    propsSpec: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning'", defaultValue: "'primary'", description: '시각적 위계 및 시스템 상태 색상 스타일' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: '버튼 패딩 및 글자 크기 스케일' },
      { name: 'isIconOnly', type: 'boolean', defaultValue: 'false', description: '텍스트 없이 정사각형 아이콘 단독 버튼 모드 (패딩 및 곡률 최적화)' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: '로딩 스피너 활성화 및 상호작용 차단' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '클릭 차단 및 불투명도 축소' }
    ],
    htmlSnippet: `<!-- 1. 계층별 (Hierarchy) -->
<button class="atom-btn atom-btn-primary">Primary (1계층)</button>
<button class="atom-btn atom-btn-secondary">Secondary (2계층)</button>
<button class="atom-btn atom-btn-ghost">Ghost (3계층)</button>

<!-- 2. 시스템 시맨틱 색상 (System Status) -->
<button class="atom-btn atom-btn-success">성공 (Success)</button>
<button class="atom-btn atom-btn-warning">경고 (Warning)</button>
<button class="atom-btn atom-btn-destructive">위험 (Destructive)</button>

<!-- 3. 아이콘 단독 (Icon-Only) -->
<button class="atom-btn atom-btn-icon atom-btn-secondary" aria-label="즐겨찾기">★</button>`,
    reactSnippet: `import { Button } from '@/components/ui/button';
import { Star, Trash2, Check } from 'lucide-react';

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* 3계층 위계 (Hierarchy) */}
      <div className="flex gap-2">
        <Button variant="primary">Primary (1계층)</Button>
        <Button variant="secondary">Secondary (2계층)</Button>
        <Button variant="ghost">Ghost (3계층)</Button>
      </div>

      {/* 시스템 상태 색상 (Semantic Status) */}
      <div className="flex gap-2">
        <Button variant="success">성공 완료</Button>
        <Button variant="warning">주의 확인</Button>
        <Button variant="destructive">영구 삭제</Button>
      </div>

      {/* 아이콘 버튼 & 로딩 */}
      <div className="flex gap-2 items-center">
        <Button isIconOnly variant="secondary" aria-label="즐겨찾기"><Star className="w-4 h-4" /></Button>
        <Button isIconOnly variant="ghost" aria-label="삭제"><Trash2 className="w-4 h-4 text-rose-500" /></Button>
        <Button loading>처리 중...</Button>
      </div>
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
  },
  {
    id: 'calendar',
    name: '캘린더 & 날짜 선택기 (Calendar & DatePicker)',
    category: 'form',
    source: 'shadcn + react-day-picker',
    description: '월별 달력 내비게이션, 단일 및 범위 날짜 선택, 오늘 표시, 비활성화 날짜를 지원하는 W3C 접근성 준수 캘린더',
    callout: {
      type: 'tip',
      title: '키보드 탐색 접근성(A11y)',
      text: '방향키(상/하/좌/우)로 날짜 셀 간 포커스를 이동하고 Space 또는 Enter로 선택할 수 있도록 aria-selected 및 role="grid" 구조를 준수합니다.'
    },
    useCases: [
      '예약 시스템 (숙소 예약, 항공권 일정, 진료 예약 등)의 입실/퇴실 일자 선택',
      '금융 및 대시보드의 기간별 거래 내역 조회 (최근 7일, 이번 달, 맞춤 기간)',
      '생년월일 및 만료일 입력 폼',
      '할 일(To-Do) 및 프로젝트 마일스톤 마감 기한 설정'
    ],
    usagePatterns: [
      '현재 선택된 날짜와 "오늘(Today)"의 시각적 위계를 구분하여 사용자가 달력 내에서 현재 시점을 빠르게 인지하도록 합니다.',
      '예약 불가능한 과거 날짜나 휴무일은 비활성화(Disabled) 처리하고 명도 대비를 낮춰 직관적으로 선택을 방지합니다.',
      '모바일 환경에서는 날짜 셀 터치 타깃을 최소 36x36px 이상으로 넉넉하게 확보합니다.'
    ],
    dosAndDonts: [
      {
        do: '선택된 날짜의 연/월/일을 상단 또는 인풋 필드에 명확한 포맷(YYYY-MM-DD)으로 즉시 피드백합니다.',
        dont: '과거 일자 선택 불가 규칙이 있는데도 클릭 후에야 에러 토스트를 띄우지 마세요. 달력 셀 자체를 비활성화하세요.'
      },
      {
        do: '이전 달/다음 달로 이동할 수 있는 직관적인 화살표 버튼과 연/월 셀렉터를 함께 제공합니다.',
        dont: '10년 전 생년월일을 선택해야 하는데 월 단위 화살표 클릭만 강요하지 마세요. 연도 점프 기능을 제공하세요.'
      }
    ],
    relatedPatternIds: ['ecommerce-checkout', 'saas-dashboard'],
    propsSpec: [
      { name: 'selectedDate', type: 'Date | null', defaultValue: 'null', description: '현재 선택된 일자 객체' },
      { name: 'mode', type: "'single' | 'range'", defaultValue: "'single'", description: '단일 날짜 선택 또는 기간 범위 선택 모드' },
      { name: 'minDate', type: 'Date', defaultValue: 'undefined', description: '선택 가능한 최소 일자 (이전 날짜 비활성화)' },
      { name: 'onSelect', type: '(date: Date) => void', defaultValue: 'undefined', description: '날짜 선택 시 호출되는 콜백 핸들러' }
    ],
    htmlSnippet: `<div class="atom-calendar">
  <div class="atom-calendar-header">
    <button class="atom-calendar-nav-btn" aria-label="이전 달">&lt;</button>
    <span class="atom-calendar-title">2026년 11월</span>
    <button class="atom-calendar-nav-btn" aria-label="다음 달">&gt;</button>
  </div>
  <div class="atom-calendar-grid">
    <div class="atom-calendar-weekday">일</div>
    <div class="atom-calendar-weekday">월</div>
    <div class="atom-calendar-weekday">화</div>
    <div class="atom-calendar-weekday">수</div>
    <div class="atom-calendar-weekday">목</div>
    <div class="atom-calendar-weekday">금</div>
    <div class="atom-calendar-weekday">토</div>
    <button class="atom-calendar-day">1</button>
    <button class="atom-calendar-day atom-calendar-day-selected">6</button>
  </div>
</div>`,
    reactSnippet: `import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-4 border rounded-2xl bg-white dark:bg-neutral-900 w-fit">
      <Calendar
        selected={date}
        onSelect={setDate}
        mode="single"
      />
    </div>
  );
}`,
    vueSnippet: `<template>
  <AtomCalendar v-model="selectedDate" mode="single" />
</template>`
  },
  {
    id: 'select',
    name: '커스텀 셀렉트 (Select & Dropdown)',
    category: 'form',
    source: 'radix-ui + shadcn',
    description: '키보드 네비게이션, 검색 필터링, 그룹 라벨을 완벽히 지원하는 커스텀 드롭다운 선택기',
    callout: {
      type: 'tip',
      title: '모바일 OS 기본 피커 호환',
      text: '모바일 뷰포트에서는 네이티브 <select> 요소를 보이지 않게 오버레이하여 OS 자체 휠 피커(iOS 롤러/Android 바텀 드로어)를 자연스럽게 띄울 수 있습니다.'
    },
    useCases: [
      '국가/지역 코드, 통화(KRW/USD), 은행 계좌 목록 선택',
      '상품 정렬 기준 (최신순, 인기순, 낮은 가격순, 리뷰 많은 순)',
      '관리자 대시보드의 기간 필터링 및 권한(Role) 할당',
      '수량 및 배송 메모 선택 드롭다운'
    ],
    usagePatterns: [
      '옵션 개수가 5개 이상일 때는 라디오 버튼 대신 드롭다운 셀렉트를 사용하여 화면 공간을 절약합니다.',
      '옵션이 15개 이상으로 많을 경우 상단에 인라인 검색창(Filter Input)을 포함하여 빠른 탐색을 돕습니다.',
      '선택 완료 후 트리거 버튼에 선택된 라벨과 아이콘을 직관적으로 표기합니다.'
    ],
    dosAndDonts: [
      {
        do: '아무것도 선택되지 않았을 때 "옵션을 선택하세요"와 같은 명확한 플레이스홀더를 제공합니다.',
        dont: '옵션이 2~3개밖에 안 되는데 드롭다운 안에 숨겨두지 마세요. 세그먼트 탭이나 라디오 버튼이 훨씬 편리합니다.'
      }
    ],
    relatedPatternIds: ['fintech-transfer', 'ecommerce-checkout'],
    propsSpec: [
      { name: 'options', type: 'Array<{ value: string; label: string; icon?: ReactNode }>', defaultValue: '[]', description: '드롭다운 목록에 노출될 옵션 배열' },
      { name: 'value', type: 'string', defaultValue: "''", description: '현재 선택된 옵션의 고유 식별 값' },
      { name: 'placeholder', type: 'string', defaultValue: "'선택하세요'", description: '미선택 상태의 안내 문구' },
      { name: 'onChange', type: '(value: string) => void', defaultValue: 'undefined', description: '옵션 선택 변경 시 이벤트 핸들러' }
    ],
    htmlSnippet: `<div class="atom-select">
  <button class="atom-select-trigger" aria-haspopup="listbox">
    <span>선택하세요</span>
    <span class="atom-select-arrow">▼</span>
  </button>
  <ul class="atom-select-menu" role="listbox">
    <li class="atom-select-option" role="option">옵션 1</li>
    <li class="atom-select-option" role="option">옵션 2</li>
  </ul>
</div>`,
    reactSnippet: `import { Select } from '@/components/ui/select';
import { useState } from 'react';

const BANK_OPTIONS = [
  { value: 'toss', label: '토스뱅크' },
  { value: 'kakao', label: '카카오뱅크' },
  { value: 'shinhan', label: '신한은행' },
];

export function SelectDemo() {
  const [bank, setBank] = useState('toss');
  return <Select options={BANK_OPTIONS} value={bank} onChange={setBank} />;
}`,
    vueSnippet: `<template>
  <AtomSelect v-model="selectedBank" :options="bankOptions" />
</template>`
  },
  {
    id: 'accordion',
    name: '아코디언 (Accordion & Collapse)',
    category: 'data',
    source: 'shadcn + radix-ui',
    description: 'FAQ, 약관, 상세 설정 등 수직으로 컨텐츠를 확장/축소하여 시각적 복잡도를 낮추는 아코디언 컴포넌트',
    callout: {
      type: 'tip',
      title: '단일 vs 다중 열림 모드',
      text: '한 번에 하나의 섹션만 열려야 하는 FAQ나 위저드 단계는 type="single"을, 여러 설정을 동시에 열어 비교해야 하는 곳은 type="multiple"을 사용하세요.'
    },
    useCases: [
      '자주 묻는 질문(FAQ) 및 고객센터 안내',
      '장바구니 결제 단계별 상세 내역 (할인 쿠폰, 배송지 정보, 결제 수단)',
      '모바일 설정 메뉴 및 권한 관리 항목',
      '복잡한 약관 및 개인정보 처리방침 전문 접기/펼치기'
    ],
    usagePatterns: [
      '각 항목 우측에 회전하는 화살표(Chevron) 아이콘을 배치하여 열림/닫힘 상태를 명확히 안내합니다.',
      '애니메이션 전환 시 높이(Height) 변화를 부드럽게 처리하여 화면이 갑자기 튀는 레이아웃 쉬프트(CLS)를 방지합니다.'
    ],
    dosAndDonts: [
      {
        do: '헤더 텍스트는 간결한 의문문이나 핵심 명사로 작성하여 사용자가 원하는 정보를 한눈에 훑어볼 수 있게 합니다.',
        dont: '페이지 진입 시 모든 항목을 펼쳐두지 마세요. 스크롤이 불필요하게 길어집니다.'
      }
    ],
    relatedPatternIds: ['developer-docs', 'saas-dashboard'],
    propsSpec: [
      { name: 'items', type: 'Array<{ id: string; title: string; content: ReactNode }>', defaultValue: '[]', description: '아코디언 패널 목록' },
      { name: 'type', type: "'single' | 'multiple'", defaultValue: "'single'", description: '단일 활성화 또는 다중 활성화 허용 여부' }
    ],
    htmlSnippet: `<div class="atom-accordion">
  <div class="atom-accordion-item">
    <button class="atom-accordion-trigger">
      <span>수수료는 얼마인가요?</span>
      <span class="atom-accordion-icon">▾</span>
    </button>
    <div class="atom-accordion-content">
      <p>평생 무제한 무료 송금을 지원합니다.</p>
    </div>
  </div>
</div>`,
    reactSnippet: `import { Accordion } from '@/components/ui/accordion';

const FAQ_ITEMS = [
  { id: '1', title: '송금 한도는 얼마인가요?', content: '1회 1,000만원, 1일 5,000만원까지 송금 가능합니다.' },
  { id: '2', title: '해외 송금도 지원하나요?', content: '전 세계 30개국으로 당일 해외 송금을 지원합니다.' }
];

export function AccordionDemo() {
  return <Accordion items={FAQ_ITEMS} type="single" />;
}`,
    vueSnippet: `<template>
  <AtomAccordion :items="faqItems" type="single" />
</template>`
  },
  {
    id: 'tooltip',
    name: '툴팁 & 팝오버 (Tooltip & Popover)',
    category: 'feedback',
    source: 'radix-ui + floating-ui',
    description: '아이콘이나 축약된 정보에 마우스를 올리거나 포커스했을 때 보충 설명을 띄워주는 부동형 컨텍스트 오버레이',
    callout: {
      type: 'tip',
      title: '키보드 포커스 반응',
      text: '마우스 hover뿐만 아니라 키보드 Tab 키로 포커스 진입(focus-visible)했을 때도 툴팁이 동일하게 노출되어야 스크린리더 사용자가 소외되지 않습니다.'
    },
    useCases: [
      '텍스트 축약(Truncation) 시 말줄임표(...)로 잘린 원본 전체 텍스트 확인',
      '복잡한 금융 용어 (APR, 원리금균등상환, DSR) 옆 물음표(?) 아이콘의 도움말 설명',
      '아이콘 전용 버튼(Icon Button - 복사, 다운로드, 설정 등)의 기능 라벨 안내',
      '비활성화된 버튼에 마우스오버 시 "권한이 없습니다"와 같은 비활성화 사유 피드백'
    ],
    usagePatterns: [
      '사용자가 의도치 않게 스치며 지나갈 때 깜빡이지 않도록 150~200ms의 적절한 노출 지연(delay)을 둡니다.',
      '화면 가장자리에 닿았을 때 자동으로 반대 방향으로 뒤집히는 뷰포트 충돌 회피(collision flip)를 지원합니다.'
    ],
    dosAndDonts: [
      {
        do: '1~2줄 이내의 짧고 명료한 보조 설명문으로 간결하게 구성합니다.',
        dont: '툴팁 안에 클릭해야 하는 링크나 버튼 같은 인터랙티브 요소를 넣지 마세요. 그 경우엔 Popover나 Dialog를 쓰세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'developer-docs'],
    propsSpec: [
      { name: 'content', type: 'string | ReactNode', defaultValue: "''", description: '툴팁 말풍선 안에 들어갈 도움말 텍스트' },
      { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", description: '툴팁이 노출될 기준 방향' }
    ],
    htmlSnippet: `<div class="atom-tooltip-wrapper">
  <button class="atom-btn atom-btn-outline">정보</button>
  <div class="atom-tooltip-bubble atom-tooltip-top" role="tooltip">
    추가 설명 내용입니다.
  </div>
</div>`,
    reactSnippet: `import { Tooltip } from '@/components/ui/tooltip';

export function TooltipDemo() {
  return (
    <Tooltip content="클릭 시 클립보드에 복사됩니다" position="top">
      <button className="atom-btn atom-btn-outline">복사</button>
    </Tooltip>
  );
}`,
    vueSnippet: `<template>
  <AtomTooltip content="계좌번호가 복사됩니다" position="top">
    <button class="atom-btn">복사</button>
  </AtomTooltip>
</template>`
  },
  {
    id: 'toast',
    name: '토스트 알림 (Toast & Notification)',
    category: 'feedback',
    source: 'sonner + shadcn',
    description: '작업의 성공, 실패, 경고 메시지를 사용자 화면 모서리에 비간섭적(Non-intrusive)으로 띄우고 자동 소멸시키는 토스트 스낵바',
    callout: {
      type: 'tip',
      title: '자동 소멸 시간 및 일시 정지',
      text: '기본 3~4초 후 자동 닫힘을 지원하되, 사용자가 마우스를 올리거나 터치 중일 때는 타이머가 일시 정지되어 충분히 읽을 시간을 보장하세요.'
    },
    useCases: [
      '클립보드 복사 완료 ("링크가 복사되었습니다")',
      '설정 저장 및 프로필 수정 완료 피드백',
      '네트워크 일시 오류 또는 API 요청 실패 시 재시도 안내',
      '장바구니 담기 완료 후 "장바구니 바로가기" 인라인 액션 버튼 제공'
    ],
    usagePatterns: [
      '모바일에서는 화면 최상단 또는 최하단 전체 너비로 노출하고, 데스크톱에서는 우측 상단/하단에 컴팩트하게 배치합니다.',
      '동시에 여러 알림이 발생할 경우 최대 3개까지 스택(Stacking)하여 겹쳐 보여주고 오래된 알림부터 순차적으로 제거합니다.'
    ],
    dosAndDonts: [
      {
        do: '성공은 녹색(Emerald), 에러는 적색(Rose), 정보는 청색(Blue)으로 상태별 시멘틱 색상을 직관적으로 부여합니다.',
        dont: '사용자가 즉시 확인하고 결정해야 하는 중요한 확인 절차(예: 결제 완료 후 계좌 차감)에 모달 대신 토스트만 쓰고 닫히게 두지 마세요.'
      }
    ],
    relatedPatternIds: ['fintech-transfer', 'ecommerce-checkout'],
    propsSpec: [
      { name: 'message', type: 'string', defaultValue: "''", description: '토스트 본문 메시지' },
      { name: 'type', type: "'success' | 'error' | 'info' | 'warning'", defaultValue: "'info'", description: '토스트 상태 시멘틱 스타일' },
      { name: 'duration', type: 'number', defaultValue: '3000', description: '화면에 유지될 밀리초 단위 시간' }
    ],
    htmlSnippet: `<div class="atom-toast-container">
  <div class="atom-toast atom-toast-success">
    <span class="atom-toast-icon">✓</span>
    <span class="atom-toast-message">저장이 완료되었습니다.</span>
  </div>
</div>`,
    reactSnippet: `import { Toast, useToast } from '@/components/ui/toast';

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <button 
      onClick={() => toast({ title: '성공', message: '계좌 송금이 완료되었습니다.', type: 'success' })}
      className="atom-btn atom-btn-primary"
    >
      송금하기
    </button>
  );
}`,
    vueSnippet: `<template>
  <button @click="$toast.success('저장되었습니다')">저장</button>
</template>`
  },
  {
    id: 'pagination',
    name: '페이지네이션 (Pagination)',
    category: 'navigation',
    source: 'shadcn + bootstrap',
    description: '대용량 데이터 리스트를 여러 페이지로 나누어 번호별 및 이전/다음 탐색을 지원하는 페이지네이션 네비게이션',
    callout: {
      type: 'tip',
      title: '접근성(A11y) 네비게이션 태그',
      text: '<nav aria-label="페이지 탐색">으로 래핑하고 현재 활성화된 페이지 번호 버튼에 aria-current="page" 속성을 반드시 부여하세요.'
    },
    useCases: [
      '게시판 목록, 공지사항, FAQ 질문 리스트 탐색',
      '전자상거래 쇼핑몰의 상품 검색 결과 목록 (1페이지당 20/40/60개)',
      '관리자 대시보드의 회원 관리 및 주문 로그 테이블',
      '검색엔진의 검색 결과 페이지 이동'
    ],
    usagePatterns: [
      '페이지 번호가 10개를 초과할 경우 중간 번호를 생략 기호(...)로 축약하여 모바일에서도 레이아웃이 터지지 않도록 합니다.',
      '첫 페이지에서는 "이전" 버튼을, 마지막 페이지에서는 "다음" 버튼을 비활성화(disabled)하여 경계 상태를 안내합니다.'
    ],
    dosAndDonts: [
      {
        do: '현재 몇 번째 페이지를 보고 있는지 명확한 활성(Active) 하이라이트를 제공합니다.',
        dont: '모바일 환경에서 1부터 20까지의 모든 숫자 버튼을 가로로 길게 늘어놓아 화면을 뚫고 나가게 하지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'developer-docs'],
    propsSpec: [
      { name: 'currentPage', type: 'number', defaultValue: '1', description: '현재 활성화된 페이지 번호' },
      { name: 'totalPages', type: 'number', defaultValue: '10', description: '전체 페이지 총 개수' },
      { name: 'onPageChange', type: '(page: number) => void', defaultValue: 'undefined', description: '페이지 번호 클릭 시 변경 핸들러' }
    ],
    htmlSnippet: `<nav class="atom-pagination" aria-label="페이지 네비게이션">
  <button class="atom-pagination-btn" disabled>&lt; 이전</button>
  <button class="atom-pagination-btn atom-pagination-active">1</button>
  <button class="atom-pagination-btn">2</button>
  <button class="atom-pagination-btn">3</button>
  <button class="atom-pagination-btn">다음 &gt;</button>
</nav>`,
    reactSnippet: `import { Pagination } from '@/components/ui/pagination';
import { useState } from 'react';

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
}`,
    vueSnippet: `<template>
  <AtomPagination :current-page="page" :total-pages="10" @change="p => page = p" />
</template>`
  },
  {
    id: 'radio',
    name: '라디오 그룹 (Radio Group & Cards)',
    category: 'form',
    source: 'shadcn + radix-ui',
    description: '서로 배타적인 단일 선택을 제공하며, 기본 원형 라디오 및 카드형 선택 옵션을 지원하는 라디오 그룹',
    callout: {
      type: 'tip',
      title: '키보드 내비게이션 접근성',
      text: 'role="radiogroup"과 role="radio"를 적용하고 방향키(상/하/좌/우)로 옵션 간 포커스를 즉시 전환할 수 있어야 합니다.'
    },
    useCases: [
      '결제 수단 선택 (신용카드, 카카오페이, 토스페이, 무통장입금)',
      '배송 옵션 선택 (일반 택배, 새벽 배송, 매장 픽업)',
      '성별 및 회원 등급 선택 폼',
      '요금제 플랜 선택 카드 (Basic, Pro, Enterprise)'
    ],
    usagePatterns: [
      '옵션이 2~4개 사이일 때 드롭다운 대신 라디오를 사용하여 모든 선택지를 한눈에 비교할 수 있게 합니다.',
      '중요한 과금 플랜이나 결제 수단은 단순 텍스트 라디오 대신 타이틀, 설명, 뱃지가 포함된 "라디오 카드" 형태를 권장합니다.'
    ],
    dosAndDonts: [
      {
        do: '사용자가 옵션의 의미를 파악하기 쉽도록 기본값(Default Value)을 하나 지정해 둡니다.',
        dont: '다중 선택이 가능한 항목에 체크박스 대신 라디오 버튼을 쓰지 마세요.'
      }
    ],
    relatedPatternIds: ['ecommerce-checkout', 'fintech-transfer'],
    propsSpec: [
      { name: 'name', type: 'string', defaultValue: "''", description: '라디오 폼 필드 그룹명' },
      { name: 'options', type: 'Array<{ value: string; label: string; description?: string }>', defaultValue: '[]', description: '라디오 선택 옵션 목록' },
      { name: 'value', type: 'string', defaultValue: "''", description: '현재 선택된 값' },
      { name: 'onChange', type: '(val: string) => void', defaultValue: 'undefined', description: '선택 변경 핸들러' }
    ],
    htmlSnippet: `<div class="atom-radio-group" role="radiogroup">
  <label class="atom-radio-label">
    <input type="radio" name="payment" value="card" class="atom-radio" checked />
    <span>신용/체크카드</span>
  </label>
  <label class="atom-radio-label">
    <input type="radio" name="payment" value="toss" class="atom-radio" />
    <span>토스페이</span>
  </label>
</div>`,
    reactSnippet: `import { RadioGroup, RadioItem } from '@/components/ui/radio';
import { useState } from 'react';

export function RadioDemo() {
  const [pay, setPay] = useState('card');
  return (
    <RadioGroup value={pay} onChange={setPay}>
      <RadioItem value="card" label="신용/체크카드" />
      <RadioItem value="toss" label="토스페이 간편결제" />
    </RadioGroup>
  );
}`,
    vueSnippet: `<template>
  <AtomRadioGroup v-model="selectedPay" :options="payOptions" />
</template>`
  },
  {
    id: 'slider',
    name: '슬라이더 (Range Slider)',
    category: 'form',
    source: 'radix-ui + shadcn',
    description: '연속적인 수치(가격, 볼륨, 기간 등)를 마우스 드래그나 터치로 직관적으로 조절할 수 있는 슬라이더 바',
    callout: {
      type: 'tip',
      title: '키보드 스텝 조절(A11y)',
      text: 'Thumb 핸들에 포커스된 상태에서 좌/우 방향키로 step 단위, PageUp/PageDown으로 10배 단위로 증감할 수 있도록 지원합니다.'
    },
    useCases: [
      '쇼핑몰 상품 가격 필터 (예: 10,000원 ~ 150,000원)',
      '대출 금액 및 상환 기간 설정 시뮬레이터',
      '미디어 플레이어 음량 및 재생 위치 조절',
      '화면 밝기, 폰트 크기 등 사용자 개인화 설정'
    ],
    usagePatterns: [
      '슬라이더 조절 중 현재 선택된 수치를 Thumb 상단 툴팁이나 인접 인풋 필드에 실시간으로 표시합니다.',
      '최소값(min), 최대값(max), 현재값(value)을 트랙 양 끝에 라벨로 배치하여 직관성을 높입니다.'
    ],
    dosAndDonts: [
      {
        do: '원하는 값에 딱 맞춰 떨어지도록 적절한 step(예: 1,000원 단위, 5% 단위)을 설정합니다.',
        dont: '정밀한 숫자를 직접 입력해야 하는 필드에 슬라이더만 단독으로 제공하지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'ecommerce-checkout'],
    propsSpec: [
      { name: 'value', type: 'number', defaultValue: '50', description: '현재 슬라이더 수치' },
      { name: 'min', type: 'number', defaultValue: '0', description: '최소값' },
      { name: 'max', type: 'number', defaultValue: '100', description: '최대값' },
      { name: 'step', type: 'number', defaultValue: '1', description: '단계별 증감 폭' },
      { name: 'onChange', type: '(val: number) => void', defaultValue: 'undefined', description: '수치 변경 콜백' }
    ],
    htmlSnippet: `<div class="atom-slider">
  <input type="range" class="atom-slider-input" min="0" max="100" value="50" />
</div>`,
    reactSnippet: `import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

export function SliderDemo() {
  const [val, setVal] = useState(50);
  return <Slider value={val} onChange={setVal} min={0} max={100} />;
}`,
    vueSnippet: `<template>
  <AtomSlider v-model="volume" :min="0" :max="100" />
</template>`
  },
  {
    id: 'avatar',
    name: '아바타 (User Avatar & Stack)',
    category: 'data',
    source: 'shadcn + radix-ui',
    description: '사용자 프로필 이미지, 이미지 로딩 실패 시 이니셜 폴백, 접속 상태 배지 및 중첩 아바타 스택 지원',
    callout: {
      type: 'tip',
      title: '이미지 실패 시 즉각적 Fallback',
      text: '프로필 이미지가 깨지거나 없을 때는 사용자의 이름 앞 글자(이니셜)를 브랜드 컬러 배경 위에 깔끔하게 띄워 시각적 결함을 방지합니다.'
    },
    useCases: [
      '글로벌 헤더 우측 상단의 내 프로필 메뉴 아이콘',
      '댓글 작성자 및 채팅 대화 상대 프로필',
      '프로젝트 협업 멤버 목록 및 배정자 아바타 스택 (+3명 등)',
      '온라인/오프라인 접속 상태를 나타내는 상태 점(Green Dot)'
    ],
    usagePatterns: [
      '원형(Circular) 형태를 기본으로 하되, 팀/조직이나 브랜드 로고는 둥근 사각형(Rounded Rect) 형태를 권장합니다.',
      '협업 도구에서는 여러 아바타가 겹쳐진 아바타 스택(Overlap Stack)으로 공간을 절약합니다.'
    ],
    dosAndDonts: [
      {
        do: 'alt 속성에 사용자 이름을 명시하여 스크린리더가 누구의 프로필인지 읽을 수 있게 합니다.',
        dont: '이미지가 로드되는 동안 깨진 이미지 아이콘이 화면에 그대로 노출되게 두지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard'],
    propsSpec: [
      { name: 'src', type: 'string', defaultValue: "''", description: '프로필 이미지 URL' },
      { name: 'alt', type: 'string', defaultValue: "''", description: '사용자 이름/대체 텍스트' },
      { name: 'fallback', type: 'string', defaultValue: "''", description: '대체 이니셜 (예: 김민수 -> KM)' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: '아바타 크기' },
      { name: 'status', type: "'online' | 'offline' | 'busy'", defaultValue: 'undefined', description: '접속 상태 표시' }
    ],
    htmlSnippet: `<div class="atom-avatar atom-avatar-md">
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" alt="이지은" class="atom-avatar-img" />
  <span class="atom-avatar-status atom-avatar-status-online"></span>
</div>`,
    reactSnippet: `import { Avatar } from '@/components/ui/avatar';

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar src="/user.jpg" alt="김토스" fallback="KT" size="md" status="online" />
      <Avatar fallback="JD" size="md" />
    </div>
  );
}`,
    vueSnippet: `<template>
  <AtomAvatar src="/user.jpg" alt="홍길동" fallback="HG" status="online" />
</template>`
  },
  {
    id: 'progress',
    name: '진행도 (Progress Bar & Step)',
    category: 'feedback',
    source: 'shadcn + bootstrap',
    description: '작업의 완료 진행률(%) 또는 다단계 위저드의 현재 단계를 시각적으로 전달하는 프로그레스 바',
    callout: {
      type: 'tip',
      title: '접근성(A11y) 실시간 값 전달',
      text: 'role="progressbar"와 함께 aria-valuenow, aria-valuemin, aria-valuemax를 동기화하여 스크린리더에 진행률을 전달하세요.'
    },
    useCases: [
      '대용량 파일 업로드/다운로드 전송률 게이지',
      '회원가입, 신용대출 심사, 설문조사 등 1/4단계 스텝 진행도',
      '크라우드펀딩 모금 목표 달성률 (예: 124% 달성)',
      '스토리지 용량 사용량 (예: 15GB 중 12GB 사용)'
    ],
    usagePatterns: [
      '진행률이 100%에 도달하면 색상을 성공(Emerald) 컬러로 전환하여 완결성을 부여합니다.',
      '서버 응답 대기 중 진행률을 알 수 없을 때는 무한 왕복하는 인디터미닛(Indeterminate) 애니메이션을 적용합니다.'
    ],
    dosAndDonts: [
      {
        do: '바 우측이나 상단에 "75%"와 같이 구체적인 숫자를 함께 표기합니다.',
        dont: '진행률이 0%일 때 바 전체가 사라져 어디에 게이지가 있는지 모르게 하지 마세요.'
      }
    ],
    relatedPatternIds: ['fintech-transfer', 'ecommerce-checkout'],
    propsSpec: [
      { name: 'value', type: 'number', defaultValue: '0', description: '현재 진행 수치 (0~100)' },
      { name: 'max', type: 'number', defaultValue: '100', description: '최대 수치' },
      { name: 'variant', type: "'primary' | 'success' | 'warning'", defaultValue: "'primary'", description: '진행도 바 색상' },
      { name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: '수치 미정 무한 애니메이션 모드' }
    ],
    htmlSnippet: `<div class="atom-progress" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
  <div class="atom-progress-bar atom-progress-primary" style="width: 70%"></div>
</div>`,
    reactSnippet: `import { Progress } from '@/components/ui/progress';

export function ProgressDemo() {
  return <Progress value={75} variant="primary" showLabel />;
}`,
    vueSnippet: `<template>
  <AtomProgress :value="uploadPercent" variant="success" />
</template>`
  },
  {
    id: 'skeleton',
    name: '스켈레톤 로더 (Skeleton Shimmer)',
    category: 'feedback',
    source: 'shadcn + tailwind',
    description: '콘텐츠 로딩 중 화면 깜빡임을 방지하고 레이아웃 골격을 은은한 시머(Shimmer) 애니메이션으로 미리 보여주는 플레이스홀더',
    callout: {
      type: 'tip',
      title: '체감 로딩 속도(Perceived Performance)',
      text: '빙글빙글 도는 스피너보다 실제 렌더링될 카드와 텍스트 모양의 스켈레톤을 노출할 때 사용자가 체감하는 대기 시간이 최대 40% 단축됩니다.'
    },
    useCases: [
      '피드 리스트, 뉴스 카드, 상품 썸네일 최초 로드 시',
      '사용자 프로필 및 대시보드 위젯 API 패치 대기 중',
      '테이블 데이터 행(Row) 비동기 로딩 플레이스홀더',
      '댓글 영역 로딩 대기 상태'
    ],
    usagePatterns: [
      '실제 노출될 컴포넌트의 가로/세로/라운딩 비율과 최대한 1:1로 일치시켜 레이아웃 쉬프트(CLS)를 제로화합니다.'
    ],
    dosAndDonts: [
      {
        do: '텍스트 라인은 3줄 중 마지막 줄의 너비를 60% 정도로 줄여 실제 문단처럼 보이게 합니다.',
        dont: '스켈레톤의 애니메이션을 너무 빠르거나 번쩍이게 만들어 사용자 눈을 피로하게 하지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'ecommerce-checkout'],
    propsSpec: [
      { name: 'width', type: 'string | number', defaultValue: "'100%'", description: '너비' },
      { name: 'height', type: 'string | number', defaultValue: "'1rem'", description: '높이' },
      { name: 'rounded', type: "'sm' | 'md' | 'lg' | 'full'", defaultValue: "'md'", description: '모서리 곡률' }
    ],
    htmlSnippet: `<div class="atom-skeleton-card">
  <div class="atom-skeleton atom-skeleton-circle" style="width: 48px; height: 48px"></div>
  <div class="atom-skeleton atom-skeleton-text" style="width: 80%"></div>
  <div class="atom-skeleton atom-skeleton-text" style="width: 50%"></div>
</div>`,
    reactSnippet: `import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonDemo() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton width="48px" height="48px" rounded="full" />
      <div className="space-y-2 flex-1">
        <Skeleton width="70%" height="16px" />
        <Skeleton width="40%" height="12px" />
      </div>
    </div>
  );
}`,
    vueSnippet: `<template>
  <div class="flex gap-3">
    <AtomSkeleton width="40px" height="40px" rounded="full" />
    <AtomSkeleton width="80%" height="20px" />
  </div>
</template>`
  },
  {
    id: 'breadcrumb',
    name: '브레드크럼 (Breadcrumb Navigation)',
    category: 'navigation',
    source: 'shadcn + bootstrap',
    description: '웹사이트의 정보 구조(IA)에서 사용자의 현재 위치를 계층 경로로 나타내고 상위 단계로 즉시 이동할 수 있는 탐색 경로',
    callout: {
      type: 'tip',
      title: '접근성(A11y)과 SEO 구조화 데이터',
      text: '<nav aria-label="Breadcrumb"> 태그를 사용하고 현재 마지막 페이지에는 aria-current="page"를 지정하여 검색엔진과 스크린리더를 모두 만족시킵니다.'
    },
    useCases: [
      '전자상거래 쇼핑몰의 카테고리 계층 (홈 > 여성패션 > 아우터 > 코트)',
      '개발자 기술 문서 계층 (Docs > Components > Form > Calendar)',
      '관리자 대시보드의 하위 폴더 및 세부 설정 탐색',
      '부동산 매물 계층 (서울시 > 강남구 > 역삼동)'
    ],
    usagePatterns: [
      '구분자(Separator)로는 슬래시(/) 또는 우측 꺾쇠(Chevron Right >) 아이콘을 사용하여 시각적 흐름을 안내합니다.',
      '모바일 환경에서 경로가 너무 길 경우 중간 단계를 드롭다운 또는 말줄임표(...)로 축약합니다.'
    ],
    dosAndDonts: [
      {
        do: '경로의 마지막 항목은 현재 머물고 있는 페이지이므로 클릭할 수 없는 일반 텍스트로 처리합니다.',
        dont: '1단계 깊이의 얕은 페이지에 불필요하게 브레드크럼을 남발하지 마세요.'
      }
    ],
    relatedPatternIds: ['developer-docs', 'ecommerce-checkout'],
    propsSpec: [
      { name: 'items', type: 'Array<{ label: string; href?: string }>', defaultValue: '[]', description: '경로 단계별 라벨 및 링크 배열' },
      { name: 'separator', type: 'string | ReactNode', defaultValue: "'/'", description: '항목 간 구분자' }
    ],
    htmlSnippet: `<nav class="atom-breadcrumb" aria-label="브레드크럼">
  <ol class="atom-breadcrumb-list">
    <li class="atom-breadcrumb-item"><a href="/">홈</a></li>
    <li class="atom-breadcrumb-separator">/</li>
    <li class="atom-breadcrumb-item"><a href="/components">컴포넌트</a></li>
    <li class="atom-breadcrumb-separator">/</li>
    <li class="atom-breadcrumb-item atom-breadcrumb-current" aria-current="page">캘린더</li>
  </ol>
</nav>`,
    reactSnippet: `import { Breadcrumb } from '@/components/ui/breadcrumb';

const PATH = [
  { label: '홈', href: '/' },
  { label: '문서', href: '/guide' },
  { label: '컴포넌트' }
];

export function BreadcrumbDemo() {
  return <Breadcrumb items={PATH} />;
}`,
    vueSnippet: `<template>
  <AtomBreadcrumb :items="pathItems" />
</template>`
  },
  {
    id: 'separator',
    name: '디바이더 (Separator & Divider)',
    category: 'data',
    source: 'radix-ui + shadcn',
    description: '콘텐츠 그룹이나 UI 요소 간의 시각적 경계를 깔끔하게 나누는 가로/세로 시멘틱 구분선',
    callout: {
      type: 'tip',
      title: '시멘틱 역할(role="separator")',
      text: '단순 장식용 구분선일 때는 aria-hidden="true"를, 의미 있는 구획 분리일 때는 role="separator" 및 aria-orientation 속성을 지정합니다.'
    },
    useCases: [
      '드롭다운 메뉴나 네비게이션 내 계정 설정 / 로그아웃 사이의 경계선',
      '폼 영역에서 간편 로그인(SNS)과 일반 이메일 입력 사이의 "또는(OR)" 라벨 구분선',
      '헤더 메뉴 항목들 사이의 세로 버티컬 바(|)',
      '카드 내 헤더, 본문, 푸터 액션 영역 분리'
    ],
    usagePatterns: [
      '미니멀 디자인에서는 너무 짙은 검은색 선 대신 서브틀(Subtle) 테마 토큰을 사용하여 부드럽게 영역을 분리합니다.'
    ],
    dosAndDonts: [
      {
        do: '가로(Horizontal)와 세로(Vertical) 방향에 맞는 적절한 마진과 높이를 부여합니다.',
        dont: '구분선을 너무 굵고 어둡게 만들어 콘텐츠보다 눈에 띄게 하지 마세요.'
      }
    ],
    relatedPatternIds: ['saas-dashboard', 'developer-docs'],
    propsSpec: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: '구분선 방향' },
      { name: 'label', type: 'string', defaultValue: "''", description: '구분선 중앙에 들어갈 인라인 라벨 (예: OR)' }
    ],
    htmlSnippet: `<div class="atom-separator atom-separator-horizontal"></div>
<div class="atom-separator-with-label">
  <span>또는</span>
</div>`,
    reactSnippet: `import { Separator } from '@/components/ui/separator';

export function SeparatorDemo() {
  return (
    <div className="space-y-4">
      <div>섹션 A</div>
      <Separator label="또는" />
      <div>섹션 B</div>
    </div>
  );
}`,
    vueSnippet: `<template>
  <AtomSeparator orientation="horizontal" />
</template>`
  },
  {
    id: 'textarea',
    name: '텍스트에리어 (Textarea with Counter)',
    category: 'form',
    source: 'shadcn + bootstrap',
    description: '문의 내용, 댓글, 긴 본문 작성을 위한 다중 행 입력 필드 및 실시간 글자수 카운터 지원',
    callout: {
      type: 'tip',
      title: '입력 길이에 맞춘 자동 높이 조절',
      text: '고정된 높이에서 내부 스크롤이 생겨 글이 잘려 보이는 답답함을 없애기 위해 작성 내용에 맞춰 높이가 부드럽게 확장되는 auto-resize를 권장합니다.'
    },
    useCases: [
      '고객센터 1:1 문의사항 및 상세 피드백 작성',
      '블로그/커뮤니티 게시글 및 댓글 작성창',
      '배송 요청사항 및 상세 주소 입력',
      'AI 프롬프트 입력창 (멀티라인)'
    ],
    usagePatterns: [
      '최대 글자수 제한이 있는 경우 우측 하단에 "34 / 500자"와 같은 카운터를 제공하여 초과 입력을 방지합니다.',
      '내용이 비어있을 때는 "상세 내용을 입력해 주세요"와 같은 안내 플레이스홀더를 제공합니다.'
    ],
    dosAndDonts: [
      {
        do: '에러 상태일 때는 인풋과 동일하게 붉은색 테두리와 하단 에러 메시지를 노출합니다.',
        dont: '모바일 화면에서 텍스트에리어가 너무 작아 두세 글자만 보이고 스크롤되게 만들지 마세요.'
      }
    ],
    relatedPatternIds: ['developer-docs', 'saas-dashboard'],
    propsSpec: [
      { name: 'value', type: 'string', defaultValue: "''", description: '입력된 텍스트' },
      { name: 'maxLength', type: 'number', defaultValue: 'undefined', description: '최대 글자수' },
      { name: 'rows', type: 'number', defaultValue: '4', description: '기본 노출 행 수' },
      { name: 'placeholder', type: 'string', defaultValue: "''", description: '안내 문구' },
      { name: 'onChange', type: '(val: string) => void', defaultValue: 'undefined', description: '입력값 변경 핸들러' }
    ],
    htmlSnippet: `<div class="atom-textarea-group">
  <textarea class="atom-textarea" rows="4" placeholder="내용을 입력하세요"></textarea>
  <div class="atom-textarea-counter">0 / 500자</div>
</div>`,
    reactSnippet: `import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function TextareaDemo() {
  const [text, setText] = useState('');
  return <Textarea value={text} onChange={setText} maxLength={500} placeholder="피드백을 남겨주세요." />;
}`,
    vueSnippet: `<template>
  <AtomTextarea v-model="comment" :max-length="300" />
</template>`
  },
  {
    id: 'tree',
    name: '트리 뷰 (Tree View)',
    category: 'data',
    source: 'shadcn + vs-code',
    description: '폴더/파일 탐색기, 조직도, 권한 계층 등 중첩된 트리 데이터를 시각화하고 펼침/접기/선택을 지원하는 고접근성 트리 컴포넌트',
    callout: {
      type: 'tip',
      title: '접근성(A11y) 표준 준수',
      text: 'WAI-ARIA Treeview 패턴을 준수하여 컨테이너에 role="tree", 각 행에 role="treeitem", 자식 보유 시 aria-expanded와 키보드 탐색(Enter/Space)을 지원합니다.'
    },
    propsSpec: [
      { name: 'data', type: 'TreeNode[]', defaultValue: '[]', description: '트리 노드 계층 데이터 배열 ({ id, label, icon, children, disabled })' },
      { name: 'selectedId', type: 'string', defaultValue: 'undefined', description: '현재 선택된 노드의 고유 ID' },
      { name: 'onSelect', type: '(node: TreeNode) => void', defaultValue: 'undefined', description: '노드 선택 시 호출되는 콜백 함수' },
      { name: 'defaultExpandedIds', type: 'string[]', defaultValue: '[]', description: '초기에 기본으로 펼쳐둘 노드 ID 목록' },
      { name: 'className', type: 'string', defaultValue: "''", description: '루트 컨테이너에 전달할 추가 CSS 클래스' }
    ],
    useCases: [
      'IDE 및 코드 에디터의 소스코드 파일/디렉토리 계층 탐색기',
      '부서 및 팀원 조직도, 사내 권한/역할(RBAC) 부여 트리 뷰',
      '대규모 전자상거래 상품 카테고리 다단계 분류 탐색',
      '문서 및 지식베이스(Knowledge Base) 챕터/섹션 목차 내비게이션'
    ],
    usagePatterns: [
      '자식 노드가 있는 부모 노드는 접기/펼치기 토글(▶)을 명확히 제공하고, 회전 애니메이션으로 상태를 인지시킵니다.',
      '선택된 노드는 촌스러운 굵은 단면 보더(side-tab) 대신 은은한 브랜드 틴트 배경과 폰트 굵기(font-semibold)로 세련되게 표현합니다.',
      '깊은 중첩 시에는 가이드 라인(dashed border)을 가볍게 두어 시각적 위계를 한눈에 파악할 수 있도록 돕습니다.'
    ],
    dosAndDonts: [
      {
        do: '노드가 많을 경우 기본적으로 1~2단계까지만 펼치고 필요 시 사용자가 드릴다운하도록 설계합니다.',
        dont: '수백 개의 노드를 한 번에 전부 펼쳐서 세로 스크롤을 무한히 길어지게 방치하지 않습니다.'
      },
      {
        do: '키보드 사용자도 접근할 수 있도록 Space나 Enter 키로 펼침/접기 및 선택을 지원합니다.',
        dont: '마우스 더블클릭에만 의존하거나 포커스 아웃라인을 제거(outline: none)하지 않습니다.'
      }
    ],
    relatedPatternIds: ['dashboard-overview', 'filter-search'],
    htmlSnippet: '<div class="atom-tree" role="tree">\n  <ul class="atom-tree-list">\n    <li class="atom-tree-item" role="treeitem" aria-expanded="true">\n      <div class="atom-tree-node is-selected">\n        <button class="atom-tree-toggle is-expanded">▶</button>\n        <span class="atom-tree-label">src</span>\n      </div>\n    </li>\n  </ul>\n</div>',
    reactSnippet: "import { Tree, TreeNode } from 'atomsystem/components/Tree';\nimport { useState } from 'react';\n\nconst treeData: TreeNode[] = [\n  {\n    id: 'src',\n    label: 'src',\n    children: [\n      { id: 'components', label: 'components', children: [{ id: 'Button.tsx', label: 'Button.tsx' }] },\n      { id: 'index.ts', label: 'index.ts' },\n    ],\n  },\n  { id: 'package.json', label: 'package.json' },\n];\n\nexport function TreeDemo() {\n  const [selectedId, setSelectedId] = useState('index.ts');\n  return <Tree data={treeData} selectedId={selectedId} onSelect={(node) => setSelectedId(node.id)} defaultExpandedIds={['src']} />;\n}",
    vueSnippet: '<template>\n  <AtomTree :data="treeData" v-model:selected="selectedId" :default-expanded="[\'src\']" />\n</template>'
  },
  {
    id: 'container',
    name: '컨테이너 (Container)',
    category: 'layout',
    source: 'AtomSystem Universal',
    description: '디자인 토큰(--atom-container-*)과 연동되어 화면 폭에 맞춘 최적 너비 및 반응형 안전 여백(Gutter)을 제공하는 래퍼 컴포넌트',
    callout: {
      type: 'tip',
      title: '토큰 기반 너비 제어',
      text: '하드코딩된 max-w-[1200px] 대신 size="sm"|"md"|"lg"|"xl"|"2xl"|"full"을 사용하여 DTCG 표준 토큰과 100% 연동됩니다.'
    },
    propsSpec: [
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'", defaultValue: "'xl'", description: '컨테이너 최대 너비 규격 토큰 (--atom-container-*)' },
      { name: 'gutters', type: 'boolean', defaultValue: 'true', description: '화면 좌우 반응형 안전 패딩 적용 여부 (--atom-layout-gutter)' },
      { name: 'center', type: 'boolean', defaultValue: 'true', description: '중앙 정렬(mx-auto) 적용 여부' },
      { name: 'as', type: 'ElementType', defaultValue: "'div'", description: '렌더링할 시맨틱 HTML 태그 (div, section, main 등)' },
      { name: 'className', type: 'string', defaultValue: "''", description: '추가 커스텀 클래스' }
    ],
    useCases: [
      '대시보드 메인 뷰어 및 카탈로그의 최대 가로폭 통일',
      '단일 폼, 결제 페이지, 인증 화면의 좁은 중앙 정렬 (size="sm")',
      '블로그, 아티클, 지식 베이스의 가독성 중심 컨테이너 (size="md")',
      '초광폭 데이터 그리드 및 트레이딩 차트의 와이드 컨테이너 (size="2xl")'
    ],
    usagePatterns: [
      '모든 페이지 뷰어의 최상위 본문 래퍼로 Container를 사용하여 모바일/데스크톱 거터를 일관되게 유지합니다.',
      '중첩 컨테이너를 피하고, 섹션 내부에서는 Grid 또는 Stack을 사용하여 구조화합니다.'
    ],
    dosAndDonts: [
      {
        do: '페이지 성격에 맞는 size 토큰(sm, md, lg, xl, 2xl)을 지정하여 일관된 뷰포트 계층을 형성합니다.',
        dont: '페이지마다 임의의 max-w-[1140px], max-w-[1250px] 등 비표준 하드코딩 값을 난립시키지 않습니다.'
      }
    ],
    relatedPatternIds: ['dashboard-overview', 'checkout-flow'],
    htmlSnippet: '<div class="atom-container atom-container-xl">\n  <h1>컨테이너 본문</h1>\n</div>',
    reactSnippet: "import { Container } from 'atomsystem/components/Container';\n\nexport function ContainerDemo() {\n  return (\n    <Container size=\"xl\">\n      <h1 className=\"text-xl font-bold\">대시보드 뷰어</h1>\n      <p>토큰 시스템과 연동된 안전 패딩과 너비가 자동 적용됩니다.</p>\n    </Container>\n  );\n}",
    vueSnippet: '<template>\n  <div class="atom-container atom-container-xl">\n    <slot />\n  </div>\n</template>'
  },
  {
    id: 'layout',
    name: '레이아웃 & 스택 (Layout & Stack)',
    category: 'layout',
    source: 'AtomSystem Universal',
    description: '전체 페이지 쉘(Header, Sidebar, Content, Footer) 및 스페이싱 토큰 기반의 선형/격자 조립 도구(Stack, Grid, Section)',
    callout: {
      type: 'tip',
      title: '레고 조립의 뼈대',
      text: 'Layout.Header, Layout.Sidebar, Layout.Content, Layout.Stack, Layout.Grid를 활용하여 100% 토큰화된 레이아웃을 구축합니다.'
    },
    propsSpec: [
      { name: 'direction', type: "'vertical' | 'horizontal'", defaultValue: "'vertical'", description: 'Stack 배치 방향' },
      { name: 'gap', type: "'1' | '2' | '3' | '4' | '6' | '8' | '12'", defaultValue: "'4'", description: '스페이싱 토큰 단위 간격 (--atom-space-*)' },
      { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", defaultValue: "'stretch'", description: '교차축 정렬' },
      { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", defaultValue: "'start'", description: '주축 정렬' },
      { name: 'cols', type: '1 | 2 | 3 | 4 | 6 | 12', defaultValue: '3', description: 'Grid 컬럼 수' }
    ],
    useCases: [
      '대시보드 글로벌 쉘 (상단 네비바 + 좌측 사이드바 + 메인 본문)',
      '폼 필드 간의 수직 스택 정렬 (gap="4")',
      '버튼 그룹 및 액션 툴바의 수평 스택 정렬 (direction="horizontal", gap="2")',
      '반응형 카드 리스트의 3열 그리드 배치 (Grid cols={3} gap="4")'
    ],
    usagePatterns: [
      '임의의 margin-bottom, padding-top 대신 Stack의 gap 속성을 통해 토큰 기반 일관된 리듬을 유지합니다.',
      '카드 목록에는 Grid 컴포넌트를 사용하여 모바일(1열) -> 태블릿(2열) -> 데스크톱(3열) 반응형 전환을 보장합니다.'
    ],
    dosAndDonts: [
      {
        do: 'Stack과 Grid에 정의된 토큰 gap("2", "4", "6", "8")을 사용하여 여백을 체계화합니다.',
        dont: '자식 엘리먼트마다 제각각 mb-[17px], mt-[23px] 등 불규칙한 인라인 마진을 부여하지 않습니다.'
      }
    ],
    relatedPatternIds: ['dashboard-overview', 'filter-search'],
    htmlSnippet: '<div class="atom-layout-shell">\n  <header class="atom-layout-header">헤더</header>\n  <main class="atom-layout-content">\n    <div class="atom-stack-v atom-gap-4">스택 본문</div>\n  </main>\n</div>',
    reactSnippet: "import { Layout, Container, Stack, Grid } from 'atomsystem/components/Layout';\n\nexport function LayoutDemo() {\n  return (\n    <Layout>\n      <Layout.Header>헤더</Layout.Header>\n      <Layout.Content>\n        <Container size=\"xl\">\n          <Stack gap=\"6\">\n            <h1 className=\"text-2xl font-bold\">대시보드</h1>\n            <Grid cols={3} gap=\"4\">\n              <div>카드 1</div>\n              <div>카드 2</div>\n              <div>카드 3</div>\n            </Grid>\n          </Stack>\n        </Container>\n      </Layout.Content>\n    </Layout>\n  );\n}",
    vueSnippet: '<template>\n  <div class="atom-layout-shell">\n    <slot />\n  </div>\n</template>'
  }
];

