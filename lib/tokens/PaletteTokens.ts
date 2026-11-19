import type { PaletteVariable, SemanticStatusToken } from '../data/studioData';
import type { TokenReferenceResolver } from './TokenReferenceResolver';
import type { PaletteTokenTree, TokenLeaf, W3CTokenType } from './types';

function stripVarPrefix(id: string, prefixes: string[]): string {
  for (const prefix of prefixes) {
    if (id.startsWith(prefix)) {
      return id.slice(prefix.length);
    }
  }
  return id.replace(/^--atom-/, '').replace(/^--/, '');
}

function inferColorFamily(id: string): string {
  const match = id.match(/^--atom-palette-([a-z0-9]+)-/i);
  if (match) return match[1].toLowerCase();
  if (id === '--atom-palette-white' || id === '--atom-palette-black') return 'neutral';
  return 'custom';
}

function parsePxNumber(val: string): number | undefined {
  const m = String(val).trim().match(/^(-?\d+(?:\.\d+)?)px$/);
  return m ? Number(m[1]) : undefined;
}

function toPaletteVariable(leaf: TokenLeaf<string>, category: PaletteVariable['category'], fallbackId: string): PaletteVariable {
  return {
    id: leaf.variable || fallbackId,
    name: leaf.name || leaf.$description || fallbackId,
    category,
    value: leaf.$value,
    ...(leaf.family ? { family: leaf.family } : {}),
    ...(leaf.cdnUrl ? { cdnUrl: leaf.cdnUrl } : {}),
    ...(leaf.$description ? { description: leaf.$description } : {}),
  };
}

/**
 * Layer 1 (Primitives): Encapsulates raw Color, Spacing, Radius, Typography, Shadow, and Layout tokens.
 */
export class PaletteTokenLayer {
  constructor(
    public readonly raw: PaletteTokenTree,
    private readonly resolver: TokenReferenceResolver
  ) {}

  getColor(family: string, step: string | number): TokenLeaf<string> | undefined {
    return this.raw.color?.[family]?.[String(step)];
  }

  getColorValue(family: string, step: string | number): string | undefined {
    return this.getColor(family, step)?.$value;
  }

  getSpacing(key: string): TokenLeaf<string> | undefined {
    return this.raw.spacing?.[key];
  }

  getRadius(key: string): TokenLeaf<string> | undefined {
    return this.raw.radius?.[key];
  }

  getShadow(key: string): TokenLeaf<string> | undefined {
    return this.raw.shadow?.[key];
  }

  getTypography(group: 'font' | 'size' | 'weight', key: string): TokenLeaf<string> | undefined {
    return this.raw.typography?.[group]?.[key];
  }

  getLayout(group: 'container' | 'gutter' | 'gap', key: string): TokenLeaf<string> | undefined {
    return this.raw.layout?.[group]?.[key];
  }

  byVariable(cssVar: string): TokenLeaf<string> | undefined {
    const path = this.resolver.getPathByVariable(cssVar);
    if (!path || !path.startsWith('palette.')) return undefined;
    return this.resolver.getNode(path);
  }

  getPathForVariable(cssVar: string): string | undefined {
    const path = this.resolver.getPathByVariable(cssVar);
    return path && path.startsWith('palette.') ? path : undefined;
  }

  /**
   * Reconstructs the flat `PaletteVariable[]` array expected by Studio UI & repositories.
   */
  toPaletteVariables(statusTokens?: SemanticStatusToken[]): PaletteVariable[] {
    const result: PaletteVariable[] = [];

    if (statusTokens && statusTokens.length > 0) {
      for (const st of statusTokens) {
        result.push({
          id: st.id,
          name: st.name,
          category: 'status',
          family: 'status',
          value: `var(${st.paletteId})`,
          description: st.description,
        });
      }
    }

    for (const [family, group] of Object.entries(this.raw.color || {})) {
      for (const [step, leaf] of Object.entries(group || {})) {
        result.push(
          toPaletteVariable(
            { ...leaf, family: leaf.family || family },
            'color',
            `--atom-palette-${family}-${step}`
          )
        );
      }
    }

    for (const [key, leaf] of Object.entries(this.raw.spacing || {})) {
      result.push(toPaletteVariable(leaf, 'spacing', `--atom-space-${key}`));
    }

    for (const [key, leaf] of Object.entries(this.raw.size || {})) {
      result.push(toPaletteVariable(leaf, 'size', `--atom-size-${key}`));
    }

    for (const [key, leaf] of Object.entries(this.raw.radius || {})) {
      result.push(toPaletteVariable(leaf, 'radius', `--atom-radius-${key}`));
    }

    for (const [key, leaf] of Object.entries(this.raw.typography?.font || {})) {
      result.push(
        toPaletteVariable({ ...leaf, family: leaf.family || 'font-family' }, 'typography', `--atom-font-${key}`)
      );
    }

    for (const [key, leaf] of Object.entries(this.raw.typography?.size || {})) {
      result.push(toPaletteVariable(leaf, 'typography', `--atom-typography-${key}`));
    }

    for (const [key, leaf] of Object.entries(this.raw.typography?.weight || {})) {
      result.push(toPaletteVariable(leaf, 'typography', `--atom-font-weight-${key}`));
    }

    return result;
  }

