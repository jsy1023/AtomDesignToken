import { atomTokens, SemanticStatusGroupNode, TokenLeaf } from '../tokens';

export * from '../tokens';

export type TokenCategory = 'color' | 'typography' | 'radius' | 'spacing' | 'shadow' | 'layout';

export interface BrandPreset {
  id: string;
  name: string;
  brandColor: string;
  radius: string;
  description: string;
}

export interface ColorToken {
  name: string;
  variable: string;
  value: string;
  description: string;
  category: 'brand' | 'surface' | 'text' | 'border' | 'status';
}

export interface TypographyToken {
  name: string;
  variable: string;
  fontSize: string;
  lineHeight: string;
  weight: string;
  sample: string;
}

export interface RadiusToken {
  name: string;
  variable: string;
  value: string;
  description: string;
}

export interface SpacingToken {
  name: string;
  variable: string;
  value: string;
  px: number;
}

export interface ShadowToken {
  name: string;
  variable: string;
  value: string;
  description: string;
}

export interface LayoutToken {
  name: string;
  variable: string;
  value: string;
  description: string;
  type: 'container' | 'gutter' | 'gap';
}

const BRAND_THEME_IDS = ['ocean-blue', 'warm-orange', 'violet-tech', 'emerald-eco'];

export const BRAND_PRESETS: BrandPreset[] = (() => {
  const allThemes = atomTokens.theme.toStudioThemes();
  const picked = BRAND_THEME_IDS.map((id) => allThemes.find((t) => t.id === id)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t)
  );
  const source = picked.length > 0 ? picked : allThemes.slice(0, 4);
  return source.map((t) => ({
    id: t.id,
    name: t.name,
    brandColor: t.brandColor,
    radius: t.borderRadius,
    description: t.description,
  }));
})();

function toSemanticColorEntry(
  leaf: TokenLeaf<string> | undefined,
  category: ColorToken['category'],
  fallbackName: string,
  fallbackVar: string
): ColorToken | null {
  if (!leaf) return null;
  return {
    name: leaf.name || fallbackName,
    variable: leaf.variable || fallbackVar,
    value: atomTokens.resolve(leaf.$value),
    description: leaf.$description || '',
    category,
  };
}

function appendStatusTriplet(
  list: ColorToken[],
  node: SemanticStatusGroupNode | undefined,
  category: ColorToken['category'],
  labels: { base: string; hover: string; subtle: string }
): void {
  if (!node) return;
  const base = toSemanticColorEntry(node, category, labels.base, node.variable);
  const hover = toSemanticColorEntry(node.hover, category, labels.hover, `${node.variable}-hover`);
  const subtle = toSemanticColorEntry(node.subtle, category, labels.subtle, `${node.variable}-subtle`);
  if (base) list.push(base);
  if (hover) list.push(hover);
  if (subtle) list.push(subtle);
}

export const BASE_COLOR_TOKENS: ColorToken[] = (() => {
  const sem = atomTokens.theme.raw.semantic;
  const list: ColorToken[] = [];

  appendStatusTriplet(list, sem.primary, 'brand', {
    base: 'Primary Accent',
    hover: 'Primary Hover',
    subtle: 'Primary Subtle / Light',
  });

  const appendGroup = (
    group: Record<string, TokenLeaf<string>> | undefined,
    category: ColorToken['category'],
    prefix: string
  ) => {
    if (!group) return;
    for (const [k, leaf] of Object.entries(group)) {
      const entry = toSemanticColorEntry(leaf, category, `${prefix} ${k}`, `--atom-${category}-${k}`);
      if (entry) list.push(entry);
    }
  };

  appendGroup(sem.surface, 'surface', 'Background');
  appendGroup(sem.text, 'text', 'Text');
  appendGroup(sem.border, 'border', 'Border');

  appendStatusTriplet(list, sem.success, 'status', {
    base: 'Status Success',
    hover: 'Status Success Hover',
    subtle: 'Status Success Subtle',
  });
  appendStatusTriplet(list, sem.danger, 'status', {
    base: 'Status Danger / Destructive',
    hover: 'Status Danger Hover',
    subtle: 'Status Danger Subtle',
  });
  appendStatusTriplet(list, sem.warning, 'status', {
    base: 'Status Warning',
    hover: 'Status Warning Hover',
    subtle: 'Status Warning Subtle',
  });

  if (sem.success) {
    list.push({
      name: 'Legacy Status Success',
      variable: '--atom-status-success',
      value: `var(${sem.success.variable})`,
      description: '기존 호환용 상태 토큰 (Success)',
      category: 'status',
    });
  }
  if (sem.danger) {
    list.push({
      name: 'Legacy Status Danger',
      variable: '--atom-status-danger',
      value: `var(${sem.danger.variable})`,
      description: '기존 호환용 상태 토큰 (Danger)',
      category: 'status',
    });
  }
  if (sem.warning) {
    list.push({
      name: 'Legacy Status Warning',
      variable: '--atom-status-warning',
      value: `var(${sem.warning.variable})`,
      description: '기존 호환용 상태 토큰 (Warning)',
      category: 'status',
    });
  }

  return list;
})();

