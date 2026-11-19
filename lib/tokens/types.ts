import type {
  ComponentInteractiveStatus,
  ComponentPropertySpec,
  ComponentTypeSpec,
  SemanticStatusToken,
  StudioComponentDefinition,
  StudioRegistry,
} from '../data/studioData';
import type { StudioTheme, ThemeCategory, ThemePaletteBindings } from '../data/themeData';

export type W3CTokenType =
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'shadow'
  | 'typography'
  | 'number';

/**
 * Leaf token node conforming to W3C Design Token Community Group (DTCG) format
 * with CSS variable metadata for zero-runtime compilation.
 */
export interface TokenLeaf<T = string> {
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
export interface SemanticStatusGroupNode extends TokenLeaf<string> {
  variable: string;
  hover: TokenLeaf<string>;
  subtle: TokenLeaf<string>;
}

/**
 * Composite typography scale node referencing base typography size & weight palette tokens.
 */
export interface TypographyScaleNode {
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
export interface PaletteTokenTree {
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

export interface ThemeBindingLeaf {
  $value: string; // e.g. "{palette.color.blue.500}" or concrete color fallback
  targetVariable?: string;
}

export interface ThemePresetNode {
  id: string;
  name: string;
  description: string;
  mode: 'light' | 'dark';
  category: Exclude<ThemeCategory, 'all'>;
  brandColor: string; // e.g. "{palette.color.blue.500}" or hex fallback
  borderRadius: string; // e.g. "{palette.radius.md}" or dimension fallback
  fontFamily?: string;
  isCustom?: boolean;
  tokens: Record<keyof ThemePaletteBindings, ThemeBindingLeaf>;
}

/**
 * Layer 2 (Theme & Semantics): Active theme, semantic role tokens, and theme presets
 * referencing Palette primitives via `{palette.*}` object-path aliases.
 */
export interface ThemeTokenTree {
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

export interface ComponentBindingNode {
  $value: string; // e.g. "{theme.semantic.primary}" or "{palette.radius.md}"
  targetVariable: string; // e.g. "--atom-color-primary"
  resolvedValue?: string;
}

export interface ComponentVariableTokenNode {
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
  statuses?: Record<string, { behavior: string }>;
  supportedStatuses?: ComponentInteractiveStatus[];
  tokens: Record<string, ComponentBindingNode>;
}

/**
 * Layer 3 (Components): 3-tier [Type · Variable · Status] specs and token bindings
 * referencing `{theme.*}` and `{palette.*}`.
 */
export interface ComponentTokenNode {
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
export interface UnifiedTokensDocument {
  $schema: string;
  registrySchema?: string;
  name: string;
  version: string;
  updatedAt: string;
  palette: PaletteTokenTree;
  theme: ThemeTokenTree;
  components: Record<string, ComponentTokenNode>;
}

export interface ResolvedReferenceStep {
  path: string;
  alias: string;
  variable?: string;
  value: string;
}

export interface ResolvedBindingDetail {
  alias: string;
  targetVariable: string;
  resolvedValue: string;
  chain: ResolvedReferenceStep[];
}

export type { SemanticStatusToken, StudioComponentDefinition, StudioRegistry, StudioTheme };
