import { ClassValue } from 'clsx';

type TokenCategory = 'color' | 'typography' | 'radius' | 'spacing' | 'shadow';
interface BrandPreset {
    id: string;
    name: string;
    brandColor: string;
    radius: string;
    description: string;
}
interface ColorToken {
    name: string;
    variable: string;
    value: string;
    description: string;
    category: 'brand' | 'surface' | 'text' | 'border' | 'status';
}
interface TypographyToken {
    name: string;
    variable: string;
    fontSize: string;
    lineHeight: string;
    weight: string;
    sample: string;
}
interface RadiusToken {
    name: string;
    variable: string;
    value: string;
    description: string;
}
interface SpacingToken {
    name: string;
    variable: string;
    value: string;
    px: number;
}
interface ShadowToken {
    name: string;
    variable: string;
    value: string;
    description: string;
}
declare const BRAND_PRESETS: BrandPreset[];
declare const BASE_COLOR_TOKENS: ColorToken[];
declare const TYPOGRAPHY_TOKENS: TypographyToken[];
declare const RADIUS_TOKENS: RadiusToken[];
declare const SPACING_TOKENS: SpacingToken[];
declare const SHADOW_TOKENS: ShadowToken[];

type ComponentCategory = 'all' | 'form' | 'feedback' | 'navigation' | 'data';
interface PropItem {
    name: string;
    type: string;
    defaultValue: string;
    description: string;
}
interface DosAndDont {
    do: string;
    dont: string;
}
interface GalleryComponent {
    id: string;
    name: string;
    category: ComponentCategory;
    source: string;
    description: string;
    htmlSnippet: string;
    reactSnippet: string;
    vueSnippet?: string;
    callout?: {
        type: 'note' | 'tip' | 'warning';
        title: string;
        text: string;
    };
    propsSpec?: PropItem[];
    useCases: string[];
    usagePatterns: string[];
    dosAndDonts: DosAndDont[];
    relatedPatternIds: string[];
}
declare const GALLERY_COMPONENTS: GalleryComponent[];

interface PatternVariant {
    id: string;
    name: string;
    description: string;
    checklist: string[];
    antiPatterns: string[];
    markdown: string;
}
type PatternPlatform = 'web' | 'mobile';
interface PatternItem {
    id: string;
    title: string;
    categoryName: string;
    badge: string;
    platform: PatternPlatform;
    wireframeType: string;
    iconName: 'dashboard' | 'chat' | 'onboarding' | 'uploader' | 'kyc' | 'blog' | 'map' | 'flight' | 'fintech' | 'commerce' | 'search' | 'docs' | 'settings';
    summary: string;
    recommendedComponentIds: string[];
    checklist: string[];
    antiPatterns: string[];
    variants: PatternVariant[];
}
declare const PATTERNS_COLLECTION: PatternItem[];

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
interface ThemeConfig {
    color: ColorConfig;
    typography: TypographyConfig;
    borderRadius: string;
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
declare const FONT_FAMILY_PRESETS: {
    name: string;
    value: string;
}[];

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

/**
 * ThemeConfig를 받아 전역에 적용될 동적 CSS 문자열을 생성합니다.
 */
declare function generateThemeCSS(theme: ThemeConfig): string;
/**
 * DOM에 실시간 스타일 태그를 주입하거나 갱신합니다.
 */
declare function applyThemeToDOM(theme: ThemeConfig): void;
/**
 * 순수 CSS 복사용 코드 생성
 */
declare function exportToCSS(theme: ThemeConfig): string;
/**
 * Tailwind Config 확장 객체 코드 생성
 */
declare function exportToTailwind(theme: ThemeConfig): string;
/**
 * W3C Design Token Community Group (DTCG) 호환 tokens.json 생성
 */
declare function exportToTokensJson(theme: ThemeConfig): string;

/**
 * Combines multiple class names using clsx and merges Tailwind classes
 * to handle conflicts (e.g., 'px-2 px-4' becomes 'px-4').
 */
declare function cn(...inputs: ClassValue[]): string;

/**
 * AtomSystem / AtomDesignToken Public API
 * Universal Design Token & UI Library
 */

declare const ATOM_UI_CSS_PATH = "atomsystem/css/atom-ui.css";
/**
 * CLI Banner & Metadata
 */
declare const ATOM_VERSION = "0.1.48";
declare const ATOM_LIB_NAME = "atomsystem";

export { ATOM_LIB_NAME, ATOM_UI_CSS_PATH, ATOM_VERSION, AWESOME_CATEGORIES, AWESOME_DESIGN_MD_THEMES, type AwesomeDesignMdTheme, BASE_COLOR_TOKENS, BRAND_PRESETS, type BrandPreset, COLOR_PRESETS, type ColorConfig, type ColorPreset, type ColorToken, type ComponentCategory, DEFAULT_THEME_CONFIG, type DosAndDont, FONT_FAMILY_PRESETS, GALLERY_COMPONENTS, type GalleryComponent, PATTERNS_COLLECTION, type PatternItem, type PatternPlatform, type PatternVariant, type PropItem, RADIUS_TOKENS, type RadiusToken, SHADOW_TOKENS, SPACING_TOKENS, type ShadowToken, type SpacingToken, TYPOGRAPHY_TOKENS, type ThemeConfig, type TokenCategory, type TypographyConfig, type TypographyLevelConfig, type TypographyToken, applyThemeToDOM, cn, exportToCSS, exportToTailwind, exportToTokensJson, generateThemeCSS };