function formatFontSizeLabel(rawOrRef: string, presetLabel?: string): string {
  const resolved = atomTokens.resolve(rawOrRef);
  if (presetLabel && presetLabel.startsWith(resolved)) {
    return presetLabel;
  }
  const pxMatch = resolved.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    const px = Number(pxMatch[1]);
    const rem = Number((px / 16).toFixed(4));
    return `${resolved} (${rem}rem)`;
  }
  return presetLabel || resolved;
}

export const TYPOGRAPHY_TOKENS: TypographyToken[] = Object.entries(
  atomTokens.palette.raw.typography?.scale || {}
).map(([key, node]) => ({
  name: node.name || key,
  variable: node.variable || `--atom-font-${key}`,
  fontSize: formatFontSizeLabel(node.$value.fontSize, node.fontSizeLabel),
  lineHeight: node.$value.lineHeight,
  weight: node.weightLabel || atomTokens.resolve(node.$value.fontWeight),
  sample: node.sample,
}));

export const RADIUS_TOKENS: RadiusToken[] = Object.entries(atomTokens.palette.raw.radius || {}).map(
  ([key, leaf]) => ({
    name: leaf.name || key,
    variable: leaf.variable || `--atom-radius-${key}`,
    value: leaf.$value,
    description: leaf.$description || '',
  })
);

export const SPACING_TOKENS: SpacingToken[] = Object.entries(atomTokens.palette.raw.spacing || {}).map(
  ([key, leaf]) => {
    const pxMatch = leaf.$value.match(/^(\d+(?:\.\d+)?)px$/);
    return {
      name: leaf.name || `Space ${key}`,
      variable: leaf.variable || `--atom-space-${key}`,
      value: leaf.$value,
      px: leaf.px ?? (pxMatch ? Number(pxMatch[1]) : 0),
    };
  }
);

export const SHADOW_TOKENS: ShadowToken[] = Object.entries(atomTokens.palette.raw.shadow || {}).map(
  ([key, leaf]) => ({
    name: leaf.name || key,
    variable: leaf.variable || `--atom-shadow-${key}`,
    value: leaf.$value,
    description: leaf.$description || '',
  })
);

export const LAYOUT_TOKENS: LayoutToken[] = (() => {
  const layout = atomTokens.palette.raw.layout;
  const list: LayoutToken[] = [];
  const pushGroup = (group: Record<string, TokenLeaf<string>> | undefined, type: LayoutToken['type']) => {
    if (!group) return;
    for (const [key, leaf] of Object.entries(group)) {
      list.push({
        name: leaf.name || key,
        variable: leaf.variable || `--atom-layout-${key}`,
        value: leaf.$value,
        description: leaf.$description || '',
        type,
      });
    }
  };
  pushGroup(layout?.container, 'container');
  pushGroup(layout?.gutter, 'gutter');
  pushGroup(layout?.gap, 'gap');
  return list;
})();
