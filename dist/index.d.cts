import { ClassValue } from 'clsx';
import React from 'react';

type TokenCategory = 'color' | 'typography' | 'radius' | 'spacing' | 'shadow' | 'layout';
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
interface LayoutToken {
    name: string;
    variable: string;
    value: string;
    description: string;
    type: 'container' | 'gutter' | 'gap';
}
declare const BRAND_PRESETS: BrandPreset[];
declare const BASE_COLOR_TOKENS: ColorToken[];
declare const TYPOGRAPHY_TOKENS: TypographyToken[];
declare const RADIUS_TOKENS: RadiusToken[];
declare const SPACING_TOKENS: SpacingToken[];
declare const SHADOW_TOKENS: ShadowToken[];
declare const LAYOUT_TOKENS: LayoutToken[];

type ComponentCategory = 'all' | 'form' | 'feedback' | 'navigation' | 'data' | 'layout' | 'foundation';
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

type PaletteCategory = 'color' | 'size' | 'spacing' | 'radius' | 'typography' | 'status';
interface SemanticStatusToken {
    id: string;
    key: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    name: string;
    description: string;
    paletteId: string;
    hoverPaletteId: string;
    subtlePaletteId: string;
}
declare const INITIAL_SEMANTIC_STATUS_TOKENS: SemanticStatusToken[];
interface PaletteVariable {
    id: string;
    name: string;
    category: PaletteCategory;
    value: string;
    cdnUrl?: string;
    description?: string;
    family?: string;
}
interface ComponentPropertySpec {
    key: string;
    label: string;
    category: 'color' | 'radius' | 'spacing' | 'size' | 'typography';
    defaultPaletteId: string;
}
/**
 * 1. Type: 조형과 뼈대가 다른 "새로운 디자인의 컴포넌트 외형 양식"
 * 예: Button의 Solid, Outline, Ghost, Soft, Pill, Elevated
 *     Card의 Outlined, Elevated, Flat, Accent-Border
 *     Badge의 Solid, Subtle, Outline, Dot
 *     Input의 Outlined, Filled, Underlined
 */
interface ComponentTypeSpec {
    id: string;
    name: string;
    description?: string;
    whenToUse: string;
    whenToUseEn?: string;
    antiPattern?: string;
    visualTraits?: {
        hasBorder?: boolean;
        hasBackground?: boolean;
        borderRadius?: string;
        shadow?: string;
    };
}
/**
 * 전 컴포넌트 기본 디자인 Type (외형 양식) 프리셋 카탈로그
 */
declare const DEFAULT_COMPONENT_TYPES: Record<string, ComponentTypeSpec[]>;
/**
 * 문서/UI 컴포넌트 식별자(예: 'dialog', 'selection', 'sidemenu')를 스튜디오 정규 컴포넌트 ID로 매핑합니다.
 */
declare function resolveStudioComponentId(rawId: string): string;
declare function getComponentTypes(componentId: string, customTypes?: ComponentTypeSpec[]): ComponentTypeSpec[];
/**
 * 2. Variable: "빨강은 위험, 노랑은 경고, primary는 브랜드" 같은 시맨틱 역할 및 비주얼 의미론
 */
type SemanticVariableRole = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'outline' | 'ghost';
interface SemanticVariableDefinition {
    role: SemanticVariableRole;
    label: string;
    meaning: string;
    badgeColorClass: string;
}
declare const SEMANTIC_VARIABLE_DICTIONARY: Record<SemanticVariableRole, SemanticVariableDefinition>;
/**
 * 3. Status: "hover, disabled 같은 상태 정보 구조"
 * UI 컴포넌트의 인터랙션 라이프사이클에 따른 상태 정보
 */
type ComponentInteractiveStatus = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
interface ComponentStatusSpec {
    status: ComponentInteractiveStatus;
    label: string;
    description: string;
    descriptionEn?: string;
    behavior: string;
    behaviorEn?: string;
}
declare const COMPONENT_STATUS_PRESETS: ComponentStatusSpec[];
declare function resolveVariableRole(variableId: string): SemanticVariableRole;
declare function resolveTypeSpec(componentId: string, variableId: string, customName?: string): ComponentTypeSpec;
/**
 * 각 상태(Status)별로 수정 가능한 토큰 프로퍼티 목록을 반환하는 함수
 * - Default: 표준 배경, 텍스트, 테두리, 곡률, 여백
 * - Hover: 마우스 오버 시 피드백 토큰 (hoverBackground, hoverTextColor, hoverBorderColor)
 * - Active: 클릭 시 피드백 토큰 (activeBackground, activeTextColor, activeBorderColor)
 * - Focus: 키보드 포커스 링 토큰 (focusBorderColor, focusBackground)
 * - Disabled: 비활성 시 차단 토큰 (disabledBackground, disabledTextColor, disabledBorderColor)
 */
