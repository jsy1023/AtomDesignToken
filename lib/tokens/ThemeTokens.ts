import type { SemanticStatusToken } from '../data/studioData';
import type { StudioTheme, ThemePaletteBindings } from '../data/themeData';
import type { PaletteTokenLayer } from './PaletteTokens';
import type { TokenReferenceResolver } from './TokenReferenceResolver';
import type {
  SemanticStatusGroupNode,
  ThemeBindingLeaf,
  ThemePresetNode,
  ThemeTokenTree,
  TokenLeaf,
} from './types';

const STATUS_KEYS: ReadonlyArray<SemanticStatusToken['key']> = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
];

const THEME_TOKEN_KEYS: ReadonlyArray<keyof ThemePaletteBindings> = [
  'primary',
  'primaryHover',
  'primaryLight',
  'secondary',
  'secondaryHover',
  'secondaryLight',
  'bgPrimary',
  'bgSecondary',
  'textPrimary',
  'textSecondary',
  'textMuted',
  'borderSubtle',
  'borderStrong',
  'statusSuccess',
  'statusDanger',
  'statusWarning',
];

function isSemanticStatusGroup(val: unknown): val is SemanticStatusGroupNode {
  return Boolean(
    val &&
      typeof val === 'object' &&
      '$value' in val &&
      'variable' in val &&
      'hover' in val &&
      'subtle' in val
  );
}

/**
 * Layer 2 (Theme & Semantics): Manages semantic roles and multi-brand presets,
 * explicitly referencing Layer 1 (`PaletteTokenLayer`) via `{palette.*}` aliases.
 */
export class ThemeTokenLayer {
  constructor(
    public readonly raw: ThemeTokenTree,
    public readonly palette: PaletteTokenLayer,
    private readonly resolver: TokenReferenceResolver
  ) {}

  get activeThemeId(): string {
    return this.raw.activeThemeId || 'ocean-blue';
  }

  getSemanticStatus(key: SemanticStatusToken['key']): {
    node: SemanticStatusGroupNode | undefined;
    value: string;
    hoverValue: string;
    subtleValue: string;
  } {
    const entry = this.raw.semantic?.[key];
    const node = isSemanticStatusGroup(entry) ? entry : undefined;
    return {
      node,
      value: node ? this.resolver.resolveValue(node.$value) : '',
      hoverValue: node?.hover ? this.resolver.resolveValue(node.hover.$value) : '',
      subtleValue: node?.subtle ? this.resolver.resolveValue(node.subtle.$value) : '',
    };
  }

  getSemanticGroup(group: 'surface' | 'text' | 'border'): Record<string, TokenLeaf<string>> {
    const candidate = this.raw.semantic?.[group];
    if (!candidate || isSemanticStatusGroup(candidate)) return {};
    return candidate as Record<string, TokenLeaf<string>>;
  }

  toStatusTokens(): SemanticStatusToken[] {
    const result: SemanticStatusToken[] = [];
    for (const key of STATUS_KEYS) {
      const node = this.raw.semantic?.[key];
      if (!isSemanticStatusGroup(node)) continue;
      result.push({
        id: node.variable,
        key,
        name: node.name || key,
        description: node.$description || '',
        paletteId:
          this.resolver.getVariableByPath(node.$value) || this.resolver.stripAlias(node.$value),
        hoverPaletteId:
          this.resolver.getVariableByPath(node.hover.$value) ||
          this.resolver.stripAlias(node.hover.$value),
        subtlePaletteId:
          this.resolver.getVariableByPath(node.subtle.$value) ||
          this.resolver.stripAlias(node.subtle.$value),
      });
    }
    return result;
  }

  getPreset(themeId: string): StudioTheme | undefined {
    const preset = this.raw.presets?.[themeId];
    return preset ? this.hydratePreset(preset) : undefined;
  }

  getActiveTheme(): StudioTheme | undefined {
    return this.getPreset(this.activeThemeId) || this.toStudioThemes()[0];
  }

  toStudioThemes(): StudioTheme[] {
    return Object.values(this.raw.presets || {}).map((preset) => this.hydratePreset(preset));
  }

