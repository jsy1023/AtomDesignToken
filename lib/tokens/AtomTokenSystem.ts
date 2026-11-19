import { ComponentTokenLayer } from './ComponentTokens';
import { PaletteTokenLayer } from './PaletteTokens';
import { ThemeTokenLayer } from './ThemeTokens';
import { TokenReferenceResolver } from './TokenReferenceResolver';
import type {
  ResolvedReferenceStep,
  StudioRegistry,
  StudioTheme,
  UnifiedTokensDocument,
} from './types';

export function isUnifiedTokensDocument(val: unknown): val is UnifiedTokensDocument {
  if (!val || typeof val !== 'object') return false;
  const candidate = val as Partial<UnifiedTokensDocument>;
  return Boolean(
    candidate.palette &&
      typeof candidate.palette === 'object' &&
      'color' in candidate.palette &&
      'spacing' in candidate.palette &&
      'radius' in candidate.palette &&
      candidate.theme &&
      typeof candidate.theme === 'object' &&
      'semantic' in candidate.theme &&
      'presets' in candidate.theme &&
      candidate.components &&
      typeof candidate.components === 'object'
  );
}

/**
 * Facade & Single Source of Truth (SSOT) engine managing the 3-tier object-oriented token graph:
 * Layer 1 (`palette`) <- Layer 2 (`theme`) <- Layer 3 (`components`).
 */
export class AtomTokenSystem {
  public readonly resolver: TokenReferenceResolver;
  public readonly palette: PaletteTokenLayer;
  public readonly theme: ThemeTokenLayer;
  public readonly components: ComponentTokenLayer;

  constructor(public readonly document: UnifiedTokensDocument) {
    this.resolver = new TokenReferenceResolver(document);
    this.palette = new PaletteTokenLayer(document.palette, this.resolver);
    this.theme = new ThemeTokenLayer(document.theme, this.palette, this.resolver);
    this.components = new ComponentTokenLayer(
      document.components,
      this.palette,
      this.theme,
      this.resolver
    );
  }

  static fromDocument(doc: UnifiedTokensDocument): AtomTokenSystem {
    return new AtomTokenSystem(doc);
  }

  static fromStudioRegistry(
    registry: StudioRegistry,
    options?: {
      themes?: StudioTheme[];
      baseDocument?: UnifiedTokensDocument;
    }
  ): AtomTokenSystem {
    const paletteTree = PaletteTokenLayer.fromPaletteVariables(
      registry.paletteVariables || [],
      options?.baseDocument?.palette
    );

    const paletteResolver = new TokenReferenceResolver({ palette: paletteTree });
    const tempPaletteLayer = new PaletteTokenLayer(paletteTree, paletteResolver);

    const themeTree = ThemeTokenLayer.fromStudioState({
      activeThemeId: registry.activeThemeId || 'ocean-blue',
      statusTokens: registry.statusTokens || [],
      palette: tempPaletteLayer,
      resolver: paletteResolver,
      themes: options?.themes || registry.themes,
      baseTheme: options?.baseDocument?.theme,
    });

    const fullResolver = new TokenReferenceResolver({
      palette: paletteTree,
      theme: themeTree,
    });

    const componentsTree = ComponentTokenLayer.fromStudioComponents(
      registry.components || [],
      fullResolver
    );

    const unifiedDoc: UnifiedTokensDocument = {
      $schema: 'https://design-tokens.github.io/community-group/format/',
      registrySchema:
        registry.$schema ||
        options?.baseDocument?.registrySchema ||
        'https://system.atomground.com/schemas/studio-registry.schema.json',
      name: options?.baseDocument?.name || 'AtomDesignToken System',
      version: registry.version || options?.baseDocument?.version || '0.14.2',
      updatedAt: registry.updatedAt || new Date().toISOString(),
      palette: paletteTree,
      theme: themeTree,
      components: componentsTree,
    };

    return new AtomTokenSystem(unifiedDoc);
  }

  resolve(refOrPath: string): string {
    return this.resolver.resolveValue(refOrPath);
  }

  resolveChain(refOrPath: string): ResolvedReferenceStep[] {
    return this.resolver.resolveChain(refOrPath);
  }

  toDocument(): UnifiedTokensDocument {
    return this.document;
  }

  toJson(pretty = true): string {
    return JSON.stringify(this.document, null, pretty ? 2 : 0);
  }

  toRegistry(): StudioRegistry {
    const statusTokens = this.theme.toStatusTokens();
    const paletteVariables = this.palette.toPaletteVariables(statusTokens);
    const components = this.components.toStudioComponents();
    const themes = this.theme.toStudioThemes();

    return {
      $schema:
        this.document.registrySchema ||
        'https://system.atomground.com/schemas/studio-registry.schema.json',
      version: this.document.version || '0.14.2',
      updatedAt: this.document.updatedAt || new Date().toISOString(),
      activeThemeId: this.theme.activeThemeId,
      statusTokens,
      paletteVariables,
      components,
      ...(themes.length > 0 ? { themes } : {}),
    };
  }
}
