import { ThemeConfig, DEFAULT_THEME_CONFIG } from './themeEditorDefaults';

export type ThemeCategory = 'all' | 'fintech' | 'lifestyle' | 'developer' | 'dark' | 'minimal' | 'custom';

export interface ThemePaletteBindings {
  primary: string;        // e.g. '--atom-palette-blue-500'
  primaryHover: string;   // e.g. '--atom-palette-blue-600'
  primaryLight: string;   // e.g. '--atom-palette-blue-50'
  secondary?: string;     // e.g. '--atom-palette-gray-200'
  secondaryHover?: string;// e.g. '--atom-palette-gray-300'
  secondaryLight?: string;// e.g. '--atom-palette-gray-50'
  bgPrimary: string;      // e.g. '--atom-palette-white'
  bgSecondary: string;    // e.g. '--atom-palette-gray-50'
  textPrimary: string;    // e.g. '--atom-palette-gray-900'
  textSecondary: string;  // e.g. '--atom-palette-gray-700'
  textMuted: string;      // e.g. '--atom-palette-gray-500'
  borderSubtle: string;   // e.g. '--atom-palette-gray-200'
  borderStrong: string;   // e.g. '--atom-palette-gray-300'
  statusSuccess: string;  // e.g. '--atom-palette-emerald-500'
  statusDanger: string;   // e.g. '--atom-palette-rose-500'
  statusWarning: string;  // e.g. '--atom-palette-amber-500'
}

export interface StudioTheme {
  id: string;
  name: string;
  description: string;
  mode: 'light' | 'dark';
  category: 'fintech' | 'lifestyle' | 'developer' | 'dark' | 'minimal' | 'custom';
  brandColor: string;
  paletteBindings?: Partial<ThemePaletteBindings>; // SSOT: W3C DTCG Palette Token Aliases
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    secondary?: string;
    secondaryHover?: string;
    secondaryLight?: string;
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    borderSubtle: string;
    borderStrong: string;
    statusSuccess: string;
    statusDanger: string;
    statusWarning: string;
  };
  borderRadius: string;
  fontFamily?: string;
  isCustom?: boolean;
}

