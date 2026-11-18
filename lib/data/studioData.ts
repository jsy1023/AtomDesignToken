export type PaletteCategory = 'color' | 'size' | 'spacing' | 'radius' | 'typography' | 'status';

export interface SemanticStatusToken {
  id: string; // e.g. '--atom-color-primary'
  key: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  name: string; // e.g. 'Primary (주요/브랜드)'
  description: string;
  paletteId: string; // e.g. '--atom-palette-blue-500'
  hoverPaletteId: string; // e.g. '--atom-palette-blue-600'
  subtlePaletteId: string; // e.g. '--atom-palette-blue-50'
}

export const INITIAL_SEMANTIC_STATUS_TOKENS: SemanticStatusToken[] = [
  {
    id: '--atom-color-primary',
    key: 'primary',
    name: 'Primary (주요 브랜드 액션)',
    description: '핵심 액션 버튼, 링크, 활성 탭 인디케이터, 포커스 하이라이트',
    paletteId: '--atom-palette-blue-500',
    hoverPaletteId: '--atom-palette-blue-600',
    subtlePaletteId: '--atom-palette-blue-50',
  },
  {
    id: '--atom-color-secondary',
    key: 'secondary',
    name: 'Secondary (보조 액션 및 서피스)',
    description: '취소, 닫기 버튼, 보조 배지, 중립 인터랙션 영역',
    paletteId: '--atom-palette-gray-200',
    hoverPaletteId: '--atom-palette-gray-300',
    subtlePaletteId: '--atom-palette-gray-50',
  },
  {
    id: '--atom-color-success',
    key: 'success',
    name: 'Success (성공 및 긍정 지표)',
    description: '결제/승인 완료 버튼, 상태 성공 배지, 정상 가동 상태',
    paletteId: '--atom-palette-emerald-500',
    hoverPaletteId: '--atom-palette-emerald-600',
    subtlePaletteId: '--atom-palette-emerald-50',
  },
  {
    id: '--atom-color-danger',
    key: 'danger',
    name: 'Danger / Destructive (위험 및 에러)',
    description: '영구 삭제/취소 버튼, 폼 유효성 에러 보더, 치명적 경고 배지',
    paletteId: '--atom-palette-rose-500',
    hoverPaletteId: '--atom-palette-rose-600',
    subtlePaletteId: '--atom-palette-rose-50',
  },
  {
    id: '--atom-color-warning',
    key: 'warning',
    name: 'Warning (주의 및 대기)',
    description: '주의 환기 버튼, 검토 대기 배지, 만료 임박 알림',
    paletteId: '--atom-palette-amber-500',
    hoverPaletteId: '--atom-palette-amber-600',
    subtlePaletteId: '--atom-palette-amber-50',
  },
];

export interface PaletteVariable {
  id: string; // e.g. '--atom-palette-blue-500'
  name: string; // e.g. 'Blue 500'
  category: PaletteCategory;
  value: string; // e.g. '#3182f6' or '8px'
  description?: string;
  family?: string; // e.g. 'blue', 'gray', 'emerald', 'rose', 'amber', 'purple', 'neutral'
}

export interface ComponentPropertySpec {
  key: string;
  label: string;
  category: 'color' | 'radius' | 'spacing' | 'size' | 'typography';
  defaultPaletteId: string;
}

/**
 * 1. Type: 조형과 뼈대가 다른 "새로운 디자인의 컴포넌트 외형 양식"
 * 예: Button의 Solid, Outline, Ghost, Soft, Pill, Elevated
 *     Card의 Outlined, Elevated, Flat, Accent-Border
 *     Badge의 Solid, Subtle, Outline, Dot
 *     Input의 Outlined, Filled, Underlined
 */
export interface ComponentTypeSpec {
  id: string; // e.g. 'solid', 'outline', 'ghost', 'soft', 'pill', 'elevated'
  name: string; // e.g. 'Solid (솔리드 채움형)', 'Outline (외곽선형)'
  description?: string;
  whenToUse: string; // "~상황에는 이 디자인 형태를 쓴다"
  whenToUseEn?: string;
  antiPattern?: string; // "~상황에서는 이 타입을 쓰지 마세요"
  visualTraits?: {
    hasBorder?: boolean;
    hasBackground?: boolean;
    borderRadius?: string;
    shadow?: string;
  };
}

/**
 * 전 컴포넌트 기본 디자인 Type (외형 양식) 프리셋 카탈로그
 */
export const DEFAULT_COMPONENT_TYPES: Record<string, ComponentTypeSpec[]> = {
  button: [
    {
      id: 'solid',
      name: 'Solid (솔리드 채움형)',
      description: '배경 색상이 꽉 찬 가장 직관적이고 표준적인 버튼 외형',
      whenToUse: '화면에서 가장 주목을 받아야 하는 주요 전환 목표(CTA)나 시각적 비중이 큰 액션에 사용합니다.',
      whenToUseEn: 'Use for high-priority CTA actions where visual prominence is paramount.',
      antiPattern: '한 화면에 너무 많은 솔리드 버튼을 배치하면 시각적 위계가 무너집니다.',
    },
    {
      id: 'outline',
      name: 'Outline (외곽선형)',
      description: '배경이 투명하고 테두리로 경계를 표현하는 정돈된 외형',
      whenToUse: '솔리드 버튼을 보조하거나, 필터 열기, 다운로드 등 2차 액션에 사용합니다.',
      whenToUseEn: 'Use to complement solid buttons for secondary actions like filters or downloads.',
      antiPattern: '어두운 배경에서 시인성이 떨어지지 않도록 충분한 대비의 보더 컬러를 지정하세요.',
    },
    {
      id: 'ghost',
      name: 'Ghost (고스트 투명형)',
      description: '평상시 배경과 테두리가 없고 마우스 오버 시에만 서피스가 반응하는 미니멀 외형',
      whenToUse: '툴바, 테이블 행 내 메뉴, 상단 네비게이션 등 주변 시각적 간섭을 최소화해야 하는 환경에 사용합니다.',
      whenToUseEn: 'Use in dense toolbars or table actions to eliminate visual clutter.',
      antiPattern: '단독으로 중요한 CTA 액션에 고스트 버튼을 사용하면 사용자가 버튼인지 인지하지 못합니다.',
    },
    {
      id: 'soft',
      name: 'Soft (소프트 연한배경형)',
      description: '10% 이하의 은은한 틴트 배경이 깔려 부드러운 느낌을 주는 모던 SaaS 외형',
      whenToUse: '솔리드보다 가볍지만 아웃라인보다 뚜렷한 영역감을 원할 때, 정보성 태그 버튼에 사용합니다.',
      whenToUseEn: 'Use for subtle emphasis softer than solid but more distinct than outline.',
    },
    {
      id: 'pill',
      name: 'Pill (라운드 캡슐형)',
      description: '곡률 9999px(full)로 양 끝이 완전히 둥글게 감싸진 라운드형 외형',
      whenToUse: '랜딩 페이지의 히어로 CTA, 모바일 앱의 퀵 액션 등 친근하고 캐주얼한 룩앤필에 사용합니다.',
      whenToUseEn: 'Use for consumer apps or hero CTA sections seeking a friendly aesthetic.',
    },
    {
      id: 'elevated',
      name: 'Elevated (그림자 입체형)',
      description: '바닥면에서 떠 있는 듯한 입체적 섀도우를 가진 플로팅 외형',
      whenToUse: '지도 위 버튼, 플로팅 액션 버튼(FAB)처럼 다른 복잡한 콘텐츠 위에 띄워야 할 때 사용합니다.',
      whenToUseEn: 'Use for Floating Action Buttons (FAB) resting above complex underlying content.',
      antiPattern: '평면적인 미니멀 레이아웃에 남발하면 시각적 위계가 어지러워집니다.',
    },
    {
      id: 'gradient',
      name: 'Gradient (그라디언트 강조형)',
      description: '2개 이상의 시스템 컬러가 부드럽게 전환되는 프리미엄 강조 외형',
      whenToUse: 'AI 기능 트리거, Pro 플랜 업그레이드, VIP 혜택 등 특별한 기능 전환을 유도할 때 사용합니다.',
      whenToUseEn: 'Use for premium conversion actions such as AI features or Pro upgrades.',
      antiPattern: '일반적인 저장이나 확인 버튼에 그라디언트를 사용하면 시각적 피로를 초래합니다.',
    },
    {
      id: 'glassmorphic',
      name: 'Glassmorphic (글래스모피즘 반투명형)',
      description: '반투명 유리 질감(backdrop-blur)과 미세한 빛 반사 보더를 가진 미래지향적 외형',
      whenToUse: '배경에 이미지, 비디오, 일러스트가 깔려 있는 히어로 섹션이나 다크모드 대시보드에 사용합니다.',
      whenToUseEn: 'Use over rich backgrounds, video heroes, or dark mode surfaces.',
      antiPattern: '단색 단조로운 흰색 배경 위에 사용하면 블러 효과가 드러나지 않습니다.',
    },
    {
      id: 'link',
      name: 'Link (텍스트 언더라인형)',
      description: '박스 패딩 없이 본문 인라인 링크처럼 밑줄 인터랙션으로 동작하는 미니멀 외형',
      whenToUse: '약관 전문 보기, 더 알아보기, 이전 단계 건너뛰기 등 텍스트 중심 보조 동작에 사용합니다.',
      whenToUseEn: 'Use for inline text actions like "Learn more" or "Skip step".',
    },
    {
      id: 'dashed',
      name: 'Dashed (점선 외곽선형)',
      description: '점선 보더를 통해 비어 있는 슬롯이나 새로운 항목 추가를 시각적으로 은유하는 외형',
      whenToUse: '+ 새 항목 추가, 파일 업로드 슬롯, 새 변수 생성 등 신규 생성 유도 액션에 사용합니다.',
      whenToUseEn: 'Use for creation slots or drop zones like "+ Add Item" or "Upload File".',
    },
    {
      id: 'neumorphic',
      name: 'Neumorphic (소프트 엠보싱 입체형)',
      description: '바닥 서피스에서 부드럽게 솟아오른 듯한 이중 음양 섀도우를 가진 스큐어모픽 외형',
      whenToUse: '스마트 홈 IoT 제어기, 미디어 플레이어 토글 버튼, 실험적 대시보드에 사용합니다.',
      whenToUseEn: 'Use for tactile physical control metaphors like smart home IoT controls.',
    },
    {
      id: 'floating-action',
      name: 'Floating Action (FAB 플로팅 서클)',
      description: '화면 우하단이나 콘텐츠 상단에 항상 떠 있는 고대비 원형 고정 액션 외형',
      whenToUse: '모바일/웹의 메인 글쓰기(+), 고객 지원 채팅 팝업 등 핵심 퀵 액션에 사용합니다.',
      whenToUseEn: 'Use for persistent quick-trigger actions like compose or chat support.',
    },
  ],
  card: [
    {
      id: 'outlined',
      name: 'Outlined (외곽선 테두리형)',
      description: '은은한 1px 테두리로 콘텐츠 영역을 정갈하게 구획하는 기본 카드',
      whenToUse: '대시보드 위젯, 그리드 목록 등 정돈된 구조적 정보 표시에 적합합니다.',
    },
    {
      id: 'elevated',
      name: 'Elevated (그림자 부각형)',
      description: '부드러운 입체 음영을 통해 바닥면과 분리되는 플로팅 카드',
      whenToUse: '추천 요금제, 클릭 가능한 인터랙티브 카드 등 시각적 몰입이 필요한 곳에 사용합니다.',
    },
    {
      id: 'flat',
      name: 'Flat (평면 배경형)',
      description: '테두리 없이 은은한 보조 배경색으로만 영역을 구분하는 미니멀 카드',
      whenToUse: '배경이 복잡하지 않은 깔끔한 화면에서 가벼운 그룹핑에 적합합니다.',
    },
    {
      id: 'accent-border',
      name: 'Accent-Border (강조 라인형)',
      description: '상단이나 좌측에 브랜드 액센트 컬러 바가 들어간 상태 강조형 카드',
      whenToUse: '공지사항, 경고 카드, 프리미엄 혜택 카드 등 특정 상태나 등급을 강조할 때 사용합니다.',
    },
  ],
  badge: [
    {
      id: 'solid',
      name: 'Solid (채움형)',
      description: '선명한 배경색으로 시선을 끄는 고대비 배지',
      whenToUse: '신규(New), 긴급 알림 등 즉각적인 주의가 필요한 경우에 사용합니다.',
    },
    {
      id: 'subtle',
      name: 'Subtle (소프트형)',
      description: '연한 틴트 배경과 짙은 텍스트의 조화로 편안한 가독성을 제공하는 배지',
      whenToUse: '테이블 상태 태그, 카테고리 분류 등 일상적인 정보 표시에 가장 권장됩니다.',
    },
    {
      id: 'outline',
      name: 'Outline (외곽선형)',
      description: '투명 배경에 1px 테두리만 있는 미니멀 배지',
      whenToUse: '버전 태그, 메타데이터 등 배경 색상을 오염시키지 않아야 할 때 사용합니다.',
    },
    {
      id: 'dot',
      name: 'Dot (인디케이터형)',
      description: '좌측에 실시간 상태를 알리는 작은 원형 점(Dot)이 포함된 배지',
      whenToUse: '서버 상태(온라인/오프라인), 빌드 진행 여부 등 라이브 상태 표시에 적합합니다.',
    },
  ],
  input: [
    {
      id: 'outlined',
      name: 'Outlined (테두리형)',
      description: '1px 외곽선으로 입력 필드의 경계를 명확히 전달하는 표준 인풋',
      whenToUse: '대부분의 웹 폼, 회원가입, 결제 등 신뢰도 높은 입력 양식에 사용합니다.',
    },
    {
      id: 'filled',
      name: 'Filled (배경 채움형)',
      description: '은은한 회색 배경으로 터치 영역을 직관적으로 보여주는 모바일 친화형 인풋',
      whenToUse: '모바일 뷰포트, 빠른 텍스트 입력창 등에 적합합니다.',
    },
    {
      id: 'underlined',
      name: 'Underlined (밑줄형)',
      description: '하단에만 1px 경계선이 있는 미니멀 텍스트 인풋',
      whenToUse: '디자인 위주의 럭셔리 커머스나 가벼운 인라인 편집에 사용합니다.',
    },
  ],
};

