import { S as StudioTheme, a as ThemeCategory, b as ThemePaletteBindings, T as ThemeConfig } from './themeData-BCFGJB3g.js';
export { B as BrandConfig, e as ButtonSpacingConfig, h as COLOR_PRESETS, C as ColorConfig, f as ColorPreset, D as DEFAULT_BRAND_CONFIG, g as DEFAULT_THEME_CONFIG, i as FONT_FAMILY_PRESETS, F as FontFamilyPreset, I as INITIAL_STUDIO_THEMES, d as TypographyConfig, c as TypographyLevelConfig, r as resolveThemeColors, s as studioThemeToThemeConfig } from './themeData-BCFGJB3g.js';
import React, { ElementType } from 'react';
import { ClassValue } from 'clsx';

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
type ComponentInteractiveStatus$5 = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
interface ComponentStatusSpec {
    status: ComponentInteractiveStatus$5;
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
declare function getComponentStatusProperties(componentId: string, status: ComponentInteractiveStatus$5 | 'all', baseProperties?: ComponentPropertySpec[]): ComponentPropertySpec[];
interface ComponentVariable {
    id: string;
    name: string;
    description?: string;
    type?: ComponentTypeSpec;
    variableRole?: SemanticVariableRole;
    supportedStatuses?: ComponentInteractiveStatus$5[];
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
    supportedStatuses?: ComponentInteractiveStatus$5[];
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
    brand?: {
        name: string;
        slogan?: string;
        logoUrl?: string | null;
        logoHeight?: number;
    };
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
    supportedStatuses?: ComponentInteractiveStatus$5[];
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
    supportedStatuses?: ComponentInteractiveStatus$5[];
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
    supportedStatuses?: ComponentInteractiveStatus$5[];
    properties: ComponentPropertySpec[];
    types?: ComponentTypeSpec[];
    variables: Record<string, ComponentVariableTokenNode>;
}
interface BrandTokenConfig {
    name: string;
    slogan?: string;
    logoUrl?: string | null;
    logoHeight?: number;
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
    brand?: BrandTokenConfig;
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

type ComponentInteractiveStatus$4 = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'danger' | 'success' | 'warning' | 'info' | (string & {});
    variable?: 'primary' | 'secondary' | 'destructive' | 'danger' | 'warning' | 'success' | 'info' | 'ghost' | 'outline' | (string & {});
    status?: ComponentInteractiveStatus$4;
    componentType?: string;
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    isIconOnly?: boolean;
    paddingX?: string;
    paddingY?: string;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type ComponentInteractiveStatus$3 = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    variable?: string;
    status?: ComponentInteractiveStatus$3;
    componentType?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    interactive?: boolean;
    variable?: string;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

type ComponentInteractiveStatus$2 = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'success' | 'warning' | 'destructive' | 'neutral' | (string & {});
    variable?: 'primary' | 'success' | 'warning' | 'destructive' | 'neutral' | (string & {});
    status?: ComponentInteractiveStatus$2;
    componentType?: string;
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}
declare const Modal: React.FC<ModalProps>;

interface CalendarProps {
    selected?: Date;
    onSelect?: (date: Date) => void;
    className?: string;
}
declare const Calendar: React.FC<CalendarProps>;

interface SelectOption {
    value: string;
    label: string;
}
interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}
declare const Select: React.FC<SelectProps>;
interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
}
declare const NativeSelect: React.ForwardRefExoticComponent<NativeSelectProps & React.RefAttributes<HTMLSelectElement>>;

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}
interface AccordionProps {
    items: AccordionItem[];
    type?: 'single' | 'multiple';
    className?: string;
}
declare const Accordion: React.FC<AccordionProps>;

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom';
    className?: string;
}
declare const Tooltip: React.FC<TooltipProps>;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    className?: string;
}
declare const Pagination: React.FC<PaginationProps>;

