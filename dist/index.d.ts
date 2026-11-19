import { ClassValue } from 'clsx';
import React from 'react';

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
    themes?: StudioTheme[];
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

type W3CTokenType = 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'shadow' | 'typography' | 'number';
/**
 * Leaf token node conforming to W3C Design Token Community Group (DTCG) format
 * with CSS variable metadata for zero-runtime compilation.
 */
interface TokenLeaf<T = string> {
    $value: T;
    $type?: W3CTokenType;
    $description?: string;
    variable?: string;
    name?: string;
    family?: string;
    cdnUrl?: string;
    px?: number;
}
/**
 * Semantic status token node referencing a base palette token, plus nested hover/subtle variants.
 */
interface SemanticStatusGroupNode extends TokenLeaf<string> {
    variable: string;
    hover: TokenLeaf<string>;
    subtle: TokenLeaf<string>;
}
/**
 * Composite typography scale node referencing base typography size & weight palette tokens.
 */
interface TypographyScaleNode {
    $value: {
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
    };
    $type: 'typography';
    variable: string;
    name: string;
    fontSizeLabel?: string;
    weightLabel?: string;
    sample: string;
}
/**
 * Layer 1 (Primitives): Raw design tokens independent of theme or component semantics.
 */
interface PaletteTokenTree {
    color: Record<string, Record<string, TokenLeaf<string>>>;
    spacing: Record<string, TokenLeaf<string>>;
    radius: Record<string, TokenLeaf<string>>;
    shadow: Record<string, TokenLeaf<string>>;
    typography: {
        font: Record<string, TokenLeaf<string>>;
        size: Record<string, TokenLeaf<string>>;
        weight: Record<string, TokenLeaf<string>>;
        scale?: Record<string, TypographyScaleNode>;
    };
    layout: {
        container: Record<string, TokenLeaf<string>>;
        gutter: Record<string, TokenLeaf<string>>;
        gap: Record<string, TokenLeaf<string>>;
    };
    size?: Record<string, TokenLeaf<string>>;
}
interface ThemeBindingLeaf {
    $value: string;
    targetVariable?: string;
}
interface ThemePresetNode {
    id: string;
    name: string;
    description: string;
    mode: 'light' | 'dark';
    category: Exclude<ThemeCategory, 'all'>;
    brandColor: string;
    borderRadius: string;
    fontFamily?: string;
    isCustom?: boolean;
    tokens: Record<keyof ThemePaletteBindings, ThemeBindingLeaf>;
}
/**
 * Layer 2 (Theme & Semantics): Active theme, semantic role tokens, and theme presets
 * referencing Palette primitives via `{palette.*}` object-path aliases.
 */
interface ThemeTokenTree {
    activeThemeId: string;
    semantic: {
        primary: SemanticStatusGroupNode;
        secondary: SemanticStatusGroupNode;
        success: SemanticStatusGroupNode;
        danger: SemanticStatusGroupNode;
        warning: SemanticStatusGroupNode;
        surface?: Record<string, TokenLeaf<string>>;
        text?: Record<string, TokenLeaf<string>>;
        border?: Record<string, TokenLeaf<string>>;
        [statusKey: string]: SemanticStatusGroupNode | Record<string, TokenLeaf<string>> | undefined;
    };
    presets: Record<string, ThemePresetNode>;
}
interface ComponentBindingNode {
    $value: string;
    targetVariable: string;
    resolvedValue?: string;
}
interface ComponentVariableTokenNode {
    name: string;
    $description?: string;
    variableRole?: string;
    type?: {
        id: string;
        name: string;
        whenToUse: string;
    };
    variable?: {
        role: string;
        label: string;
        meaning: string;
    };
    statuses?: Record<string, {
        behavior: string;
    }>;
    supportedStatuses?: ComponentInteractiveStatus[];
    tokens: Record<string, ComponentBindingNode>;
}
/**
 * Layer 3 (Components): 3-tier [Type · Variable · Status] specs and token bindings
 * referencing `{theme.*}` and `{palette.*}`.
 */
