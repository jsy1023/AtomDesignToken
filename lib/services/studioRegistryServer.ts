import fs from 'fs';
import path from 'path';
import {
  AtomComponentSubmissionSpec,
  ComponentPropertySpec,
  DEFAULT_COMPONENT_TYPES,
  INITIAL_PALETTE_VARIABLES,
  INITIAL_SEMANTIC_STATUS_TOKENS,
  INITIAL_STUDIO_COMPONENTS,
  PaletteVariable,
  resolveStudioComponentId,
  SemanticStatusToken,
  StudioComponentDefinition,
  StudioRegistry,
} from '../data/studioData';
import {
  exportStudioCustomComponentStyles,
  exportStudioToCSS,
  exportStudioToTokensJson,
  STUDIO_CUSTOM_STYLES_END,
  STUDIO_CUSTOM_STYLES_START,
} from './studioEngine';
import { compileTokensToCss } from '../../src/tokenCompiler';
import {
  ensureUiBarrelExport,
  generateComponentTsx,
  toKebabCase,
  toPascalCase,
  validateSubmissionSpec,
} from './componentScaffold';
import {
  atomTokens,
  AtomTokenSystem,
  isUnifiedTokensDocument,
  UNIFIED_TOKENS_DOCUMENT,
  UnifiedTokensDocument,
} from '../tokens';

export const TOKENS_SSOT_REL_PATH = path.join('tokens', 'tokens.json');
export const REGISTRY_REL_PATH = TOKENS_SSOT_REL_PATH;
const LEGACY_REGISTRY_REL_PATH = path.join('tokens', 'studio.registry.json');
const UNIVERSAL_MARKER = '/* === Universal Component Classes === */';

function readProjectVersion(cwd: string): string {
  try {
    const pkgPath = path.join(cwd, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      if (pkg?.version) return String(pkg.version);
    }
  } catch {
    // ignore
  }
  return '0.14.2';
}

function buildDefaultPropertiesForSpec(spec: AtomComponentSubmissionSpec): ComponentPropertySpec[] {
  const firstBindings = spec.variables[0]?.tokenBindings || {};
  return [
    {
      key: 'background',
      label: '배경 색상 (Background)',
      category: 'color',
      defaultPaletteId: firstBindings.background || '--atom-color-primary-subtle',
    },
    {
      key: 'textColor',
      label: '텍스트 색상 (Text Color)',
      category: 'color',
      defaultPaletteId: firstBindings.textColor || '--atom-color-primary',
    },
    {
      key: 'borderColor',
      label: '테두리 색상 (Border Color)',
      category: 'color',
      defaultPaletteId: firstBindings.borderColor || '--atom-color-primary',
    },
    {
      key: 'borderRadius',
      label: '모서리 곡률 (Border Radius)',
      category: 'radius',
      defaultPaletteId: firstBindings.borderRadius || '--atom-radius-md',
    },
    {
      key: 'paddingX',
      label: '좌우 패딩 (Padding X)',
      category: 'spacing',
      defaultPaletteId: firstBindings.paddingX || '--atom-space-3',
    },
    {
      key: 'paddingY',
      label: '상하 패딩 (Padding Y)',
      category: 'spacing',
      defaultPaletteId: firstBindings.paddingY || '--atom-space-1',
    },
  ];
}

function specToStudioDefinition(
  spec: AtomComponentSubmissionSpec,
  sourceFile: string
): StudioComponentDefinition {
  return {
    id: spec.id,
    name: spec.name,
    category: spec.category,
    description: spec.description,
    types: spec.types,
    supportedStatuses: spec.supportedStatuses || ['default', 'hover', 'active', 'focus', 'disabled'],
    properties:
      spec.properties && spec.properties.length > 0
        ? spec.properties
        : buildDefaultPropertiesForSpec(spec),
    variables: spec.variables,
    sourceFile,
    autoDiscovered: false,
    ...(spec.customCss ? { customCss: spec.customCss } : {}),
    ...(spec.docs ? { docs: spec.docs } : {}),
  };
}

function buildBaselineRegistry(cwd: string): StudioRegistry {
  const fromUnified = atomTokens.toRegistry();
  return {
    ...fromUnified,
    version: readProjectVersion(cwd) || fromUnified.version,
    components: fromUnified.components.map((comp) => ({
      ...comp,
      types: comp.types || DEFAULT_COMPONENT_TYPES[comp.id],
    })),
  };
}