interface RadioOption {
    value: string;
    label: string;
    description?: string;
}
interface RadioGroupProps {
    name?: string;
    value?: string;
    options: RadioOption[];
    onChange?: (val: string) => void;
    className?: string;
}
declare const RadioGroup: React.FC<RadioGroupProps>;

interface SliderProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (val: number) => void;
    className?: string;
}
declare const Slider: React.FC<SliderProps>;

interface AvatarProps {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: 'sm' | 'md' | 'lg';
    status?: 'online' | 'offline' | 'busy';
    className?: string;
}
declare const Avatar: React.FC<AvatarProps>;

interface ProgressProps {
    value: number;
    max?: number;
    variant?: 'primary' | 'success';
    className?: string;
}
declare const Progress: React.FC<ProgressProps>;

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    circle?: boolean;
    className?: string;
}
declare const Skeleton: React.FC<SkeletonProps>;

interface BreadcrumbItem {
    label: string;
    href?: string;
}
interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: string;
    className?: string;
}
declare const Breadcrumb: React.FC<BreadcrumbProps>;

interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    className?: string;
}
declare const Separator: React.FC<SeparatorProps>;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxLength?: number;
    label?: string;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

interface TreeNode {
    id: string;
    label: string;
    icon?: React.ReactNode;
    children?: TreeNode[];
    disabled?: boolean;
}
interface TreeProps {
    data: TreeNode[];
    selectedId?: string;
    onSelect?: (node: TreeNode) => void;
    defaultExpandedIds?: string[];
    className?: string;
}
declare const Tree: React.FC<TreeProps>;

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
}
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
}
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
}
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;
}
declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;

interface SwitchProps {
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
}
declare const Switch: React.FC<SwitchProps>;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    gutters?: boolean;
    center?: boolean;
    as?: ElementType;
    children?: React.ReactNode;
}
declare const Container: React.FC<ContainerProps>;

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: ElementType;
    children?: React.ReactNode;
}
interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
    sticky?: boolean;
}
interface LayoutSidebarProps extends React.HTMLAttributes<HTMLElement> {
    width?: 'sm' | 'md' | 'lg';
}
interface LayoutContentProps extends React.HTMLAttributes<HTMLElement> {
}
interface LayoutFooterProps extends React.HTMLAttributes<HTMLElement> {
}
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'vertical' | 'horizontal';
    gap?: '1' | '2' | '3' | '4' | '6' | '8' | '12';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    wrap?: boolean;
}
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: 1 | 2 | 3 | 4 | 6 | 12;
    gap?: '1' | '2' | '3' | '4' | '6' | '8';
}
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    spacing?: 'sm' | 'md' | 'lg' | 'none';
}
declare const Stack: React.FC<StackProps>;
declare const Grid: React.FC<GridProps>;
declare const Section: React.FC<SectionProps>;
declare const Layout: React.FC<LayoutProps> & {
    Header: React.FC<LayoutHeaderProps>;
    Sidebar: React.FC<LayoutSidebarProps>;
    Content: React.FC<LayoutContentProps>;
    Footer: React.FC<LayoutFooterProps>;
    Stack: React.FC<StackProps>;
    Grid: React.FC<GridProps>;
    Section: React.FC<SectionProps>;
};

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    sticky?: boolean;
    bordered?: boolean;
    blur?: boolean;
    variable?: string;
    innerClassName?: string;
    mobileMenu?: React.ReactNode;
}
declare const Navbar: React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<HTMLElement>>;
interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
    href?: string;
}
declare const NavbarBrand: React.ForwardRefExoticComponent<NavbarBrandProps & React.RefAttributes<HTMLDivElement>>;
interface NavbarNavProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const NavbarNav: React.ForwardRefExoticComponent<NavbarNavProps & React.RefAttributes<HTMLDivElement>>;
interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
}
declare const NavbarLink: React.ForwardRefExoticComponent<NavbarLinkProps & React.RefAttributes<HTMLAnchorElement>>;
interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const NavbarActions: React.ForwardRefExoticComponent<NavbarActionsProps & React.RefAttributes<HTMLDivElement>>;
interface NavbarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen?: boolean;
    onToggle?: () => void;
}
declare const NavbarToggle: React.ForwardRefExoticComponent<NavbarToggleProps & React.RefAttributes<HTMLButtonElement>>;
interface NavbarMobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
}
declare const NavbarMobileMenu: React.FC<NavbarMobileMenuProps>;