export function getComponentTypes(componentId: string, customTypes?: ComponentTypeSpec[]): ComponentTypeSpec[] {
  if (customTypes && customTypes.length > 0) return customTypes;
  const presets = DEFAULT_COMPONENT_TYPES[componentId.toLowerCase()];
  if (presets && presets.length > 0) return presets;
  return [
    {
      id: 'default-type',
      name: 'Standard (표준 디자인형)',
      description: '기본 시스템 토큰에 기반한 표준 디자인 양식',
      whenToUse: '일반적인 UI 구성 및 기본 레이아웃 배치에 사용합니다.',
    },
    {
      id: 'outlined-type',
      name: 'Outlined (외곽선형)',
      description: '테두리를 중심으로 가볍게 경계를 표현하는 보조 디자인 양식',
      whenToUse: '주변 콘텐츠와의 시각적 간섭을 줄이고 싶을 때 사용합니다.',
    },
  ];
}

/**
 * 2. Variable: "빨강은 위험, 노랑은 경고, primary는 브랜드" 같은 시맨틱 역할 및 비주얼 의미론
 */
export type SemanticVariableRole = 
  | 'primary'      // 브랜드 대표 컬러 (Primary CTA, 핵심 브랜드 액션)
  | 'secondary'    // 보조/중립 컬러 (취소, 닫기, 서브 액션)
  | 'danger'       // 빨강: 치명적 위험, 영구 삭제, 유효성 실패
  | 'warning'      // 노랑: 주의 환기, 만료 임박, 대기/보류
  | 'success'      // 초록: 성공, 작업 완료, 승인, 긍정 지표
  | 'info'         // 파랑/하늘: 일반 안내, 가이드 정보
  | 'outline'      // 외곽선: 테두리 위주 저강도 액션
  | 'ghost';       // 고스트: 배경 없는 미니멀 투명 액션

export interface SemanticVariableDefinition {
  role: SemanticVariableRole;
  label: string; // e.g. 'Primary (브랜드)', 'Danger (빨강/위험)', 'Warning (노랑/경고)', 'Success (초록/성공)'
  meaning: string; // e.g. '브랜드 시그니처 컬러를 강조하여 사용자의 시선을 집중시키는 역할'
  badgeColorClass: string;
}

export const SEMANTIC_VARIABLE_DICTIONARY: Record<SemanticVariableRole, SemanticVariableDefinition> = {
  primary: {
    role: 'primary',
    label: '프라이머리 (Primary)',
    meaning: '브랜드 대표 컬러를 적용하여 사용자에게 단 하나의 결정적 목표(결제, 제출, 핵심 액션)를 집중시키는 비주얼 의미',
    badgeColorClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
  },
  secondary: {
    role: 'secondary',
    label: '세컨더리 (Secondary)',
    meaning: '취소, 닫기, 이전 단계 등 사용자 인터랙션을 지원하되 시각적 부담을 줄이는 중립 톤 의미',
    badgeColorClass: 'bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400',
  },
  danger: {
    role: 'danger',
    label: '위험/에러 (Danger / Destructive)',
    meaning: '빨강은 위험! 영구 삭제, 계약 해지, 복구 불가 작업 등 치명적 결과를 경고하는 비주얼 의미',
    badgeColorClass: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400',
  },
  warning: {
    role: 'warning',
    label: '주의/경고 (Warning)',
    meaning: '노랑은 경고! 주의 환기, 만료 임박, 대기/보류 등 사용자의 추가 확인이 필요한 상황을 알리는 비주얼 의미',
    badgeColorClass: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
  },
  success: {
    role: 'success',
    label: '성공/완료 (Success)',
    meaning: '초록은 성공! 결제 완료, 정상 가동, 데이터 저장 완료 등 긍정적 결과를 시각화하는 비주얼 의미',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
  },
  info: {
    role: 'info',
    label: '안내/정보 (Info)',
    meaning: '파랑은 안내! 일반 도움말, 신규 기능 배지 등 시스템 정보 고지를 나타내는 비주얼 의미',
    badgeColorClass: 'bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400',
  },
  outline: {
    role: 'outline',
    label: '외곽선 (Outline)',
    meaning: '은은한 테두리를 강조하여 배경 채우기 없이 가볍고 정돈된 느낌을 주는 보조 선택 의미',
    badgeColorClass: 'bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400',
  },
  ghost: {
    role: 'ghost',
    label: '고스트 (Ghost)',
    meaning: '배경과 테두리가 없는 완전 투명 형태로 호버 시에만 반응하여 주변 시각적 잡음을 최소화하는 의미',
    badgeColorClass: 'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400',
  },
};

/**
 * 3. Status: "hover, disabled 같은 상태 정보 구조"
 * UI 컴포넌트의 인터랙션 라이프사이클에 따른 상태 정보
 */
export type ComponentInteractiveStatus = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';

export interface ComponentStatusSpec {
  status: ComponentInteractiveStatus;
  label: string; // '기본 (Default)', '호버 (Hover)', '클릭 (Active)', '포커스 (Focus)', '비활성 (Disabled)', '로딩 (Loading)'
  description: string;
  descriptionEn?: string;
  behavior: string;
  behaviorEn?: string;
}

export const COMPONENT_STATUS_PRESETS: ComponentStatusSpec[] = [
  {
    status: 'default',
    label: '기본 (Default)',
    description: '인터랙션 발생 전의 평상시 상태',
    descriptionEn: 'Resting state before any user interaction',
    behavior: '표준 background 및 border 토큰 적용',
    behaviorEn: 'Standard background and border tokens applied',
  },
  {
    status: 'hover',
    label: '호버 (Hover)',
    description: '마우스 포인터가 요소 위에 위치했을 때의 시각적 피드백 상태',
    descriptionEn: 'Visual feedback state when mouse pointer hovers over element',
    behavior: 'hoverBackground 토큰 적용, cursor: pointer, 은은한 음영 피드백',
    behaviorEn: 'hoverBackground token applied, cursor: pointer, subtle shadow',
  },
  {
    status: 'active',
    label: '클릭 (Active)',
    description: '마우스 버튼을 누르고 있는 순간의 압축 상태',
    descriptionEn: 'Pressed state while mouse button or touch is held',
    behavior: 'scale-[0.97] 압축 애니메이션 및 진한 색상 피드백',
    behaviorEn: 'scale-[0.97] press animation with emphasized color',
  },
  {
    status: 'focus',
    label: '포커스 (Focus)',
    description: '키보드 Tab 접근성 초점이 맞춰진 상태',
    descriptionEn: 'Accessibility state when keyboard focus is received',
    behavior: 'outline 2px solid primary, outline-offset 2px 포커스 링 표시',
    behaviorEn: 'outline 2px solid primary, outline-offset 2px focus ring',
  },
  {
    status: 'disabled',
    label: '비활성 (Disabled)',
    description: '입력 미완료 또는 권한 부족으로 사용할 수 없는 상태',
    descriptionEn: 'Unavailable state due to incomplete input or missing permissions',
    behavior: 'opacity 40%, cursor: not-allowed, 모든 마우스/키보드 이벤트 차단',
    behaviorEn: 'opacity 40%, cursor: not-allowed, all mouse/keyboard events blocked',
  },
  {
    status: 'loading',
    label: '로딩 (Loading)',
    description: '비동기 통신 또는 작업이 처리 중인 진행 상태',
    descriptionEn: 'In-progress state during async operations or network requests',
    behavior: '스피너 인디케이터 표시, pointer-events: none, 중복 클릭 방지',
    behaviorEn: 'Spinner indicator displayed, pointer-events: none, prevents re-clicks',
  },
];

export function resolveVariableRole(variableId: string): SemanticVariableRole {
  const lower = variableId.toLowerCase();
  if (lower.includes('destructive') || lower.includes('danger') || lower.includes('error')) return 'danger';
  if (lower.includes('warning') || lower.includes('pending') || lower.includes('amber')) return 'warning';
  if (lower.includes('success') || lower.includes('approved') || lower.includes('emerald')) return 'success';
  if (lower.includes('info') || lower.includes('guide') || lower.includes('sky')) return 'info';
  if (lower.includes('ghost')) return 'ghost';
  if (lower.includes('outline')) return 'outline';
  if (lower.includes('secondary')) return 'secondary';
  return 'primary';
}

