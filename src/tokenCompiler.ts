import {
  isUnifiedTokensDocument,
  TokenReferenceResolver,
  UnifiedTokensDocument,
} from '../lib/tokens';

function resolveLegacyValue(rawVal: unknown, resolver: TokenReferenceResolver): string {
  if (typeof rawVal !== 'string') return String(rawVal ?? '');
  return resolver.resolveCssReference(rawVal);
}

/**
 * W3C DTCG Token JSON -> Zero-Runtime CSS Custom Properties 컴파일러.
 * 통합 `tokens/tokens.json` (palette -> theme -> components 3단 참조) 및 레거시 DTCG JSON 모두 지원합니다.
 */
export function compileTokensToCss(tokenJson: Record<string, any>): string {
  if (isUnifiedTokensDocument(tokenJson)) {
    return compileUnifiedTokensToCss(tokenJson);
  }

  const resolver = new TokenReferenceResolver(tokenJson as Partial<UnifiedTokensDocument>);
  const cssVars: string[] = [];

  function traverse(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    if (obj.variable && typeof obj.$value === 'string') {
      cssVars.push(`  ${obj.variable}: ${resolveLegacyValue(obj.$value, resolver)};`);
    }

    for (const key of Object.keys(obj)) {
      if (key.startsWith('$') || key === 'variable' || key === 'name') continue;
      if (key === 'components' || key === 'presets') continue;
      traverse(obj[key]);
    }
  }

  traverse(tokenJson);
  return `:root {\n${cssVars.join('\n')}\n}\n`;
}

function buildPresetCssVars(
  preset: NonNullable<NonNullable<UnifiedTokensDocument['theme']>['presets']>[string],
  resolver: TokenReferenceResolver
): string[] {
  const vars: string[] = [];
  const t = preset.tokens || {};
  const resolve = (val?: string) => (val ? resolver.resolveCssReference(val) : '');

  const primary = resolve(t.primary?.$value || preset.brandColor);
  const primaryHover = resolve(t.primaryHover?.$value);
  const primaryLight = resolve(t.primaryLight?.$value);
  const bgPrimary = resolve(t.bgPrimary?.$value);
  const bgSecondary = resolve(t.bgSecondary?.$value);
  const secondary = resolve(t.secondary?.$value) || bgSecondary;
  const secondaryHover = resolve(t.secondaryHover?.$value) || resolve(t.borderStrong?.$value);
  const secondaryLight = resolve(t.secondaryLight?.$value) || bgSecondary;
  const textPrimary = resolve(t.textPrimary?.$value);
  const textSecondary = resolve(t.textSecondary?.$value);
  const textMuted = resolve(t.textMuted?.$value);
  const borderSubtle = resolve(t.borderSubtle?.$value);
  const borderStrong = resolve(t.borderStrong?.$value);
  const statusSuccess = resolve(t.statusSuccess?.$value);
  const statusDanger = resolve(t.statusDanger?.$value);
  const statusWarning = resolve(t.statusWarning?.$value);
  const radius = resolve(preset.borderRadius);

  if (primary) {
    vars.push(`  --atom-color-primary: ${primary};`);
    vars.push(`  --atom-primary: ${primary};`);
    vars.push(`  --accent-primary: ${primary};`);
  }
  if (primaryHover) {
    vars.push(`  --atom-color-primary-hover: ${primaryHover};`);
    vars.push(`  --accent-primary-hover: ${primaryHover};`);
  }
  if (primaryLight) vars.push(`  --atom-color-primary-subtle: ${primaryLight};`);
  if (secondary) vars.push(`  --atom-color-secondary: ${secondary};`);
  if (secondaryHover) vars.push(`  --atom-color-secondary-hover: ${secondaryHover};`);
  if (secondaryLight) vars.push(`  --atom-color-secondary-subtle: ${secondaryLight};`);
  if (bgPrimary) {
    vars.push(`  --atom-bg-primary: ${bgPrimary};`);
    vars.push(`  --bg-primary: ${bgPrimary};`);
  }
  if (bgSecondary) {
    vars.push(`  --atom-bg-secondary: ${bgSecondary};`);
    vars.push(`  --atom-bg-surface: ${bgSecondary};`);
    vars.push(`  --atom-bg-muted: ${bgSecondary};`);
    vars.push(`  --bg-secondary: ${bgSecondary};`);
  }
  if (textPrimary) {
    vars.push(`  --atom-text-primary: ${textPrimary};`);
    vars.push(`  --text-primary: ${textPrimary};`);
  }
  if (textSecondary) {
    vars.push(`  --atom-text-secondary: ${textSecondary};`);
    vars.push(`  --text-secondary: ${textSecondary};`);
  }
  if (textMuted) {
    vars.push(`  --atom-text-muted: ${textMuted};`);
    vars.push(`  --text-muted: ${textMuted};`);
  }
  if (borderSubtle) {
    vars.push(`  --atom-border-subtle: ${borderSubtle};`);
    vars.push(`  --border-subtle: ${borderSubtle};`);
  }
  if (borderStrong) {
    vars.push(`  --atom-border-strong: ${borderStrong};`);
    vars.push(`  --border-strong: ${borderStrong};`);
  }
  if (statusSuccess) vars.push(`  --atom-color-success: ${statusSuccess};`);
  if (statusDanger) vars.push(`  --atom-color-destructive: ${statusDanger};`);
  if (statusWarning) vars.push(`  --atom-color-warning: ${statusWarning};`);
  if (radius) vars.push(`  --radius: ${radius};`);
  if (preset.mode) vars.push(`  color-scheme: ${preset.mode};`);

  return vars;
}

