#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { startLocalTokenStudio } from './studioServer';
import { compileTokensToCss } from './tokenCompiler';

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

  // 4. Install Token JSON & Zero-Runtime CSS
  const srcToken = path.join(PKG_ROOT, 'tokens', 'token.json');
  if (fs.existsSync(srcToken)) {
    copyFileSafe(srcToken, path.join(cwd, 'tokens', 'token.json'), 'W3C DTCG Token JSON (tokens/token.json)');
  }

  const srcCss = path.join(PKG_ROOT, 'css', 'atom-ui.css');
  if (fs.existsSync(srcCss)) {
    copyFileSafe(srcCss, path.join(cwd, 'css', 'atom-ui.css'), 'Zero-Runtime Semantic CSS (css/atom-ui.css)');
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
  button: 'Button.tsx',
  card: 'Card.tsx',
  badge: 'Badge.tsx',
  input: 'Input.tsx',
  table: 'Table.tsx',
  tabs: 'Tabs.tsx',
  switch: 'Switch.tsx',
  modal: 'Modal.tsx',
  container: 'Container.tsx',
  layout: 'Layout.tsx',
};

const BLOCK_MAP: Record<string, { file: string; deps: string[] }> = {
  'realtime-chart': { file: 'RealtimeChartBlock.tsx', deps: ['card', 'button', 'badge'] },
  'interactive-chat': { file: 'InteractiveChatBlock.tsx', deps: ['card', 'input', 'button', 'badge'] },
  'pricing-table': { file: 'PricingPlanBlock.tsx', deps: ['card', 'button', 'badge'] },
  'card-list': { file: 'CardListBlock.tsx', deps: ['card', 'input', 'button', 'badge'] },
  'interactive-slider': { file: 'SliderShowcaseBlock.tsx', deps: ['card', 'button', 'badge'] },
  'metric-stats': { file: 'MetricStatsBlock.tsx', deps: ['card', 'badge'] },
  'file-explorer': { file: 'FileExplorerBlock.tsx', deps: ['card', 'button', 'badge'] },
};

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
    const src = path.join(PKG_ROOT, 'components', 'ui', fileName);
    const dest = path.join(cwd, 'components', 'ui', fileName);
    if (fs.existsSync(src)) {
      copyFileSafe(src, dest, `Component (${fileName})`);
      console.log(`\n✅ Added ${normalized} component to components/ui/${fileName}\n`);
    } else {
      console.error(`\n❌ Source component file not found: ${src}\n`);
    }
    return;
  }

  // 2. Check if it's a block
  if (BLOCK_MAP[normalized]) {
    const { file, deps } = BLOCK_MAP[normalized];
    console.log(`\n📦 Adding block "${normalized}" and its dependent components...\n`);

    // Copy dependencies first (Component-First rule)
    deps.forEach((dep) => {
      const depFile = COMPONENT_MAP[dep];
      if (depFile) {
        const srcDep = path.join(PKG_ROOT, 'components', 'ui', depFile);
        const destDep = path.join(cwd, 'components', 'ui', depFile);
        if (fs.existsSync(srcDep)) {
          copyFileSafe(srcDep, destDep, `Dependent Component (${depFile})`);
        }
      }
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
  console.log(`
Available Components:
  - button      (Button, ButtonVariants)
  - card        (Card container)
  - badge       (Status badge)
  - input       (Input with status)
  - table       (Table, Header, Row, Cell)
  - tabs        (TabsList, TabsTrigger)
  - switch      (A11y Switch toggle)
  - modal       (Dialog with Esc key support)

Available Design Blocks:
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
  const tokenJsonPath = path.join(cwd, 'tokens', 'token.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');

  if (!fs.existsSync(tokenJsonPath)) {
    console.error(`\n❌ tokens/token.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.\n`);
    return;
  }

  try {
    const tokens = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf-8'));
    const css = compileTokensToCss(tokens);
    const cssDir = path.dirname(cssPath);
    if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });
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

function showHelp() {
  console.log(`
AtomSystem CLI - Universal Design Token & Agentic UI System

Usage:
  npx atomsystem <command> [options]

Commands:
  init            Initialize AI guidelines, tokens, specs, and CSS in your project
  studio          Launch Local Web Token Studio GUI (interactive token customizer)
  build:tokens    Compile tokens/token.json into zero-runtime css/atom-ui.css
  add <name>      Add a component or block directly to your project
  list            List all available components and blocks
  help            Display this help message
  version         Print version info

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
    console.log('atomsystem v0.6.0');
  }
}

switch (command) {
  case 'init':
    handleInit();
    break;
  case 'studio':
  case 'editor':
    handleStudio();
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