function readExistingBaseDocument(cwd: string): UnifiedTokensDocument {
  const ssotPath = path.join(cwd, TOKENS_SSOT_REL_PATH);
  if (fs.existsSync(ssotPath)) {
    try {
      const raw = fs.readFileSync(ssotPath, 'utf-8');
      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw);
        if (isUnifiedTokensDocument(parsed)) {
          return parsed;
        }
      }
    } catch {
      // ignore invalid JSON and use package default
    }
  }
  return UNIFIED_TOKENS_DOCUMENT;
}

/**
 * Loads the project's single SSOT `tokens/tokens.json` (falling back safely to legacy
 * `tokens/studio.registry.json` or baseline defaults if absent) and discovers any
 * `*.atom.json` or unmanaged `*.tsx` files in `components/ui/`.
 */
export function loadProjectRegistry(cwd: string): {
  registry: StudioRegistry;
  discoveredFiles: string[];
  existsOnDisk: boolean;
} {
  const ssotPath = path.join(cwd, TOKENS_SSOT_REL_PATH);
  const legacyPath = path.join(cwd, LEGACY_REGISTRY_REL_PATH);
  let existsOnDisk = false;
  let registry = buildBaselineRegistry(cwd);

  if (fs.existsSync(ssotPath)) {
    try {
      const raw = fs.readFileSync(ssotPath, 'utf-8');
      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw);
        if (isUnifiedTokensDocument(parsed)) {
          existsOnDisk = true;
          registry = AtomTokenSystem.fromDocument(parsed).toRegistry();
        }
      }
    } catch {
      // Fallback safely if unified tokens.json is temporarily malformed
    }
  }

  if (!existsOnDisk && fs.existsSync(legacyPath)) {
    try {
      const raw = fs.readFileSync(legacyPath, 'utf-8');
      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw) as Partial<StudioRegistry>;
        existsOnDisk = true;
        registry = {
          $schema:
            parsed.$schema ||
            'https://system.atomground.com/schemas/studio-registry.schema.json',
          version: parsed.version || readProjectVersion(cwd),
          updatedAt: parsed.updatedAt || new Date().toISOString(),
          activeThemeId: parsed.activeThemeId || 'ocean-blue',
          statusTokens:
            Array.isArray(parsed.statusTokens) && parsed.statusTokens.length > 0
              ? (parsed.statusTokens as SemanticStatusToken[])
              : INITIAL_SEMANTIC_STATUS_TOKENS,
          paletteVariables:
            Array.isArray(parsed.paletteVariables) && parsed.paletteVariables.length > 0
              ? (parsed.paletteVariables as PaletteVariable[])
              : INITIAL_PALETTE_VARIABLES,
          components:
            Array.isArray(parsed.components) && parsed.components.length > 0
              ? (parsed.components as StudioComponentDefinition[])
              : buildBaselineRegistry(cwd).components,
        };
      }
    } catch {
      // Fallback safely to baseline if legacy JSON is malformed
    }
  }

  const uiDir = path.join(cwd, 'components', 'ui');
  const discoveredFiles: string[] = [];

  if (fs.existsSync(uiDir)) {
    const entries = fs.readdirSync(uiDir, { withFileTypes: true });

    // 1. Merge any declarative *.atom.json component specs in components/ui/
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.atom.json')) continue;
      const specPath = path.join(uiDir, entry.name);
      try {
        const rawSpec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
        const validation = validateSubmissionSpec(rawSpec);
        if (validation.valid) {
          const pascal = toPascalCase(validation.spec.id);
          const def = specToStudioDefinition(validation.spec, `components/ui/${pascal}.tsx`);
          const idx = registry.components.findIndex((c) => c.id === def.id);
          if (idx >= 0) {
            registry.components[idx] = { ...registry.components[idx], ...def };
          } else {
            registry.components.push(def);
          }
          discoveredFiles.push(`components/ui/${entry.name}`);
        }
      } catch {
        // Skip invalid *.atom.json gracefully
      }
    }

    // 2. Scan *.tsx files and ensure every UI component is represented in the registry
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.tsx')) continue;
      const base = entry.name.replace(/\.tsx$/i, '');
      if (base.toLowerCase() === 'index') continue;

      const rawId = toKebabCase(base);
      const resolvedId = resolveStudioComponentId(rawId);
      const relSource = `components/ui/${entry.name}`;
      discoveredFiles.push(relSource);

      const existingIdx = registry.components.findIndex(
        (c) => c.id === resolvedId || c.id === rawId
      );
      if (existingIdx >= 0) {
        if (!registry.components[existingIdx].sourceFile) {
          registry.components[existingIdx].sourceFile = relSource;
        }
        continue;
      }

      registry.components.push({
        id: resolvedId,
        name: `${base} (${resolvedId})`,
        category: 'Form',
        description: `components/ui/${entry.name}에서 자동 감지된 컴포넌트`,
        types: DEFAULT_COMPONENT_TYPES[resolvedId] || [
          {
            id: 'standard',
            name: 'Standard (표준형)',
            description: '시스템 토큰에 바인딩된 기본 외형',
            whenToUse: '일반적인 UI 배치 및 기본 인터랙션에 사용합니다.',
          },
        ],
        supportedStatuses: ['default', 'hover', 'active', 'focus', 'disabled'],
        properties: [
          { key: 'background', label: '배경 색상 (Background)', category: 'color', defaultPaletteId: '--atom-palette-white' },
          { key: 'textColor', label: '텍스트 색상 (Text Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-900' },
          { key: 'borderColor', label: '테두리 색상 (Border Color)', category: 'color', defaultPaletteId: '--atom-palette-gray-200' },
          { key: 'borderRadius', label: '모서리 곡률 (Border Radius)', category: 'radius', defaultPaletteId: '--atom-radius-md' },
          { key: 'padding', label: '내부 패딩 (Padding)', category: 'spacing', defaultPaletteId: '--atom-space-4' },
        ],
        variables: [
          {
            id: 'default',
            name: '기본 (Default)',
            description: `${base} 기본 시맨틱 스타일`,
            tokenBindings: {
              background: '--atom-palette-white',
              textColor: '--atom-palette-gray-900',
              borderColor: '--atom-palette-gray-200',
              borderRadius: '--atom-radius-md',
              padding: '--atom-space-4',
            },
          },
        ],
        sourceFile: relSource,
        autoDiscovered: true,
      });
    }
  }

  return { registry, discoveredFiles, existsOnDisk };
}