function mapComponentPropToSemanticVar(compId: string, propKey: string, cssVal: string): string {
  if (!cssVal) return cssVal;

  if (propKey === 'background' || propKey === 'activeBackground') {
    if (cssVal === 'var(--atom-palette-white)') {
      return compId === 'card' ? 'var(--atom-bg-surface)' : 'var(--atom-bg-primary)';
    }
    if (cssVal === 'var(--atom-palette-gray-50)' || cssVal === 'var(--atom-palette-gray-100)') {
      return 'var(--atom-bg-secondary)';
    }
  }

  if (propKey === 'borderColor') {
    if (cssVal === 'var(--atom-palette-gray-100)' || cssVal === 'var(--atom-palette-gray-200)') {
      return 'var(--atom-border-subtle)';
    }
    if (cssVal === 'var(--atom-palette-gray-300)') {
      return 'var(--atom-border-strong)';
    }
  }

  if (propKey === 'textColor' || propKey === 'activeText' || propKey === 'inactiveText') {
    if (cssVal === 'var(--atom-palette-gray-900)') return 'var(--atom-text-primary)';
    if (cssVal === 'var(--atom-palette-gray-700)') return 'var(--atom-text-secondary)';
    if (cssVal === 'var(--atom-palette-gray-500)') return 'var(--atom-text-muted)';
  }

  return cssVal;
}

