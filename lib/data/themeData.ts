import { ThemeConfig, DEFAULT_THEME_CONFIG } from './themeEditorDefaults';

export type ThemeCategory = 'all' | 'fintech' | 'lifestyle' | 'developer' | 'dark' | 'minimal' | 'custom';

export interface StudioTheme {
  id: string;
  name: string;
  description: string;
  mode: 'light' | 'dark';
  category: 'fintech' | 'lifestyle' | 'developer' | 'dark' | 'minimal' | 'custom';
  brandColor: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
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
    colors: {
      primary: '#3182f6',
      primaryHover: '#1b64da',
      primaryLight: '#e8f3ff',
      bgPrimary: '#ffffff',
      bgSecondary: '#f8f9fa',
      textPrimary: '#191f28',
      textSecondary: '#8b95a1',
      textMuted: '#b0b8c1',
      borderSubtle: '#f2f4f6',
      borderStrong: '#e5e8eb',
      statusSuccess: '#10b981',
      statusDanger: '#f43f5e',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'warm-orange',
    name: '웜 오렌지 (Warm Orange)',
    description: '따뜻하고 친근한 감성의 비비드 오렌지와 크리미한 서피스, 12px 소프트 라운딩',
    mode: 'light',
    category: 'lifestyle',
    brandColor: '#ff6f0f',
    borderRadius: '12px',
    colors: {
      primary: '#ff6f0f',
      primaryHover: '#e05900',
      primaryLight: '#fff2e8',
      bgPrimary: '#ffffff',
      bgSecondary: '#fbf7f2',
      textPrimary: '#212124',
      textSecondary: '#868b94',
      textMuted: '#b2b5ba',
      borderSubtle: '#f5f0eb',
      borderStrong: '#e4ddd3',
      statusSuccess: '#10b981',
      statusDanger: '#ff4b4b',
      statusWarning: '#ff9800',
    },
  },
  {
    id: 'dark-cyber',
    name: '사이버 다크 (Cyber Dark)',
    description: '하이테크 네온 시안 액센트와 딥 슬레이트(Slate-900) 매트 다크 서피스',
    mode: 'dark',
    category: 'dark',
    brandColor: '#06b6d4',
    borderRadius: '10px',
    colors: {
      primary: '#06b6d4',
      primaryHover: '#0891b2',
      primaryLight: '#164e63',
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
    brandColor: '#3b82f6',
    borderRadius: '6px',
    colors: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      primaryLight: '#1e3a8a',
      bgPrimary: '#000000',
      bgSecondary: '#111111',
      textPrimary: '#ffffff',
      textSecondary: '#a1a1aa',
      textMuted: '#71717a',
      borderSubtle: '#27272a',
      borderStrong: '#3f3f46',
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
    brandColor: '#7c3aed',
    borderRadius: '8px',
    colors: {
      primary: '#7c3aed',
      primaryHover: '#6d28d9',
      primaryLight: '#f3e8ff',
      bgPrimary: '#ffffff',
      bgSecondary: '#faf7ff',
      textPrimary: '#18181b',
      textSecondary: '#71717a',
      textMuted: '#a1a1aa',
      borderSubtle: '#f4f4f5',
      borderStrong: '#e4e4e7',
      statusSuccess: '#059669',
      statusDanger: '#e11d48',
      statusWarning: '#d97706',
    },
  },
  {
    id: 'emerald-eco',
    name: '포레스트 에코 (Forest Eco)',
    description: '자연 감성의 깊은 딥그린과 편안한 웰니스 핀테크 인터페이스, 14px 라운딩',
    mode: 'light',
    category: 'fintech',
    brandColor: '#059669',
    borderRadius: '14px',
    colors: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryLight: '#ecfdf5',
      bgPrimary: '#ffffff',
      bgSecondary: '#f0fdf4',
      textPrimary: '#064e3b',
      textSecondary: '#6ee7b7',
      textMuted: '#94a3b8',
      borderSubtle: '#e6f7ec',
      borderStrong: '#d1fae5',
      statusSuccess: '#10b981',
      statusDanger: '#f43f5e',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'sunset-rose',
    name: '선셋 로즈 (Sunset Rose)',
    description: '우아하고 세련된 핑크 로즈와 부드러운 파스텔 카드 서피스, 16px 곡률',
    mode: 'light',
    category: 'lifestyle',
    brandColor: '#e11d48',
    borderRadius: '16px',
    colors: {
      primary: '#e11d48',
      primaryHover: '#be123c',
      primaryLight: '#ffe4e6',
      bgPrimary: '#ffffff',
      bgSecondary: '#fff1f2',
      textPrimary: '#4c0519',
      textSecondary: '#fb7185',
      textMuted: '#fda4af',
      borderSubtle: '#ffe4e6',
      borderStrong: '#fecdd3',
      statusSuccess: '#10b981',
      statusDanger: '#e11d48',
      statusWarning: '#f59e0b',
    },
  },
  {
    id: 'minimal-mono',
    name: '미니멀 모노 (Minimal Monochrome)',
    description: '극도의 절제미를 담은 하이 콘트라스트 흑백과 4px 기하학적 곡률',
    mode: 'light',
    category: 'minimal',
    brandColor: '#18181b',
    borderRadius: '4px',
    colors: {
      primary: '#18181b',
      primaryHover: '#27272a',
      primaryLight: '#f4f4f5',
      bgPrimary: '#ffffff',
      bgSecondary: '#fafafa',
      textPrimary: '#09090b',
      textSecondary: '#71717a',
      textMuted: '#a1a1aa',
      borderSubtle: '#e4e4e7',
      borderStrong: '#27272a',
      statusSuccess: '#16a34a',
      statusDanger: '#dc2626',
      statusWarning: '#ca8a04',
    },
  },
];

/**
 * StudioTheme을 ThemeConfig(전역 DOM 인젝터 포맷)으로 변환
 */
export function studioThemeToThemeConfig(st: StudioTheme): ThemeConfig {
  return {
    color: { ...st.colors },
    borderRadius: st.borderRadius,
    typography: { ...DEFAULT_THEME_CONFIG.typography },
    buttonSpacing: {
      paddingY: '8px',
      paddingX: '16px',
    },
  };
}
