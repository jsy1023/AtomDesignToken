import type {
  ResolvedReferenceStep,
  TokenLeaf,
  UnifiedTokensDocument,
} from './types';

const ALIAS_PATTERN = /^\{([^}]+)\}$/;
const SKIP_LEAF_KEYS = new Set([
  '$value',
  '$type',
  '$description',
  'variable',
  'name',
  'family',
  'cdnUrl',
  'px',
  'fontSizeLabel',
  'weightLabel',
  'sample',
  'targetVariable',
]);

export interface IndexedTokenEntry {
  path: string;
  node: TokenLeaf<string>;
}

export interface UnresolvedAliasIssue {
  location: string;
  alias: string;
}

/**
 * Resolves W3C DTCG object-path aliases (`{palette.color.blue.500}`, `{theme.semantic.primary}`)
 * across the unified Palette -> Theme -> Component hierarchy with cycle detection.
 */
export class TokenReferenceResolver {
  private readonly pathIndex = new Map<string, TokenLeaf<string>>();
  private readonly variableIndex = new Map<string, string>();
  private readonly orderedEntries: IndexedTokenEntry[] = [];

  constructor(private readonly doc: Partial<UnifiedTokensDocument>) {
    if (doc.palette) {
      this.indexSubtree(doc.palette, 'palette');
    }
    if (doc.theme?.semantic) {
      this.indexSubtree(doc.theme.semantic, 'theme.semantic');
    }
  }

  private indexSubtree(node: unknown, currentPath: string): void {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    const record = node as Record<string, unknown>;

    if (typeof record.$value === 'string') {
      const leaf = record as unknown as TokenLeaf<string>;
      this.pathIndex.set(currentPath, leaf);
      this.orderedEntries.push({ path: currentPath, node: leaf });
      if (typeof leaf.variable === 'string' && leaf.variable.trim()) {
        this.variableIndex.set(leaf.variable.trim(), currentPath);
      }
    }

    for (const [key, child] of Object.entries(record)) {
      if (SKIP_LEAF_KEYS.has(key) || key.startsWith('$')) continue;
      if (child && typeof child === 'object') {
        const nextPath = currentPath ? `${currentPath}.${key}` : key;
        this.indexSubtree(child, nextPath);
      }
    }
  }

  isAlias(value: unknown): boolean {
    return typeof value === 'string' && ALIAS_PATTERN.test(value.trim());
  }

  stripAlias(aliasOrPath: string): string {
    const trimmed = aliasOrPath.trim();
    const match = trimmed.match(ALIAS_PATTERN);
    return match ? match[1].trim() : trimmed;
  }

  getNode(dotPathOrCssVar: string): TokenLeaf<string> | undefined {
    const key = this.stripAlias(dotPathOrCssVar);
    if (this.pathIndex.has(key)) {
      return this.pathIndex.get(key);
    }
    const mappedPath = this.variableIndex.get(key);
    return mappedPath ? this.pathIndex.get(mappedPath) : undefined;
  }

  getPathByVariable(cssVar: string): string | undefined {
    return this.variableIndex.get(cssVar.trim());
  }

  getVariableByPath(dotPathOrAlias: string): string | undefined {
    const clean = this.stripAlias(dotPathOrAlias);
    if (clean.startsWith('--')) return clean;
    return this.pathIndex.get(clean)?.variable;
  }

  toAliasByVariable(cssVarOrAlias: string): string {
    const trimmed = cssVarOrAlias.trim();
    if (!trimmed) return trimmed;
    if (this.isAlias(trimmed)) {
      const inner = this.stripAlias(trimmed);
      if (inner.startsWith('--')) {
        const mapped = this.variableIndex.get(inner);
        return mapped ? `{${mapped}}` : trimmed;
      }
      return `{${inner}}`;
    }
    const foundPath = this.variableIndex.get(trimmed);
    return foundPath ? `{${foundPath}}` : trimmed;
  }

  getAllEntries(): ReadonlyArray<IndexedTokenEntry> {
    return this.orderedEntries;
  }

  resolveChain(refOrPath: string, maxDepth = 10): ResolvedReferenceStep[] {
    const chain: ResolvedReferenceStep[] = [];
    const visited = new Set<string>();
    let current = refOrPath.trim();

    for (let depth = 0; depth < maxDepth; depth++) {
      if (!current) break;
      const lookupKey = this.isAlias(current) ? this.stripAlias(current) : current;
      const node = this.getNode(lookupKey);
      if (!node) break;

      const canonicalPath = this.variableIndex.get(lookupKey) || lookupKey;
      if (visited.has(canonicalPath)) break;
      visited.add(canonicalPath);

      chain.push({
        path: canonicalPath,
        alias: `{${canonicalPath}}`,
        variable: node.variable,
        value: node.$value,
      });

      if (!this.isAlias(node.$value)) {
        break;
      }
      current = node.$value;
    }

    return chain;
  }

