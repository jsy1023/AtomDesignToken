export type TokenCategory = 'color' | 'typography' | 'radius' | 'spacing' | 'shadow';

export interface BrandPreset {
  id: string;
  name: string;
  brandColor: string;
  radius: string;
  description: string;
}

export interface ColorToken {
  name: string;
  variable: string;
  value: string;
  description: string;
  category: 'brand' | 'surface' | 'text' | 'border' | 'status';
}

export interface TypographyToken {
  name: string;
  variable: string;
  fontSize: string;
  lineHeight: string;
  weight: string;
  sample: string;
}

export interface RadiusToken {
  name: string;
  variable: string;
  value: string;
  description: string;
}

export interface SpacingToken {
  name: string;
  variable: string;
  value: string;
  px: number;
}

export interface ShadowToken {
  name: string;
  variable: string;
  value: string;
  description: string;
}

export const BRAND_PRESETS: BrandPreset[] = [
  {
    id: 'toss',
    name: '토스 스타일 (Toss)',
    brandColor: '#3182f6',
    radius: '16px',
    description: 'Vivid Blue, 16px 볼드 라운딩, 시원한 여백과 극도의 미니멀리즘'
  },
  {
    id: 'daangn',
    name: '당근 스타일 (Daangn)',
    brandColor: '#ff6f0f',
    radius: '12px',
    description: 'Warm Orange, 12px 소프트 라운딩, 친근하고 따뜻한 커뮤니티 감성'
  },
  {
    id: 'hyper-violet',
    name: '모던 바이올렛 (Violet Tech)',
    brandColor: '#7c3aed',
    radius: '8px',
    description: '세련된 보라색 테크 감성, 8px 샤프 라운딩, 개발자/B2B 최적화'
  },
  {
    id: 'forest-emerald',
    name: '에코 에메랄드 (Emerald)',
    brandColor: '#10b981',
    radius: '14px',
    description: '자연스럽고 편안한 딥 그린, 핀테크 자산 및 웰니스 서비스용'
  }
];

export const BASE_COLOR_TOKENS: ColorToken[] = [
  // Brand
  {
    name: 'Primary Accent',
    variable: '--atom-color-primary',
    value: '#3182f6',
    description: '주요 액션 버튼, 활성 탭, 브랜드 강조 영역의 핵심 색상',
    category: 'brand'
  },
  {
    name: 'Primary Hover',
    variable: '--atom-color-primary-hover',
    value: '#1b64da',
    description: 'Primary 컴포넌트에 마우스를 올렸을 때 적용되는 딥 톤',
    category: 'brand'
  },
  {
    name: 'Primary Subtle / Light',
    variable: '--atom-color-primary-subtle',
    value: '#e8f3ff',
    description: '배지 배경, 활성 리스트 아이템, 선택 하이라이트 배경',
    category: 'brand'
  },
  // Surface & Background
  {
    name: 'Background Primary',
    variable: '--atom-bg-primary',
    value: '#ffffff',
    description: '웹 전체 페이지의 기본 캔버스 배경 (다크모드: #090a0f)',
    category: 'surface'
  },
  {
    name: 'Background Surface / Card',
    variable: '--atom-bg-surface',
    value: '#f8f9fa',
    description: '카드, 모달 다이얼로그, 패널, 드롭다운 메뉴의 바탕색',
    category: 'surface'
  },
  {
    name: 'Background Muted',
    variable: '--atom-bg-muted',
    value: '#f1f3f5',
    description: '비활성화된 폼 필드, 태그 칩, 보조 영역 배경',
    category: 'surface'
  },
  // Text
  {
    name: 'Text Primary',
    variable: '--atom-text-primary',
    value: '#191f28',
    description: '가장 높은 명도 대비를 갖는 핵심 본문 및 헤드라인 텍스트',
    category: 'text'
  },
  {
    name: 'Text Secondary',
    variable: '--atom-text-secondary',
    value: '#8b95a1',
    description: '설명문, 부가 라벨, 플레이스홀더, 서브 텍스트',
    category: 'text'
  },
  {
    name: 'Text Muted',
    variable: '--atom-text-muted',
    value: '#b0b8c1',
    description: '타임스탬프, 비활성화된 라벨, 장식성 힌트 텍스트',
    category: 'text'
  },
  // Border
  {
    name: 'Border Subtle',
    variable: '--atom-border-subtle',
    value: '#f2f4f6',
    description: '카드 구분선, 리스트 경계선 등 부드러운 분리선',
    category: 'border'
  },
  {
    name: 'Border Strong',
    variable: '--atom-border-strong',
    value: '#e5e8eb',
    description: '인풋 필드 외곽선, 명확한 아웃라인 버튼, 모달 경계선',
    category: 'border'
  },
  // Status
  {
    name: 'Status Success',
    variable: '--atom-status-success',
    value: '#10b981',
    description: '성공 완료 알림, 온라인 상태, 송금 완료 상태',
    category: 'status'
  },
  {
    name: 'Status Danger',
    variable: '--atom-status-danger',
    value: '#f43f5e',
    description: '폼 유효성 에러, 경고 메시지, 삭제 등 파괴적 액션',
    category: 'status'
  },
  {
    name: 'Status Warning',
    variable: '--atom-status-warning',
    value: '#f59e0b',
    description: '주의 알림, 대기 중인 상태, 결제 보류',
    category: 'status'
  }
];