declare function getComponentStatusProperties(componentId: string, status: ComponentInteractiveStatus | 'all', baseProperties?: ComponentPropertySpec[]): ComponentPropertySpec[];
interface ComponentVariable {
    id: string;
    name: string;
    description?: string;
    type?: ComponentTypeSpec;
    variableRole?: SemanticVariableRole;
    supportedStatuses?: ComponentInteractiveStatus[];
    tokenBindings: Record<string, string>;
}
interface StudioComponentDefinition {
    id: string;
    name: string;
    category: 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data';
    description: string;
    types?: ComponentTypeSpec[];
    typeGuide?: {
        primaryType: string;
        whenToUse: string;
        variantsSummary: string;
    };
    supportedStatuses?: ComponentInteractiveStatus[];
    properties: ComponentPropertySpec[];
    variables: ComponentVariable[];
    sourceFile?: string;
    autoDiscovered?: boolean;
    customCss?: string;
    docs?: {
        useCases?: string[];
        usagePatterns?: string[];
        propsSpec?: {
            name: string;
            type: string;
            defaultValue: string;
            description: string;
        }[];
    };
}
declare const INITIAL_PALETTE_VARIABLES: PaletteVariable[];
declare const INITIAL_STUDIO_COMPONENTS: StudioComponentDefinition[];
interface StudioRegistry {
    $schema?: string;
    version: string;
    updatedAt: string;
    activeThemeId?: string;
    statusTokens: SemanticStatusToken[];
    paletteVariables: PaletteVariable[];
    components: StudioComponentDefinition[];
}
interface AtomComponentSubmissionSpec {
    id: string;
    name: string;
    category: 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data';
    description: string;
    types: ComponentTypeSpec[];
    properties?: ComponentPropertySpec[];
    variables: ComponentVariable[];
    supportedStatuses?: ComponentInteractiveStatus[];
    componentCode?: string;
    overwriteCode?: boolean;
    customCss?: string;
    docs?: {
        useCases?: string[];
        usagePatterns?: string[];
        propsSpec?: {
            name: string;
            type: string;
            defaultValue: string;
            description: string;
        }[];
    };
}
declare const AI_COMPONENT_SUBMISSION_TEMPLATE: AtomComponentSubmissionSpec;
declare function buildAiComponentSubmissionPrompt(componentRequest?: string): string;

/**
 * Dynamically injects or updates a stylesheet <link> tag in document.head for a custom webfont CDN URL.
 */
declare function injectWebfontLink(cdnUrl?: string, linkId?: string): void;
/**
 * ThemeConfig를 받아 전역에 적용될 동적 CSS 문자열을 생성합니다.
 */
declare function generateThemeCSS(theme: ThemeConfig): string;
/**
 * Hex 색상의 명도(Luminance)를 계산하여 다크 테마 여부를 판별합니다.
 */
declare function isDarkColor(hexColor: string): boolean;
/**
 * DOM에 실시간 스타일 태그를 주입하거나 갱신합니다.
 * 다크/라이트 테마에 따라 html 태그의 dark 클래스 및 data-theme 속성을 자동 동기화합니다.
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

declare const STUDIO_CUSTOM_STYLES_START = "/* === Studio Registered Component Styles Start === */";
declare const STUDIO_CUSTOM_STYLES_END = "/* === Studio Registered Component Styles End === */";
declare function exportStudioToTokensJson(palette: PaletteVariable[], components: StudioComponentDefinition[], statusTokens?: SemanticStatusToken[]): string;
declare function exportStudioToCSS(palette: PaletteVariable[], components: StudioComponentDefinition[], statusTokens?: SemanticStatusToken[]): string;
/**
 * Generates delimited dynamic CSS rules for custom components submitted via Studio/AI
 * and any visualTraits declared on component Types so they work identically across the project.
 */
declare function exportStudioCustomComponentStyles(components: StudioComponentDefinition[]): string;