  resolveValue(refOrValue: string, maxDepth = 10): string {
    const trimmed = (refOrValue || '').trim();
    if (!trimmed) return '';

    const visited = new Set<string>();
    let current = trimmed;

    for (let depth = 0; depth < maxDepth; depth++) {
      const isDirectPath = !this.isAlias(current) && this.pathIndex.has(current);
      if (!this.isAlias(current) && !current.startsWith('--') && !isDirectPath) {
        return current;
      }

      const key = this.stripAlias(current);
      const canonical = this.variableIndex.get(key) || key;
      if (visited.has(canonical)) {
        return current;
      }
      visited.add(canonical);

      const node = this.getNode(canonical);
      if (!node) {
        return current;
      }
      current = node.$value;
    }

    return current;
  }

  /**
   * Resolves an alias or CSS variable to a browser-usable `var(--...)` expression
   * when the referenced token declares a CSS variable, falling back to raw concrete value.
   */
  resolveCssReference(refOrValue: string): string {
    const trimmed = (refOrValue || '').trim();
    if (!trimmed) return '';

    if (this.isAlias(trimmed)) {
      const targetNode = this.getNode(trimmed);
      if (targetNode?.variable) {
        return `var(${targetNode.variable})`;
      }
      const resolved = this.resolveValue(trimmed);
      if (resolved.startsWith('--')) return `var(${resolved})`;
      return resolved;
    }

    if (trimmed.startsWith('--')) {
      return `var(${trimmed})`;
    }

    return trimmed;
  }

  /**
   * Audits all `{...}` references across Palette scale, Theme, and Component layers.
   */
  findUnresolvedAliases(): UnresolvedAliasIssue[] {
    const issues: UnresolvedAliasIssue[] = [];
    const check = (location: string, candidate: unknown) => {
      if (typeof candidate === 'string' && this.isAlias(candidate)) {
        if (!this.getNode(candidate)) {
          issues.push({ location, alias: candidate });
        }
      }
    };

    if (this.doc.palette?.typography?.scale) {
      for (const [k, scaleNode] of Object.entries(this.doc.palette.typography.scale)) {
        check(`palette.typography.scale.${k}.$value.fontSize`, scaleNode.$value?.fontSize);
        check(`palette.typography.scale.${k}.$value.fontWeight`, scaleNode.$value?.fontWeight);
      }
    }

    if (this.doc.theme?.semantic) {
      for (const [key, entry] of Object.entries(this.doc.theme.semantic)) {
        if (!entry || typeof entry !== 'object') continue;
        if ('$value' in entry) {
          const g = entry as Partial<{ $value: string; hover?: { $value: string }; subtle?: { $value: string } }>;
          check(`theme.semantic.${key}.$value`, g.$value);
          if (g.hover) check(`theme.semantic.${key}.hover.$value`, g.hover.$value);
          if (g.subtle) check(`theme.semantic.${key}.subtle.$value`, g.subtle.$value);
        } else {
          for (const [subKey, leaf] of Object.entries(entry as Record<string, TokenLeaf<string>>)) {
            check(`theme.semantic.${key}.${subKey}.$value`, leaf?.$value);
          }
        }
      }
    }

    if (this.doc.theme?.presets) {
      for (const [presetId, preset] of Object.entries(this.doc.theme.presets)) {
        check(`theme.presets.${presetId}.brandColor`, preset.brandColor);
        check(`theme.presets.${presetId}.borderRadius`, preset.borderRadius);
        check(`theme.presets.${presetId}.fontFamily`, preset.fontFamily);
        for (const [tKey, leaf] of Object.entries(preset.tokens || {})) {
          check(`theme.presets.${presetId}.tokens.${tKey}.$value`, leaf?.$value);
        }
      }
    }

    if (this.doc.components) {
      for (const [compId, comp] of Object.entries(this.doc.components)) {
        for (const [varId, v] of Object.entries(comp.variables || {})) {
          for (const [propKey, binding] of Object.entries(v.tokens || {})) {
            check(`components.${compId}.variables.${varId}.tokens.${propKey}.$value`, binding?.$value);
          }
        }
      }
    }

    return issues;
  }
}