type SidebarVariant = 'default' | 'pills' | 'bordered' | 'floating';
type SidebarSize = 'sm' | 'md' | 'lg';
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    collapsed?: boolean;
    variable?: string;
    variant?: SidebarVariant | string;
    size?: SidebarSize;
    width?: string;
    collapsedWidth?: string;
}
declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLElement>>;
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const SidebarHeader: React.ForwardRefExoticComponent<SidebarHeaderProps & React.RefAttributes<HTMLDivElement>>;
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const SidebarContent: React.ForwardRefExoticComponent<SidebarContentProps & React.RefAttributes<HTMLDivElement>>;
interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
    collapsible?: boolean;
    defaultOpen?: boolean;
}
declare const SidebarGroup: React.ForwardRefExoticComponent<SidebarGroupProps & React.RefAttributes<HTMLDivElement>>;
interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const SidebarGroupLabel: React.ForwardRefExoticComponent<SidebarGroupLabelProps & React.RefAttributes<HTMLDivElement>>;
interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
}
declare const SidebarMenu: React.ForwardRefExoticComponent<SidebarMenuProps & React.RefAttributes<HTMLUListElement>>;
interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    active?: boolean;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    label?: React.ReactNode;
}
declare const SidebarMenuItem: React.ForwardRefExoticComponent<SidebarMenuItemProps & React.RefAttributes<HTMLLIElement>>;
interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    collapsed?: boolean;
}
declare const SidebarMenuButton: React.ForwardRefExoticComponent<SidebarMenuButtonProps & React.RefAttributes<HTMLButtonElement>>;
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const SidebarFooter: React.ForwardRefExoticComponent<SidebarFooterProps & React.RefAttributes<HTMLDivElement>>;
interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    collapsed?: boolean;
    onToggle?: () => void;
}
declare const SidebarToggle: React.ForwardRefExoticComponent<SidebarToggleProps & React.RefAttributes<HTMLButtonElement>>;
interface SidebarSubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    label: React.ReactNode;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    defaultOpen?: boolean;
}
declare const SidebarSubMenu: React.FC<SidebarSubMenuProps>;
declare const SideMenu: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLElement>>;
declare const SideMenuGroup: React.ForwardRefExoticComponent<SidebarGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SideMenuItem: React.ForwardRefExoticComponent<SidebarMenuItemProps & React.RefAttributes<HTMLLIElement>>;
declare const SideSubMenu: React.FC<SidebarSubMenuProps>;

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
    description?: React.ReactNode;
    error?: string;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

type NavVariant = 'default' | 'pills' | 'tabs' | 'segmented';
type NavSize = 'sm' | 'md' | 'lg';
type NavOrientation = 'horizontal' | 'vertical';
interface NavProps extends React.HTMLAttributes<HTMLElement> {
    variant?: NavVariant;
    size?: NavSize;
    orientation?: NavOrientation;
    fluid?: boolean;
}
/**
 * 🧭 Nav (Universal Navigation Component)
 * AtomSystem 표준 탐색(네비게이션) 원자 컴포넌트입니다.
 * - variant: default (기본 텍스트 링크), pills (알약형 필터/버튼), tabs (언더라인 탭), segmented (박스형 분할 컨트롤)
 * - orientation: horizontal (가로), vertical (세로)
 */