export const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  {
    name: 'Display / Hero Title',
    variable: '--atom-font-display',
    fontSize: '36px (2.25rem)',
    lineHeight: '1.25',
    weight: '800 (ExtraBold)',
    sample: '디자이너의 피그마 해방, 말로 디자인하는 시대'
  },
  {
    name: 'Title 1 (Page Title)',
    variable: '--atom-font-title-1',
    fontSize: '28px (1.75rem)',
    lineHeight: '1.3',
    weight: '700 (Bold)',
    sample: '원클릭으로 끝내는 디자인 토큰 시스템'
  },
  {
    name: 'Title 2 (Section Title)',
    variable: '--atom-font-title-2',
    fontSize: '20px (1.25rem)',
    lineHeight: '1.35',
    weight: '700 (Bold)',
    sample: '프레임워크 무관한 표준 CSS 변수 체계'
  },
  {
    name: 'Title 3 (Card Title)',
    variable: '--atom-font-title-3',
    fontSize: '16px (1.0rem)',
    lineHeight: '1.4',
    weight: '600 (SemiBold)',
    sample: '계좌 송금 및 실시간 인증 패턴'
  },
  {
    name: 'Body 1 (Regular Body)',
    variable: '--atom-font-body-1',
    fontSize: '14px (0.875rem)',
    lineHeight: '1.5',
    weight: '400 (Regular)',
    sample: 'React, Vue, 바닐라 HTML 어디서나 복사 한 번으로 즉시 렌더링됩니다.'
  },
  {
    name: 'Body 2 / Caption',
    variable: '--atom-font-body-2',
    fontSize: '12px (0.75rem)',
    lineHeight: '1.5',
    weight: '500 (Medium)',
    sample: 'W3C DTCG 호환 tokens.json 기반 스타일 딕셔너리 컴파일'
  },
  {
    name: 'Mono Code',
    variable: '--atom-font-mono',
    fontSize: '11px (0.6875rem)',
    lineHeight: '1.6',
    weight: '500 (Medium)',
    sample: 'npx atomsystem init --preset toss'
  }
];

export const RADIUS_TOKENS: RadiusToken[] = [
  {
    name: 'None (직각)',
    variable: '--atom-radius-none',
    value: '0px',
    description: '단단한 테크니컬 대시보드 및 플랫 디자인'
  },
  {
    name: 'Small (샤프)',
    variable: '--atom-radius-sm',
    value: '6px',
    description: '태그 배지, 미니 인풋, 정밀 데이터 테이블 컨트롤'
  },
  {
    name: 'Medium (소프트)',
    variable: '--atom-radius-md',
    value: '10px',
    description: '일반적인 버튼, 인풋 필드, 툴팁'
  },
  {
    name: 'Large (볼드 - 토스/당근 기본)',
    variable: '--atom-radius-lg',
    value: '16px',
    description: '카드, 대화상자 모달, 주요 모바일 시트'
  },
  {
    name: 'Extra Large (슈퍼 라운드)',
    variable: '--atom-radius-xl',
    value: '24px',
    description: '바텀시트 최상단 모서리, 히어로 배너 카드'
  },
  {
    name: 'Pill / Full (캡슐)',
    variable: '--atom-radius-full',
    value: '9999px',
    description: '필터 칩, 플로팅 액션 버튼(FAB), 원형 아바타'
  }
];

export const SPACING_TOKENS: SpacingToken[] = [
  { name: 'Space 1 (Extra Small)', variable: '--atom-space-1', value: '4px', px: 4 },
  { name: 'Space 2 (Small)', variable: '--atom-space-2', value: '8px', px: 8 },
  { name: 'Space 3 (Compact)', variable: '--atom-space-3', value: '12px', px: 12 },
  { name: 'Space 4 (Base)', variable: '--atom-space-4', value: '16px', px: 16 },
  { name: 'Space 5 (Medium)', variable: '--atom-space-5', value: '20px', px: 20 },
  { name: 'Space 6 (Large)', variable: '--atom-space-6', value: '24px', px: 24 },
  { name: 'Space 8 (Section)', variable: '--atom-space-8', value: '32px', px: 32 },
  { name: 'Space 12 (Hero)', variable: '--atom-space-12', value: '48px', px: 48 },
  { name: 'Space 16 (Page Gap)', variable: '--atom-space-16', value: '64px', px: 64 }
];

export const SHADOW_TOKENS: ShadowToken[] = [
  {
    name: 'Elevation 1 (Subtle)',
    variable: '--atom-shadow-sm',
    value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    description: '기본 카드, 인풋 포커스 상태, 미세한 구분'
  },
  {
    name: 'Elevation 2 (Medium)',
    variable: '--atom-shadow-md',
    value: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    description: '호버된 카드, 드롭다운 메뉴, 팝오버 툴팁'
  },
  {
    name: 'Elevation 3 (Floating)',
    variable: '--atom-shadow-lg',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    description: '플로팅 내비게이션 바, 토스트 알림 메시지'
  },
  {
    name: 'Elevation 4 (Modal / Overlay)',
    variable: '--atom-shadow-xl',
    value: '0 20px 25px -5px rgb(0 0 0 / 0.15)',
    description: '화면 최상단 레이어의 모달 다이얼로그, 바텀시트'
  }
];