export function resolveTypeSpec(componentId: string, variableId: string, customName?: string): ComponentTypeSpec {
  const role = resolveVariableRole(variableId);
  const comp = componentId.toLowerCase();

  if (comp === 'button') {
    if (role === 'primary') {
      return {
        id: 'primary-cta',
        name: '주요 실행 (Primary CTA)',
        whenToUse: '화면에서 사용자가 반드시 도달해야 하는 1순위 핵심 전환 목표(결제, 제출, 가입 등)에 사용합니다.',
        whenToUseEn: 'Use for the primary, high-priority conversion goal on screen (checkout, submit, sign up).',
        antiPattern: '한 화면에 여러 개의 Primary 버튼을 나열하면 사용자의 결정 피로를 유발합니다.',
      };
    }
    if (role === 'danger') {
      return {
        id: 'destructive-action',
        name: '위험/삭제 실행 (Destructive Action)',
        whenToUse: '영구 삭제, 계정 탈퇴, 복구 불가능한 데이터 폐기 등 위험하고 치명적인 작업을 실행할 때 사용합니다.',
        whenToUseEn: 'Use for hazardous or irreversible actions such as permanent deletion or account termination.',
        antiPattern: '단순한 취소나 뒤로 가기 동작에 붉은색 파괴적 버튼을 사용하지 마세요.',
      };
    }
    if (role === 'warning') {
      return {
        id: 'caution-action',
        name: '주의 환기 (Caution / Warning Action)',
        whenToUse: '비용 발생 경고, 설정 임시 중단, 주의가 필요한 조건부 승인에 사용합니다.',
        whenToUseEn: 'Use for actions requiring caution, cost warnings, or temporary suspension.',
      };
    }
    if (role === 'success') {
      return {
        id: 'confirm-action',
        name: '승인/완료 실행 (Confirm / Success Action)',
        whenToUse: '결제 최종 승인, 가입 완료, 변경 사항 확정 등 긍정적 액션에 사용합니다.',
        whenToUseEn: 'Use for positive completion actions like final payment approval or confirmation.',
      };
    }
    if (role === 'secondary') {
      return {
        id: 'secondary-action',
        name: '보조 동작 (Secondary Action)',
        whenToUse: '취소, 닫기, 이전 단계로 돌아가기 등 주요 액션을 보조하는 상황에 사용합니다.',
        whenToUseEn: 'Use for supporting actions like cancel, close, or navigating back.',
      };
    }
    if (role === 'ghost') {
      return {
        id: 'subtle-action',
        name: '미니멀 저강도 액션 (Ghost / Subtle)',
        whenToUse: '테이블 행 내 옵션 메뉴, 툴바의 도구 선택 등 시각적 간섭을 최소화해야 하는 맥락에 사용합니다.',
        whenToUseEn: 'Use in table rows or toolbars where visual noise should be minimized.',
      };
    }
    return {
      id: 'standard-action',
      name: '외곽선 보조 액션 (Outline Action)',
      whenToUse: '필터 열기, 다운로드 등 2차 액션의 경계를 가볍게 강조할 때 사용합니다.',
      whenToUseEn: 'Use to subtly highlight borders of secondary actions like filters or downloads.',
    };
  }

  if (comp === 'badge') {
    if (role === 'danger') {
      return {
        id: 'error-status',
        name: '에러/위험 상태 (Error Status)',
        whenToUse: '서비스 장애, 결제 실패, 유효기간 만료 등 긴급 조치가 필요한 상황에 사용합니다.',
      };
    }
    if (role === 'warning') {
      return {
        id: 'pending-status',
        name: '검토/대기 상태 (Warning / Pending)',
        whenToUse: '승인 대기 중, 검토 필요, 잔여 일수 임박 등 주의를 요구하는 상황에 사용합니다.',
      };
    }
    if (role === 'success') {
      return {
        id: 'success-status',
        name: '정상/성공 상태 (Active / Success)',
        whenToUse: '서비스 활성(Active), 결제 완료, 인증 성공 등 정상 운영 상태에 사용합니다.',
      };
    }
    return {
      id: 'info-tag',
      name: '카테고리/라벨 태그 (Category / Label Tag)',
      whenToUse: '항목의 카테고리, 버전 태그, 신규(New) 지표를 간결하게 표현할 때 사용합니다.',
    };
  }

  if (comp === 'input' || comp === 'textarea') {
    if (role === 'danger') {
      return {
        id: 'error-input',
        name: '유효성 오류 입력 (Validation Error)',
        whenToUse: '필수 항목 누락, 형식 불일치 등 사용자의 즉각적인 수정이 필요한 상황에 사용합니다.',
        antiPattern: '오류 메시지 없이 테두리만 붉게 표시하지 마세요.',
      };
    }
    if (role === 'success') {
      return {
        id: 'success-input',
        name: '검증 완료 입력 (Validation Success)',
        whenToUse: '아이디 중복 검사 통과, 보안 비밀번호 충족 등 유효성 검증이 완료된 상황에 사용합니다.',
      };
    }
    return {
      id: 'default-input',
      name: '표준 텍스트 입력 (Standard Field)',
      whenToUse: '일반적인 텍스트, 이메일, 검색어, 숫자 등의 데이터를 입력받는 상황에 사용합니다.',
    };
  }

  if (comp === 'chart') {
    if (role === 'success') {
      return {
        id: 'growth-metric',
        name: '성장 지표 트렌드 (Growth Metric)',
        whenToUse: '매출 성장, 활성 사용자 증가, 목표 달성 등 긍정적 성과를 시각화할 때 사용합니다.',
        whenToUseEn: 'Use to visualize positive outcomes like revenue growth or target completion.',
      };
    }
    if (role === 'danger') {
      return {
        id: 'alert-metric',
        name: '위험/손실 경고 (Risk / Deficit Alert)',
        whenToUse: '서버 장애율, 손실액 증가, 병목 구간 등 즉각적인 조치가 필요한 이상 지표에 사용합니다.',
        whenToUseEn: 'Use for anomaly metrics like incident rates or deficit increases needing action.',
      };
    }
    if (variableId.includes('bar')) {
      return {
        id: 'category-comparison',
        name: '항목별 실적 비교 (Category Comparison)',
        whenToUse: '월별 실적이나 부서별 데이터 등 카테고리 간의 수치를 명확하게 대조할 때 사용합니다.',
        whenToUseEn: 'Use to clearly compare values across distinct categories or time periods.',
      };
    }
    if (variableId.includes('area')) {
      return {
        id: 'volume-trend',
        name: '누적 볼륨 추세 (Cumulative Volume)',
        whenToUse: '트래픽 누적량, 총 거래액 등 면적과 볼륨감을 함께 강조해야 하는 지표에 사용합니다.',
        whenToUseEn: 'Use for metrics emphasizing volume such as cumulative traffic or total volume.',
      };
    }
    return {
      id: 'trend-tracking',
      name: '시계열 추세 추적 (TimeSeries Trend)',
      whenToUse: '주가, 온도, 성능 지표 등 시간 흐름에 따른 연속적 데이터 변화를 모니터링할 때 사용합니다.',
      whenToUseEn: 'Use to monitor continuous data changes over time such as performance or prices.',
    };
  }

  if (comp === 'offcanvas') {
    if (variableId.includes('left') || variableId.includes('nav')) {
      return {
        id: 'mobile-navigation',
        name: '모바일 탐색 서랍 (Mobile Navigation Drawer)',
        whenToUse: '모바일 뷰포트나 좁은 화면에서 글로벌 네비게이션 메뉴를 슬라이드로 제공할 때 사용합니다.',
        whenToUseEn: 'Use to provide global navigation menus via slide-out drawer on mobile or narrow screens.',
      };
    }
    if (variableId.includes('bottom') || variableId.includes('sheet')) {
      return {
        id: 'bottom-filter-sheet',
        name: '하단 필터/작업 시트 (Bottom Filter Sheet)',
        whenToUse: '모바일 엄지 영역에 최적화된 필터 설정, 정렬 옵션, 부가 작업 액션을 노출할 때 사용합니다.',
        whenToUseEn: 'Use for filter controls, sorting options, or supplementary actions optimized for thumb reach.',
      };
    }
    if (variableId.includes('settings')) {
      return {
        id: 'settings-inspector',
        name: '환경설정 슬라이드오버 (Settings Slide-over)',
        whenToUse: '사용자 환경설정, 테마 조정, 시스템 파라미터 변경 등 보조 설정 작업을 분리하여 제공할 때 사용합니다.',
        whenToUseEn: 'Use for secondary configuration tasks like user preferences, theme controls, or system params.',
      };
    }
    return {
      id: 'detail-inspector',
      name: '상세정보 인스펙터 (Detail Inspector Drawer)',
      whenToUse: '테이블이나 리스트의 특정 항목을 선택했을 때 현재 화면 컨텍스트를 유지한 채 세부 속성을 검토하고 편집할 때 사용합니다.',
      whenToUseEn: 'Use to review and edit item details in a side panel without leaving the current list context.',
    };
  }

  if (comp === 'toast') {
    if (role === 'success' || variableId.includes('success')) {
      return {
        id: 'success-feedback',
        name: '성공 완료 피드백 (Operation Success)',
        whenToUse: '데이터 저장, 전송 완료, 항목 생성 등 사용자의 작업이 성공적으로 처리되었음을 신속히 피드백할 때 사용합니다.',
        whenToUseEn: 'Use to quickly inform users of successful operations like data saved, sent, or created.',
      };
    }
    if (role === 'warning' || variableId.includes('warning')) {
      return {
        id: 'warning-alert',
        name: '주의 요망 알림 (Warning Caution)',
        whenToUse: '네트워크 지연, 세션 만료 임박, 저장되지 않은 변경사항 등 주의가 필요한 비치명적 상황에 사용합니다.',
        whenToUseEn: 'Use for non-fatal situations requiring attention such as expiring sessions or network latency.',
      };
    }
    if (role === 'danger' || variableId.includes('danger') || variableId.includes('error')) {
      return {
        id: 'error-alert',
        name: '오류 발생 경고 (Error Alert)',
        whenToUse: '요청 실패, 인증 오류, 유효성 검증 실패 등 즉각적인 재시도나 확인이 필요한 긴급 문제에 사용합니다.',
        whenToUseEn: 'Use for critical failures like request errors or authentication issues requiring user action.',
      };
    }
    if (variableId.includes('action') || variableId.includes('undo')) {
      return {
        id: 'action-undo',
        name: '액션 실행 취소 (Action with Undo)',
        whenToUse: '항목 삭제나 이동 후 일정 시간 동안 사용자가 해당 작업을 되돌릴 수 있는 Undo 버튼을 제공할 때 사용합니다.',
        whenToUseEn: 'Use when providing an interactive Undo button after actions like item deletion or movement.',
      };
    }
    return {
      id: 'info-notification',
      name: '일반 안내 알림 (Informational Notification)',
      whenToUse: '시스템 업데이트, 클립보드 복사 완료, 새로운 알림 수신 등 일반적인 상태 정보를 사용자에게 안내할 때 사용합니다.',
      whenToUseEn: 'Use to convey general status information such as clipboard copy or system notices.',
    };
  }

  return {
    id: `${comp}-${variableId}`,
    name: customName || `${variableId} 타입`,
    whenToUse: `해당 컴포넌트의 ${variableId} 스타일이 필요한 화면 맥락에 사용합니다.`,
  };
}

/**
 * 각 상태(Status)별로 수정 가능한 토큰 프로퍼티 목록을 반환하는 함수
 * - Default: 표준 배경, 텍스트, 테두리, 곡률, 여백
 * - Hover: 마우스 오버 시 피드백 토큰 (hoverBackground, hoverTextColor, hoverBorderColor)
 * - Active: 클릭 시 피드백 토큰 (activeBackground, activeTextColor, activeBorderColor)
 * - Focus: 키보드 포커스 링 토큰 (focusBorderColor, focusBackground)
 * - Disabled: 비활성 시 차단 토큰 (disabledBackground, disabledTextColor, disabledBorderColor)
 */
