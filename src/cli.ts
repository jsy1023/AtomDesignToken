#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import { startLocalTokenStudio } from './studioServer';
import { applyThemeById, startFloatingThemeServer } from './themeFloatingServer';
import { compileTokensToCss } from './tokenCompiler';
import { scanAndRefactorDirectory } from './refactorEngine';
import { ensureLocalCssLinked } from './cssLinker';
import { analyzeProject, importAnalyzedProject } from './projectAnalyzer';
import {
  AI_COMPONENT_SUBMISSION_TEMPLATE,
  buildAiComponentSubmissionPrompt,
} from '../lib/data/studioData';
import {
  loadProjectRegistry,
  saveProjectRegistry,
  submitComponentSpec,
} from '../lib/services/studioRegistryServer';
import { ensureUiBarrelExport } from '../lib/services/componentScaffold';

function getPkgRoot(): string {
  try {
    if (typeof __dirname !== 'undefined') {
      return path.resolve(__dirname, '..');
    }
    const currentFile = fileURLToPath(import.meta.url);
    return path.resolve(path.dirname(currentFile), '..');
  } catch {
    return process.cwd();
  }
}

const PKG_ROOT = getPkgRoot();
const args = process.argv.slice(2);
const command = args[0] || 'help';
const targetName = args[1];

function copyFileSafe(src: string, dest: string, label: string) {
  const targetDir = path.dirname(dest);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`  ✓ ${label} -> ${path.relative(process.cwd(), dest)}`);
}

function handleInit() {
  const cwd = process.cwd();
  console.log('\n🚀 Initializing AtomSystem Universal Design System...\n');

  // 1. AI Assistant Master Guidelines (Multi-agent SSOT)
  const srcAgentGuide = path.join(PKG_ROOT, 'presets', 'agents.guide.md');
  if (fs.existsSync(srcAgentGuide)) {
    // AGENTS.md (Universal)
    copyFileSafe(srcAgentGuide, path.join(cwd, 'AGENTS.md'), 'Universal AI Guide (AGENTS.md)');
    // CLAUDE.md (Claude Code)
    copyFileSafe(srcAgentGuide, path.join(cwd, 'CLAUDE.md'), 'Claude Code Guidelines (CLAUDE.md)');
    // .cursorrules (Cursor IDE)
    copyFileSafe(srcAgentGuide, path.join(cwd, '.cursorrules'), 'Cursor Rules (.cursorrules)');
  }

  // 2. Install AI Agent Skill
  const srcSkill = path.join(PKG_ROOT, 'skills', 'atomsystem.skill.md');
  if (fs.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path.join(cwd, '.agents', 'skills', 'atomsystem', 'SKILL.md'), 'Agent Skill (.agents/skills/atomsystem/SKILL.md)');
  }

  // 3. Install 4-Tier Specifications
  const specs = [
    { src: path.join(PKG_ROOT, 'presets', 'default.design.md'), dest: path.join(cwd, 'atom.design.md'), label: 'Design Tokens (atom.design.md)' },
    { src: path.join(PKG_ROOT, 'presets', 'components.md'), dest: path.join(cwd, 'atom.components.md'), label: 'Components Spec (atom.components.md)' },
    { src: path.join(PKG_ROOT, 'presets', 'blocks.md'), dest: path.join(cwd, 'atom.blocks.md'), label: 'Design Blocks Spec (atom.blocks.md)' },
    { src: path.join(PKG_ROOT, 'presets', 'uxPattern.md'), dest: path.join(cwd, 'atom.uxPattern.md'), label: 'UX Patterns (atom.uxPattern.md)' },
  ];

  specs.forEach((s) => {
    if (fs.existsSync(s.src)) {
      copyFileSafe(s.src, s.dest, s.label);
    }
  });

  // 4. Install unified token SSOT (palette · theme · components) & Zero-Runtime CSS
  const srcToken = path.join(PKG_ROOT, 'tokens', 'tokens.json');
  if (fs.existsSync(srcToken)) {
    copyFileSafe(srcToken, path.join(cwd, 'tokens', 'tokens.json'), 'Unified Token SSOT (tokens/tokens.json)');
  } else {
    const { registry } = loadProjectRegistry(cwd);
    saveProjectRegistry(cwd, registry);
    console.log('  ✓ Unified Token SSOT -> tokens/tokens.json');
  }

  const srcCss = path.join(PKG_ROOT, 'css', 'atom-ui.css');
  if (fs.existsSync(srcCss)) {
    copyFileSafe(srcCss, path.join(cwd, 'css', 'atom-ui.css'), 'Zero-Runtime Semantic CSS (css/atom-ui.css)');
  }

  // 5. Auto-link local css/atom-ui.css into the project's global CSS
  const linkResult = ensureLocalCssLinked(cwd);
  if (linkResult.updatedFiles.length > 0) {
    linkResult.updatedFiles.forEach((f) => {
      console.log(`  ✓ Linked local css/atom-ui.css in ${f}`);
    });
  } else if (linkResult.alreadyLinkedFiles.length > 0) {
    linkResult.alreadyLinkedFiles.forEach((f) => {
      console.log(`  ✓ Local css/atom-ui.css already linked in ${f}`);
    });
  } else {
    console.log('  ℹ No global CSS entry found (e.g. app/globals.css). Add @import "./css/atom-ui.css"; to your global CSS.');
  }

  console.log('\n✨ AtomSystem initialization completed successfully!');
  console.log('\n🎨 Local Token Studio Available:');
  console.log('  Run "npx atomsystem studio" to launch the local web customizer GUI.');
  console.log('  You can visually edit tokens and immediately recompile css/atom-ui.css.');
  console.log('\n📌 How AI Coding Works Now:');
  console.log('  Any AI assistant (Claude Code, Cursor, Copilot, Antigravity) will now');
  console.log('  AUTOMATICALLY detect the design tokens, components, and UX patterns.');
  console.log('\n📌 You can now ask your AI:');
  console.log('  "대시보드 화면에 실시간 차트와 가격 정책 블록을 레고처럼 조립해줘."');
  console.log('  "atom.design.md의 색상 토큰을 바탕으로 결제 확인 모달을 만들어줘."\n');
}

