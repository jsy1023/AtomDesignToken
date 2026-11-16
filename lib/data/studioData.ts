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
  { id: '--atom-space-1', name: 'Space 1 (4px)', category: 'size', value: '4px', description: '초미세 여백 및 아이콘 갭' },
  { id: '--atom-space-1-5', name: 'Space 1.5 (6px)', category: 'size', value: '6px', description: '콤팩트 배지 및 버튼 인라인 갭' },
  { id: '--atom-space-2', name: 'Space 2 (8px)', category: 'size', value: '8px', description: '버튼 내부 패딩 및 미세 간격' },
  { id: '--atom-space-2-5', name: 'Space 2.5 (10px)', category: 'size', value: '10px', description: '슬림 컴포넌트 여백' },
  { id: '--atom-space-3', name: 'Space 3 (12px)', category: 'size', value: '12px', description: '인풋 및 카드 내부 기본 갭' },
  { id: '--atom-space-3-5', name: 'Space 3.5 (14px)', category: 'size', value: '14px', description: '모달 헤더 및 아이템 간격' },
  { id: '--atom-space-4', name: 'Space 4 (16px)', category: 'size', value: '16px', description: '표준 컴포넌트 내부 패딩' },
  { id: '--atom-space-5', name: 'Space 5 (20px)', category: 'size', value: '20px', description: '중간 크기 카드 패딩' },
  { id: '--atom-space-6', name: 'Space 6 (24px)', category: 'size', value: '24px', description: '대형 카드 및 섹션 간격' },
  { id: '--atom-space-8', name: 'Space 8 (32px)', category: 'size', value: '32px', description: '섹션 디바이더 및 블록 간격' },
  { id: '--atom-space-10', name: 'Space 10 (40px)', category: 'size', value: '40px', description: '대형 컨테이너 패딩' },
  { id: '--atom-space-12', name: 'Space 12 (48px)', category: 'size', value: '48px', description: '페이지 상하 헤더 여백' },
  { id: '--atom-space-16', name: 'Space 16 (64px)', category: 'size', value: '64px', description: '히어로 섹션 및 뷰포트 여백' },

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
        name: '세컨더리 버튼 (Secondary)',
        description: '취소, 닫기 등 보조 동작에 사용하는 중립 톤 버튼',
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
        id: 'pill-cta',
        name: '라운드 필 버튼 (Pill CTA)',
        description: '랜딩 페이지나 모바일 히어로에 최적화된 완전 둥근 곡률 버튼',
        tokenBindings: {
          background: '--atom-color-primary',
          hoverBackground: '--atom-color-primary-hover',
          textColor: '--atom-palette-white',
          borderColor: '--atom-color-primary',
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
        id: 'ghost',
        name: '고스트 버튼 (Ghost Outline)',
        description: '테두리만 있는 미니멀 투명 버튼',
        tokenBindings: {
          background: '--atom-palette-white',
          hoverBackground: '--atom-palette-gray-50',
          textColor: '--atom-color-primary',
          borderColor: '--atom-color-primary',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'outline',
        name: '아웃라인 버튼 (Outline)',
        description: '은은한 테두리와 호버 효과를 지닌 외곽선 버튼',
        tokenBindings: {
          background: '--atom-palette-white',
          hoverBackground: '--atom-palette-gray-100',
          textColor: '--atom-palette-gray-900',
          borderColor: '--atom-palette-gray-300',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'success',
        name: '성공 버튼 (Success Green)',
        description: '완료, 승인, 긍정적 액션에 쓰이는 녹색 계열 버튼',
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
        id: 'warning',
        name: '주의 버튼 (Warning Amber)',
        description: '주의 환기, 보류 상태 변경에 쓰이는 노란색/앰버 버튼',
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

  // 12. Sidebar (Side Navigation)
  {
    id: 'sidebar',
    name: 'Sidebar (사이드 네비게이션)',
    category: 'Navigation',
    description: '업무용 대시보드 및 복잡한 웹 앱의 계층형 메뉴를 제공하는 사이드바',
    properties: [
      { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-gray-50' },
      { key: 'borderColor', label: '우측 테두리 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
      { key: 'activeBackground', label: '활성 아이템 배경 (Active BG)', category: 'color', defaultPaletteId: '--atom-color-primary' },
      { key: 'activeText', label: '활성 아이템 텍스트 (Active Text)', category: 'color', defaultPaletteId: '--atom-palette-white' },
      { key: 'textColor', label: '기본 메뉴 텍스트 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-700' },
      { key: 'borderRadius', label: '아이템 곡률 (Item Radius)', category: 'radius', defaultPaletteId: '--atom-radius-sm' },
    ],
    variables: [
      {
        id: 'default',
        name: '엔터프라이즈 사이드바 (Enterprise)',
        description: '좌측 고정형 계층 네비게이션 및 세련된 활성 하이라이트',
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
];