interface ComponentTokenNode {
    name: string;
    category: StudioComponentDefinition['category'];
    $description: string;
    sourceFile?: string;
    autoDiscovered?: boolean;
    customCss?: string;
    typeGuide?: StudioComponentDefinition['typeGuide'];
    docs?: StudioComponentDefinition['docs'];
    supportedStatuses?: ComponentInteractiveStatus[];
    properties: ComponentPropertySpec[];
    types?: ComponentTypeSpec[];
    variables: Record<string, ComponentVariableTokenNode>;
}
/**
 * Single Source of Truth (SSOT) unified token document stored at `tokens/tokens.json`.
 */
interface UnifiedTokensDocument {
    $schema: string;
    registrySchema?: string;
    name: string;
    version: string;
    updatedAt: string;
    palette: PaletteTokenTree;
    theme: ThemeTokenTree;
    components: Record<string, ComponentTokenNode>;
}
interface ResolvedReferenceStep {
    path: string;
    alias: string;
    variable?: string;
    value: string;
}
interface ResolvedBindingDetail {
    alias: string;
    targetVariable: string;
    resolvedValue: string;
    chain: ResolvedReferenceStep[];
}

interface IndexedTokenEntry {
    path: string;
    node: TokenLeaf<string>;
}
interface UnresolvedAliasIssue {
    location: string;
    alias: string;
}
/**
 * Resolves W3C DTCG object-path aliases (`{palette.color.blue.500}`, `{theme.semantic.primary}`)
 * across the unified Palette -> Theme -> Component hierarchy with cycle detection.
 */
declare class TokenReferenceResolver {
    private readonly doc;
    private readonly pathIndex;
    private readonly variableIndex;
    private readonly orderedEntries;
    constructor(doc: Partial<UnifiedTokensDocument>);
    private indexSubtree;
    isAlias(value: unknown): boolean;
    stripAlias(aliasOrPath: string): string;
    getNode(dotPathOrCssVar: string): TokenLeaf<string> | undefined;
    getPathByVariable(cssVar: string): string | undefined;
    getVariableByPath(dotPathOrAlias: string): string | undefined;
    toAliasByVariable(cssVarOrAlias: string): string;
    getAllEntries(): ReadonlyArray<IndexedTokenEntry>;
    resolveChain(refOrPath: string, maxDepth?: number): ResolvedReferenceStep[];
    resolveValue(refOrValue: string, maxDepth?: number): string;
    /**
     * Resolves an alias or CSS variable to a browser-usable `var(--...)` expression
     * when the referenced token declares a CSS variable, falling back to raw concrete value.
     */
    resolveCssReference(refOrValue: string): string;
    /**
     * Audits all `{...}` references across Palette scale, Theme, and Component layers.
     */
    findUnresolvedAliases(): UnresolvedAliasIssue[];
}

/**
 * Layer 1 (Primitives): Encapsulates raw Color, Spacing, Radius, Typography, Shadow, and Layout tokens.
 */
declare class PaletteTokenLayer {
    readonly raw: PaletteTokenTree;
    private readonly resolver;
    constructor(raw: PaletteTokenTree, resolver: TokenReferenceResolver);
    getColor(family: string, step: string | number): TokenLeaf<string> | undefined;
    getColorValue(family: string, step: string | number): string | undefined;
    getSpacing(key: string): TokenLeaf<string> | undefined;
    getRadius(key: string): TokenLeaf<string> | undefined;
    getShadow(key: string): TokenLeaf<string> | undefined;
    getTypography(group: 'font' | 'size' | 'weight', key: string): TokenLeaf<string> | undefined;
    getLayout(group: 'container' | 'gutter' | 'gap', key: string): TokenLeaf<string> | undefined;
    byVariable(cssVar: string): TokenLeaf<string> | undefined;
    getPathForVariable(cssVar: string): string | undefined;
    /**
     * Reconstructs the flat `PaletteVariable[]` array expected by Studio UI & repositories.
     */
    toPaletteVariables(statusTokens?: SemanticStatusToken[]): PaletteVariable[];
    /**
     * Builds a structured `PaletteTokenTree` from Studio's `PaletteVariable[]` list,
     * preserving shadow, layout, and composite typography scale nodes from `basePalette`.
     */
    static fromPaletteVariables(vars: PaletteVariable[], basePalette?: PaletteTokenTree): PaletteTokenTree;
}