const COMPONENT_MAP: Record<string, string> = {
  accordion: 'Accordion.tsx',
  alert: 'Alert.tsx',
  avatar: 'Avatar.tsx',
  badge: 'Badge.tsx',
  breadcrumb: 'Breadcrumb.tsx',
  button: 'Button.tsx',
  calendar: 'Calendar.tsx',
  card: 'Card.tsx',
  chart: 'Chart.tsx',
  checkbox: 'Checkbox.tsx',
  container: 'Container.tsx',
  input: 'Input.tsx',
  layout: 'Layout.tsx',
  modal: 'Modal.tsx',
  nav: 'Nav.tsx',
  navbar: 'Navbar.tsx',
  offcanvas: 'Offcanvas.tsx',
  pagination: 'Pagination.tsx',
  progress: 'Progress.tsx',
  radio: 'Radio.tsx',
  select: 'Select.tsx',
  separator: 'Separator.tsx',
  sidebar: 'Sidebar.tsx',
  sidemenu: 'SideMenu.tsx',
  skeleton: 'Skeleton.tsx',
  slider: 'Slider.tsx',
  switch: 'Switch.tsx',
  table: 'Table.tsx',
  tabs: 'Tabs.tsx',
  textarea: 'Textarea.tsx',
  'theme-switcher': 'ThemeSwitcher.tsx',
  toast: 'Toast.tsx',
  'token-select': 'TokenSelect.tsx',
  tooltip: 'Tooltip.tsx',
  tree: 'Tree.tsx',
};

const COMPONENT_DEPS: Record<string, string[]> = {
  alert: ['button'],
  toast: ['button'],
  'theme-switcher': ['select', 'button', 'badge', 'card', 'tabs'],
};

const BLOCK_MAP: Record<string, { file: string; deps: string[] }> = {
  'realtime-chart': { file: 'RealtimeChartBlock.tsx', deps: ['card', 'button', 'badge'] },
  'interactive-chat': { file: 'InteractiveChatBlock.tsx', deps: ['card', 'input', 'button', 'badge'] },
  'pricing-table': { file: 'PricingPlanBlock.tsx', deps: ['card', 'button', 'badge'] },
  'card-list': { file: 'CardListBlock.tsx', deps: ['card', 'input', 'button', 'badge'] },
  'interactive-slider': { file: 'SliderShowcaseBlock.tsx', deps: ['card', 'button', 'slider'] },
  'metric-stats': { file: 'MetricStatsBlock.tsx', deps: ['card', 'badge'] },
  'file-explorer': { file: 'FileExplorerBlock.tsx', deps: ['card', 'button', 'badge'] },
};

