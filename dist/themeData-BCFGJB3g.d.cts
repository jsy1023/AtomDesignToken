interface TypographyLevelConfig {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
    letterSpacing: string;
}
interface TypographyConfig {
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
interface ColorConfig {
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
}
interface BrandConfig {
    name: string;
    logoUrl?: string | null;
    slogan?: string;
    logoHeight?: number;
}
declare const DEFAULT_BRAND_CONFIG: BrandConfig;
interface ButtonSpacingConfig {
    paddingY: string;
    paddingX: string;
}
interface ThemeConfig {
    color: ColorConfig;
    typography: TypographyConfig;
    borderRadius: string;
    buttonSpacing?: ButtonSpacingConfig;
    selectedIcon?: string;
}
interface ColorPreset {
    id: string;
    name: string;
    description: string;
    colors: ColorConfig;
    borderRadius: string;
}
declare const DEFAULT_THEME_CONFIG: ThemeConfig;
declare const COLOR_PRESETS: ColorPreset[];
interface FontFamilyPreset {
    id: string;
    name: string;
    value: string;
    cdnUrl?: string;
    category: 'sans' | 'mono';
    description?: string;
}
declare const FONT_FAMILY_PRESETS: FontFamilyPreset[];

type ThemeCategory = 'all' | 'fintech' | 'lifestyle' | 'developer' | 'dark' | 'minimal' | 'custom';
interface ThemePaletteBindings {
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
}
interface StudioTheme {
    id: string;
    name: string;
    description: string;
    mode: 'light' | 'dark';
    category: 'fintech' | 'lifestyle' | 'developer' | 'dark' | 'minimal' | 'custom';
    brandColor: string;
    paletteBindings?: Partial<ThemePaletteBindings>;
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
declare const INITIAL_STUDIO_THEMES: StudioTheme[];
/**
 * 팔레트 토큰 목록의 최신 값을 기반으로 테마 색상을 실시간 해석(Resolve)합니다.
 * 팔레트 관리자에서 색상 값이 수정되면 테마 색상도 즉시 연동됩니다.
 */
declare function resolveThemeColors(theme: StudioTheme, paletteVariables?: {
    id: string;
    value: string;
}[]): StudioTheme['colors'];
/**
 * StudioTheme을 ThemeConfig(전역 DOM 인젝터 포맷)으로 변환
 */
declare function studioThemeToThemeConfig(st: StudioTheme, palettes?: {
    id: string;
    value: string;
}[]): ThemeConfig;

export { type BrandConfig as B, type ColorConfig as C, DEFAULT_BRAND_CONFIG as D, type FontFamilyPreset as F, INITIAL_STUDIO_THEMES as I, type StudioTheme as S, type ThemeConfig as T, type ThemeCategory as a, type ThemePaletteBindings as b, type TypographyLevelConfig as c, type TypographyConfig as d, type ButtonSpacingConfig as e, type ColorPreset as f, DEFAULT_THEME_CONFIG as g, COLOR_PRESETS as h, FONT_FAMILY_PRESETS as i, resolveThemeColors as r, studioThemeToThemeConfig as s };
