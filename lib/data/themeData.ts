import { atomTokens } from '../tokens';
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

/**
 * Unified SSOT themes loaded directly from `tokens/tokens.json` (`theme.presets` referencing `palette.*`).
 */
export const INITIAL_STUDIO_THEMES: StudioTheme[] = atomTokens.theme.toStudioThemes();

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
    secondary:
      (pb.secondary && lookup.get(pb.secondary)) ||
      theme.colors.secondary ||
      (theme.mode === 'dark' ? '#334155' : '#e2e8f0'),
    secondaryHover:
      (pb.secondaryHover && lookup.get(pb.secondaryHover)) ||
      theme.colors.secondaryHover ||
      (theme.mode === 'dark' ? '#475569' : '#cbd5e1'),
    secondaryLight:
      (pb.secondaryLight && lookup.get(pb.secondaryLight)) ||
      theme.colors.secondaryLight ||
      (theme.mode === 'dark' ? '#1e293b' : '#f8fafc'),
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
export function studioThemeToThemeConfig(
  st: StudioTheme,
  palettes?: { id: string; value: string }[]
): ThemeConfig {
  const resolvedColors = palettes ? resolveThemeColors(st, palettes) : st.colors;
  const fontSansToken = palettes?.find((p) => p.id === '--atom-font-sans')?.value;
  return {
    color: { ...resolvedColors },
    borderRadius: st.borderRadius,
    typography: {
      ...DEFAULT_THEME_CONFIG.typography,
      fontFamily: fontSansToken || st.fontFamily || DEFAULT_THEME_CONFIG.typography.fontFamily,
    },
    buttonSpacing: {
      paddingY: '8px',
      paddingX: '16px',
    },
  };
}