function installUiComponent(cwd: string, compKey: string, visited = new Set<string>()): boolean {
  if (visited.has(compKey)) return true;
  visited.add(compKey);

  const fileName = COMPONENT_MAP[compKey];
  if (!fileName) return false;

  // Install sibling UI dependencies first
  for (const dep of COMPONENT_DEPS[compKey] || []) {
    installUiComponent(cwd, dep, visited);
  }

  const src = path.join(PKG_ROOT, 'components', 'ui', fileName);
  const uiDir = path.join(cwd, 'components', 'ui');
  const dest = path.join(uiDir, fileName);
  if (!fs.existsSync(src)) {
    console.error(`\n❌ Source component file not found: ${src}\n`);
    return false;
  }

  if (!fs.existsSync(uiDir)) {
    fs.mkdirSync(uiDir, { recursive: true });
  }

  // Rewrite internal repo-relative lib imports (e.g. ThemeSwitcher) to public 'atomsystem' package import when copying externally
  let code = fs.readFileSync(src, 'utf-8');
  if (path.resolve(cwd) !== path.resolve(PKG_ROOT)) {
    code = code.replace(/from\s+['"]\.\.\/\.\.\/lib\/[^'"]+['"]/g, "from 'atomsystem'");
  }
  fs.writeFileSync(dest, code, 'utf-8');
  console.log(`  ✓ Component (${fileName}) -> ${path.relative(cwd, dest)}`);

  const pascalName = fileName.replace(/\.tsx$/i, '');
  ensureUiBarrelExport(uiDir, pascalName);
  return true;
}

function handleAdd(name?: string) {
  if (!name) {
    console.error('\n❌ Please specify an item to add. Example: npx atomsystem add button\n');
    handleList();
    return;
  }

  const cwd = process.cwd();
  const normalized = name.toLowerCase().trim();

  // 1. Check if it's a component
  if (COMPONENT_MAP[normalized]) {
    const fileName = COMPONENT_MAP[normalized];
    if (installUiComponent(cwd, normalized)) {
      console.log(`\n✅ Added ${normalized} component to components/ui/${fileName} (and updated components/ui/index.ts)\n`);
    }
    return;
  }

  // 2. Check if it's a block
  if (BLOCK_MAP[normalized]) {
    const { file, deps } = BLOCK_MAP[normalized];
    console.log(`\n📦 Adding block "${normalized}" and its dependent components...\n`);

    // Copy dependencies first (Component-First rule)
    deps.forEach((dep) => {
      installUiComponent(cwd, dep);
    });

    // Copy block file
    const srcBlock = path.join(PKG_ROOT, 'components', 'blocks', file);
    const destBlock = path.join(cwd, 'components', 'blocks', file);
    if (fs.existsSync(srcBlock)) {
      copyFileSafe(srcBlock, destBlock, `Block (${file})`);
      console.log(`\n✅ Block "${normalized}" successfully added to components/blocks/${file}\n`);
    } else {
      console.error(`\n❌ Source block file not found: ${srcBlock}\n`);
    }
    return;
  }

  console.error(`\n❌ Unknown item: "${name}".`);
  handleList();
}

function handleList() {
  const compKeys = Object.keys(COMPONENT_MAP).sort();
  const compLines: string[] = [];
  for (let i = 0; i < compKeys.length; i += 4) {
    compLines.push('  ' + compKeys.slice(i, i + 4).map((k) => k.padEnd(18)).join(''));
  }

  console.log(`
Available UI Components (${compKeys.length}):
${compLines.join('\n')}

Available Design Blocks (${Object.keys(BLOCK_MAP).length}):
  - realtime-chart      (Live streaming candlestick/line chart)
  - interactive-chat    (AI chatbot feed with suggestions)
  - pricing-table       (Monthly/annual tier pricing table)
  - card-list           (Responsive grid & list filter)
  - interactive-slider  (Cost simulation calculator & carousel)
  - metric-stats        (4 KPI executive metric cards)
  - file-explorer       (Hierarchical directory tree explorer)

Install any item:
  npx atomsystem add <item-name>
`);
}