declare const Nav: React.ForwardRefExoticComponent<NavProps & React.RefAttributes<HTMLElement>>;
interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    active?: boolean;
}
declare const NavItem: React.ForwardRefExoticComponent<NavItemProps & React.RefAttributes<HTMLLIElement>>;
interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    variant?: NavVariant;
    size?: NavSize;
    asButton?: boolean;
    onClick?: (e: React.MouseEvent<any>) => void;
}
declare const NavLink: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement & HTMLButtonElement>>;
interface NavDropdownProps {
    label: React.ReactNode;
    active?: boolean;
    children: React.ReactNode;
    className?: string;
    triggerClassName?: string;
    align?: 'left' | 'right';
    icon?: React.ReactNode;
}
declare const NavDropdown: React.FC<NavDropdownProps>;
interface NavDropdownItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
    active?: boolean;
    icon?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    badge?: React.ReactNode;
    asButton?: boolean;
    as?: 'a' | 'button' | 'div';
}
declare const NavDropdownItem: React.ForwardRefExoticComponent<NavDropdownItemProps & React.RefAttributes<HTMLElement>>;

interface ChartDataPoint {
    label: string;
    value: number;
    secondaryValue?: number;
}
type ChartType = 'line' | 'bar' | 'area';
type ChartVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
    data: ChartDataPoint[];
    type?: ChartType;
    variant?: ChartVariant;
    height?: number;
    showGrid?: boolean;
    showPoints?: boolean;
    showLabels?: boolean;
    showTooltip?: boolean;
    strokeColor?: string;
    fillColor?: string;
    gridColor?: string;
    loading?: boolean;
    disabled?: boolean;
    componentType?: string;
    value?: string;
    className?: string;
    style?: React.CSSProperties;
}
declare const Chart: React.FC<ChartProps>;

type OffcanvasPlacement = 'left' | 'right' | 'top' | 'bottom';
type OffcanvasSize = 'sm' | 'md' | 'lg' | 'full';
interface OffcanvasProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    description?: string;
    placement?: OffcanvasPlacement;
    size?: OffcanvasSize;
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    backdropClassName?: string;
    inline?: boolean;
    componentType?: string;
    value?: string;
    style?: React.CSSProperties;
}
declare const Offcanvas: React.FC<OffcanvasProps>;
declare const OffcanvasHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
declare const OffcanvasBody: React.FC<React.HTMLAttributes<HTMLDivElement>>;
declare const OffcanvasFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>;

type ComponentInteractiveStatus$1 = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
type ToastVariant = 'info' | 'success' | 'warning' | 'danger' | 'action';
interface ToastAction {
    label: string;
    onClick: () => void;
}
interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    variant?: ToastVariant;
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    action?: ToastAction | React.ReactNode;
    onClose?: () => void;
    showCloseButton?: boolean;
    duration?: number;
    isOpen?: boolean;
    inline?: boolean;
    componentType?: string;
    value?: string;
    status?: ComponentInteractiveStatus$1;
}
declare const Toast: React.FC<ToastProps>;

interface TokenOption {
    id: string;
    name: string;
    value: string;
    category?: 'color' | 'size' | 'spacing' | 'radius' | 'typography' | 'status' | string;
    family?: string;
    description?: string;
}
interface TokenSelectProps {
    options: TokenOption[];
    value?: string;
    onChange?: (value: string, option?: TokenOption) => void;
    placeholder?: string;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outlined' | 'filled' | 'subtle';
    disabled?: boolean;
    className?: string;
    showColorSwatch?: boolean;
    showVarId?: boolean;
    showValueBadge?: boolean;
    id?: string;
    'aria-label'?: string;
}
declare const TokenSelect: React.FC<TokenSelectProps>;

type ComponentInteractiveStatus = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
type AlertType = 'soft' | 'outlined' | 'solid' | 'accent-border';
type AlertVariant = 'info' | 'success' | 'warning' | 'destructive' | 'neutral';
interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    componentType?: AlertType | (string & {});
    variant?: AlertVariant | (string & {});
    variable?: AlertVariant | (string & {});
    status?: ComponentInteractiveStatus;
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    onClose?: () => void;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

