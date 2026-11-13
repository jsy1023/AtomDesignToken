export type PaletteCategory = 'color' | 'radius' | 'spacing';

export interface PaletteVariable {
  id: string; // e.g. '--atom-palette-blue-500'
  name: string; // e.g. 'Blue 500'
  category: PaletteCategory;
  value: string; // e.g. '#3182f6' or '8px'
  description?: string;
}

export interface ComponentPropertySpec {
  key: string;
  label: string;
  category: 'color' | 'radius' | 'spacing';
  defaultPaletteId: string;
}

export interface ComponentVariable {
  id: string; // e.g. 'primary', 'pill', 'compact'
  name: string; // e.g. 'Primary Button', 'Rounded Pill'
  description?: string;
  tokenBindings: Record<string, string>; // propertyKey -> paletteVariableId
}

export interface StudioComponentDefinition {
  id: string;
  name: string;
  category: 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data';
  description: string;
  properties: ComponentPropertySpec[];
  variables: ComponentVariable[];
}

export const INITIAL_PALETTE_VARIABLES: PaletteVariable[] = [
  // Colors (Brand & Accents)
  { id: '--atom-palette-blue-500', name: 'Blue 500 (Brand Primary)', category: 'color', value: '#3182f6', description: '메인 브랜드 액션 컬러' },
  { id: '--atom-palette-blue-600', name: 'Blue 600 (Primary Hover)', category: 'color', value: '#1b64da', description: '버튼 호버 및 강조 딥 컬러' },
  { id: '--atom-palette-blue-50', name: 'Blue 50 (Primary Subtle)', category: 'color', value: '#e8f3ff', description: '배경 하이라이트 및 소프트 틴트' },
  { id: '--atom-palette-emerald-500', name: 'Emerald 500 (Success)', category: 'color', value: '#10b981', description: '성공 및 완료 액센트' },
  { id: '--atom-palette-emerald-50', name: 'Emerald 50 (Success Subtle)', category: 'color', value: '#ecfdf5', description: '성공 소프트 배경' },
  { id: '--atom-palette-rose-500', name: 'Rose 500 (Destructive)', category: 'color', value: '#ef4444', description: '경고, 삭제, 에러 액센트' },
  { id: '--atom-palette-rose-50', name: 'Rose 50 (Destructive Subtle)', category: 'color', value: '#fef2f2', description: '에러 소프트 배경' },
  { id: '--atom-palette-amber-500', name: 'Amber 500 (Warning)', category: 'color', value: '#f59e0b', description: '주의 및 안내 상태 컬러' },
  { id: '--atom-palette-amber-50', name: 'Amber 50 (Warning Subtle)', category: 'color', value: '#fffbeb', description: '주의 소프트 배경' },
  { id: '--atom-palette-purple-500', name: 'Purple 500 (Tech Accent)', category: 'color', value: '#8b5cf6', description: '바이올렛 테크 감성' },
  { id: '--atom-palette-purple-50', name: 'Purple 50 (Tech Subtle)', category: 'color', value: '#f5f3ff', description: '바이올렛 소프트 배경' },
  
  // Colors (Surface & Text)
  { id: '--atom-palette-white', name: 'Pure White', category: 'color', value: '#ffffff', description: '기본 캔버스 및 텍스트 반전색' },
  { id: '--atom-palette-gray-50', name: 'Gray 50 (Surface Subtle)', category: 'color', value: '#f9fafb', description: '보조 서피스 및 카드 배경' },
  { id: '--atom-palette-gray-100', name: 'Gray 100 (Surface Muted)', category: 'color', value: '#f3f4f6', description: '비활성 요소 및 서브 배경' },
  { id: '--atom-palette-gray-200', name: 'Gray 200 (Border Subtle)', category: 'color', value: '#e5e7eb', description: '기본 옅은 경계선' },
  { id: '--atom-palette-gray-300', name: 'Gray 300 (Border Strong)', category: 'color', value: '#d1d5db', description: '강조 경계선' },
  { id: '--atom-palette-gray-400', name: 'Gray 400 (Placeholder)', category: 'color', value: '#9ca3af', description: '플레이스홀더 및 비활성 텍스트' },
  { id: '--atom-palette-gray-700', name: 'Gray 700 (Text Secondary)', category: 'color', value: '#374151', description: '보조 텍스트 및 레이블' },
  { id: '--atom-palette-gray-900', name: 'Gray 900 (Text Primary)', category: 'color', value: '#111827', description: '헤드라인 및 본문 텍스트' },

  // Radius
  { id: '--atom-radius-none', name: 'Radius None (0px)', category: 'radius', value: '0px', description: '각진 사각' },
  { id: '--atom-radius-sm', name: 'Radius Small (4px)', category: 'radius', value: '4px', description: '콤팩트 태그/배지' },
  { id: '--atom-radius-md', name: 'Radius Medium (8px)', category: 'radius', value: '8px', description: '표준 컴포넌트 곡률' },
  { id: '--atom-radius-lg', name: 'Radius Large (12px)', category: 'radius', value: '12px', description: '카드 및 모달 곡률' },
  { id: '--atom-radius-xl', name: 'Radius XLarge (16px)', category: 'radius', value: '16px', description: '볼드 라운딩' },
  { id: '--atom-radius-full', name: 'Radius Full (9999px)', category: 'radius', value: '9999px', description: '완전 둥근 알약(Pill) 곡률' },

  // Spacing
  { id: '--atom-space-1', name: 'Space 1 (4px)', category: 'spacing', value: '4px', description: '초미세 간격' },
  { id: '--atom-space-2', name: 'Space 2 (8px)', category: 'spacing', value: '8px', description: '버튼 내부 요소 간격' },
  { id: '--atom-space-3', name: 'Space 3 (12px)', category: 'spacing', value: '12px', description: '인풋 패딩' },
  { id: '--atom-space-4', name: 'Space 4 (16px)', category: 'spacing', value: '16px', description: '기본 카드/컴포넌트 패딩' },
  { id: '--atom-space-5', name: 'Space 5 (20px)', category: 'spacing', value: '20px', description: '중간 크기 패딩' },
  { id: '--atom-space-6', name: 'Space 6 (24px)', category: 'spacing', value: '24px', description: '섹션 간격' },
  { id: '--atom-space-8', name: 'Space 8 (32px)', category: 'spacing', value: '32px', description: '대형 레이아웃 간격' },
];