function handleBuildTokens() {
  const cwd = process.cwd();
  const tokenJsonPath = path.join(cwd, 'tokens', 'tokens.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');

  if (!fs.existsSync(tokenJsonPath)) {
    console.error(`\n❌ tokens/tokens.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.\n`);
    return;
  }

  try {
    const tokens = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf-8'));
    let css = compileTokensToCss(tokens);
    const cssDir = path.dirname(cssPath);
    if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });
    const marker = '/* === Universal Component Classes === */';
    if (fs.existsSync(cssPath)) {
      const existing = fs.readFileSync(cssPath, 'utf-8');
      const idx = existing.indexOf(marker);
      if (idx !== -1) css = `${css.trimEnd()}\n\n${existing.slice(idx)}`;
    }
    fs.writeFileSync(cssPath, css, 'utf-8');
    console.log(`\n✨ Successfully compiled tokens to ${path.relative(cwd, cssPath)}!\n`);
  } catch (err: any) {
    console.error(`\n❌ Failed to compile tokens: ${err.message}\n`);
  }
}

function handleStudio() {
  const portArg = args.find((a) => a.startsWith('--port='));
  const port = portArg ? parseInt(portArg.split('=')[1], 10) : 4000;
  startLocalTokenStudio({ port, cwd: process.cwd() });
}

async function handleTheme(targetArg?: string) {
  const cwd = process.cwd();
  const tokenJsonPath = path.join(cwd, 'tokens', 'tokens.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');

  if (!fs.existsSync(tokenJsonPath)) {
    console.error(`\n❌ tokens/tokens.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.\n`);
    return;
  }

  let doc: Record<string, any>;
  try {
    doc = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf-8'));
  } catch (err: any) {
    console.error(`\n❌ Failed to parse tokens/tokens.json: ${err.message}\n`);
    return;
  }

  const presets: Record<string, any> = doc?.theme?.presets || {};
  const presetEntries = Object.entries(presets);
  if (presetEntries.length === 0) {
    console.error('\n❌ No theme presets found in tokens/tokens.json (theme.presets).\n');
    return;
  }

  const activeThemeId: string = doc?.theme?.activeThemeId || presetEntries[0][0];

  if (args.includes('--list')) {
    console.log('\n🎨 Available AtomSystem Themes:\n');
    for (const [id, preset] of presetEntries) {
      const marker = id === activeThemeId ? '★ [Active]' : '  ';
      console.log(`  ${marker} ${id.padEnd(20)} (${preset.mode || 'light'}) - ${preset.name || id}`);
    }
    console.log('');
    return;
  }

  const setFlag = args.find((a) => a.startsWith('--set='));
  const directId = setFlag ? setFlag.slice('--set='.length).trim() : (targetArg && !targetArg.startsWith('-') ? targetArg.trim() : '');

  if (directId) {
    try {
      const applied = applyThemeById(cwd, directId);
      console.log(`\n🎨 Theme applied: ${applied.name} (${directId}, ${applied.mode})`);
      console.log(`   ✓ Updated ${path.relative(cwd, tokenJsonPath)}`);
      console.log(`   ✓ Recompiled ${path.relative(cwd, cssPath)}\n`);
    } catch (err: any) {
      console.error(`\n❌ ${err.message}\n`);
    }
    return;
  }

  if (!args.includes('--cli')) {
    const portArg = args.find((a) => a.startsWith('--port='));
    const port = portArg ? parseInt(portArg.split('=')[1], 10) : 4010;
    startFloatingThemeServer({ port, cwd, openBrowser: !args.includes('--no-open') });
    return;
  }

  const choices = presetEntries.map(([id, preset]) => {
    const isCurrent = id === activeThemeId;
    const modeTag = preset.mode === 'dark' ? '🌙 dark' : '☀️ light';
    const activeTag = isCurrent ? ' [Active]' : '';
    return {
      name: `${preset.name || id} (${id}) · ${modeTag}${activeTag}`,
      value: id,
    };
  });

  const answer = await inquirer.prompt<{ themeId: string }>([
    {
      type: 'list',
      name: 'themeId',
      message: '프로젝트 전체에 적용할 테마를 선택하세요 (Select a theme):',
      default: activeThemeId,
      choices,
    },
  ]);

  try {
    const applied = applyThemeById(cwd, answer.themeId);
    console.log(`\n🎨 Theme applied: ${applied.name} (${answer.themeId}, ${applied.mode})`);
    console.log(`   ✓ Updated ${path.relative(cwd, tokenJsonPath)}`);
    console.log(`   ✓ Recompiled ${path.relative(cwd, cssPath)}\n`);
  } catch (err: any) {
    console.error(`\n❌ ${err.message}\n`);
  }
}

