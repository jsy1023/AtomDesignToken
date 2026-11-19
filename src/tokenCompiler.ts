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

function compileUnifiedTokensToCss(doc: UnifiedTokensDocument): string {
  const resolver = new TokenReferenceResolver(doc);
  const cdnUrls = new Set<string>();
  const paletteVars: string[] = [];
  const semanticVars: string[] = [];
  const componentBlocks: string[] = [];

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

  // 3. Emit Scoped Component Variable Bindings (resolving `{theme.*}` / `{palette.*}` -> `var(--atom-*)`)
  for (const [compId, comp] of Object.entries(doc.components || {})) {
    for (const [varId, vNode] of Object.entries(comp.variables || {})) {
      const lines: string[] = [];
      for (const [propKey, binding] of Object.entries(vNode.tokens || {})) {
        const cssVal = resolver.resolveCssReference(binding.$value);
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
  parts.push(
    `:root {\n  /* Palette Primitives */\n${paletteVars.join('\n')}\n\n  /* Theme Semantics */\n${semanticVars.join('\n')}\n  --accent-primary: var(--atom-color-primary);\n  --accent-primary-hover: var(--atom-color-primary-hover);\n  --font-sans: var(--atom-font-sans);\n  --font-mono: var(--atom-font-mono);\n}`
  );
  if (componentBlocks.length > 0) {
    parts.push(`/* Component Scoped Variables */\n${componentBlocks.join('\n\n')}`);
  }

  return `${parts.join('\n\n')}\n`;
}