function compileUnifiedTokensToCss(doc: UnifiedTokensDocument): string {
  const resolver = new TokenReferenceResolver(doc);
  const cdnUrls = new Set<string>();
  const paletteVars: string[] = [];
  const semanticVars: string[] = [];
  const componentBlocks: string[] = [];
  const themePresetBlocks: string[] = [];

  // 1. Collect Webfont CDNs + Palette CSS Variables
  function collectPalette(obj: any, skipScale = false) {
    if (!obj || typeof obj !== 'object') return;
    if (typeof obj.cdnUrl === 'string' && obj.cdnUrl.trim()) {
      cdnUrls.add(obj.cdnUrl.trim());
    }
    if (typeof obj.variable === 'string' && typeof obj.$value === 'string') {
      if (obj.variable === '--atom-font-sans' && obj.$value.includes('Spoqa Han Sans Neo') && !obj.cdnUrl) {
        cdnUrls.add('https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css');
      }
      paletteVars.push(`  ${obj.variable}: ${obj.$value};`);
      return;
    }
    for (const [key, child] of Object.entries(obj)) {
      if (key.startsWith('$') || (skipScale && key === 'scale')) continue;
      if (child && typeof child === 'object') {
        collectPalette(child, key === 'typography');
      }
    }
  }

  collectPalette(doc.palette);

  // 2. Collect Theme Semantic Variables (resolving {palette.*} aliases to `var(--atom-*)`)
  function collectSemantic(obj: any) {
    if (!obj || typeof obj !== 'object') return;
    if (typeof obj.variable === 'string' && typeof obj.$value === 'string') {
      const cssVal = resolver.resolveCssReference(obj.$value);
      semanticVars.push(`  ${obj.variable}: ${cssVal};`);
    }
    for (const [key, child] of Object.entries(obj)) {
      if (key.startsWith('$') || key === 'variable' || key === 'name') continue;
      if (child && typeof child === 'object') {
        collectSemantic(child);
      }
    }
  }

  collectSemantic(doc.theme?.semantic);

  const presets = doc.theme?.presets || {};
  const activePresetId = doc.theme?.activeThemeId;
  const activePreset = activePresetId ? presets[activePresetId] : undefined;
  const activePresetVars = activePreset ? buildPresetCssVars(activePreset, resolver) : [];

  for (const [presetId, preset] of Object.entries(presets)) {
    const presetVars = buildPresetCssVars(preset, resolver);
    if (presetVars.length > 0) {
      themePresetBlocks.push(`[data-atom-theme="${presetId}"] {\n${presetVars.join('\n')}\n}`);
    }
  }

  // 3. Emit Scoped Component Variable Bindings (resolving `{theme.*}` / `{palette.*}` -> `var(--atom-*)`)
  for (const [compId, comp] of Object.entries(doc.components || {})) {
    for (const [varId, vNode] of Object.entries(comp.variables || {})) {
      const lines: string[] = [];
      for (const [propKey, binding] of Object.entries(vNode.tokens || {})) {
        const rawCssVal = resolver.resolveCssReference(binding.$value);
        const cssVal = mapComponentPropToSemanticVar(compId, propKey, rawCssVal);
        if (cssVal) {
          lines.push(`  --atom-${compId}-${varId}-${propKey}: ${cssVal};`);
        }
      }
      if (lines.length > 0) {
        componentBlocks.push(
          `[data-component="${compId}"][data-variable="${varId}"],\n.atom-${compId}--${varId} {\n${lines.join('\n')}\n}`
        );
      }
    }
  }

  const imports = Array.from(cdnUrls)
    .map((u) => `@import url("${u}");`)
    .join('\n');

  const parts: string[] = [];
  if (imports) parts.push(imports);
  const activeThemeComment = activePresetId ? `\n\n  /* Active Theme Preset (${activePresetId}) */\n${activePresetVars.join('\n')}` : '';

  parts.push(
    `:root {\n  /* Palette Primitives */\n${paletteVars.join('\n')}\n\n  /* Theme Semantics */\n${semanticVars.join('\n')}\n  --accent-primary: var(--atom-color-primary);\n  --accent-primary-hover: var(--atom-color-primary-hover);\n  --font-sans: var(--atom-font-sans);\n  --font-mono: var(--atom-font-mono);${activeThemeComment}\n}`
  );
  if (themePresetBlocks.length > 0) {
    parts.push(`/* Theme Presets (data-atom-theme) */\n${themePresetBlocks.join('\n\n')}`);
  }
  if (componentBlocks.length > 0) {
    parts.push(`/* Component Scoped Variables */\n${componentBlocks.join('\n\n')}`);
  }

  return `${parts.join('\n\n')}\n`;
}