function handleSkillInstall() {
  const cwd = process.cwd();
  console.log('\n🤖 Installing AtomSystem Agent Skill & Universal Guidelines...\n');

  // 1. AI Assistant Guidelines
  const srcAgentGuide = path.join(PKG_ROOT, 'presets', 'agents.guide.md');
  if (fs.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path.join(cwd, 'AGENTS.md'), 'Universal AI Guide (AGENTS.md)');
    copyFileSafe(srcAgentGuide, path.join(cwd, 'CLAUDE.md'), 'Claude Code Guidelines (CLAUDE.md)');
    copyFileSafe(srcAgentGuide, path.join(cwd, '.cursorrules'), 'Cursor Rules (.cursorrules)');
  }

  // 2. Install AI Agent Skill
  const srcSkill = path.join(PKG_ROOT, 'skills', 'atomsystem.skill.md');
  if (fs.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path.join(cwd, '.agents', 'skills', 'atomsystem', 'SKILL.md'), 'Agent Skill (.agents/skills/atomsystem/SKILL.md)');
  }

  console.log('\n✨ Agent Skill installed successfully!');
  console.log('📌 Supported AI Assistants:');
  console.log('  - Cursor IDE (.cursorrules)');
  console.log('  - Claude Code (CLAUDE.md)');
  console.log('  - Antigravity / Gemini CLI (.agents/skills/atomsystem/SKILL.md)');
  console.log('  - Universal Coding Agents (AGENTS.md)\n');
}

function handleRefactor() {
  const cwd = process.cwd();
  const shouldFix = args.includes('--fix');
  const shouldCheck = args.includes('--check');
  const targetDirs = args.filter((a) => !a.startsWith('--') && a !== 'refactor');
  const scanDirs = targetDirs.length > 0 ? targetDirs : ['app', 'components', 'css', 'lib'];

  console.log('\n🔍 AtomSystem Zero-Hardcoding Refactor Engine');
  console.log(`Mode: ${shouldFix ? '⚡ FIX (Automatic Token Replacement)' : '👀 DRY RUN (Scan & Report Only)'}`);
  console.log(`Target Directories: ${scanDirs.join(', ')}\n`);

  let grandScanned = 0;
  let grandMatches = 0;
  let grandFixed = 0;

  scanDirs.forEach((dirName) => {
    const fullDir = path.resolve(cwd, dirName);
    if (!fs.existsSync(fullDir)) return;

    const report = scanAndRefactorDirectory(fullDir, { fix: shouldFix });
    grandScanned += report.scannedFiles;
    grandMatches += report.totalMatches;
    grandFixed += report.fixedFiles;

    if (report.matches.length > 0) {
      console.log(`📁 In [${dirName}]: Found ${report.matches.length} hardcoding pattern(s)`);
      // Display first 15 matches as preview
      const previewMatches = report.matches.slice(0, 15);
      previewMatches.forEach((m) => {
        console.log(`   ${m.file}:${m.line} -> [${m.original}] ➔ [${m.replacement}] (${m.type})`);
      });
      if (report.matches.length > 15) {
        console.log(`   ...and ${report.matches.length - 15} more pattern(s)`);
      }
      console.log('');
    }
  });

  console.log('───────────────────────────────────────────────────────');
  console.log(`📊 Refactor Summary:`);
  console.log(`  - Files Scanned: ${grandScanned}`);
  console.log(`  - Hardcoding Patterns Found: ${grandMatches}`);
  if (shouldFix) {
    console.log(`  - Files Successfully Fixed: ${grandFixed}`);
    console.log(`\n✨ Hardcoded styles successfully converted to design tokens!\n`);
  } else {
    console.log(`\n💡 To automatically replace these hardcoded patterns with tokens, run:`);
    console.log(`   npx atomsystem refactor --fix\n`);
    if (shouldCheck && grandMatches > 0) {
      process.exitCode = 1;
    }
  }
}

