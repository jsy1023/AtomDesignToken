import { T as ThemeConfig } from './themeData-BCFGJB3g.js';
export { B as BrandConfig, e as ButtonSpacingConfig, h as COLOR_PRESETS, C as ColorConfig, f as ColorPreset, D as DEFAULT_BRAND_CONFIG, g as DEFAULT_THEME_CONFIG, i as FONT_FAMILY_PRESETS, F as FontFamilyPreset, I as INITIAL_STUDIO_THEMES, S as StudioTheme, a as ThemeCategory, b as ThemePaletteBindings, d as TypographyConfig, c as TypographyLevelConfig, r as resolveThemeColors, s as studioThemeToThemeConfig } from './themeData-BCFGJB3g.js';

interface AwesomeDesignMdTheme {
    id: string;
    name: string;
    category: string;
    description: string;
    designMdPath: string;
    color: ThemeConfig['color'];
    typography: ThemeConfig['typography'];
    borderRadius: string;
}
declare const AWESOME_DESIGN_MD_THEMES: AwesomeDesignMdTheme[];
declare const AWESOME_CATEGORIES: readonly ["All", "AI & LLM", "Developer Tools", "Fintech & Web3", "Tech & Lifestyle", "Automotive & Luxury"];

export { AWESOME_CATEGORIES, AWESOME_DESIGN_MD_THEMES, type AwesomeDesignMdTheme, ThemeConfig };