export const INITIAL_STUDIO_COMPONENTS: StudioComponentDefinition[] = [
  // 1. Button
  {
    id: 'button',
    name: 'Button (버튼)',
    category: 'Form',
    description: '사용자 인터랙션을 유도하는 핵심 액션 컴포넌트',
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
        name: '기본 프라이머리 (Primary CTA)',
        description: '화면에서 가장 중요한 핵심 액션에 사용하는 기본 버튼',
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
      {
        id: 'secondary',
        name: '세컨더리 버튼 (Secondary)',
        description: '취소, 닫기 등 보조 동작에 사용하는 중립 톤 버튼',
        tokenBindings: {
          background: '--atom-palette-gray-100',
          hoverBackground: '--atom-palette-gray-200',
          textColor: '--atom-palette-gray-900',
          borderColor: '--atom-palette-gray-200',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'pill-cta',
        name: '라운드 필 버튼 (Pill CTA)',
        description: '랜딩 페이지나 모바일 히어로에 최적화된 완전 둥근 곡률 버튼',
        tokenBindings: {
          background: '--atom-palette-blue-500',
          hoverBackground: '--atom-palette-blue-600',
          textColor: '--atom-palette-white',
          borderColor: '--atom-palette-blue-500',
          borderRadius: '--atom-radius-full',
          paddingX: '--atom-space-6',
          paddingY: '--atom-space-3',
        },
      },
      {
        id: 'destructive',
        name: '위험/삭제 버튼 (Destructive)',
        description: '영구 삭제, 취소 불가능한 액션에 경고를 주는 붉은색 버튼',
        tokenBindings: {
          background: '--atom-palette-rose-500',
          hoverBackground: '--atom-palette-rose-500',
          textColor: '--atom-palette-white',
          borderColor: '--atom-palette-rose-500',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'ghost',
        name: '고스트 버튼 (Ghost Outline)',
        description: '테두리만 있는 미니멀 투명 버튼',
        tokenBindings: {
          background: '--atom-palette-white',
          hoverBackground: '--atom-palette-gray-50',
          textColor: '--atom-palette-blue-500',
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
        name: '활성 상태 배지 (Active)',
        description: '신규 기능, 진행 중인 상태를 나타내는 소프트 블루 톤',
        tokenBindings: {
          background: '--atom-palette-blue-50',
          textColor: '--atom-palette-blue-600',
          borderColor: '--atom-palette-blue-50',
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
          background: '--atom-palette-emerald-50',
          textColor: '--atom-palette-emerald-500',
          borderColor: '--atom-palette-emerald-500',
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
          background: '--atom-palette-amber-50',
          textColor: '--atom-palette-amber-500',
          borderColor: '--atom-palette-amber-500',
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
];