function handleSubmit(filePathArg?: string) {
  if (!filePathArg) {
    console.error('\n❌ Please provide a component spec JSON file. Example: npx atomsystem submit rating-chip.atom.json\n');
    console.log('💡 Run "npx atomsystem schema" to print a template JSON spec.\n');
    process.exitCode = 1;
    return;
  }

  const cwd = process.cwd();
  const absPath = path.resolve(cwd, filePathArg);
  if (!fs.existsSync(absPath)) {
    console.error(`\n❌ Spec file not found: ${absPath}\n`);
    process.exitCode = 1;
    return;
  }

  try {
    const raw = JSON.parse(fs.readFileSync(absPath, 'utf-8'));
    const spec = raw?.spec && typeof raw.spec === 'object' ? raw.spec : raw;
    const result = submitComponentSpec(cwd, spec);
    if (!result.success) {
      console.error('\n❌ Component spec validation failed:');
      (result.errors || []).forEach((err) => console.error(`  - ${err}`));
      process.exitCode = 1;
      return;
    }

    console.log(`\n✨ Registered component "${result.component?.id}" into AtomSystem SSOT!\n`);
    (result.filesWritten || []).forEach((f) => console.log(`  ✓ Updated ${f}`));
    console.log('');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error(`\n❌ Failed to submit component spec: ${msg}\n`);
    process.exitCode = 1;
  }
}

function handleSync() {
  const cwd = process.cwd();
  const loaded = loadProjectRegistry(cwd);
  const saved = saveProjectRegistry(cwd, loaded.registry);
  console.log(`\n🔄 Synchronized AtomSystem SSOT Registry!`);
  console.log(`  - Components Managed : ${saved.registry.components.length}`);
  console.log(`  - Scanned UI Files   : ${loaded.discoveredFiles.length}`);
  saved.filesWritten.forEach((f) => console.log(`  ✓ Recompiled ${f}`));
  console.log('');
}

function handleSchema() {
  if (args.includes('--prompt')) {
    console.log(buildAiComponentSubmissionPrompt('요청한 신규 UI 컴포넌트'));
    return;
  }
  console.log(JSON.stringify(AI_COMPONENT_SUBMISSION_TEMPLATE, null, 2));
}

function showHelp() {
  console.log(`
AtomSystem CLI - Universal Design Token & Agentic UI System

Usage:
  npx atomsystem <command> [options]

Commands:
  init            Initialize AI guidelines, tokens/tokens.json SSOT, specs, and CSS
  studio          Launch Local SSOT Web Studio GUI (Component Registry + AI Submit + Tokens)
  theme [id]      Switch active theme preset (--list, --set=<id>, --cli, or floating picker)
  submit <file>   Register & scaffold an AI component spec JSON into the project SSOT
  sync            Auto-discover components/ui/*.tsx & *.atom.json and recompile SSOT CSS/JSON
  schema          Print standardized AI Component Submission JSON template (--prompt for AI prompt)
  build:tokens    Compile tokens/tokens.json into zero-runtime css/atom-ui.css
  refactor        Scan & replace hardcoded HEX/px/Tailwind colors with tokens (--fix)
  analyze         Analyze existing project code for tokens & component candidates (--import, --json, --prompt)
  skill install   Install AI Agent Skill and guidelines (.cursorrules, CLAUDE.md)
  add <name>      Add a component or block directly to your project
  list            List all available components and blocks
  help            Display this help message
  version         Print version info

Options for refactor:
  --fix           Automatically replace hardcoded values with semantic tokens

Options for studio:
  --port=<port>   Port for the local studio server (default: 4000)
`);
}

function showVersion() {
  const pkgPath = path.join(PKG_ROOT, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    console.log(`atomsystem v${pkg.version}`);
  } else {
    console.log('atomsystem v0.15.3');
  }
}