/**
 * Combines multiple class names using clsx and merges Tailwind classes
 * to handle conflicts (e.g., 'px-2 px-4' becomes 'px-4').
 */
declare function cn(...inputs: ClassValue[]): string;

interface RefactorMatch {
    file: string;
    line: number;
    original: string;
    replacement: string;
    type: 'color' | 'spacing' | 'radius' | 'tailwind-color';
}
interface RefactorReport {
    scannedFiles: number;
    totalMatches: number;
    fixedFiles: number;
    matches: RefactorMatch[];
}
declare const TOKEN_REPLACEMENTS: Array<{
    pattern: RegExp;
    replacement: string | ((substring: string, ...args: any[]) => string);
    type: 'color' | 'spacing' | 'radius' | 'tailwind-color';
}>;
declare function scanAndRefactorDirectory(rootDir: string, options?: {
    fix?: boolean;
    verbose?: boolean;
}): RefactorReport;

interface KpiMetric {
    id: string;
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: 'dollar' | 'users' | 'activity' | 'card';
}
interface TransactionItem {
    id: string;
    customer: string;
    email: string;
    plan: string;
    amount: string;
    status: 'active' | 'pending' | 'failed';
    date: string;
}
declare function EnterpriseDashboardUseCase(): React.JSX.Element;

/**
 * AtomSystem / AtomDesignToken Public API
 * Universal Design Token & UI Library
 */

declare const ATOM_UI_CSS_PATH = "atomsystem/css/atom-ui.css";
declare const ATOM_STUDIO_REGISTRY_PATH = "atomsystem/studio.registry.json";
/**
 * CLI Banner & Metadata
 */
declare const ATOM_VERSION = "0.14.2";
declare const ATOM_LIB_NAME = "atomsystem";

export { AI_COMPONENT_SUBMISSION_TEMPLATE, ATOM_LIB_NAME, ATOM_STUDIO_REGISTRY_PATH, ATOM_UI_CSS_PATH, ATOM_VERSION, AWESOME_CATEGORIES, AWESOME_DESIGN_MD_THEMES, type AtomComponentSubmissionSpec, type AwesomeDesignMdTheme, BASE_COLOR_TOKENS, BRAND_PRESETS, type BrandConfig, type BrandPreset, type ButtonSpacingConfig, COLOR_PRESETS, COMPONENT_STATUS_PRESETS, type ColorConfig, type ColorPreset, type ColorToken, type ComponentCategory, type ComponentInteractiveStatus, type ComponentPropertySpec, type ComponentStatusSpec, type ComponentTypeSpec, type ComponentVariable, DEFAULT_BRAND_CONFIG, DEFAULT_COMPONENT_TYPES, DEFAULT_THEME_CONFIG, type DosAndDont, EnterpriseDashboardUseCase, FONT_FAMILY_PRESETS, type FontFamilyPreset, GALLERY_COMPONENTS, type GalleryComponent, INITIAL_PALETTE_VARIABLES, INITIAL_SEMANTIC_STATUS_TOKENS, INITIAL_STUDIO_COMPONENTS, type KpiMetric, LAYOUT_TOKENS, type LayoutToken, PATTERNS_COLLECTION, type PaletteCategory, type PaletteVariable, type PatternItem, type PatternPlatform, type PatternVariant, type PropItem, RADIUS_TOKENS, type RadiusToken, type RefactorMatch, type RefactorReport, SEMANTIC_VARIABLE_DICTIONARY, SHADOW_TOKENS, SPACING_TOKENS, STUDIO_CUSTOM_STYLES_END, STUDIO_CUSTOM_STYLES_START, type SemanticStatusToken, type SemanticVariableDefinition, type SemanticVariableRole, type ShadowToken, type SpacingToken, type StudioComponentDefinition, type StudioRegistry, TOKEN_REPLACEMENTS, TYPOGRAPHY_TOKENS, type ThemeConfig, type TokenCategory, type TransactionItem, type TypographyConfig, type TypographyLevelConfig, type TypographyToken, applyThemeToDOM, buildAiComponentSubmissionPrompt, cn, exportStudioCustomComponentStyles, exportStudioToCSS, exportStudioToTokensJson, exportToCSS, exportToTailwind, exportToTokensJson, generateThemeCSS, getComponentStatusProperties, getComponentTypes, injectWebfontLink, isDarkColor, resolveStudioComponentId, resolveTypeSpec, resolveVariableRole, scanAndRefactorDirectory };