function stripDelimitedCustomStyles(cssText: string): string {
  const startIdx = cssText.indexOf(STUDIO_CUSTOM_STYLES_START);
  if (startIdx === -1) return cssText;
  const endIdx = cssText.indexOf(STUDIO_CUSTOM_STYLES_END, startIdx);
  if (endIdx === -1) {
    return cssText.slice(0, startIdx).trimEnd();
  }
  const before = cssText.slice(0, startIdx).trimEnd();
  const after = cssText.slice(endIdx + STUDIO_CUSTOM_STYLES_END.length).trimStart();
  return after ? `${before}\n\n${after}` : before;
}

/**
 * Persists the unified SSOT document (`tokens/tokens.json`) covering `palette`, `theme`,
 * and `components`, and compiles `css/atom-ui.css` while preserving `Universal Component Classes`
 * and keeping registered component styles idempotent.
 */
export function saveProjectRegistry(
  cwd: string,
  registry: StudioRegistry,
  options?: { tokensJson?: string; cssString?: string }
): { filesWritten: string[]; registry: StudioRegistry } {
  const baseDocument = readExistingBaseDocument(cwd);
  const resolvedBrand = registry.brand || baseDocument.brand;
  const normalizedRegistry: StudioRegistry = {
    $schema:
      registry.$schema || 'https://system.atomground.com/schemas/studio-registry.schema.json',
    version: registry.version || readProjectVersion(cwd),
    updatedAt: new Date().toISOString(),
    activeThemeId: registry.activeThemeId || 'ocean-blue',
    ...(resolvedBrand ? { brand: resolvedBrand } : {}),
    statusTokens:
      registry.statusTokens && registry.statusTokens.length > 0
        ? registry.statusTokens
        : INITIAL_SEMANTIC_STATUS_TOKENS,
    paletteVariables:
      registry.paletteVariables && registry.paletteVariables.length > 0
        ? registry.paletteVariables
        : INITIAL_PALETTE_VARIABLES,
    components: registry.components || [],
    ...(registry.themes && registry.themes.length > 0 ? { themes: registry.themes } : {}),
  };

  const filesWritten: string[] = [];
  const tokensDir = path.join(cwd, 'tokens');
  if (!fs.existsSync(tokensDir)) {
    fs.mkdirSync(tokensDir, { recursive: true });
  }

  // 1. Write unified SSOT tokens/tokens.json (palette -> theme -> components)
  const formattedTokensJson =
    options?.tokensJson && options.tokensJson.trim()
      ? options.tokensJson
      : exportStudioToTokensJson(
          normalizedRegistry.paletteVariables,
          normalizedRegistry.components,
          normalizedRegistry.statusTokens,
          {
            activeThemeId: normalizedRegistry.activeThemeId,
            themes: normalizedRegistry.themes,
            brand: normalizedRegistry.brand,
            baseDocument,
            version: normalizedRegistry.version,
          }
        );

  const tokensJsonPath = path.join(cwd, TOKENS_SSOT_REL_PATH);
  fs.writeFileSync(tokensJsonPath, formattedTokensJson, 'utf-8');
  filesWritten.push('tokens/tokens.json');

  // 2. Compile css/atom-ui.css safely preserving Universal Component Classes
  const cssDir = path.join(cwd, 'css');
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  const cssPath = path.join(cssDir, 'atom-ui.css');

  let generatedBase: string;
  try {
    generatedBase = compileTokensToCss(JSON.parse(formattedTokensJson));
  } catch {
    generatedBase =
      options?.cssString && typeof options.cssString === 'string'
        ? options.cssString
        : exportStudioToCSS(
            normalizedRegistry.paletteVariables,
            normalizedRegistry.components,
            normalizedRegistry.statusTokens,
            baseDocument.palette
          );
  }

  const customStylesBlock = exportStudioCustomComponentStyles(normalizedRegistry.components);
  const baseWithoutCustom = stripDelimitedCustomStyles(generatedBase).trimEnd();

  let fullCss = baseWithoutCustom;
  if (fs.existsSync(cssPath) && !baseWithoutCustom.includes(UNIVERSAL_MARKER)) {
    const existingCss = fs.readFileSync(cssPath, 'utf-8');
    const splitIdx = existingCss.indexOf(UNIVERSAL_MARKER);
    if (splitIdx !== -1) {
      const preservedUniversal = stripDelimitedCustomStyles(existingCss.slice(splitIdx)).trimEnd();
      fullCss = `${baseWithoutCustom}\n\n${preservedUniversal}`;
    }
  }

  if (customStylesBlock) {
    fullCss = `${fullCss.trimEnd()}\n\n${customStylesBlock}\n`;
  } else {
    fullCss = `${fullCss.trimEnd()}\n`;
  }

  fs.writeFileSync(cssPath, fullCss, 'utf-8');
  filesWritten.push('css/atom-ui.css');

  return { filesWritten, registry: normalizedRegistry };
}