/**
 * Layer 2 (Theme & Semantics): Manages semantic roles and multi-brand presets,
 * explicitly referencing Layer 1 (`PaletteTokenLayer`) via `{palette.*}` aliases.
 */
declare class ThemeTokenLayer {
    readonly raw: ThemeTokenTree;
    readonly palette: PaletteTokenLayer;
    private readonly resolver;
    constructor(raw: ThemeTokenTree, palette: PaletteTokenLayer, resolver: TokenReferenceResolver);
    get activeThemeId(): string;
    getSemanticStatus(key: SemanticStatusToken['key']): {
        node: SemanticStatusGroupNode | undefined;
        value: string;
        hoverValue: string;
        subtleValue: string;
    };
    getSemanticGroup(group: 'surface' | 'text' | 'border'): Record<string, TokenLeaf<string>>;
    toStatusTokens(): SemanticStatusToken[];
    getPreset(themeId: string): StudioTheme | undefined;
    getActiveTheme(): StudioTheme | undefined;
    toStudioThemes(): StudioTheme[];
    private hydratePreset;
    static fromStudioState(params: {
        activeThemeId: string;
        statusTokens: SemanticStatusToken[];
        palette: PaletteTokenLayer;
        resolver: TokenReferenceResolver;
        themes?: StudioTheme[];
        baseTheme?: ThemeTokenTree;
    }): ThemeTokenTree;
}

/**
 * Layer 3 (Components): Manages 3-tier [Type · Variable · Status] component token specifications
 * and resolves every property binding through Theme -> Palette object references.
 */
declare class ComponentTokenLayer {
    readonly raw: Record<string, ComponentTokenNode>;
    readonly palette: PaletteTokenLayer;
    readonly theme: ThemeTokenLayer;
    private readonly resolver;
    constructor(raw: Record<string, ComponentTokenNode>, palette: PaletteTokenLayer, theme: ThemeTokenLayer, resolver: TokenReferenceResolver);
    ids(): string[];
    get(componentId: string): ComponentTokenNode | undefined;
    resolveBinding(componentId: string, variableId: string, propKey: string): ResolvedBindingDetail | undefined;
    toStudioComponents(): StudioComponentDefinition[];
    static fromStudioComponents(components: StudioComponentDefinition[], resolver: TokenReferenceResolver): Record<string, ComponentTokenNode>;
}

declare function isUnifiedTokensDocument(val: unknown): val is UnifiedTokensDocument;
/**
 * Facade & Single Source of Truth (SSOT) engine managing the 3-tier object-oriented token graph:
 * Layer 1 (`palette`) <- Layer 2 (`theme`) <- Layer 3 (`components`).
 */
declare class AtomTokenSystem {
    readonly document: UnifiedTokensDocument;
    readonly resolver: TokenReferenceResolver;
    readonly palette: PaletteTokenLayer;
    readonly theme: ThemeTokenLayer;
    readonly components: ComponentTokenLayer;
    constructor(document: UnifiedTokensDocument);
    static fromDocument(doc: UnifiedTokensDocument): AtomTokenSystem;
    static fromStudioRegistry(registry: StudioRegistry, options?: {
        themes?: StudioTheme[];
        baseDocument?: UnifiedTokensDocument;
    }): AtomTokenSystem;
    resolve(refOrPath: string): string;
    resolveChain(refOrPath: string): ResolvedReferenceStep[];
    toDocument(): UnifiedTokensDocument;
    toJson(pretty?: boolean): string;
    toRegistry(): StudioRegistry;
}

declare const UNIFIED_TOKENS_DOCUMENT: UnifiedTokensDocument;
/**
 * Canonical SSOT singleton loaded directly from `tokens/tokens.json`.
 * Provides object-oriented navigation and alias resolution across `palette`, `theme`, and `components`.
 */
