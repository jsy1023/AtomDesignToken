import fs from 'fs';
import path from 'path';
import type { AtomComponentSubmissionSpec, StudioRegistry } from '../lib/data/studioData';
import { INITIAL_STUDIO_THEMES, type StudioTheme } from '../lib/data/themeData';
import {
  loadProjectRegistry,
  saveProjectRegistry,
  submitComponentSpec,
} from '../lib/services/studioRegistryServer';
import { toKebabCase } from '../lib/services/componentScaffold';

export interface ExtractedColorStat {
  value: string;
  count: number;
  sources: string[];
}

export interface DetectedComponentCandidate {
  id: string;
  name: string;
  category: 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data';
  sourceKind: 'existing-component' | 'raw-html-pattern';
  occurrences: number;
  files: string[];
  detectedVariants: string[];
  detectedStatuses: string[];
  spec: AtomComponentSubmissionSpec;
}

export interface ProjectAnalysisReport {
  projectRoot: string;
  scannedFiles: number;
  suggestedBrandColor: string;
  extractedColors: ExtractedColorStat[];
  extractedRadii: Array<{ value: string; count: number }>;
  candidates: DetectedComponentCandidate[];
  analyzedAt: string;
}

const IGNORE_DIRS = new Set([
  'node_modules',
  '.next',
  'dist',
  '.git',
  'build',
  'out',
  '.turbo',
  'coverage',
  'playwright-report',
  'test-results',
]);

const SOURCE_EXTENSIONS = new Set(['.tsx', '.jsx', '.ts', '.js', '.css', '.scss']);

const TAILWIND_COLOR_HEX: Record<string, string> = {
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'indigo-500': '#6366f1',
  'indigo-600': '#4f46e5',
  'emerald-500': '#10b981',
  'emerald-600': '#059669',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'amber-500': '#f59e0b',
  'violet-600': '#7c3aed',
  'rose-500': '#f43f5e',
  'teal-600': '#0d9488',
  'sky-500': '#0ea5e9',
  'orange-500': '#f97316',
};

const NEUTRAL_HEX = new Set([
  '#ffffff',
  '#fff',
  '#000000',
  '#000',
  '#f9f9fb',
  '#f8fafc',
  '#f1f5f9',
  '#e2e8f0',
  '#111111',
  '#0a0a0a',
  '#666666',
]);

function collectSourceFiles(rootDir: string): string[] {
  const results: string[] = [];
  const candidateRoots = ['src', 'app', 'components', 'pages', 'styles']
    .map((d) => path.join(rootDir, d))
    .filter((d) => fs.existsSync(d) && fs.statSync(d).isDirectory());

  const scanTargets = candidateRoots.length > 0 ? candidateRoots : [rootDir];

  function walk(dir: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        const rel = path.relative(rootDir, fullPath).split(path.sep).join('/');
        if (rel === 'css/atom-ui.css' || rel === 'tokens/tokens.json') continue;
        results.push(fullPath);
      }
    }
  }

  for (const target of scanTargets) {
    walk(target);
  }
  return results;
}

function inferCategory(id: string): 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data' {
  if (/button|input|select|textarea|checkbox|radio|switch|slider|form/.test(id)) return 'Form';
  if (/alert|toast|modal|dialog|badge|progress|skeleton|spinner/.test(id)) return 'Feedback';
  if (/nav|tab|breadcrumb|menu|sidebar|header|pagination/.test(id)) return 'Navigation';
  if (/table|chart|list|tree|calendar|metric|stat|data/.test(id)) return 'Data';
  return 'Layout';
}

function normalizeHex(hex: string): string {
  const lower = hex.toLowerCase();
  if (lower.length === 4) {
    return `#${lower[1]}${lower[1]}${lower[2]}${lower[2]}${lower[3]}${lower[3]}`;
  }
  return lower;
}