/**
 * Validates and submits a standardized AI Component Specification:
 * 1) Validates schema [Type · Variable · Status]
 * 2) Scaffolds `components/ui/<PascalName>.tsx`
 * 3) Exports in `components/ui/index.ts`
 * 4) Updates SSOT `tokens/tokens.json` & recompiles `css/atom-ui.css`.
 */
export function submitComponentSpec(
  cwd: string,
  rawSpec: unknown
): {
  success: boolean;
  errors?: string[];
  component?: StudioComponentDefinition;
  registry?: StudioRegistry;
  filesWritten?: string[];
} {
  const validation = validateSubmissionSpec(rawSpec);
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  const spec = validation.spec;
  const pascalName = toPascalCase(spec.id);
  const uiDir = path.join(cwd, 'components', 'ui');
  if (!fs.existsSync(uiDir)) {
    fs.mkdirSync(uiDir, { recursive: true });
  }

  const filesWritten: string[] = [];
  const componentRelPath = `components/ui/${pascalName}.tsx`;
  const componentAbsPath = path.join(uiDir, `${pascalName}.tsx`);

  // 1. Write React component TSX if new or explicit overwrite requested
  if (!fs.existsSync(componentAbsPath) || spec.componentCode || spec.overwriteCode) {
    const tsxCode = spec.componentCode ? `${spec.componentCode.trimEnd()}\n` : generateComponentTsx(spec);
    fs.writeFileSync(componentAbsPath, tsxCode, 'utf-8');
    filesWritten.push(componentRelPath);
  }

  // 2. Ensure barrel export in components/ui/index.ts
  if (ensureUiBarrelExport(uiDir, pascalName)) {
    filesWritten.push('components/ui/index.ts');
  }

  // 3. Upsert into Project SSOT Registry and recompile artifacts
  const { registry } = loadProjectRegistry(cwd);
  const newDef = specToStudioDefinition(spec, componentRelPath);

  const existingIdx = registry.components.findIndex((c) => c.id === newDef.id);
  if (existingIdx >= 0) {
    registry.components[existingIdx] = newDef;
  } else {
    registry.components.push(newDef);
  }

  const saveResult = saveProjectRegistry(cwd, registry);
  return {
    success: true,
    component: newDef,
    registry: saveResult.registry,
    filesWritten: [...filesWritten, ...saveResult.filesWritten],
  };
}
