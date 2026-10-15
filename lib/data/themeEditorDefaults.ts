export interface TypographyLevelConfig {
  fontSize: number; // in px
  lineHeight: number; // multiplier e.g. 1.25
  fontWeight: number; // 400, 500, 600, 700, 800, 900
  letterSpacing: string; // e.g. '-0.02em'
}

export interface TypographyConfig {
  fontFamily: string;
  h1: TypographyLevelConfig;
  h2: TypographyLevelConfig;
  h3: TypographyLevelConfig;
  h4: TypographyLevelConfig;
  h5: TypographyLevelConfig;
  h6: TypographyLevelConfig;
  body: TypographyLevelConfig;
  sm: TypographyLevelConfig;
  xs: TypographyLevelConfig;
}

export interface ColorConfig {
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
}

export interface ThemeConfig {
  color: ColorConfig;
  typography: TypographyConfig;
  borderRadius: string;
}

export interface ColorPreset {
  id: string;
  name: string;
  description: string;
  colors: ColorConfig;
  borderRadius: string;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  color: {
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
  typography: {
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
    h1: {
      fontSize: 36,
      lineHeight: 1.25,
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: 28,
      lineHeight: 1.3,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: 22,
      lineHeight: 1.35,
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontSize: 18,
      lineHeight: 1.4,
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: 16,
      lineHeight: 1.45,
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: 14,
      lineHeight: 1.5,
      fontWeight: 600,
      letterSpacing: '0em',
    },
    body: {
      fontSize: 15,
      lineHeight: 1.6,
      fontWeight: 400,
      letterSpacing: '-0.005em',
    },
    sm: {
      fontSize: 13,
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: '0em',
    },
    xs: {
      fontSize: 11,
      lineHeight: 1.4,
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
  },
  borderRadius: '14px',
};

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'toss',
    name: '토스 (Toss Vivid Blue)',
    description: '청량한 비비드 블루와 볼드 라운딩',
    borderRadius: '16px',
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
    id: 'daangn',
    name: '당근 (Daangn Warm)',
    description: '따뜻한 오렌지와 친근한 라운딩 감성',
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
    id: 'violet-tech',
    name: '바이올렛 (Modern Violet)',
    description: 'B2B 테크 및 개발자 지향의 감각적인 보라색',
    borderRadius: '10px',
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
    id: 'emerald',
    name: '에메랄드 (Forest Eco)',
    description: '편안한 자연 감성의 딥 그린 핀테크/웰니스',
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
    id: 'dark-cyber',
    name: '다크 사이버 (Dark Cyber)',
    description: '세련된 네온 시안과 매트 다크 서피스',
    borderRadius: '12px',
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
    id: 'sunset-rose',
    name: '선셋 로즈 (Sunset Rose)',
    description: '우아하고 로맨틱한 핑크 로즈 테마',
    borderRadius: '16px',
    colors: {
      primary: '#e11d48',
      primaryHover: '#be123c',
      primaryLight: '#ffe4e6',
      bgPrimary: '#ffffff',
      bgSecondary: '#fff1f2',
      textPrimary: '#1e1b18',
      textSecondary: '#9f1239',
      textMuted: '#fda4af',
      borderSubtle: '#fecdd3',
      borderStrong: '#f43f5e',
      statusSuccess: '#10b981',
      statusDanger: '#e11d48',
      statusWarning: '#f59e0b',
    },
  },
];

export const FONT_FAMILY_PRESETS = [
  {
    name: 'Pretendard (기본 권장)',
    value: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
  },
  {
    name: 'Inter (글로벌 테크)',
    value: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    name: 'System UI (시스템 네이티브)',
    value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  {
    name: 'Noto Sans KR (구글 표준 한국어)',
    value: '"Noto Sans KR", sans-serif',
  },
  {
    name: 'Monospace (코딩 / 모노)',
    value: '"JetBrains Mono", "Fira Code", monospace',
  },
];