declare const atomTokens: AtomTokenSystem;
declare const paletteTokens: PaletteTokenLayer;
declare const themeTokens: ThemeTokenLayer;
declare const componentTokens: ComponentTokenLayer;
declare const tokenResolver: TokenReferenceResolver;

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
declare function exportStudioToTokensJson(palette: PaletteVariable[], components: StudioComponentDefinition[], statusTokens?: SemanticStatusToken[], options?: {
    activeThemeId?: string;
    themes?: StudioTheme[];
    baseDocument?: UnifiedTokensDocument;
    version?: string;
}): string;
declare function exportStudioToCSS(palette: PaletteVariable[], components: StudioComponentDefinition[], statusTokens?: SemanticStatusToken[], basePalette?: PaletteTokenTree): string;
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
declare const ATOM_TOKENS_PATH = "atomsystem/tokens.json";
declare const ATOM_STUDIO_REGISTRY_PATH = "atomsystem/tokens.json";
/**
 * CLI Banner & Metadata
 */
declare const ATOM_VERSION = "0.14.4";
declare const ATOM_LIB_NAME = "atomsystem";

export { AI_COMPONENT_SUBMISSION_TEMPLATE, ATOM_LIB_NAME, ATOM_STUDIO_REGISTRY_PATH, ATOM_TOKENS_PATH, ATOM_UI_CSS_PATH, ATOM_VERSION, AWESOME_CATEGORIES, AWESOME_DESIGN_MD_THEMES, type AtomComponentSubmissionSpec, AtomTokenSystem, type AwesomeDesignMdTheme, BASE_COLOR_TOKENS, BRAND_PRESETS, type BrandConfig, type BrandPreset, type ButtonSpacingConfig, COLOR_PRESETS, COMPONENT_STATUS_PRESETS, type ColorConfig, type ColorPreset, type ColorToken, type ComponentBindingNode, type ComponentCategory, type ComponentInteractiveStatus, type ComponentPropertySpec, type ComponentStatusSpec, ComponentTokenLayer, type ComponentTokenNode, type ComponentTypeSpec, type ComponentVariable, type ComponentVariableTokenNode, DEFAULT_BRAND_CONFIG, DEFAULT_COMPONENT_TYPES, DEFAULT_THEME_CONFIG, type DosAndDont, EnterpriseDashboardUseCase, FONT_FAMILY_PRESETS, type FontFamilyPreset, GALLERY_COMPONENTS, type GalleryComponent, INITIAL_PALETTE_VARIABLES, INITIAL_SEMANTIC_STATUS_TOKENS, INITIAL_STUDIO_COMPONENTS, type IndexedTokenEntry, type KpiMetric, LAYOUT_TOKENS, type LayoutToken, PATTERNS_COLLECTION, type PaletteCategory, PaletteTokenLayer, type PaletteTokenTree, type PaletteVariable, type PatternItem, type PatternPlatform, type PatternVariant, type PropItem, RADIUS_TOKENS, type RadiusToken, type RefactorMatch, type RefactorReport, type ResolvedBindingDetail, type ResolvedReferenceStep, SEMANTIC_VARIABLE_DICTIONARY, SHADOW_TOKENS, SPACING_TOKENS, STUDIO_CUSTOM_STYLES_END, STUDIO_CUSTOM_STYLES_START, type SemanticStatusGroupNode, type SemanticStatusToken, type SemanticVariableDefinition, type SemanticVariableRole, type ShadowToken, type SpacingToken, type StudioComponentDefinition, type StudioRegistry, type StudioTheme, TOKEN_REPLACEMENTS, TYPOGRAPHY_TOKENS, type ThemeBindingLeaf, type ThemeConfig, type ThemePresetNode, ThemeTokenLayer, type ThemeTokenTree, type TokenCategory, type TokenLeaf, TokenReferenceResolver, type TransactionItem, type TypographyConfig, type TypographyLevelConfig, type TypographyScaleNode, type TypographyToken, UNIFIED_TOKENS_DOCUMENT, type UnifiedTokensDocument, type UnresolvedAliasIssue, type W3CTokenType, applyThemeToDOM, atomTokens, buildAiComponentSubmissionPrompt, cn, componentTokens, exportStudioCustomComponentStyles, exportStudioToCSS, exportStudioToTokensJson, exportToCSS, exportToTailwind, exportToTokensJson, generateThemeCSS, getComponentStatusProperties, getComponentTypes, injectWebfontLink, isDarkColor, isUnifiedTokensDocument, paletteTokens, resolveStudioComponentId, resolveTypeSpec, resolveVariableRole, scanAndRefactorDirectory, themeTokens, tokenResolver };