interface ThemeSwitcherProps {
    /** Visual presentation type: 'dropdown' | 'pills' | 'compact' | 'floating' */
    variant?: 'dropdown' | 'pills' | 'compact' | 'floating';
    /** Control size */
    size?: 'sm' | 'md' | 'lg';
    /** Custom theme list; defaults to themes from tokens/tokens.json */
    themes?: StudioTheme[];
    /** Controlled active theme ID */
    value?: string;
    /** Initial theme ID; defaults to activeThemeId in tokens/tokens.json */
    defaultThemeId?: string;
    /** localStorage key to persist selected theme, or false to disable */
    persistKey?: string | false;
    /** Optional label shown next to the switcher */
    label?: string;
    /** Whether to show light/dark mode badge in dropdown mode */
    showModeBadge?: boolean;
    /** Allow floating switcher to appear in production (defaults to false: local/dev only) */
    allowInProduction?: boolean;
    /** Additional className for wrapper */
    className?: string;
    /** Callback fired when theme changes */
    onThemeChange?: (theme: StudioTheme) => void;
}
/**
 * Applies a StudioTheme's semantic CSS variables and `data-atom-theme` attribute to `:root`.
 */
declare function applyStudioThemeToRoot(theme: StudioTheme): void;
/**
 * Embeddable ThemeSwitcher component that loads themes & tokens from AtomSystem Studio (`tokens/tokens.json`)
 * and applies the selected theme and token overrides across the entire project in real time.
 */
declare const ThemeSwitcher: React.FC<ThemeSwitcherProps>;

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
    brand?: {
        name: string;
        slogan?: string;
        logoUrl?: string | null;
        logoHeight?: number;
    };
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
declare const ATOM_VERSION = "0.15.3";
declare const ATOM_LIB_NAME = "atomsystem";