export const INITIAL_STUDIO_THEMES: StudioTheme[] = [
  {
    id: 'ocean-blue',
    name: '오션 블루 (Ocean Blue)',
    description: '신뢰감을 주는 모던 시그니처 블루와 정갈한 백색 서피스, 8px 소프트 라운딩',
    mode: 'light',
    category: 'fintech',
    brandColor: '#3182f6',
    borderRadius: '8px',
    paletteBindings: {
      primary: '--atom-palette-blue-500',
      primaryHover: '--atom-palette-blue-600',
      primaryLight: '--atom-palette-blue-50',
      bgPrimary: '--atom-palette-white',
      bgSecondary: '--atom-palette-gray-50',
      textPrimary: '--atom-palette-gray-900',
      textSecondary: '--atom-palette-gray-700',
      textMuted: '--atom-palette-gray-500',
      borderSubtle: '--atom-palette-gray-200',
      borderStrong: '--atom-palette-gray-300',
      statusSuccess: '--atom-palette-emerald-500',
      statusDanger: '--atom-palette-rose-500',
      statusWarning: '--atom-palette-amber-500',
    },
    colors: {
      primary: '#3182f6',
      primaryHover: '#1b64da',
      primaryLight: '#eff6ff',
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      borderSubtle: '#e2e8f0',
      borderStrong: '#cbd5e1',
      statusSuccess: '#10b981',
      statusDanger: '#ef4444',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'warm-orange',
    name: '웜 오렌지 (Warm Orange)',
    description: '따뜻하고 친근한 감성의 비비드 앰버 오렌지와 크리미한 서피스, 12px 소프트 라운딩',
    mode: 'light',
    category: 'lifestyle',
    brandColor: '#f59e0b',
    borderRadius: '12px',
    paletteBindings: {
      primary: '--atom-palette-amber-500',
      primaryHover: '--atom-palette-amber-600',
      primaryLight: '--atom-palette-amber-50',
      bgPrimary: '--atom-palette-white',
      bgSecondary: '--atom-palette-gray-50',
      textPrimary: '--atom-palette-gray-900',
      textSecondary: '--atom-palette-gray-700',
      textMuted: '--atom-palette-gray-500',
      borderSubtle: '--atom-palette-gray-200',
      borderStrong: '--atom-palette-gray-300',
      statusSuccess: '--atom-palette-emerald-500',
      statusDanger: '--atom-palette-rose-500',
      statusWarning: '--atom-palette-amber-500',
    },
    colors: {
      primary: '#f59e0b',
      primaryHover: '#d97706',
      primaryLight: '#fffbeb',
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      borderSubtle: '#e2e8f0',
      borderStrong: '#cbd5e1',
      statusSuccess: '#10b981',
      statusDanger: '#ef4444',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'dark-cyber',
    name: '사이버 다크 (Cyber Dark)',
    description: '하이테크 네온 시안 액센트와 딥 슬레이트(Slate-900) 매트 다크 서피스',
    mode: 'dark',
    category: 'dark',
    brandColor: '#60a5fa',
    borderRadius: '10px',
    paletteBindings: {
      primary: '--atom-palette-blue-400',
      primaryHover: '--atom-palette-blue-500',
      primaryLight: '--atom-palette-blue-900',
      bgPrimary: '--atom-palette-gray-900',
      bgSecondary: '--atom-palette-gray-800',
      textPrimary: '--atom-palette-gray-50',
      textSecondary: '--atom-palette-gray-400',
      textMuted: '--atom-palette-gray-500',
      borderSubtle: '--atom-palette-gray-700',
      borderStrong: '--atom-palette-gray-600',
      statusSuccess: '--atom-palette-emerald-400',
      statusDanger: '--atom-palette-rose-400',
      statusWarning: '--atom-palette-amber-400',
    },
    colors: {
      primary: '#60a5fa',
      primaryHover: '#3182f6',
      primaryLight: '#1e3a8a',
      bgPrimary: '#0f172a',
      bgSecondary: '#1e293b',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      borderSubtle: '#334155',
      borderStrong: '#475569',
      statusSuccess: '#34d399',
      statusDanger: '#fb7185',
      statusWarning: '#fbbf24',
    },
  },
  {
    id: 'midnight-black',
    name: '미드나잇 블랙 (Midnight Black)',
    description: '완전한 딥 블랙(#000000) 배경에 일렉트릭 블루가 어우러진 최고급 다크 모드',
    mode: 'dark',
    category: 'dark',
    brandColor: '#3182f6',
    borderRadius: '6px',
    paletteBindings: {
      primary: '--atom-palette-blue-500',
      primaryHover: '--atom-palette-blue-600',
      primaryLight: '--atom-palette-blue-900',
      bgPrimary: '--atom-palette-black',
      bgSecondary: '--atom-palette-gray-900',
      textPrimary: '--atom-palette-white',
      textSecondary: '--atom-palette-gray-400',
      textMuted: '--atom-palette-gray-500',
      borderSubtle: '--atom-palette-gray-800',
      borderStrong: '--atom-palette-gray-700',
      statusSuccess: '--atom-palette-emerald-500',
      statusDanger: '--atom-palette-rose-500',
      statusWarning: '--atom-palette-amber-500',
    },
    colors: {
      primary: '#3182f6',
      primaryHover: '#1b64da',
      primaryLight: '#1e3a8a',
      bgPrimary: '#000000',
      bgSecondary: '#0f172a',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      borderSubtle: '#1e293b',
      borderStrong: '#334155',
      statusSuccess: '#10b981',
      statusDanger: '#ef4444',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'violet-tech',
    name: '모던 바이올렛 (Modern Violet)',
    description: 'B2B SaaS 및 개발자 플랫폼에 최적화된 감각적인 퍼플과 징크(Zinc) 서피스',
    mode: 'light',
    category: 'developer',
    brandColor: '#8b5cf6',
    borderRadius: '8px',
    paletteBindings: {
      primary: '--atom-palette-purple-500',
      primaryHover: '--atom-palette-purple-600',
      primaryLight: '--atom-palette-purple-50',
      bgPrimary: '--atom-palette-white',
      bgSecondary: '--atom-palette-gray-50',
      textPrimary: '--atom-palette-gray-900',
      textSecondary: '--atom-palette-gray-700',
      textMuted: '--atom-palette-gray-500',
      borderSubtle: '--atom-palette-gray-200',
      borderStrong: '--atom-palette-gray-300',
      statusSuccess: '--atom-palette-emerald-500',
      statusDanger: '--atom-palette-rose-500',
      statusWarning: '--atom-palette-amber-500',
    },
    colors: {
      primary: '#8b5cf6',
      primaryHover: '#9333ea',
      primaryLight: '#faf5ff',
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      borderSubtle: '#e2e8f0',
      borderStrong: '#cbd5e1',
      statusSuccess: '#10b981',
      statusDanger: '#ef4444',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'emerald-eco',
    name: '포레스트 에코 (Forest Eco)',
    description: '자연 감성의 깊은 딥그린과 편안한 웰니스 핀테크 인터페이스, 14px 라운딩',
    mode: 'light',
    category: 'fintech',
    brandColor: '#10b981',
    borderRadius: '14px',
    paletteBindings: {
      primary: '--atom-palette-emerald-500',
      primaryHover: '--atom-palette-emerald-600',
      primaryLight: '--atom-palette-emerald-50',
      bgPrimary: '--atom-palette-white',
      bgSecondary: '--atom-palette-gray-50',
      textPrimary: '--atom-palette-gray-900',
      textSecondary: '--atom-palette-gray-700',
      textMuted: '--atom-palette-gray-500',
      borderSubtle: '--atom-palette-gray-200',
      borderStrong: '--atom-palette-gray-300',
      statusSuccess: '--atom-palette-emerald-500',
      statusDanger: '--atom-palette-rose-500',
      statusWarning: '--atom-palette-amber-500',
    },
    colors: {
      primary: '#10b981',
      primaryHover: '#059669',
      primaryLight: '#ecfdf5',
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      borderSubtle: '#e2e8f0',
      borderStrong: '#cbd5e1',
      statusSuccess: '#10b981',
      statusDanger: '#ef4444',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'sunset-rose',
    name: '선셋 로즈 (Sunset Rose)',
    description: '우아하고 세련된 핑크 로즈와 부드러운 파스텔 카드 서피스, 16px 곡률',
    mode: 'light',
    category: 'lifestyle',
    brandColor: '#ef4444',
    borderRadius: '16px',
    paletteBindings: {
      primary: '--atom-palette-rose-500',
      primaryHover: '--atom-palette-rose-600',
      primaryLight: '--atom-palette-rose-50',
      bgPrimary: '--atom-palette-white',
      bgSecondary: '--atom-palette-gray-50',
      textPrimary: '--atom-palette-gray-900',
      textSecondary: '--atom-palette-gray-700',
      textMuted: '--atom-palette-gray-500',
      borderSubtle: '--atom-palette-gray-200',
      borderStrong: '--atom-palette-gray-300',
      statusSuccess: '--atom-palette-emerald-500',
      statusDanger: '--atom-palette-rose-500',
      statusWarning: '--atom-palette-amber-500',
    },
    colors: {
      primary: '#ef4444',
      primaryHover: '#e11d48',
      primaryLight: '#fff1f2',
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      borderSubtle: '#e2e8f0',
      borderStrong: '#cbd5e1',
      statusSuccess: '#10b981',
      statusDanger: '#ef4444',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'minimal-mono',
    name: '미니멀 모노 (Minimal Monochrome)',
    description: '극도의 절제미를 담은 하이 콘트라스트 흑백과 4px 기하학적 곡률',
    mode: 'light',
    category: 'minimal',
    brandColor: '#000000',
    borderRadius: '4px',
    paletteBindings: {
      primary: '--atom-palette-black',
      primaryHover: '--atom-palette-gray-800',
      primaryLight: '--atom-palette-gray-100',
      bgPrimary: '--atom-palette-white',
      bgSecondary: '--atom-palette-gray-50',
      textPrimary: '--atom-palette-gray-900',
      textSecondary: '--atom-palette-gray-700',
      textMuted: '--atom-palette-gray-500',
      borderSubtle: '--atom-palette-gray-200',
      borderStrong: '--atom-palette-gray-800',
      statusSuccess: '--atom-palette-emerald-500',
      statusDanger: '--atom-palette-rose-500',
      statusWarning: '--atom-palette-amber-500',
    },
    colors: {
      primary: '#000000',
      primaryHover: '#1e293b',
      primaryLight: '#f1f5f9',
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      borderSubtle: '#e2e8f0',
      borderStrong: '#1e293b',
      statusSuccess: '#10b981',
      statusDanger: '#ef4444',
      statusWarning: '#f59e0b',
    },
  },
];

/**
 * 팔레트 토큰 목록의 최신 값을 기반으로 테마 색상을 실시간 해석(Resolve)합니다.
 * 팔레트 관리자에서 색상 값이 수정되면 테마 색상도 즉시 연동됩니다.
 */
export function resolveThemeColors(
  theme: StudioTheme,
  paletteVariables?: { id: string; value: string }[]
): StudioTheme['colors'] {
  if (!paletteVariables || !theme.paletteBindings) {
    return theme.colors;
  }

  const lookup = new Map<string, string>();
  for (const p of paletteVariables) {
    lookup.set(p.id, p.value);
  }

  const pb = theme.paletteBindings;
  return {
    primary: (pb.primary && lookup.get(pb.primary)) || theme.colors.primary,
    primaryHover: (pb.primaryHover && lookup.get(pb.primaryHover)) || theme.colors.primaryHover,
    primaryLight: (pb.primaryLight && lookup.get(pb.primaryLight)) || theme.colors.primaryLight,
    secondary: (pb.secondary && lookup.get(pb.secondary)) || theme.colors.secondary || (theme.mode === 'dark' ? '#334155' : '#e2e8f0'),
    secondaryHover: (pb.secondaryHover && lookup.get(pb.secondaryHover)) || theme.colors.secondaryHover || (theme.mode === 'dark' ? '#475569' : '#cbd5e1'),
    secondaryLight: (pb.secondaryLight && lookup.get(pb.secondaryLight)) || theme.colors.secondaryLight || (theme.mode === 'dark' ? '#1e293b' : '#f8fafc'),
    bgPrimary: (pb.bgPrimary && lookup.get(pb.bgPrimary)) || theme.colors.bgPrimary,
    bgSecondary: (pb.bgSecondary && lookup.get(pb.bgSecondary)) || theme.colors.bgSecondary,
    textPrimary: (pb.textPrimary && lookup.get(pb.textPrimary)) || theme.colors.textPrimary,
    textSecondary: (pb.textSecondary && lookup.get(pb.textSecondary)) || theme.colors.textSecondary,
    textMuted: (pb.textMuted && lookup.get(pb.textMuted)) || theme.colors.textMuted,
    borderSubtle: (pb.borderSubtle && lookup.get(pb.borderSubtle)) || theme.colors.borderSubtle,
    borderStrong: (pb.borderStrong && lookup.get(pb.borderStrong)) || theme.colors.borderStrong,
    statusSuccess: (pb.statusSuccess && lookup.get(pb.statusSuccess)) || theme.colors.statusSuccess,
    statusDanger: (pb.statusDanger && lookup.get(pb.statusDanger)) || theme.colors.statusDanger,
    statusWarning: (pb.statusWarning && lookup.get(pb.statusWarning)) || theme.colors.statusWarning,
  };
}

/**
 * StudioTheme을 ThemeConfig(전역 DOM 인젝터 포맷)으로 변환
 */
export function studioThemeToThemeConfig(st: StudioTheme, palettes?: { id: string; value: string }[]): ThemeConfig {
  const resolvedColors = palettes ? resolveThemeColors(st, palettes) : st.colors;
  return {
    color: { ...resolvedColors },
    borderRadius: st.borderRadius,
    typography: { ...DEFAULT_THEME_CONFIG.typography },
    buttonSpacing: {
      paddingY: '8px',
      paddingX: '16px',
    },
  };
}