function buildStandardSpec(
  id: string,
  displayName: string,
  category: 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data',
  description: string,
  detectedVariants: string[],
  detectedStatuses: string[]
): AtomComponentSubmissionSpec {
  const types = (detectedVariants.length > 0 ? detectedVariants : ['solid', 'outline']).map((v) => ({
    id: toKebabCase(v) || 'solid',
    name: `${v.charAt(0).toUpperCase() + v.slice(1)} Type`,
    description: `기존 코드에서 감지된 ${v} 외형 스타일`,
    whenToUse: `${displayName}의 ${v} 변형에 사용합니다.`,
  }));

  const statuses: Array<'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading'> = [
    'default',
    'hover',
    'active',
    'focus',
    'disabled',
  ];
  if (detectedStatuses.includes('loading') && !statuses.includes('loading')) {
    statuses.push('loading');
  }

  return {
    id,
    name: displayName,
    category,
    description,
    types,
    supportedStatuses: statuses,
    variables: [
      {
        id: 'primary',
        name: 'Primary (브랜드 강조)',
        description: '추출된 프로젝트 브랜드 토큰 바인딩',
        tokenBindings: {
          background: '--atom-color-primary',
          textColor: '--atom-palette-white',
          borderColor: '--atom-color-primary',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
      {
        id: 'secondary',
        name: 'Secondary (보조/중립)',
        description: '보조 서피스 및 테두리 시맨틱 바인딩',
        tokenBindings: {
          background: '--atom-bg-secondary',
          textColor: '--atom-text-primary',
          borderColor: '--atom-border-subtle',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        },
      },
    ],
  };
}

/**
 * Scans an existing project's source code to extract color/radius tokens,
 * raw HTML UI patterns, and existing custom components into AtomSystem drafts.
 */
export function analyzeProject(cwd: string): ProjectAnalysisReport {
  const files = collectSourceFiles(cwd);
  const colorMap = new Map<string, { count: number; sources: Set<string> }>();
  const radiusMap = new Map<string, number>();

  const rawPatternDefs: Array<{
    id: string;
    name: string;
    category: 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data';
    regex: RegExp;
    description: string;
  }> = [
    {
      id: 'button',
      name: 'Button (기존 버튼 패턴)',
      category: 'Form',
      regex: /<button\b([^>]*)>/gi,
      description: '기존 프로젝트의 원시 <button> 태그에서 추출된 버튼 컴포넌트 후보',
    },
    {
      id: 'input',
      name: 'Input (기존 입력 필드 패턴)',
      category: 'Form',
      regex: /<input\b(?![^>]*type=['"](?:checkbox|radio|hidden)['"])([^>]*)>/gi,
      description: '기존 프로젝트의 원시 <input> 태그에서 추출된 입력 컴포넌트 후보',
    },
    {
      id: 'select',
      name: 'Select (기존 선택 박스 패턴)',
      category: 'Form',
      regex: /<select\b([^>]*)>/gi,
      description: '기존 프로젝트의 원시 <select> 태그에서 추출된 셀렉트 컴포넌트 후보',
    },
    {
      id: 'textarea',
      name: 'Textarea (기존 멀티라인 입력 패턴)',
      category: 'Form',
      regex: /<textarea\b([^>]*)>/gi,
      description: '기존 프로젝트의 원시 <textarea> 태그에서 추출된 텍스트영역 컴포넌트 후보',
    },
    {
      id: 'table',
      name: 'Table (기존 테이블 패턴)',
      category: 'Data',
      regex: /<table\b([^>]*)>/gi,
      description: '기존 프로젝트의 원시 <table> 태그에서 추출된 데이터 테이블 컴포넌트 후보',
    },
  ];

  const patternStats = new Map<
    string,
    { count: number; files: Set<string>; variants: Set<string>; statuses: Set<string> }
  >();
  for (const def of rawPatternDefs) {
    patternStats.set(def.id, {
      count: 0,
      files: new Set(),
      variants: new Set(),
      statuses: new Set(),
    });
  }

  const candidates: DetectedComponentCandidate[] = [];
  const seenCandidateIds = new Set<string>();

  for (const absFile of files) {
    const relFile = path.relative(cwd, absFile).split(path.sep).join('/');
    let content = '';
    try {
      content = fs.readFileSync(absFile, 'utf-8');
    } catch {
      continue;
    }

    // 1. Extract HEX colors
    const hexMatches = content.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    for (const rawHex of hexMatches) {
      if (rawHex.length !== 4 && rawHex.length !== 7) continue;
      const norm = normalizeHex(rawHex);
      const entry = colorMap.get(norm) || { count: 0, sources: new Set<string>() };
      entry.count += 1;
      entry.sources.add(relFile);
      colorMap.set(norm, entry);
    }

    // 2. Extract Tailwind named colors (e.g. bg-blue-600, text-indigo-500)
    const twColorMatches = content.match(/\b(?:bg|text|border)-([a-z]+-\d{3})\b/g) || [];
    for (const cls of twColorMatches) {
      const key = cls.replace(/^(?:bg|text|border)-/, '');
      const hex = TAILWIND_COLOR_HEX[key];
      if (!hex) continue;
      const entry = colorMap.get(hex) || { count: 0, sources: new Set<string>() };
      entry.count += 1;
      entry.sources.add(relFile);
      colorMap.set(hex, entry);
    }

    // 3. Extract radius utilities
    const radiusMatches = content.match(/\brounded(?:-(?:none|sm|md|lg|xl|2xl|full|\[[^\]]+\]))?\b/g) || [];
    for (const r of radiusMatches) {
      radiusMap.set(r, (radiusMap.get(r) || 0) + 1);
    }

    // 4. Detect existing TSX components outside components/ui/
    if (
      (relFile.startsWith('components/') || relFile.includes('/components/')) &&
      !relFile.includes('components/ui/') &&
      (relFile.endsWith('.tsx') || relFile.endsWith('.jsx'))
    ) {
      const base = path.basename(relFile, path.extname(relFile));
      const kebab = toKebabCase(base);
      if (kebab && /^[a-z][a-z0-9-]{0,62}$/.test(kebab) && !seenCandidateIds.has(kebab)) {
        seenCandidateIds.add(kebab);
        const category = inferCategory(kebab);
        const variants = new Set<string>();
        const variantMatch = content.match(/variant\??:\s*([^;\n]+)/);
        if (variantMatch) {
          const literals = variantMatch[1].match(/['"]([a-zA-Z0-9-]+)['"]/g) || [];
          literals.forEach((l) => variants.add(l.replace(/['"]/g, '')));
        }
        const statuses = new Set<string>();
        if (content.includes('hover:')) statuses.add('hover');
        if (content.includes('disabled')) statuses.add('disabled');
        if (content.includes('loading')) statuses.add('loading');

        const variantList = Array.from(variants);
        const statusList = Array.from(statuses);
        candidates.push({
          id: kebab,
          name: `${base} (기존 컴포넌트)`,
          category,
          sourceKind: 'existing-component',
          occurrences: 1,
          files: [relFile],
          detectedVariants: variantList,
          detectedStatuses: statusList,
          spec: buildStandardSpec(
            kebab,
            `${base} (${kebab})`,
            category,
            `${relFile}에서 분석된 기존 프로젝트 컴포넌트`,
            variantList,
            statusList
          ),
        });
      }
    }

    // 5. Detect raw HTML UI patterns
    for (const def of rawPatternDefs) {
      def.regex.lastIndex = 0;
      let match: RegExpExecArray | null;
      const stats = patternStats.get(def.id)!;
      while ((match = def.regex.exec(content)) !== null) {
        stats.count += 1;
        stats.files.add(relFile);
        const attrs = match[1] || '';
        if (/\bbg-/.test(attrs) && !/\bbg-transparent\b/.test(attrs)) stats.variants.add('solid');
        if (/\bborder\b/.test(attrs)) stats.variants.add('outline');
        if (/\bbg-transparent\b/.test(attrs)) stats.variants.add('ghost');
        if (/\bhover:/.test(attrs)) stats.statuses.add('hover');
        if (/\bdisabled\b/.test(attrs)) stats.statuses.add('disabled');
      }
    }
  }

  for (const def of rawPatternDefs) {
    const stats = patternStats.get(def.id)!;
    if (stats.count > 0 && !seenCandidateIds.has(def.id)) {
      seenCandidateIds.add(def.id);
      const variantList = Array.from(stats.variants);
      const statusList = Array.from(stats.statuses);
      candidates.push({
        id: def.id,
        name: def.name,
        category: def.category,
        sourceKind: 'raw-html-pattern',
        occurrences: stats.count,
        files: Array.from(stats.files).slice(0, 10),
        detectedVariants: variantList,
        detectedStatuses: statusList,
        spec: buildStandardSpec(
          def.id,
          def.name,
          def.category,
          def.description,
          variantList,
          statusList
        ),
      });
    }
  }

  const extractedColors: ExtractedColorStat[] = Array.from(colorMap.entries())
    .map(([value, info]) => ({
      value,
      count: info.count,
      sources: Array.from(info.sources).slice(0, 5),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  const brandCandidate = extractedColors.find((c) => !NEUTRAL_HEX.has(c.value));
  const suggestedBrandColor = brandCandidate ? brandCandidate.value : '#3182f6';

  const extractedRadii = Array.from(radiusMap.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    projectRoot: cwd,
    scannedFiles: files.length,
    suggestedBrandColor,
    extractedColors,
    extractedRadii,
    candidates,
    analyzedAt: new Date().toISOString(),
  };
}

export interface ImportProjectOptions {
  themeName?: string;
  brandColor?: string;
  specs?: AtomComponentSubmissionSpec[];
}

/**
 * Applies selected analyzed theme tokens and component specs into the project's
 * SSOT (`tokens/tokens.json`, `css/atom-ui.css`, `components/ui/*.tsx`).
 */
export function importAnalyzedProject(
  cwd: string,
  options: ImportProjectOptions
): {
  success: boolean;
  importedComponents: string[];
  errors: string[];
  filesWritten: string[];
  registry: StudioRegistry;
} {
  const importedComponents: string[] = [];
  const errors: string[] = [];
  const filesWritten = new Set<string>();

  // 1. Register selected component specs
  for (const spec of options.specs || []) {
    const res = submitComponentSpec(cwd, spec);
    if (res.success && res.component) {
      importedComponents.push(res.component.id);
      (res.filesWritten || []).forEach((f) => filesWritten.add(f));
    } else {
      errors.push(...(res.errors || [`Failed to import ${spec?.id || 'component'}`]));
    }
  }

  // 2. Optionally create & activate an imported brand theme
  const loaded = loadProjectRegistry(cwd);
  let registry = loaded.registry;

  if (options.brandColor && /^#[0-9a-fA-F]{3,8}$/.test(options.brandColor.trim())) {
    const brandHex = normalizeHex(options.brandColor.trim());
    const themeId = 'imported-project-theme';
    const existingThemes: StudioTheme[] = registry.themes ? [...registry.themes] : [];

    // Update or insert custom primary palette token
    const paletteVars = [...registry.paletteVariables];
    const primaryIdx = paletteVars.findIndex((p) => p.id === '--atom-palette-blue-500');
    if (primaryIdx >= 0) {
      paletteVars[primaryIdx] = { ...paletteVars[primaryIdx], value: brandHex };
    }

    const statusTokens = registry.statusTokens.map((st) =>
      st.id === '--atom-color-primary' ? { ...st, defaultValue: brandHex } : st
    );

    const baseTheme = INITIAL_STUDIO_THEMES[0];
    const newTheme: StudioTheme = {
      ...baseTheme,
      id: themeId,
      name: options.themeName?.trim() || 'Imported Project Theme',
      category: 'custom',
      mode: 'light',
      description: '기존 프로젝트 코드 분석을 통해 자동 추출된 브랜드 테마',
      brandColor: brandHex,
      paletteBindings: {
        ...baseTheme.paletteBindings,
        primary: '--atom-palette-blue-500',
      },
      colors: {
        ...baseTheme.colors,
        primary: brandHex,
        primaryHover: brandHex,
      },
    };

    const idx = existingThemes.findIndex((t) => t.id === themeId);
    if (idx >= 0) {
      existingThemes[idx] = newTheme;
    } else {
      existingThemes.unshift(newTheme);
    }

    registry = {
      ...registry,
      activeThemeId: themeId,
      paletteVariables: paletteVars,
      statusTokens,
      themes: existingThemes,
    };

    const saved = saveProjectRegistry(cwd, registry);
    saved.filesWritten.forEach((f) => filesWritten.add(f));
    registry = saved.registry;
  }

  return {
    success: errors.length === 0,
    importedComponents,
    errors,
    filesWritten: Array.from(filesWritten),
    registry,
  };
}