export function getComponentStatusProperties(
  componentId: string,
  status: ComponentInteractiveStatus | 'all',
  baseProperties: ComponentPropertySpec[] = []
): ComponentPropertySpec[] {
  if (status === 'default') {
    return baseProperties.filter(
      (p) =>
        !p.key.startsWith('hover') &&
        !p.key.startsWith('active') &&
        !p.key.startsWith('focus') &&
        !p.key.startsWith('disabled')
    );
  }

  if (status === 'hover') {
    return [
      { key: 'hoverBackground', label: '호버 배경색 (Hover BG)', category: 'color', defaultPaletteId: '--atom-palette-blue-600' },
      { key: 'hoverTextColor', label: '호버 텍스트 (Hover Text)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'hoverBorderColor', label: '호버 테두리 (Hover Border)', category: 'color', defaultPaletteId: '--atom-palette-blue-600' },
    ];
  }

  if (status === 'active') {
    return [
      { key: 'activeBackground', label: '클릭 시 배경색 (Active BG)', category: 'color', defaultPaletteId: '--atom-palette-blue-700' },
      { key: 'activeTextColor', label: '클릭 시 텍스트 (Active Text)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'activeBorderColor', label: '클릭 시 테두리 (Active Border)', category: 'color', defaultPaletteId: '--atom-palette-blue-700' },
    ];
  }

  if (status === 'focus') {
    return [
      { key: 'focusBorderColor', label: '포커스 링 / 테두리 (Focus Border)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'focusBackground', label: '포커스 배경색 (Focus BG)', category: 'color', defaultPaletteId: '--atom-palette-white' },
    ];
  }

  if (status === 'disabled') {
    return [
      { key: 'disabledBackground', label: '비활성 배경색 (Disabled BG)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'disabledTextColor', label: '비활성 텍스트 (Disabled Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-400' },
      { key: 'disabledBorderColor', label: '비활성 테두리 (Disabled Border)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
    ];
  }

  if (status === 'loading') {
    return [
      { key: 'loadingSpinnerColor', label: '로딩 스피너 색상 (Spinner Color)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'background', label: '로딩 시 배경색 (Loading BG)', category: 'color', defaultPaletteId: '--atom-color-primary' },
    ];
  }

  return baseProperties;
}

export interface ComponentVariable {
  id: string; // e.g. 'primary', 'pill', 'compact'
  name: string; // e.g. 'Primary Button', 'Rounded Pill'
  description?: string;
  type?: ComponentTypeSpec; // 1. Type: ~상황에는 이 컴포넌트를 쓴다
  variableRole?: SemanticVariableRole; // 2. Variable: 빨강=위험, 노랑=경고, primary=브랜드
  supportedStatuses?: ComponentInteractiveStatus[]; // 3. Status: 지원하는 상태 구조
  tokenBindings: Record<string, string>; // propertyKey -> paletteVariableId
}

export interface StudioComponentDefinition {
  id: string;
  name: string;
  category: 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data';
  description: string;
  types?: ComponentTypeSpec[]; // 1. Type: 새로운 디자인의 외형 양식들 (Solid, Outline, Ghost, Soft, Pill 등)
  typeGuide?: {
    primaryType: string;
    whenToUse: string;
    variantsSummary: string;
  };
  supportedStatuses?: ComponentInteractiveStatus[];
  properties: ComponentPropertySpec[];
  variables: ComponentVariable[];
}

export const INITIAL_PALETTE_VARIABLES: PaletteVariable[] = [
  // ==========================================
  // 0. SEMANTIC SYSTEM STATUS TOKENS
  // ==========================================
  { id: '--atom-color-primary', name: 'Primary (주요 브랜드 액션)', category: 'status', value: 'var(--atom-palette-blue-500)', description: '전체 시스템 Primary 액션, 포커스링, 탭 대표 색상', family: 'status' },
  { id: '--atom-color-secondary', name: 'Secondary (보조 액션)', category: 'status', value: 'var(--atom-palette-gray-200)', description: '전체 시스템 Secondary 보조 버튼 및 중립 배지 색상', family: 'status' },
  { id: '--atom-color-success', name: 'Success (성공/완료)', category: 'status', value: 'var(--atom-palette-emerald-500)', description: '성공 완료 버튼, 승인 배지, 긍정 지표 색상', family: 'status' },
  { id: '--atom-color-danger', name: 'Danger (위험/오류)', category: 'status', value: 'var(--atom-palette-rose-500)', description: '위험 삭제 버튼, 에러 인풋 보더, 치명적 경고 색상', family: 'status' },
  { id: '--atom-color-warning', name: 'Warning (주의/대기)', category: 'status', value: 'var(--atom-palette-amber-500)', description: '주의 경고 버튼, 대기 배지, 보류 상태 색상', family: 'status' },

  // ==========================================
  // 1. COLOR PALETTES (50 ~ 900 Full Scale)
  // ==========================================

  // --- Blue Scale (Brand & Primary Action) ---
  { id: '--atom-palette-blue-50', name: 'Blue 50', category: 'color', value: '#eff6ff', description: '매우 연한 블루 틴트 배경', family: 'blue' },
  { id: '--atom-palette-blue-100', name: 'Blue 100', category: 'color', value: '#dbeafe', description: '연한 블루 서피스 및 태그 배경', family: 'blue' },
  { id: '--atom-palette-blue-200', name: 'Blue 200', category: 'color', value: '#bfdbfe', description: '소프트 블루 보더 및 호버 배경', family: 'blue' },
  { id: '--atom-palette-blue-300', name: 'Blue 300', category: 'color', value: '#93c5fd', description: '활성 테두리 및 포커스 링', family: 'blue' },
  { id: '--atom-palette-blue-400', name: 'Blue 400', category: 'color', value: '#60a5fa', description: '밝은 블루 인디케이터', family: 'blue' },
  { id: '--atom-palette-blue-500', name: 'Blue 500 (Brand Primary)', category: 'color', value: '#3182f6', description: '핵심 브랜드 프라이머리 액션 컬러', family: 'blue' },
  { id: '--atom-palette-blue-600', name: 'Blue 600 (Primary Hover)', category: 'color', value: '#1b64da', description: '버튼 호버 및 강조 딥 컬러', family: 'blue' },
  { id: '--atom-palette-blue-700', name: 'Blue 700', category: 'color', value: '#1d4ed8', description: '진한 블루 클릭 액티브 상태', family: 'blue' },
  { id: '--atom-palette-blue-800', name: 'Blue 800', category: 'color', value: '#1e40af', description: '네이비 톤 텍스트 및 헤더 배경', family: 'blue' },
  { id: '--atom-palette-blue-900', name: 'Blue 900', category: 'color', value: '#1e3a8a', description: '극진한 다크 네이비', family: 'blue' },

  // --- Slate / Gray Scale (Surface, Border, Text) ---
  { id: '--atom-palette-gray-50', name: 'Gray 50 (Surface Subtle)', category: 'color', value: '#f8fafc', description: '보조 서피스 및 배경', family: 'gray' },
  { id: '--atom-palette-gray-100', name: 'Gray 100 (Surface Muted)', category: 'color', value: '#f1f5f9', description: '비활성 카드 배경 및 옅은 구분선', family: 'gray' },
  { id: '--atom-palette-gray-200', name: 'Gray 200 (Border Subtle)', category: 'color', value: '#e2e8f0', description: '기본 옅은 경계선', family: 'gray' },
  { id: '--atom-palette-gray-300', name: 'Gray 300 (Border Strong)', category: 'color', value: '#cbd5e1', description: '강조 경계선 및 디바이더', family: 'gray' },
  { id: '--atom-palette-gray-400', name: 'Gray 400 (Placeholder)', category: 'color', value: '#94a3b8', description: '플레이스홀더 및 비활성 라벨', family: 'gray' },
  { id: '--atom-palette-gray-500', name: 'Gray 500 (Text Muted)', category: 'color', value: '#64748b', description: '부연 설명 및 캡션 텍스트', family: 'gray' },
  { id: '--atom-palette-gray-600', name: 'Gray 600', category: 'color', value: '#475569', description: '서브 레이블 텍스트', family: 'gray' },
  { id: '--atom-palette-gray-700', name: 'Gray 700 (Text Secondary)', category: 'color', value: '#334155', description: '보조 본문 텍스트', family: 'gray' },
  { id: '--atom-palette-gray-800', name: 'Gray 800', category: 'color', value: '#1e293b', description: '강조 텍스트 및 다크 모드 카드', family: 'gray' },
  { id: '--atom-palette-gray-900', name: 'Gray 900 (Text Primary)', category: 'color', value: '#0f172a', description: '헤드라인 및 주요 본문 텍스트', family: 'gray' },

  // --- Emerald / Green Scale (Success, Online, Positive) ---
  { id: '--atom-palette-emerald-50', name: 'Emerald 50', category: 'color', value: '#ecfdf5', description: '성공 소프트 틴트 배경', family: 'emerald' },
  { id: '--atom-palette-emerald-100', name: 'Emerald 100', category: 'color', value: '#d1fae5', description: '완료 배지 배경', family: 'emerald' },
  { id: '--atom-palette-emerald-200', name: 'Emerald 200', category: 'color', value: '#a7f3d0', description: '성공 소프트 보더', family: 'emerald' },
  { id: '--atom-palette-emerald-300', name: 'Emerald 300', category: 'color', value: '#6ee7b7', description: '긍정 지표 강조 라인', family: 'emerald' },
  { id: '--atom-palette-emerald-400', name: 'Emerald 400', category: 'color', value: '#34d399', description: '성공 활성 인디케이터', family: 'emerald' },
  { id: '--atom-palette-emerald-500', name: 'Emerald 500 (Success)', category: 'color', value: '#10b981', description: '성공 및 완료 대표 액센트', family: 'emerald' },
  { id: '--atom-palette-emerald-600', name: 'Emerald 600', category: 'color', value: '#059669', description: '성공 버튼 호버 색상', family: 'emerald' },
  { id: '--atom-palette-emerald-700', name: 'Emerald 700', category: 'color', value: '#047857', description: '성공 상태 텍스트', family: 'emerald' },
  { id: '--atom-palette-emerald-800', name: 'Emerald 800', category: 'color', value: '#065f46', description: '진한 성공 텍스트', family: 'emerald' },
  { id: '--atom-palette-emerald-900', name: 'Emerald 900', category: 'color', value: '#064e3b', description: '딥 에메랄드 다크', family: 'emerald' },

  // --- Rose / Red Scale (Destructive, Error, Negative) ---
  { id: '--atom-palette-rose-50', name: 'Rose 50', category: 'color', value: '#fff1f2', description: '에러/삭제 소프트 배경', family: 'rose' },
  { id: '--atom-palette-rose-100', name: 'Rose 100', category: 'color', value: '#ffe4e6', description: '실패 배지 배경', family: 'rose' },
  { id: '--atom-palette-rose-200', name: 'Rose 200', category: 'color', value: '#fecdd3', description: '에러 소프트 테두리', family: 'rose' },
  { id: '--atom-palette-rose-300', name: 'Rose 300', category: 'color', value: '#fda4af', description: '경고 강조 라인', family: 'rose' },
  { id: '--atom-palette-rose-400', name: 'Rose 400', category: 'color', value: '#fb7185', description: '경고 활성 인디케이터', family: 'rose' },
  { id: '--atom-palette-rose-500', name: 'Rose 500 (Destructive)', category: 'color', value: '#ef4444', description: '경고, 삭제, 에러 대표 액센트', family: 'rose' },
  { id: '--atom-palette-rose-600', name: 'Rose 600', category: 'color', value: '#e11d48', description: '삭제 버튼 호버 색상', family: 'rose' },
  { id: '--atom-palette-rose-700', name: 'Rose 700', category: 'color', value: '#be123c', description: '에러 상태 텍스트', family: 'rose' },
  { id: '--atom-palette-rose-800', name: 'Rose 800', category: 'color', value: '#9f1239', description: '진한 위험 경고 텍스트', family: 'rose' },
  { id: '--atom-palette-rose-900', name: 'Rose 900', category: 'color', value: '#881337', description: '딥 로즈 다크', family: 'rose' },

  // --- Amber / Yellow Scale (Warning, Pending, Attention) ---
  { id: '--atom-palette-amber-50', name: 'Amber 50', category: 'color', value: '#fffbeb', description: '주의/안내 소프트 배경', family: 'amber' },
  { id: '--atom-palette-amber-100', name: 'Amber 100', category: 'color', value: '#fef3c7', description: '대기 중 배지 배경', family: 'amber' },
  { id: '--atom-palette-amber-200', name: 'Amber 200', category: 'color', value: '#fde68a', description: '주의 테두리', family: 'amber' },
  { id: '--atom-palette-amber-300', name: 'Amber 300', category: 'color', value: '#fcd34d', description: '주의 강조 라인', family: 'amber' },
  { id: '--atom-palette-amber-400', name: 'Amber 400', category: 'color', value: '#fbbf24', description: '별점/평점 골드 톤', family: 'amber' },
  { id: '--atom-palette-amber-500', name: 'Amber 500 (Warning)', category: 'color', value: '#f59e0b', description: '주의 및 보류 상태 액센트', family: 'amber' },
  { id: '--atom-palette-amber-600', name: 'Amber 600', category: 'color', value: '#d97706', description: '주의 버튼 호버 색상', family: 'amber' },
  { id: '--atom-palette-amber-700', name: 'Amber 700', category: 'color', value: '#b45309', description: '주의 안내 텍스트', family: 'amber' },
  { id: '--atom-palette-amber-800', name: 'Amber 800', category: 'color', value: '#92400e', description: '진한 주의 텍스트', family: 'amber' },
  { id: '--atom-palette-amber-900', name: 'Amber 900', category: 'color', value: '#78350f', description: '딥 앰버 다크', family: 'amber' },

  // --- Purple / Violet Scale (AI, Innovation, Premium) ---
  { id: '--atom-palette-purple-50', name: 'Purple 50', category: 'color', value: '#faf5ff', description: 'AI 프롬프트 소프트 배경', family: 'purple' },
  { id: '--atom-palette-purple-100', name: 'Purple 100', category: 'color', value: '#f3e8ff', description: '프리미엄 배지 배경', family: 'purple' },
  { id: '--atom-palette-purple-200', name: 'Purple 200', category: 'color', value: '#e9d5ff', description: '보라색 소프트 보더', family: 'purple' },
  { id: '--atom-palette-purple-300', name: 'Purple 300', category: 'color', value: '#d8b4fe', description: '바이올렛 포커스 링', family: 'purple' },
  { id: '--atom-palette-purple-400', name: 'Purple 400', category: 'color', value: '#c084fc', description: '밝은 AI 이펙트 라인', family: 'purple' },
  { id: '--atom-palette-purple-500', name: 'Purple 500 (AI Accent)', category: 'color', value: '#8b5cf6', description: 'AI 및 프리미엄 대표 액센트', family: 'purple' },
  { id: '--atom-palette-purple-600', name: 'Purple 600', category: 'color', value: '#9333ea', description: '바이올렛 버튼 호버', family: 'purple' },
  { id: '--atom-palette-purple-700', name: 'Purple 700', category: 'color', value: '#7e22ce', description: '보라색 텍스트', family: 'purple' },
  { id: '--atom-palette-purple-800', name: 'Purple 800', category: 'color', value: '#6b21a8', description: '진한 바이올렛 텍스트', family: 'purple' },
  { id: '--atom-palette-purple-900', name: 'Purple 900', category: 'color', value: '#581c87', description: '딥 바이올렛 다크', family: 'purple' },

  // --- Neutral Pure ---
  { id: '--atom-palette-white', name: 'Pure White', category: 'color', value: '#ffffff', description: '기본 캔버스 및 텍스트 반전색', family: 'neutral' },
  { id: '--atom-palette-black', name: 'Pure Black', category: 'color', value: '#000000', description: '순수 블랙 및 절대 암부', family: 'neutral' },

  // ==========================================
  // 2. SIZE & SPACING PALETTES
  // ==========================================
  { id: '--atom-space-1', name: 'Space 1 (4px)', category: 'spacing', value: '4px', description: '초미세 여백 및 아이콘 갭' },
  { id: '--atom-space-1-5', name: 'Space 1.5 (6px)', category: 'spacing', value: '6px', description: '콤팩트 배지 및 버튼 인라인 갭' },
  { id: '--atom-space-2', name: 'Space 2 (8px)', category: 'spacing', value: '8px', description: '버튼 내부 패딩 및 미세 간격' },
  { id: '--atom-space-2-5', name: 'Space 2.5 (10px)', category: 'spacing', value: '10px', description: '슬림 컴포넌트 여백' },
  { id: '--atom-space-3', name: 'Space 3 (12px)', category: 'spacing', value: '12px', description: '인풋 및 카드 내부 기본 갭' },
  { id: '--atom-space-3-5', name: 'Space 3.5 (14px)', category: 'spacing', value: '14px', description: '모달 헤더 및 아이템 간격' },
  { id: '--atom-space-4', name: 'Space 4 (16px)', category: 'spacing', value: '16px', description: '표준 컴포넌트 내부 패딩' },
  { id: '--atom-space-5', name: 'Space 5 (20px)', category: 'spacing', value: '20px', description: '중간 크기 카드 패딩' },
  { id: '--atom-space-6', name: 'Space 6 (24px)', category: 'spacing', value: '24px', description: '대형 카드 및 섹션 간격' },
  { id: '--atom-space-8', name: 'Space 8 (32px)', category: 'spacing', value: '32px', description: '섹션 디바이더 및 블록 간격' },
  { id: '--atom-space-10', name: 'Space 10 (40px)', category: 'spacing', value: '40px', description: '대형 컨테이너 패딩' },
  { id: '--atom-space-12', name: 'Space 12 (48px)', category: 'spacing', value: '48px', description: '페이지 상하 헤더 여백' },
  { id: '--atom-space-16', name: 'Space 16 (64px)', category: 'spacing', value: '64px', description: '히어로 섹션 및 뷰포트 여백' },

  // ==========================================
  // 3. RADIUS PALETTES (Border Curvature)
  // ==========================================
  { id: '--atom-radius-none', name: 'Radius None (0px)', category: 'radius', value: '0px', description: '각진 직사각' },
  { id: '--atom-radius-xs', name: 'Radius XS (2px)', category: 'radius', value: '2px', description: '미세 라운딩' },
  { id: '--atom-radius-sm', name: 'Radius Small (4px)', category: 'radius', value: '4px', description: '콤팩트 태그 및 배지 곡률' },
  { id: '--atom-radius-md', name: 'Radius Medium (8px)', category: 'radius', value: '8px', description: '표준 버튼 및 인풋 곡률' },
  { id: '--atom-radius-lg', name: 'Radius Large (12px)', category: 'radius', value: '12px', description: '카드 및 다이얼로그 모달 곡률' },
  { id: '--atom-radius-xl', name: 'Radius XL (16px)', category: 'radius', value: '16px', description: '볼드 라운딩 패널' },
  { id: '--atom-radius-2xl', name: 'Radius 2XL (24px)', category: 'radius', value: '24px', description: '모바일 바텀 시트 곡률' },
  { id: '--atom-radius-full', name: 'Radius Full (9999px)', category: 'radius', value: '9999px', description: '완전 둥근 알약(Pill) 곡률' },

  // ==========================================
  // 4. TYPOGRAPHY PALETTES
  // ==========================================
  { id: '--atom-typography-xs', name: 'Font XS (12px / 16px)', category: 'typography', value: '12px', description: '캡션, 힌트, 배지 라벨' },
  { id: '--atom-typography-sm', name: 'Font SM (14px / 20px)', category: 'typography', value: '14px', description: '서브 레이블, 폼 헬퍼 텍스트' },
  { id: '--atom-typography-base', name: 'Font Base (16px / 24px)', category: 'typography', value: '16px', description: '기본 본문 텍스트 규격' },
  { id: '--atom-typography-lg', name: 'Font LG (18px / 28px)', category: 'typography', value: '18px', description: '소제목 및 강조 문구' },
  { id: '--atom-typography-xl', name: 'Font XL (20px / 28px)', category: 'typography', value: '20px', description: '카드 타이틀 및 섹션 헤더' },
  { id: '--atom-typography-2xl', name: 'Font 2XL (24px / 32px)', category: 'typography', value: '24px', description: '중형 페이지 타이틀' },
  { id: '--atom-typography-3xl', name: 'Font 3XL (30px / 36px)', category: 'typography', value: '30px', description: '대형 메인 타이틀' },
  { id: '--atom-typography-4xl', name: 'Font 4XL (36px / 40px)', category: 'typography', value: '36px', description: '히어로 디스플레이 타이틀' },
  { id: '--atom-font-weight-regular', name: 'Weight Regular (400)', category: 'typography', value: '400', description: '일반 본문 굵기' },
  { id: '--atom-font-weight-medium', name: 'Weight Medium (500)', category: 'typography', value: '500', description: '세미 강조 본문 굵기' },
  { id: '--atom-font-weight-semibold', name: 'Weight Semibold (600)', category: 'typography', value: '600', description: '버튼 및 테이블 헤더 굵기' },
  { id: '--atom-font-weight-bold', name: 'Weight Bold (700)', category: 'typography', value: '700', description: '타이틀 및 핵심 강조 굵기' },
];

export const INITIAL_STUDIO_COMPONENTS: StudioComponentDefinition[] = [
  // 1. Button
  {
    id: 'button',
    name: 'Button (버튼)',
    category: 'Form',
    description: '사용자 인터랙션을 유도하는 핵심 액션 컴포넌트',
    types: DEFAULT_COMPONENT_TYPES['button'],
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-blue-500' },
      { key: 'hoverBackground', label: '호버 배경 (Hover BG)', category: 'color', defaultPaletteId: '--atom-palette-blue-600' },
      { key: 'textColor', label: '텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-blue-500' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-md' },
      { key: 'paddingX', label: '좌우 패딩 (Padding X)', category: 'spacing', defaultPaletteId: '--atom-space-4' },
      { key: 'paddingY', label: '상하 패딩 (Padding Y)', category: 'spacing', defaultPaletteId: '--atom-space-2' },
    ],
    variables: [
      {
        id: 'primary',
        name: '프라이머리 액션 (Primary)',
        description: '디자인 테마의 대표 브랜드 액션 시스템 토큰',
        variableRole: 'primary',
        tokenBindings: {
          background: '--atom-color-primary',
          hoverBackground: '--atom-color-primary-hover',
          textColor: '--atom-palette-white',
          borderColor: '--atom-color-primary',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'secondary',
        name: '세컨더리 보조 (Secondary)',
        description: '취소, 닫기 등 보조 동작에 사용하는 중립 톤 시스템 토큰',
        variableRole: 'secondary',
        tokenBindings: {
          background: '--atom-color-secondary',
          hoverBackground: '--atom-color-secondary-hover',
          textColor: '--atom-palette-gray-900',
          borderColor: '--atom-color-secondary',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'destructive',
        name: '위험/삭제 실행 (Destructive)',
        description: '영구 삭제, 복구 불가 작업에 경고를 주는 위험 시스템 토큰',
        variableRole: 'danger',
        tokenBindings: {
          background: '--atom-color-danger',
          hoverBackground: '--atom-color-danger-hover',
          textColor: '--atom-palette-white',
          borderColor: '--atom-color-danger',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'warning',
        name: '주의/대기 환기 (Warning)',
        description: '주의 환기, 보류 상태 변경에 사용하는 경고 시스템 토큰',
        variableRole: 'warning',
        tokenBindings: {
          background: '--atom-color-warning',
          hoverBackground: '--atom-color-warning-hover',
          textColor: '--atom-palette-white',
          borderColor: '--atom-color-warning',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'success',
        name: '승인/성공 완료 (Success)',
        description: '완료, 승인, 긍정적 액션에 사용하는 성공 시스템 토큰',
        variableRole: 'success',
        tokenBindings: {
          background: '--atom-color-success',
          hoverBackground: '--atom-color-success-hover',
          textColor: '--atom-palette-white',
          borderColor: '--atom-color-success',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'info',
        name: '안내/정보 고지 (Info)',
        description: '시스템 알림 및 가이드에 사용하는 정보 시스템 토큰',
        variableRole: 'info',
        tokenBindings: {
          background: '--atom-palette-blue-500',
          hoverBackground: '--atom-palette-blue-600',
          textColor: '--atom-palette-white',
          borderColor: '--atom-palette-blue-500',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
    ],
  },

  // 2. Badge
  {
    id: 'badge',
    name: 'Badge (배지)',
    category: 'Feedback',
    description: '상태값, 카운트, 카테고리를 직관적으로 나타내는 칩 컴포넌트',
    types: DEFAULT_COMPONENT_TYPES['badge'],
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-blue-50' },
      { key: 'textColor', label: '텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-blue-600' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-blue-50' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-full' },
      { key: 'paddingX', label: '좌우 패딩 (Padding X)', category: 'spacing', defaultPaletteId: '--atom-space-2' },
      { key: 'paddingY', label: '상하 패딩 (Padding Y)', category: 'spacing', defaultPaletteId: '--atom-space-1' },
    ],
    variables: [
      {
        id: 'active',
        name: '활성 상태 배지 (Active / Primary)',
        description: '신규 기능, 진행 중인 상태를 나타내는 소프트 블루 톤',
        tokenBindings: {
          background: '--atom-color-primary-subtle',
          textColor: '--atom-color-primary',
          borderColor: '--atom-color-primary-subtle',
          borderRadius: '--atom-radius-full',
          paddingX: '--atom-space-2',
          paddingY: '--atom-space-1',
        },
      },
      {
        id: 'success',
        name: '성공 배지 (Success)',
        description: '결제 완료, 승인 상태를 나타내는 에메랄드 톤',
        tokenBindings: {
          background: '--atom-color-success-subtle',
          textColor: '--atom-color-success',
          borderColor: '--atom-color-success',
          borderRadius: '--atom-radius-full',
          paddingX: '--atom-space-2',
          paddingY: '--atom-space-1',
        },
      },
      {
        id: 'warning',
        name: '주의 배지 (Warning)',
        description: '만료 임박, 대기 상태를 나타내는 앰버 톤',
        tokenBindings: {
          background: '--atom-color-warning-subtle',
          textColor: '--atom-color-warning',
          borderColor: '--atom-color-warning',
          borderRadius: '--atom-radius-full',
          paddingX: '--atom-space-2',
          paddingY: '--atom-space-1',
        },
      },
      {
        id: 'destructive',
        name: '위험/에러 배지 (Destructive / Danger)',
        description: '오류, 실패, 위험 상태를 나타내는 로즈/레드 톤 배지',
        tokenBindings: {
          background: '--atom-color-danger-subtle',
          textColor: '--atom-color-danger',
          borderColor: '--atom-color-danger',
          borderRadius: '--atom-radius-full',
          paddingX: '--atom-space-2',
          paddingY: '--atom-space-1',
        },
      },
      {
        id: 'sharp-neutral',
        name: '샤프 뉴트럴 (Sharp Neutral)',
        description: '버전 정보, 코드 태그 등에 쓰이는 각진 라운딩 배지',
        tokenBindings: {
          background: '--atom-palette-gray-100',
          textColor: '--atom-palette-gray-700',
          borderColor: '--atom-palette-gray-200',
          borderRadius: '--atom-radius-sm',
          paddingX: '--atom-space-2',
          paddingY: '--atom-space-1',
        },
      },
    ],
  },

  // 3. Card
  {
    id: 'card',
    name: 'Card (카드)',
    category: 'Layout',
    description: '콘텐츠를 논리적 블록으로 묶어주는 기본 컨테이너 표면',
    types: DEFAULT_COMPONENT_TYPES['card'],
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-lg' },
      { key: 'padding', label: '내부 여백 (Padding)', category: 'spacing', defaultPaletteId: '--atom-space-4' },
    ],
    variables: [
      {
        id: 'elevated',
        name: '기본 보더 카드 (Default Bordered)',
        description: '은은한 테두리와 여백을 가진 표준 콘텐츠 카드',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-200',
          borderRadius: '--atom-radius-lg',
          padding: '--atom-space-4',
        },
      },
      {
        id: 'surface-muted',
        name: '소프트 서피스 카드 (Muted Surface)',
        description: '보더 없이 서피스 배경색만으로 영역을 구분하는 카드',
        tokenBindings: {
          background: '--atom-palette-gray-50',
          borderColor: '--atom-palette-gray-100',
          borderRadius: '--atom-radius-xl',
          padding: '--atom-space-6',
        },
      },
      {
        id: 'accent-brand',
        name: '브랜드 하이라이트 카드 (Brand Highlight)',
        description: '추천 요금제, 강조 섹션에 쓰이는 블루 틴트 카드',
        tokenBindings: {
          background: '--atom-palette-blue-50',
          borderColor: '--atom-palette-blue-500',
          borderRadius: '--atom-radius-lg',
          padding: '--atom-space-6',
        },
      },
    ],
  },

  // 4. Input
  {
    id: 'input',
    name: 'Input (입력 필드)',
    category: 'Form',
    description: '텍스트 입력을 수집하는 표준 폼 컨트롤',
    types: DEFAULT_COMPONENT_TYPES['input'],
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-300' },
      { key: 'focusBorderColor', label: '포커스 테두리 (Focus Border)', category: 'color', defaultPaletteId: '--atom-palette-blue-500' },
      { key: 'textColor', label: '텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-900' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-md' },
      { key: 'paddingX', label: '좌우 패딩 (Padding X)', category: 'spacing', defaultPaletteId: '--atom-space-3' },
      { key: 'paddingY', label: '상하 패딩 (Padding Y)', category: 'spacing', defaultPaletteId: '--atom-space-2' },
    ],
    variables: [
      {
        id: 'standard',
        name: '표준 폼 인풋 (Standard Form)',
        description: '일반적인 양식 입력에 최적화된 테두리 인풋',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-300',
          focusBorderColor: '--atom-palette-blue-500',
          textColor: '--atom-palette-gray-900',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-3',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'pill-search',
        name: '검색용 알약 인풋 (Pill Search)',
        description: '검색 바나 내비게이션 필터에 적합한 둥근 인풋',
        tokenBindings: {
          background: '--atom-palette-gray-100',
          borderColor: '--atom-palette-gray-200',
          focusBorderColor: '--atom-palette-blue-500',
          textColor: '--atom-palette-gray-900',
          borderRadius: '--atom-radius-full',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
    ],
  },

  // 5. Textarea
  {
    id: 'textarea',
    name: 'Textarea (다중행 입력)',
    category: 'Form',
    description: '여러 줄의 텍스트 본문이나 피드백을 입력받는 영역',
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-300' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-md' },
      { key: 'padding', label: '내부 여백 (Padding)', category: 'spacing', defaultPaletteId: '--atom-space-3' },
    ],
    variables: [
      {
        id: 'standard',
        name: '표준 텍스트에어리어 (Standard)',
        description: '기본 8px 라운딩 다중행 폼 필드',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-300',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-3',
        },
      },
    ],
  },

  // 6. Switch
  {
    id: 'switch',
    name: 'Switch (토글 스위치)',
    category: 'Form',
    description: '온/오프 바이너리 설정을 즉시 변경하는 스위치',
    properties: [
      { key: 'activeBackground', label: '활성 배경 (Active BG)', category: 'color', defaultPaletteId: '--atom-palette-blue-500' },
      { key: 'inactiveBackground', label: '비활성 배경 (Inactive BG)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'thumbColor', label: '원형 손잡이 색상 (Thumb Color)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-full' },
    ],
    variables: [
      {
        id: 'brand',
        name: '브랜드 스위치 (Brand Primary)',
        description: '시그니처 블루 토글',
        tokenBindings: {
          activeBackground: '--atom-palette-blue-500',
          inactiveBackground: '--atom-palette-gray-200',
          thumbColor: '--atom-palette-white',
          borderRadius: '--atom-radius-full',
        },
      },
      {
        id: 'emerald',
        name: '에코 에메랄드 스위치 (Emerald Active)',
        description: '자연스러운 성공 감성의 녹색 토글',
        tokenBindings: {
          activeBackground: '--atom-palette-emerald-500',
          inactiveBackground: '--atom-palette-gray-200',
          thumbColor: '--atom-palette-white',
          borderRadius: '--atom-radius-full',
        },
      },
    ],
  },

  // 7. Tabs
  {
    id: 'tabs',
    name: 'Tabs (탭 네비게이션)',
    category: 'Navigation',
    description: '동일 화면 내에서 연관된 뷰를 전환하는 탭 바',
    properties: [
      { key: 'activeIndicator', label: '활성 인디케이터 (Active Line/BG)', category: 'color', defaultPaletteId: '--atom-palette-blue-500' },
      { key: 'activeText', label: '활성 텍스트 (Active Text)', category: 'color', defaultPaletteId: '--atom-palette-blue-500' },
      { key: 'inactiveText', label: '비활성 텍스트 (Inactive Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-700' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-md' },
    ],
    variables: [
      {
        id: 'underlined',
        name: '언더라인 탭 (Underlined)',
        description: '하단 경계선 인디케이터가 따라다니는 클래식 탭',
        tokenBindings: {
          activeIndicator: '--atom-palette-blue-500',
          activeText: '--atom-palette-blue-500',
          inactiveText: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-none',
        },
      },
      {
        id: 'pills',
        name: '알약 세그먼트 탭 (Pill Segments)',
        description: '박스 배경이 활성화되는 모던 세그먼트 컨트롤',
        tokenBindings: {
          activeIndicator: '--atom-palette-blue-500',
          activeText: '--atom-palette-white',
          inactiveText: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-full',
        },
      },
    ],
  },

  // 8. Table
  {
    id: 'table',
    name: 'Table (데이터 테이블)',
    category: 'Data',
    description: '행과 열 구조로 방대한 데이터를 체계화하여 보여주는 테이블',
    properties: [
      { key: 'headerBackground', label: '헤더 배경 (Header BG)', category: 'color', defaultPaletteId: '--atom-palette-gray-50' },
      { key: 'borderColor', label: '구분선 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'borderRadius', label: '외곽 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-lg' },
      { key: 'cellPadding', label: '셀 내부 여백 (Cell Padding)', category: 'spacing', defaultPaletteId: '--atom-space-3' },
    ],
    variables: [
      {
        id: 'standard',
        name: '기본 보더 테이블 (Bordered)',
        description: '은은한 테두리와 깔끔한 헤더를 갖춘 기본 테이블',
        tokenBindings: {
          headerBackground: '--atom-palette-gray-50',
          borderColor: '--atom-palette-gray-200',
          borderRadius: '--atom-radius-lg',
          cellPadding: '--atom-space-3',
        },
      },
    ],
  },

  // 9. Modal
  {
    id: 'modal',
    name: 'Modal (모달 다이얼로그)',
    category: 'Feedback',
    description: '중요 확인 및 작업 포커스를 위한 레이어 오버레이',
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-xl' },
      { key: 'padding', label: '내부 여백 (Padding)', category: 'spacing', defaultPaletteId: '--atom-space-6' },
    ],
    variables: [
      {
        id: 'standard',
        name: '표준 대화 상자 (Standard Dialog)',
        description: '16px 볼드 라운딩과 24px 패딩이 적용된 정형화된 모달',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-200',
          borderRadius: '--atom-radius-xl',
          padding: '--atom-space-6',
        },
      },
    ],
  },

  // 10. Avatar
  {
    id: 'avatar',
    name: 'Avatar (프로필 아바타)',
    category: 'Data',
    description: '사용자 프로필 이미지나 이니셜을 나타내는 원형 컴포넌트',
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-blue-50' },
      { key: 'textColor', label: '이니셜 텍스트 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-blue-600' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-full' },
    ],
    variables: [
      {
        id: 'circle',
        name: '원형 아바타 (Circle)',
        description: '완전 원형 프로필',
        tokenBindings: {
          background: '--atom-palette-blue-50',
          textColor: '--atom-palette-blue-600',
          borderRadius: '--atom-radius-full',
        },
      },
      {
        id: 'rounded-square',
        name: '스퀘어드 아바타 (Squircle)',
        description: '부드러운 사각 곡률의 모던 아바타',
        tokenBindings: {
          background: '--atom-palette-purple-50',
          textColor: '--atom-palette-purple-500',
          borderRadius: '--atom-radius-lg',
        },
      },
    ],
  },

  // 11. Navbar (Global Navigation)
  {
    id: 'navbar',
    name: 'Navbar (글로벌 네비게이션)',
    category: 'Navigation',
    description: '상단 브랜드 로고, 네비게이션 메뉴 및 유저 컨트롤을 제공하는 글로벌 헤더',
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '하단 테두리 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'activeText', label: '활성 링크 색상 (Active Link Text)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'textColor', label: '기본 텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-700' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-none' },
    ],
    variables: [
      {
        id: 'default',
        name: '표준 스티키 헤더 (Standard Sticky)',
        description: '하단 옅은 보더와 브랜드 로고를 포함하는 클래식 상단 네비게이션',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-200',
          activeText: '--atom-color-primary',
          textColor: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-none',
        },
      },
      {
        id: 'floating',
        name: '플로팅 라운드 바 (Floating Pill)',
        description: '랜딩 페이지나 모바일 웹에 적합한 완전 둥근 플로팅 헤더',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-300',
          activeText: '--atom-color-primary',
          textColor: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-full',
        },
      },
    ],
  },

  // 12. Sidebar & SideMenu (Side Navigation System)
  {
    id: 'sidebar',
    name: 'Sidebar & SideMenu (사이드바 / 사이드메뉴)',
    category: 'Navigation',
    description: '좌측 계층 메뉴, 2-Depth 아코디언 서브메뉴(SidebarSubMenu), 프로젝트 스위처 및 접기/펼치기를 제공하는 사이드 네비게이션 시스템',
    properties: [
      { key: 'background', label: '사이드바 배경 (Background)', category: 'color', defaultPaletteId: '--atom-palette-gray-50' },
      { key: 'borderColor', label: '경계 테두리 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'activeBackground', label: '활성 메뉴 배경 (Active BG)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'activeText', label: '활성 메뉴 텍스트 (Active Text)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'textColor', label: '기본 메뉴 텍스트 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-700' },
      { key: 'borderRadius', label: '아이템 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-sm' },
    ],
    variables: [
      {
        id: 'default',
        name: '표준 엔터프라이즈 (Standard Enterprise)',
        description: '좌측 고정형 계층 네비게이션 및 세련된 솔리드 활성 하이라이트',
        tokenBindings: {
          background: '--atom-palette-gray-50',
          borderColor: '--atom-palette-gray-200',
          activeBackground: '--atom-color-primary',
          activeText: '--atom-palette-white',
          textColor: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-sm',
        },
      },
      {
        id: 'pills',
        name: '알약형 라운드 메뉴 (Pills Highlight)',
        description: '둥근 알약형 메뉴 아이템 곡률과 현대적인 여백 스타일',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-200',
          activeBackground: '--atom-color-primary',
          activeText: '--atom-palette-white',
          textColor: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-full',
        },
      },
      {
        id: 'bordered',
        name: '좌측 액센트 보더 (Accent Border)',
        description: '좌측 세로 강조 보더와 옅은 배경의 포멀한 사이드바 스타일',
        tokenBindings: {
          background: '--atom-palette-gray-50',
          borderColor: '--atom-palette-gray-200',
          activeBackground: '--atom-palette-blue-50',
          activeText: '--atom-color-primary',
          textColor: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-sm',
        },
      },
      {
        id: 'floating',
        name: '플로팅 카드 사이드바 (Floating Card)',
        description: '배경과 분리된 독립 카드 형태의 모던 사이드바',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-300',
          activeBackground: '--atom-color-primary',
          activeText: '--atom-palette-white',
          textColor: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-lg',
        },
      },
    ],
  },

  // 13. Nav (Universal Navigation: Nav, NavItem, NavLink)
  {
    id: 'nav',
    name: 'Nav & NavItem (유니버설 탐색)',
    category: 'Navigation',
    description: '화면 내 탭, 알약형 필터, 세그먼트 분할 바 등 다목적 메뉴를 구성하는 탐색 원자 (Nav, NavItem, NavLink)',
    properties: [
      { key: 'activeBackground', label: '활성 아이템 배경 (Active BG)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'activeText', label: '활성 아이템 텍스트 (Active Text)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'textColor', label: '기본 텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-600' },
      { key: 'borderRadius', label: '아이템 모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-sm' },
      { key: 'paddingX', label: '가로 패딩 (Padding X)', category: 'spacing', defaultPaletteId: '--atom-space-3' },
      { key: 'paddingY', label: '세로 패딩 (Padding Y)', category: 'spacing', defaultPaletteId: '--atom-space-1' },
    ],
    variables: [
      {
        id: 'pills',
        name: '알약형 필터 (Pills)',
        description: '카테고리 선택 및 필터링에 적합한 알약형 네비게이션',
        tokenBindings: {
          activeBackground: '--atom-color-primary',
          activeText: '--atom-palette-white',
          textColor: '--atom-palette-gray-600',
          borderRadius: '--atom-radius-full',
          paddingX: '--atom-space-3',
          paddingY: '--atom-space-1',
        },
      },
      {
        id: 'segmented',
        name: '세그먼트 컨트롤 (Segmented)',
        description: '박스형 분할 토글 컨트롤 스타일 네비게이션',
        tokenBindings: {
          activeBackground: '--atom-color-primary',
          activeText: '--atom-palette-white',
          textColor: '--atom-palette-gray-600',
          borderRadius: '--atom-radius-sm',
          paddingX: '--atom-space-3',
          paddingY: '--atom-space-1',
        },
      },
      {
        id: 'default',
        name: '기본 텍스트 링크 (Default)',
        description: '상단 바나 서브메뉴의 기본 텍스트 링크 네비게이션',
        tokenBindings: {
          activeBackground: '--atom-palette-gray-200',
          activeText: '--atom-palette-gray-900',
          textColor: '--atom-palette-gray-600',
          borderRadius: '--atom-radius-sm',
          paddingX: '--atom-space-3',
          paddingY: '--atom-space-1',
        },
      },
      {
        id: 'tabs',
        name: '언더라인 탭 (Tabs)',
        description: '하단 경계 보더와 활성 밑줄 하이라이트',
        tokenBindings: {
          activeBackground: '--atom-palette-white',
          activeText: '--atom-color-primary',
          textColor: '--atom-palette-gray-600',
          borderRadius: '--atom-radius-none',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
    ],
  },

  // 14. Checkbox (Form Control)
  {
    id: 'checkbox',
    name: 'Checkbox (체크박스)',
    category: 'Form',
    description: '단일 또는 다중 항목 선택을 위한 접근성 준수 체크박스',
    properties: [
      { key: 'checkedBackground', label: '선택 시 배경 (Checked BG)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-300' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-sm' },
      { key: 'textColor', label: '라벨 텍스트 (Label Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-800' },
    ],
    variables: [
      {
        id: 'default',
        name: '표준 사각 체크박스 (Default)',
        description: '작은 곡률의 표준 체크박스',
        tokenBindings: {
          checkedBackground: '--atom-color-primary',
          borderColor: '--atom-palette-gray-300',
          borderRadius: '--atom-radius-sm',
          textColor: '--atom-palette-gray-800',
        },
      },
      {
        id: 'rounded',
        name: '완전 둥근 체크박스 (Rounded)',
        description: '원형에 가까운 부드러운 체크박스',
        tokenBindings: {
          checkedBackground: '--atom-color-primary',
          borderColor: '--atom-palette-gray-300',
          borderRadius: '--atom-radius-full',
          textColor: '--atom-palette-gray-800',
        },
      },
    ],
  },

  // 15. Select (Form Control)
  {
    id: 'select',
    name: 'Select (선택 상자)',
    category: 'Form',
    description: '드롭다운 옵션 선택을 제공하는 네이티브 셀렉트 컨트롤',
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-300' },
      { key: 'textColor', label: '텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-800' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-sm' },
      { key: 'padding', label: '패딩 (Padding)', category: 'spacing', defaultPaletteId: '--atom-space-2' },
    ],
    variables: [
      {
        id: 'default',
        name: '표준 셀렉트 (Default)',
        description: '입력 폼의 기본 드롭다운 상자',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-300',
          textColor: '--atom-palette-gray-800',
          borderRadius: '--atom-radius-sm',
          padding: '--atom-space-2',
        },
      },
    ],
  },

  // 16. Radio (Form Control)
  {
    id: 'radio',
    name: 'Radio (라디오 버튼)',
    category: 'Form',
    description: '단일 배타적 항목 선택을 위한 원형 라디오 인디케이터',
    properties: [
      { key: 'activeColor', label: '활성 색상 (Active Color)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-300' },
      { key: 'textColor', label: '라벨 텍스트 (Label Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-800' },
    ],
    variables: [
      {
        id: 'default',
        name: '표준 라디오 (Default)',
        description: '기본 단일 선택 원형 라디오 버튼',
        tokenBindings: {
          activeColor: '--atom-color-primary',
          borderColor: '--atom-palette-gray-300',
          textColor: '--atom-palette-gray-800',
        },
      },
    ],
  },

  // 17. Slider (Form Control)
  {
    id: 'slider',
    name: 'Slider (범위 슬라이더)',
    category: 'Form',
    description: '연속적 범위 값 조절을 위한 슬라이더 바',
    properties: [
      { key: 'trackBackground', label: '트랙 배경 (Track BG)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'activeTrack', label: '활성 트랙 (Active Track)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'thumbBackground', label: '핸들 색상 (Thumb BG)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'thumbBorder', label: '핸들 테두리 (Thumb Border)', category: 'color', defaultPaletteId: '--atom-color-primary' },
    ],
    variables: [
      {
        id: 'default',
        name: '표준 슬라이더 (Default)',
        description: '기본 단일 핸들 수평 슬라이더',
        tokenBindings: {
          trackBackground: '--atom-palette-gray-200',
          activeTrack: '--atom-color-primary',
          thumbBackground: '--atom-palette-white',
          thumbBorder: '--atom-color-primary',
        },
      },
    ],
  },

  // 18. Progress (Feedback)
  {
    id: 'progress',
    name: 'Progress (진행 상태 바)',
    category: 'Feedback',
    description: '작업 진행률 및 퍼센티지를 시각화하는 인디케이터',
    properties: [
      { key: 'background', label: '트랙 배경 (Track BG)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'fillColor', label: '진행 색상 (Fill Color)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-full' },
    ],
    variables: [
      {
        id: 'default',
        name: '기본 진행 바 (Default)',
        description: '브랜드 메인 컬러의 진행 바',
        tokenBindings: {
          background: '--atom-palette-gray-200',
          fillColor: '--atom-color-primary',
          borderRadius: '--atom-radius-full',
        },
      },
      {
        id: 'success',
        name: '완료 진행 바 (Success)',
        description: '성공 상태 녹색 진행 바',
        tokenBindings: {
          background: '--atom-palette-gray-200',
          fillColor: '--atom-palette-emerald-500',
          borderRadius: '--atom-radius-full',
        },
      },
    ],
  },

  // 19. Skeleton (Feedback)
  {
    id: 'skeleton',
    name: 'Skeleton (스켈레톤 로더)',
    category: 'Feedback',
    description: '콘텐츠 로딩 중 레이아웃 쉬프트를 방지하는 펄스 플레이스홀더',
    properties: [
      { key: 'background', label: '베이스 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-sm' },
    ],
    variables: [
      {
        id: 'default',
        name: '텍스트 스켈레톤 (Text Line)',
        description: '일반 텍스트 라인 플레이스홀더',
        tokenBindings: {
          background: '--atom-palette-gray-200',
          borderRadius: '--atom-radius-sm',
        },
      },
      {
        id: 'circle',
        name: '원형 스켈레톤 (Circle Avatar)',
        description: '아바타 및 아이콘용 원형 플레이스홀더',
        tokenBindings: {
          background: '--atom-palette-gray-200',
          borderRadius: '--atom-radius-full',
        },
      },
    ],
  },

  // 20. Tooltip (Feedback)
  {
    id: 'tooltip',
    name: 'Tooltip (툴팁 말풍선)',
    category: 'Feedback',
    description: '마우스 호버 또는 포커스 시 부가 설명을 띄워주는 팝오버',
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-gray-900' },
      { key: 'textColor', label: '텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-sm' },
    ],
    variables: [
      {
        id: 'default',
        name: '다크 툴팁 (Dark)',
        description: '고대비 어두운 배경의 말풍선',
        tokenBindings: {
          background: '--atom-palette-gray-900',
          textColor: '--atom-palette-white',
          borderRadius: '--atom-radius-sm',
        },
      },
      {
        id: 'light',
        name: '라이트 툴팁 (Light)',
        description: '밝은 배경과 옅은 보더의 말풍선',
        tokenBindings: {
          background: '--atom-palette-white',
          textColor: '--atom-palette-gray-800',
          borderRadius: '--atom-radius-sm',
        },
      },
    ],
  },

  // 21. Accordion (Data)
  {
    id: 'accordion',
    name: 'Accordion (아코디언 접기)',
    category: 'Data',
    description: 'FAQ 및 문서의 섹션별 접기/펼치기 인터랙티브 컴포넌트',
    properties: [
      { key: 'borderColor', label: '구분선 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'textColor', label: '헤더 텍스트 (Header Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-900' },
      { key: 'contentColor', label: '본문 텍스트 (Content Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-600' },
    ],
    variables: [
      {
        id: 'default',
        name: '클래식 언더라인 (Default)',
        description: '하단 구분선만 있는 깔끔한 아코디언',
        tokenBindings: {
          borderColor: '--atom-palette-gray-200',
          textColor: '--atom-palette-gray-900',
          contentColor: '--atom-palette-gray-600',
        },
      },
    ],
  },

  // 22. Breadcrumb (Navigation)
  {
    id: 'breadcrumb',
    name: 'Breadcrumb (경로 탐색)',
    category: 'Navigation',
    description: '페이지 계층 구조와 현재 위치를 표시하는 경로 표시기',
    properties: [
      { key: 'textColor', label: '링크 텍스트 (Link Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-500' },
      { key: 'activeColor', label: '현재 위치 (Active Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-900' },
      { key: 'separatorColor', label: '구분자 색상 (Separator)', category: 'color', defaultPaletteId: '--atom-palette-gray-400' },
    ],
    variables: [
      {
        id: 'default',
        name: '표준 브레드크럼 (Default)',
        description: '슬래시(/) 구분자를 포함한 텍스트 경로',
        tokenBindings: {
          textColor: '--atom-palette-gray-500',
          activeColor: '--atom-palette-gray-900',
          separatorColor: '--atom-palette-gray-400',
        },
      },
    ],
  },

  // 23. Pagination (Navigation)
  {
    id: 'pagination',
    name: 'Pagination (페이지네이션)',
    category: 'Navigation',
    description: '대용량 데이터 목록 탐색을 위한 페이지 이동 컨트롤러',
    properties: [
      { key: 'activeBackground', label: '활성 페이지 배경 (Active BG)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'activeText', label: '활성 페이지 텍스트 (Active Text)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'textColor', label: '기본 텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-700' },
      { key: 'borderRadius', label: '버튼 모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-sm' },
    ],
    variables: [
      {
        id: 'default',
        name: '사각 페이지네이션 (Default)',
        description: '작은 곡률의 기본 페이지 번호 버튼',
        tokenBindings: {
          activeBackground: '--atom-color-primary',
          activeText: '--atom-palette-white',
          textColor: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-sm',
        },
      },
      {
        id: 'rounded',
        name: '원형 페이지네이션 (Rounded)',
        description: '완전 둥근 원형 페이지 번호 버튼',
        tokenBindings: {
          activeBackground: '--atom-color-primary',
          activeText: '--atom-palette-white',
          textColor: '--atom-palette-gray-700',
          borderRadius: '--atom-radius-full',
        },
      },
    ],
  },

  // 24. Separator (Layout)
  {
    id: 'separator',
    name: 'Separator (구분선)',
    category: 'Layout',
    description: '콘텐츠 영역을 시각적으로 분리하는 수평 또는 수직 디바이더',
    properties: [
      { key: 'color', label: '구분선 색상 (Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
    ],
    variables: [
      {
        id: 'horizontal',
        name: '수평선 (Horizontal)',
        description: '너비 100%의 기본 가로 구분선',
        tokenBindings: {
          color: '--atom-palette-gray-200',
        },
      },
    ],
  },

  // 25. Calendar (Data)
  {
    id: 'calendar',
    name: 'Calendar (달력)',
    category: 'Data',
    description: '날짜 선택 및 월간 뷰를 제공하는 인터랙티브 캘린더',
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'selectedBackground', label: '선택 날짜 배경 (Selected BG)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'selectedText', label: '선택 날짜 텍스트 (Selected Text)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'textColor', label: '일반 날짜 텍스트 (Day Text)', category: 'color', defaultPaletteId: '--atom-palette-gray-800' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-md' },
    ],
    variables: [
      {
        id: 'default',
        name: '표준 달력 (Default)',
        description: '헤더와 요일 그리드를 포함한 기본 달력 뷰',
        tokenBindings: {
          background: '--atom-palette-white',
          selectedBackground: '--atom-color-primary',
          selectedText: '--atom-palette-white',
          textColor: '--atom-palette-gray-800',
          borderRadius: '--atom-radius-md',
        },
      },
    ],
  },

  // 26. Chart (Data)
  {
    id: 'chart',
    name: 'Chart (차트)',
    category: 'Data',
    description: '라인, 바, 영역 그래프를 통해 시계열 데이터와 실적 지표를 시각화하는 차트 컴포넌트',
    properties: [
      { key: 'strokeColor', label: '차트 선 색상 (Stroke Color)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'fillColor', label: '영역 채우기 색상 (Fill Color)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'gridColor', label: '그리드 라인 색상 (Grid Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'hoverColor', label: '호버 포인트 색상 (Hover Point)', category: 'color', defaultPaletteId: '--atom-color-primary-hover' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-md' },
      { key: 'padding', label: '내부 패딩 (Padding)', category: 'spacing', defaultPaletteId: '--atom-space-4' },
    ],
    variables: [
      {
        id: 'primary',
        name: '라인 트렌드 차트 (Line Trend)',
        description: '시계열 데이터의 추세를 명확하게 보여주는 대표 라인 차트',
        tokenBindings: {
          strokeColor: '--atom-color-primary',
          fillColor: '--atom-color-primary',
          gridColor: '--atom-palette-gray-200',
          hoverColor: '--atom-color-primary-hover',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
        },
      },
      {
        id: 'area-volume',
        name: '누적 영역 차트 (Area Volume)',
        description: '하단 그라데이션 채우기를 통해 볼륨감과 추세를 동시에 표현하는 영역 차트',
        tokenBindings: {
          strokeColor: '--atom-color-primary',
          fillColor: '--atom-palette-blue-500',
          gridColor: '--atom-palette-gray-200',
          hoverColor: '--atom-color-primary-hover',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
        },
      },
      {
        id: 'success',
        name: '상승 지표 차트 (Success Trend)',
        description: '주가 상승, 수익률 증가, 긍정적 지표를 나타내는 에메랄드 그린 차트',
        tokenBindings: {
          strokeColor: '--atom-color-success',
          fillColor: '--atom-palette-emerald-500',
          gridColor: '--atom-palette-gray-200',
          hoverColor: '--atom-color-success-hover',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
        },
      },
      {
        id: 'danger',
        name: '위험/하락 지표 차트 (Danger Alert)',
        description: '오류 발생률, 손실 지표, 임계치 초과를 경고하는 로즈 레드 차트',
        tokenBindings: {
          strokeColor: '--atom-color-danger',
          fillColor: '--atom-palette-rose-500',
          gridColor: '--atom-palette-gray-200',
          hoverColor: '--atom-color-danger-hover',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
        },
      },
      {
        id: 'bar-metric',
        name: '바 비교 차트 (Bar Comparison)',
        description: '항목별 실적이나 기간별 집계를 직관적으로 비교하는 막대 차트',
        tokenBindings: {
          strokeColor: '--atom-color-primary',
          fillColor: '--atom-color-primary',
          gridColor: '--atom-palette-gray-200',
          hoverColor: '--atom-color-primary-hover',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
        },
      },
    ],
  },
  // 27. Offcanvas (Layout / Overlay)
  {
    id: 'offcanvas',
    name: 'Offcanvas (오프캔버스 / 서랍)',
    category: 'Layout',
    description: '화면 가장자리에서 슬라이드되어 나타나는 오프캔버스 패널 및 서랍형 오버레이',
    properties: [
      { key: 'background', label: '서피스 배경색 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'textColor', label: '본문 텍스트 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-800' },
      { key: 'headerBackground', label: '헤더 배경색 (Header BG)', category: 'color', defaultPaletteId: '--atom-palette-gray-50' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-lg' },
      { key: 'padding', label: '내부 패딩 (Padding)', category: 'spacing', defaultPaletteId: '--atom-space-4' },
      { key: 'hoverBackground', label: '호버 배경색 (Hover BG)', category: 'color', defaultPaletteId: '--atom-palette-blue-50' },
      { key: 'activeBackground', label: '활성 배경색 (Active BG)', category: 'color', defaultPaletteId: '--atom-palette-blue-100' },
    ],
    variables: [
      {
        id: 'right-drawer',
        name: '우측 인스펙터 서랍 (Right Drawer)',
        description: '데이터 리스트에서 항목 세부 정보 및 편집 폼을 표시하는 우측 사이드 패널',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-200',
          textColor: '--atom-palette-gray-800',
          headerBackground: '--atom-palette-gray-50',
          borderRadius: '--atom-radius-lg',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-blue-50',
          activeBackground: '--atom-palette-blue-100',
        },
      },
      {
        id: 'left-nav',
        name: '좌측 모바일 탐색 서랍 (Left Navigation)',
        description: '모바일 환경에서 사이트 전체 메뉴 및 프로필 바로가기를 제공하는 좌측 서랍',
        tokenBindings: {
          background: '--atom-palette-gray-900',
          borderColor: '--atom-palette-gray-800',
          textColor: '--atom-palette-gray-100',
          headerBackground: '--atom-palette-gray-950',
          borderRadius: '--atom-radius-lg',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-gray-800',
          activeBackground: '--atom-palette-gray-700',
        },
      },
      {
        id: 'bottom-sheet',
        name: '하단 필터 시트 (Bottom Sheet)',
        description: '모바일 뷰포트 하단에서 위로 올라오는 필터 및 액션 시트 오버레이',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-200',
          textColor: '--atom-palette-gray-800',
          headerBackground: '--atom-palette-gray-50',
          borderRadius: '--atom-radius-xl',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-blue-50',
          activeBackground: '--atom-palette-blue-100',
        },
      },
      {
        id: 'settings-panel',
        name: '설정 슬라이드오버 (Settings Panel)',
        description: '사용자 환경설정, 테마 옵션 및 알림 구성을 조정하는 슬라이드 패널',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-gray-200',
          textColor: '--atom-palette-gray-800',
          headerBackground: '--atom-palette-gray-50',
          borderRadius: '--atom-radius-lg',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-blue-50',
          activeBackground: '--atom-palette-blue-100',
        },
      },
    ],
  },
  // 28. Toast (Feedback)
  {
    id: 'toast',
    name: 'Toast (토스트 알림)',
    category: 'Feedback',
    description: '작업 결과 피드백 및 상태 변화를 화면 구석에 일시적으로 알리는 플로팅 토스트 컴포넌트',
    properties: [
      { key: 'background', label: '서피스 배경색 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'textColor', label: '본문 텍스트 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-800' },
      { key: 'iconColor', label: '아이콘 색상 (Icon Color)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-md' },
      { key: 'padding', label: '내부 패딩 (Padding)', category: 'spacing', defaultPaletteId: '--atom-space-4' },
      { key: 'hoverBackground', label: '호버 배경색 (Hover BG)', category: 'color', defaultPaletteId: '--atom-palette-gray-50' },
      { key: 'activeBackground', label: '활성 배경색 (Active BG)', category: 'color', defaultPaletteId: '--atom-palette-gray-100' },
    ],
    variables: [
      {
        id: 'info',
        name: '안내 토스트 (Info Toast)',
        description: '새로운 시스템 알림이나 일반 정보를 전달하는 블루 톤의 안내 토스트',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-blue-200',
          textColor: '--atom-palette-gray-900',
          iconColor: '--atom-color-primary',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-blue-50',
          activeBackground: '--atom-palette-blue-100',
        },
      },
      {
        id: 'success',
        name: '성공 완료 토스트 (Success Toast)',
        description: '작업이 성공적으로 저장되거나 완료되었음을 전달하는 에메랄드 토스트',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-emerald-200',
          textColor: '--atom-palette-gray-900',
          iconColor: '--atom-color-success',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-emerald-50',
          activeBackground: '--atom-palette-emerald-100',
        },
      },
      {
        id: 'warning',
        name: '주의 요망 토스트 (Warning Toast)',
        description: '세션 만료나 네트워크 불안정 등 주의가 필요한 상황을 알리는 앰버 토스트',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-amber-200',
          textColor: '--atom-palette-gray-900',
          iconColor: '--atom-color-warning',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-amber-50',
          activeBackground: '--atom-palette-amber-100',
        },
      },
      {
        id: 'danger',
        name: '오류 경고 토스트 (Danger Toast)',
        description: '요청 실패나 예외 발생을 사용자에게 즉시 전달하는 로즈 레드 토스트',
        tokenBindings: {
          background: '--atom-palette-white',
          borderColor: '--atom-palette-rose-200',
          textColor: '--atom-palette-gray-900',
          iconColor: '--atom-color-danger',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-rose-50',
          activeBackground: '--atom-palette-rose-100',
        },
      },
      {
        id: 'action-undo',
        name: '실행 취소 액션 토스트 (Action Undo Toast)',
        description: '삭제나 이동 작업을 되돌릴 수 있는 실행 취소 버튼이 포함된 다크 모던 토스트',
        tokenBindings: {
          background: '--atom-palette-gray-900',
          borderColor: '--atom-palette-gray-800',
          textColor: '--atom-palette-gray-100',
          iconColor: '--atom-palette-blue-400',
          borderRadius: '--atom-radius-md',
          padding: '--atom-space-4',
          hoverBackground: '--atom-palette-gray-800',
          activeBackground: '--atom-palette-gray-700',
        },
      },
    ],
  },
];
