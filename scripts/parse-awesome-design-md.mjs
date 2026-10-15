import fs from 'fs';
import path from 'path';

const DESIGN_MD_DIR = path.resolve('public', 'design-md');
const OUTPUT_FILE = path.resolve('lib', 'data', 'awesomeThemes.ts');

function parseYamlFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const yamlText = match[1];
  const result = {};

  const lines = yamlText.split(/\r?\n/);
  let currentSection = null;
  let currentSubSection = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) continue;

    // Check indentation
    const indent = rawLine.search(/\S/);
    const line = rawLine.trim();

    if (indent === 0) {
      currentSection = null;
      currentSubSection = null;

      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let val = line.slice(colonIdx + 1).trim();

        if (val === '') {
          currentSection = key;
          result[key] = {};
        } else {
          // simple key-value
          val = val.replace(/^["']|["']$/g, '');
          result[key] = val;
        }
      }
    } else if (indent === 2 && currentSection) {
      currentSubSection = null;
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let val = line.slice(colonIdx + 1).trim();

        if (val === '') {
          currentSubSection = key;
          result[currentSection][key] = {};
        } else {
          val = val.replace(/^["']|["']$/g, '');
          result[currentSection][key] = val;
        }
      }
    } else if (indent >= 4 && currentSection && currentSubSection) {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let val = line.slice(colonIdx + 1).trim();
        val = val.replace(/^["']|["']$/g, '');
        result[currentSection][currentSubSection][key] = val;
      }
    }
  }

  return result;
}

function parsePx(val, fallback) {
  if (!val) return fallback;
  const num = parseInt(val.toString().replace(/[^0-9]/g, ''), 10);
  return isNaN(num) || num <= 0 ? fallback : num;
}

function parseNum(val, fallback) {
  if (!val) return fallback;
  const num = parseFloat(val);
  return isNaN(num) ? fallback : num;
}

function classifyCategory(id) {
  const ai = ['claude', 'cohere', 'elevenlabs', 'minimax', 'mistral.ai', 'ollama', 'opencode.ai', 'replicate', 'runwayml', 'together.ai', 'voltagent', 'x.ai'];
  const dev = ['cursor', 'expo', 'lovable', 'raycast', 'superhuman', 'vercel', 'warp', 'linear.app', 'figma', 'framer', 'mintlify', 'sanity', 'sentry', 'webflow'];
  const fintech = ['binance', 'coinbase', 'kraken', 'mastercard', 'mercury', 'revolut', 'stripe', 'wise', '1win', 'nerdwallet'];
  const auto = ['bmw', 'bmw-m', 'bugatti', 'ferrari', 'lamborghini', 'renault', 'tesla', 'spacex', 'dji'];
  const tech = ['apple', 'meta', 'nvidia', 'oracle', 'ibm', 'hashicorp', 'mongodb', 'clickhouse', 'composio', 'slack', 'spotify', 'uber', 'sap', 'shopify', 'airbnb', 'airtable', 'notion', 'cal', 'clay', 'intercom', 'jobright', 'mydealz', 'pinterest', 'playstation', 'nintendo-2001', 'posthog', 'resend', 'theverge', 'vodafone', 'wired', 'zapier', 'starbucks', 'nike', 'oura'];

  if (ai.includes(id)) return 'AI & LLM';
  if (dev.includes(id)) return 'Developer Tools';
  if (fintech.includes(id)) return 'Fintech & Web3';
  if (auto.includes(id)) return 'Automotive & Luxury';
  return 'Tech & Lifestyle';
}

function formatBrandName(id, rawName) {
  if (rawName && typeof rawName === 'string' && rawName.length > 2) {
    const clean = rawName.replace(/[-_]design[-_]analysis/i, '').replace(/[-_]Inspired/i, '').trim();
    if (clean) return clean;
  }
  return id
    .split(/[-.]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

function main() {
  if (!fs.existsSync(DESIGN_MD_DIR)) {
    console.error('Directory does not exist:', DESIGN_MD_DIR);
    return;
  }

  const entries = fs.readdirSync(DESIGN_MD_DIR, { withFileTypes: true });
  const themes = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const folder = entry.name;
    const mdPath = path.join(DESIGN_MD_DIR, folder, 'DESIGN.md');

    if (!fs.existsSync(mdPath)) continue;

    const content = fs.readFileSync(mdPath, 'utf-8');
    const parsed = parseYamlFrontmatter(content);
    if (!parsed) continue;

    const colors = parsed.colors || {};
    const typo = parsed.typography || {};
    const radii = parsed.radii || {};

    const primary = colors.primary || colors['brand-primary'] || colors['accent'] || '#3182f6';
    const primaryHover = colors['primary-hover'] || colors['primary-focus'] || colors['primary-deep'] || primary;
    const primaryLight = colors['primary-soft'] || colors['primary-subtle'] || colors['surface-1'] || '#e8f3ff';
    const bgPrimary = colors.canvas || colors.background || colors['surface-base'] || '#ffffff';
    const bgSecondary = colors['surface-1'] || colors['surface-2'] || colors['canvas-soft'] || '#f8f9fa';
    const textPrimary = colors.ink || colors.body || colors['text-primary'] || '#191f28';
    const textSecondary = colors['ink-muted'] || colors['ink-secondary'] || colors['body-muted'] || '#8b95a1';
    const textMuted = colors['ink-subtle'] || colors['ink-mute-2'] || colors['ink-tertiary'] || '#b0b8c1';
    const borderSubtle = colors.hairline || colors['divider-soft'] || colors['border-subtle'] || '#f2f4f6';
    const borderStrong = colors['hairline-strong'] || colors['hairline-input'] || colors['border-strong'] || '#e5e8eb';
    const statusSuccess = colors['semantic-success'] || colors['success'] || '#10b981';
    const statusDanger = colors['semantic-danger'] || colors.ruby || colors['danger'] || '#f43f5e';
    const statusWarning = colors['semantic-warning'] || colors.lemon || colors['warning'] || '#f59e0b';

    // Typography finding helpers
    const typoEntries = Object.entries(typo);
    const getTypoItem = (names) => {
      for (const name of names) {
        if (typo[name]) return typo[name];
      }
      return null;
    };

    const h1Item = getTypoItem(['display-xl', 'hero-display', 'display-xxl', 'display-lg', 'display-1', 'title-1', 'headline-1']);
    const h2Item = getTypoItem(['display-lg', 'display-md', 'heading-xl', 'display-2', 'title-2', 'headline-2']);
    const h3Item = getTypoItem(['display-md', 'headline', 'heading-lg', 'display-3', 'card-title']);
    const h4Item = getTypoItem(['card-title', 'subhead', 'heading-md', 'lead']);
    const h5Item = getTypoItem(['subhead', 'lead', 'heading-sm', 'eyebrow']);
    const h6Item = getTypoItem(['button', 'eyebrow', 'caption-lg', 'label']);
    const bodyItem = getTypoItem(['body', 'body-lg', 'text-base', 'body-1']);
    const smItem = getTypoItem(['body-sm', 'caption', 'text-sm', 'body-2']);
    const xsItem = getTypoItem(['caption', 'micro', 'text-xs', 'fine-print']);

    const fontFamily =
      (h1Item && h1Item.fontFamily) ||
      (bodyItem && bodyItem.fontFamily) ||
      '"Pretendard Variable", Pretendard, system-ui, sans-serif';

    const borderRadius = radii.md || radii.default || radii.sm || '12px';

    const cleanDesc = (parsed.description || '')
      .replace(/\r?\n/g, ' ')
      .replace(/"/g, '\\"')
      .slice(0, 240);

    themes.push({
      id: folder,
      name: formatBrandName(folder, parsed.name),
      category: classifyCategory(folder),
      description: cleanDesc,
      designMdPath: `/design-md/${folder}/DESIGN.md`,
      color: {
        primary,
        primaryHover,
        primaryLight,
        bgPrimary,
        bgSecondary,
        textPrimary,
        textSecondary,
        textMuted,
        borderSubtle,
        borderStrong,
        statusSuccess,
        statusDanger,
        statusWarning,
      },
      typography: {
        fontFamily,
        h1: {
          fontSize: parsePx(h1Item?.fontSize, 36),
          lineHeight: parseNum(h1Item?.lineHeight, 1.2),
          fontWeight: parsePx(h1Item?.fontWeight, 700),
          letterSpacing: h1Item?.letterSpacing || '-0.02em',
        },
        h2: {
          fontSize: parsePx(h2Item?.fontSize, 28),
          lineHeight: parseNum(h2Item?.lineHeight, 1.25),
          fontWeight: parsePx(h2Item?.fontWeight, 700),
          letterSpacing: h2Item?.letterSpacing || '-0.015em',
        },
        h3: {
          fontSize: parsePx(h3Item?.fontSize, 22),
          lineHeight: parseNum(h3Item?.lineHeight, 1.3),
          fontWeight: parsePx(h3Item?.fontWeight, 600),
          letterSpacing: h3Item?.letterSpacing || '-0.01em',
        },
        h4: {
          fontSize: parsePx(h4Item?.fontSize, 18),
          lineHeight: parseNum(h4Item?.lineHeight, 1.35),
          fontWeight: parsePx(h4Item?.fontWeight, 600),
          letterSpacing: h4Item?.letterSpacing || '-0.005em',
        },
        h5: {
          fontSize: parsePx(h5Item?.fontSize, 16),
          lineHeight: parseNum(h5Item?.lineHeight, 1.4),
          fontWeight: parsePx(h5Item?.fontWeight, 600),
          letterSpacing: h5Item?.letterSpacing || '0em',
        },
        h6: {
          fontSize: parsePx(h6Item?.fontSize, 14),
          lineHeight: parseNum(h6Item?.lineHeight, 1.45),
          fontWeight: parsePx(h6Item?.fontWeight, 600),
          letterSpacing: h6Item?.letterSpacing || '0em',
        },
        body: {
          fontSize: parsePx(bodyItem?.fontSize, 15),
          lineHeight: parseNum(bodyItem?.lineHeight, 1.55),
          fontWeight: parsePx(bodyItem?.fontWeight, 400),
          letterSpacing: bodyItem?.letterSpacing || '-0.005em',
        },
        sm: {
          fontSize: parsePx(smItem?.fontSize, 13),
          lineHeight: parseNum(smItem?.lineHeight, 1.5),
          fontWeight: parsePx(smItem?.fontWeight, 400),
          letterSpacing: smItem?.letterSpacing || '0em',
        },
        xs: {
          fontSize: parsePx(xsItem?.fontSize, 11),
          lineHeight: parseNum(xsItem?.lineHeight, 1.4),
          fontWeight: parsePx(xsItem?.fontWeight, 500),
          letterSpacing: xsItem?.letterSpacing || '0.01em',
        },
      },
      borderRadius,
    });
  }

  // Sort by brand name
  themes.sort((a, b) => a.name.localeCompare(b.name));

  const tsContent = `// Auto-generated from VoltAgent/awesome-design-md (84 Curated DESIGN.md files)
import { ThemeConfig } from './themeEditorDefaults';

export interface AwesomeDesignMdTheme {
  id: string;
  name: string;
  category: string;
  description: string;
  designMdPath: string;
  color: ThemeConfig['color'];
  typography: ThemeConfig['typography'];
  borderRadius: string;
}

export const AWESOME_DESIGN_MD_THEMES: AwesomeDesignMdTheme[] = ${JSON.stringify(themes, null, 2)};

export const AWESOME_CATEGORIES = [
  'All',
  'AI & LLM',
  'Developer Tools',
  'Fintech & Web3',
  'Tech & Lifestyle',
  'Automotive & Luxury',
] as const;
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
  console.log('Successfully generated ' + themes.length + ' themes into ' + OUTPUT_FILE);
}

main();