  private hydratePreset(preset: ThemePresetNode): StudioTheme {
    const paletteBindings: Partial<ThemePaletteBindings> = {};
    const resolvedColors: Record<string, string> = {};

    for (const key of THEME_TOKEN_KEYS) {
      const leaf = preset.tokens?.[key];
      if (!leaf) continue;
      const targetVar =
        leaf.targetVariable || this.resolver.getVariableByPath(leaf.$value);
      if (targetVar && targetVar.startsWith('--')) {
        paletteBindings[key] = targetVar;
      }
      resolvedColors[key] = this.resolver.resolveValue(leaf.$value);
    }

    const brandColor = this.resolver.resolveValue(preset.brandColor);
    const borderRadius = this.resolver.resolveValue(preset.borderRadius);
    const fontFamily = preset.fontFamily
      ? this.resolver.resolveValue(preset.fontFamily)
      : undefined;

    return {
      id: preset.id,
      name: preset.name,
      description: preset.description,
      mode: preset.mode,
      category: preset.category,
      brandColor: brandColor || resolvedColors.primary || 'var(--accent-primary)',
      borderRadius: borderRadius || '8px',
      ...(fontFamily ? { fontFamily } : {}),
      ...(preset.isCustom ? { isCustom: true } : {}),
      ...(Object.keys(paletteBindings).length > 0 ? { paletteBindings } : {}),
      colors: resolvedColors as StudioTheme['colors'],
    };
  }

  static fromStudioState(params: {
    activeThemeId: string;
    statusTokens: SemanticStatusToken[];
    palette: PaletteTokenLayer;
    resolver: TokenReferenceResolver;
    themes?: StudioTheme[];
    baseTheme?: ThemeTokenTree;
  }): ThemeTokenTree {
    const { activeThemeId, statusTokens, palette, resolver, themes, baseTheme } = params;

    const semantic: ThemeTokenTree['semantic'] = {
      primary: baseTheme?.semantic?.primary as SemanticStatusGroupNode,
      secondary: baseTheme?.semantic?.secondary as SemanticStatusGroupNode,
      success: baseTheme?.semantic?.success as SemanticStatusGroupNode,
      danger: baseTheme?.semantic?.danger as SemanticStatusGroupNode,
      warning: baseTheme?.semantic?.warning as SemanticStatusGroupNode,
      ...(baseTheme?.semantic?.surface ? { surface: baseTheme.semantic.surface } : {}),
      ...(baseTheme?.semantic?.text ? { text: baseTheme.semantic.text } : {}),
      ...(baseTheme?.semantic?.border ? { border: baseTheme.semantic.border } : {}),
    };

    for (const st of statusTokens) {
      semantic[st.key] = {
        $value: resolver.toAliasByVariable(st.paletteId),
        $type: 'color',
        $description: st.description,
        name: st.name,
        variable: st.id,
        hover: {
          $value: resolver.toAliasByVariable(st.hoverPaletteId),
          $type: 'color',
          $description: `${st.name} hover state`,
          variable: `${st.id}-hover`,
        },
        subtle: {
          $value: resolver.toAliasByVariable(st.subtlePaletteId),
          $type: 'color',
          $description: `${st.name} subtle surface`,
          variable: `${st.id}-subtle`,
        },
      };
    }

    const radiusEntries = Object.entries(palette.raw.radius || {});
    const resolveRadiusAlias = (radiusValue: string): string => {
      const matched = radiusEntries.find(([, leaf]) => leaf.$value === radiusValue);
      return matched ? `{palette.radius.${matched[0]}}` : radiusValue;
    };

    let presets: Record<string, ThemePresetNode> = {};
    if (themes && themes.length > 0) {
      for (const th of themes) {
        const tokens = {} as Record<keyof ThemePaletteBindings, ThemeBindingLeaf>;
        for (const key of THEME_TOKEN_KEYS) {
          const boundVar = th.paletteBindings?.[key];
          const colorVal = th.colors?.[key];
          if (!boundVar && !colorVal) continue;
          const alias = boundVar ? resolver.toAliasByVariable(boundVar) : undefined;
          tokens[key] = {
            $value: alias || (colorVal as string),
            ...(boundVar ? { targetVariable: boundVar } : {}),
          };
        }

        const primaryAlias = th.paletteBindings?.primary
          ? resolver.toAliasByVariable(th.paletteBindings.primary)
          : undefined;
        const brandResolved = primaryAlias ? resolver.resolveValue(primaryAlias) : undefined;
        const brandRef =
          primaryAlias && brandResolved?.toLowerCase() === th.brandColor?.toLowerCase()
            ? primaryAlias
            : th.brandColor;

        presets[th.id] = {
          id: th.id,
          name: th.name,
          description: th.description,
          mode: th.mode,
          category: th.category,
          brandColor: brandRef,
          borderRadius: resolveRadiusAlias(th.borderRadius),
          ...(th.fontFamily ? { fontFamily: th.fontFamily } : {}),
          ...(th.isCustom ? { isCustom: true } : {}),
          tokens,
        };
      }
    } else if (baseTheme?.presets) {
      presets = { ...baseTheme.presets };
    }

    return {
      activeThemeId: activeThemeId || baseTheme?.activeThemeId || 'ocean-blue',
      semantic,
      presets,
    };
  }
}