  /**
   * Builds a structured `PaletteTokenTree` from Studio's `PaletteVariable[]` list,
   * preserving shadow, layout, and composite typography scale nodes from `basePalette`.
   */
  static fromPaletteVariables(
    vars: PaletteVariable[],
    basePalette?: PaletteTokenTree
  ): PaletteTokenTree {
    const tree: PaletteTokenTree = {
      color: {},
      spacing: {},
      radius: {},
      shadow: basePalette?.shadow ? { ...basePalette.shadow } : {},
      typography: {
        font: {},
        size: {},
        weight: {},
        ...(basePalette?.typography?.scale ? { scale: basePalette.typography.scale } : {}),
      },
      layout: basePalette?.layout
        ? {
            container: { ...(basePalette.layout.container || {}) },
            gutter: { ...(basePalette.layout.gutter || {}) },
            gap: { ...(basePalette.layout.gap || {}) },
          }
        : { container: {}, gutter: {}, gap: {} },
    };

    for (const p of vars) {
      if (p.category === 'status') {
        // Semantic status tokens live in Layer 2 (`theme.semantic`), not in Layer 1 primitives.
        continue;
      }

      if (p.category === 'color') {
        const family = (p.family || inferColorFamily(p.id)).toLowerCase();
        const key = stripVarPrefix(p.id, [`--atom-palette-${family}-`, '--atom-palette-']);
        if (!tree.color[family]) tree.color[family] = {};
        tree.color[family][key] = {
          $value: p.value,
          $type: 'color',
          $description: p.description || p.name,
          name: p.name,
          family,
          variable: p.id,
        };
        continue;
      }

      if (p.category === 'spacing') {
        const key = stripVarPrefix(p.id, ['--atom-space-', '--atom-spacing-']);
        const px = parsePxNumber(p.value);
        tree.spacing[key] = {
          $value: p.value,
          $type: 'dimension',
          $description: p.description || p.name,
          name: p.name,
          variable: p.id,
          ...(px !== undefined ? { px } : {}),
        };
        continue;
      }

      if (p.category === 'size') {
        if (!tree.size) tree.size = {};
        const key = stripVarPrefix(p.id, ['--atom-size-']);
        tree.size[key] = {
          $value: p.value,
          $type: 'dimension',
          $description: p.description || p.name,
          name: p.name,
          variable: p.id,
        };
        continue;
      }

      if (p.category === 'radius') {
        const key = stripVarPrefix(p.id, ['--atom-radius-']);
        tree.radius[key] = {
          $value: p.value,
          $type: 'dimension',
          $description: p.description || p.name,
          name: p.name,
          variable: p.id,
        };
        continue;
      }

      if (p.category === 'typography') {
        const isFontFamily =
          p.family === 'font-family' || p.id.includes('font-sans') || p.id.includes('font-mono');
        if (isFontFamily) {
          const key = stripVarPrefix(p.id, ['--atom-font-']);
          tree.typography.font[key] = {
            $value: p.value,
            $type: 'fontFamily',
            $description: p.description || p.name,
            name: p.name,
            family: 'font-family',
            variable: p.id,
            ...(p.cdnUrl ? { cdnUrl: p.cdnUrl } : {}),
          };
        } else if (p.id.includes('weight')) {
          const key = stripVarPrefix(p.id, ['--atom-font-weight-']);
          tree.typography.weight[key] = {
            $value: p.value,
            $type: 'fontWeight' as W3CTokenType,
            $description: p.description || p.name,
            name: p.name,
            variable: p.id,
          };
        } else {
          const key = stripVarPrefix(p.id, ['--atom-typography-', '--atom-font-size-']);
          tree.typography.size[key] = {
            $value: p.value,
            $type: 'dimension',
            $description: p.description || p.name,
            name: p.name,
            variable: p.id,
          };
        }
      }
    }

    return tree;
  }
}