export { AI_COMPONENT_SUBMISSION_TEMPLATE, ATOM_LIB_NAME, ATOM_STUDIO_REGISTRY_PATH, ATOM_TOKENS_PATH, ATOM_UI_CSS_PATH, ATOM_VERSION, Accordion, type AccordionItem, type AccordionProps, Alert, type AlertProps, type AlertType, type AlertVariant, type AtomComponentSubmissionSpec, AtomTokenSystem, Avatar, type AvatarProps, BASE_COLOR_TOKENS, BRAND_PRESETS, Badge, type BadgeProps, type BrandPreset, type BrandTokenConfig, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, Button, type ButtonProps, COMPONENT_STATUS_PRESETS, Calendar, type CalendarProps, Card, type CardProps, Chart, type ChartDataPoint, type ChartProps, type ChartType, type ChartVariant, Checkbox, type CheckboxProps, type ColorToken, type ComponentBindingNode, type ComponentCategory, type ComponentInteractiveStatus$5 as ComponentInteractiveStatus, type ComponentPropertySpec, type ComponentStatusSpec, ComponentTokenLayer, type ComponentTokenNode, type ComponentTypeSpec, type ComponentVariable, type ComponentVariableTokenNode, Container, type ContainerProps, DEFAULT_COMPONENT_TYPES, type DosAndDont, EnterpriseDashboardUseCase, GALLERY_COMPONENTS, type GalleryComponent, Grid, type GridProps, INITIAL_PALETTE_VARIABLES, INITIAL_SEMANTIC_STATUS_TOKENS, INITIAL_STUDIO_COMPONENTS, type IndexedTokenEntry, Input, type InputProps, type KpiMetric, LAYOUT_TOKENS, Layout, type LayoutContentProps, type LayoutFooterProps, type LayoutHeaderProps, type LayoutProps, type LayoutSidebarProps, type LayoutToken, Modal, type ModalProps, NativeSelect, type NativeSelectProps, Nav, NavDropdown, NavDropdownItem, type NavDropdownItemProps, type NavDropdownProps, NavItem, type NavItemProps, NavLink, type NavLinkProps, type NavOrientation, type NavProps, type NavSize, type NavVariant, Navbar, NavbarActions, type NavbarActionsProps, NavbarBrand, type NavbarBrandProps, NavbarLink, type NavbarLinkProps, NavbarMobileMenu, type NavbarMobileMenuProps, NavbarNav, type NavbarNavProps, type NavbarProps, NavbarToggle, type NavbarToggleProps, Offcanvas, OffcanvasBody, OffcanvasFooter, OffcanvasHeader, type OffcanvasPlacement, type OffcanvasProps, type OffcanvasSize, PATTERNS_COLLECTION, Pagination, type PaginationProps, type PaletteCategory, PaletteTokenLayer, type PaletteTokenTree, type PaletteVariable, type PatternItem, type PatternPlatform, type PatternVariant, Progress, type ProgressProps, type PropItem, RADIUS_TOKENS, RadioGroup, type RadioGroupProps, type RadioOption, type RadiusToken, type RefactorMatch, type RefactorReport, type ResolvedBindingDetail, type ResolvedReferenceStep, SEMANTIC_VARIABLE_DICTIONARY, SHADOW_TOKENS, SPACING_TOKENS, STUDIO_CUSTOM_STYLES_END, STUDIO_CUSTOM_STYLES_START, Section, type SectionProps, Select, type SelectOption, type SelectProps, type SemanticStatusGroupNode, type SemanticStatusToken, type SemanticVariableDefinition, type SemanticVariableRole, Separator, type SeparatorProps, type ShadowToken, SideMenu, SideMenuGroup, SideMenuItem, SideSubMenu, Sidebar, SidebarContent, type SidebarContentProps, SidebarFooter, type SidebarFooterProps, SidebarGroup, SidebarGroupLabel, type SidebarGroupLabelProps, type SidebarGroupProps, SidebarHeader, type SidebarHeaderProps, SidebarMenu, SidebarMenuButton, type SidebarMenuButtonProps, SidebarMenuItem, type SidebarMenuItemProps, type SidebarMenuProps, type SidebarProps, type SidebarSize, SidebarSubMenu, type SidebarSubMenuProps, SidebarToggle, type SidebarToggleProps, type SidebarVariant, Skeleton, type SkeletonProps, Slider, type SliderProps, type SpacingToken, Stack, type StackProps, type StudioComponentDefinition, type StudioRegistry, StudioTheme, Switch, type SwitchProps, TOKEN_REPLACEMENTS, TYPOGRAPHY_TOKENS, Table, TableBody, TableCell, TableHead, TableHeader, type TableProps, TableRow, TabsContent, type TabsContentProps, TabsList, type TabsListProps, TabsTrigger, type TabsTriggerProps, Textarea, type TextareaProps, type ThemeBindingLeaf, ThemeCategory, ThemeConfig, ThemePaletteBindings, type ThemePresetNode, ThemeSwitcher, type ThemeSwitcherProps, ThemeTokenLayer, type ThemeTokenTree, Toast, type ToastAction, type ToastProps, type ToastVariant, type TokenCategory, type TokenLeaf, type TokenOption, TokenReferenceResolver, TokenSelect, type TokenSelectProps, Tooltip, type TooltipProps, type TransactionItem, Tree, type TreeNode, type TreeProps, type TypographyScaleNode, type TypographyToken, UNIFIED_TOKENS_DOCUMENT, type UnifiedTokensDocument, type UnresolvedAliasIssue, type W3CTokenType, applyStudioThemeToRoot, applyThemeToDOM, atomTokens, buildAiComponentSubmissionPrompt, cn, componentTokens, exportStudioCustomComponentStyles, exportStudioToCSS, exportStudioToTokensJson, exportToCSS, exportToTailwind, exportToTokensJson, generateThemeCSS, getComponentStatusProperties, getComponentTypes, injectWebfontLink, isDarkColor, isUnifiedTokensDocument, paletteTokens, resolveStudioComponentId, resolveTypeSpec, resolveVariableRole, scanAndRefactorDirectory, themeTokens, tokenResolver };