function handleAnalyze() {
  const cwd = process.cwd();
  const asJson = args.includes('--json');
  const shouldImport = args.includes('--import') || args.includes('--write');
  const asPrompt = args.includes('--prompt');

  const report = analyzeProject(cwd);

  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (asPrompt) {
    console.log(
      `다음은 기존 프로젝트(${report.scannedFiles}개 파일) 분석 결과입니다. [Type · Variable · Status] 규격에 맞춰 components/ui 및 tokens/tokens.json에 반영할 스펙을 정제해 주세요.\n`
    );
    console.log(`추천 브랜드 컬러: ${report.suggestedBrandColor}`);
    console.log(
      '감지된 컴포넌트 후보:\n' +
        JSON.stringify(
          report.candidates.map((c) => c.spec),
          null,
          2
        )
    );
    return;
  }

  console.log('\n🔍 AtomSystem Project Analyzer\n');
  console.log(`  Scanned Files       : ${report.scannedFiles}`);
  console.log(`  Suggested Brand Hex : ${report.suggestedBrandColor}`);
  console.log(
    `  Top Extracted Colors: ${report.extractedColors
      .slice(0, 6)
      .map((c) => `${c.value}(${c.count})`)
      .join(', ') || 'None'}`
  );
  console.log(`  Component Candidates: ${report.candidates.length}\n`);

  report.candidates.forEach((c) => {
    console.log(
      `  • [${c.sourceKind}] ${c.id} (${c.category}) - ${c.occurrences}회 감지 | variants: ${
        c.detectedVariants.join(', ') || 'default'
      }`
    );
  });

  if (shouldImport) {
    const res = importAnalyzedProject(cwd, {
      themeName: 'Imported Project Theme',
      brandColor: report.suggestedBrandColor,
      specs: report.candidates.map((c) => c.spec),
    });
    console.log('\n✅ Studio SSOT 반영 완료:');
    res.filesWritten.forEach((f) => console.log(`  ✓ ${f}`));
    if (res.errors.length > 0) {
      console.error('  ⚠ 일부 오류:', res.errors.join(' | '));
    }
  } else {
    console.log('\n💡 팁:');
    console.log('  - 바로 스튜디오/SSOT에 반영하려면: npx atomsystem analyze --import');
    console.log('  - 스튜디오 웹 UI에서 선택 반영하려면: npx atomsystem studio 실행 후 [프로젝트 불러오기]\n');
  }
}

function handlePostinstall() {
  try {
    const targetCwd = process.env.INIT_CWD;
    if (!targetCwd) return;
    if (path.resolve(targetCwd) === path.resolve(PKG_ROOT)) return;
    if (!fs.existsSync(path.join(targetCwd, 'package.json'))) return;

    const targetTokenPath = path.join(targetCwd, 'tokens', 'tokens.json');
    const targetCssPath = path.join(targetCwd, 'css', 'atom-ui.css');
    const srcToken = path.join(PKG_ROOT, 'tokens', 'tokens.json');
    const srcCss = path.join(PKG_ROOT, 'css', 'atom-ui.css');

    let copiedAny = false;
    if (!fs.existsSync(targetTokenPath) && fs.existsSync(srcToken)) {
      fs.mkdirSync(path.dirname(targetTokenPath), { recursive: true });
      fs.copyFileSync(srcToken, targetTokenPath);
      copiedAny = true;
    }
    if (!fs.existsSync(targetCssPath) && fs.existsSync(srcCss)) {
      fs.mkdirSync(path.dirname(targetCssPath), { recursive: true });
      fs.copyFileSync(srcCss, targetCssPath);
      copiedAny = true;
    }

    const linkResult = ensureLocalCssLinked(targetCwd);
    if (copiedAny || linkResult.updatedFiles.length > 0) {
      console.log('\n🎨 AtomSystem postinstall:');
      if (copiedAny) {
        console.log('  ✓ Provisioned local tokens/tokens.json & css/atom-ui.css');
      }
      linkResult.updatedFiles.forEach((f) => {
        console.log(`  ✓ Auto-linked local css/atom-ui.css in ${f}`);
      });
      console.log('  👉 Run "npx atomsystem studio" to customize tokens & components.\n');
    }
  } catch {
    // Never fail npm install on postinstall
  }
}

switch (command) {
  case 'postinstall':
    handlePostinstall();
    break;
  case 'init':
    handleInit();
    break;
  case 'refactor':
    handleRefactor();
    break;
  case 'analyze':
    handleAnalyze();
    break;
  case 'skill':
    handleSkillInstall();
    break;
  case 'studio':
  case 'editor':
    handleStudio();
    break;
  case 'theme':
    void handleTheme(targetName);
    break;
  case 'submit':
  case 'register':
    handleSubmit(targetName);
    break;
  case 'sync':
    handleSync();
    break;
  case 'schema':
    handleSchema();
    break;
  case 'build:tokens':
  case 'compile':
    handleBuildTokens();
    break;
  case 'add':
    handleAdd(targetName);
    break;
  case 'list':
    handleList();
    break;
  case 'version':
  case '-v':
  case '--version':
    showVersion();
    break;
  case 'help':
  case '-h':
  case '--help':
  default:
    showHelp();
    break;
}
