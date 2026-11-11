#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);

function getPkgRoot() {
  try {
    if (typeof __dirname !== "undefined") {
      return path__default.default.resolve(__dirname, "..");
    }
    const currentFile = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('cli.cjs', document.baseURI).href)));
    return path__default.default.resolve(path__default.default.dirname(currentFile), "..");
  } catch {
    return process.cwd();
  }
}
var PKG_ROOT = getPkgRoot();
var args = process.argv.slice(2);
var command = args[0] || "help";
var targetName = args[1];
function copyFileSafe(src, dest, label) {
  const targetDir = path__default.default.dirname(dest);
  if (!fs__default.default.existsSync(targetDir)) {
    fs__default.default.mkdirSync(targetDir, { recursive: true });
  }
  fs__default.default.copyFileSync(src, dest);
  console.log(`  \u2713 ${label} -> ${path__default.default.relative(process.cwd(), dest)}`);
}
function handleInit() {
  const cwd = process.cwd();
  console.log("\n\u{1F680} Initializing AtomSystem Universal Design System...\n");
  const srcAgentGuide = path__default.default.join(PKG_ROOT, "presets", "agents.guide.md");
  if (fs__default.default.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path__default.default.join(cwd, "AGENTS.md"), "Universal AI Guide (AGENTS.md)");
    copyFileSafe(srcAgentGuide, path__default.default.join(cwd, "CLAUDE.md"), "Claude Code Guidelines (CLAUDE.md)");
    copyFileSafe(srcAgentGuide, path__default.default.join(cwd, ".cursorrules"), "Cursor Rules (.cursorrules)");
  }
  const srcSkill = path__default.default.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  if (fs__default.default.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path__default.default.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md"), "Agent Skill (.agents/skills/atomsystem/SKILL.md)");
  }
  const specs = [
    { src: path__default.default.join(PKG_ROOT, "presets", "default.design.md"), dest: path__default.default.join(cwd, "atom.design.md"), label: "Design Tokens (atom.design.md)" },
    { src: path__default.default.join(PKG_ROOT, "presets", "components.md"), dest: path__default.default.join(cwd, "atom.components.md"), label: "Components Spec (atom.components.md)" },
    { src: path__default.default.join(PKG_ROOT, "presets", "blocks.md"), dest: path__default.default.join(cwd, "atom.blocks.md"), label: "Design Blocks Spec (atom.blocks.md)" },
    { src: path__default.default.join(PKG_ROOT, "presets", "uxPattern.md"), dest: path__default.default.join(cwd, "atom.uxPattern.md"), label: "UX Patterns (atom.uxPattern.md)" }
  ];
  specs.forEach((s) => {
    if (fs__default.default.existsSync(s.src)) {
      copyFileSafe(s.src, s.dest, s.label);
    }
  });
  const srcToken = path__default.default.join(PKG_ROOT, "tokens", "token.json");
  if (fs__default.default.existsSync(srcToken)) {
    copyFileSafe(srcToken, path__default.default.join(cwd, "tokens", "token.json"), "W3C DTCG Token JSON (tokens/token.json)");
  }
  const srcCss = path__default.default.join(PKG_ROOT, "css", "atom-ui.css");
  if (fs__default.default.existsSync(srcCss)) {
    copyFileSafe(srcCss, path__default.default.join(cwd, "css", "atom-ui.css"), "Zero-Runtime Semantic CSS (css/atom-ui.css)");
  }
  console.log("\n\u2728 AtomSystem initialization completed successfully!");
  console.log("\n\u{1F4CC} How AI Coding Works Now:");
  console.log("  Any AI assistant (Claude Code, Cursor, Copilot, Antigravity) will now");
  console.log("  AUTOMATICALLY detect the design tokens, components, and UX patterns.");
  console.log("\n\u{1F4CC} You can now ask your AI:");
  console.log('  "\uB300\uC2DC\uBCF4\uB4DC \uD654\uBA74\uC5D0 \uC2E4\uC2DC\uAC04 \uCC28\uD2B8\uC640 \uAC00\uACA9 \uC815\uCC45 \uBE14\uB85D\uC744 \uB808\uACE0\uCC98\uB7FC \uC870\uB9BD\uD574\uC918."');
  console.log('  "atom.design.md\uC758 \uC0C9\uC0C1 \uD1A0\uD070\uC744 \uBC14\uD0D5\uC73C\uB85C \uACB0\uC81C \uD655\uC778 \uBAA8\uB2EC\uC744 \uB9CC\uB4E4\uC5B4\uC918."\n');
}
var COMPONENT_MAP = {
  button: "Button.tsx",
  card: "Card.tsx",
  badge: "Badge.tsx",
  input: "Input.tsx",
  table: "Table.tsx",
  tabs: "Tabs.tsx",
  switch: "Switch.tsx",
  modal: "Modal.tsx",
  container: "Container.tsx",
  layout: "Layout.tsx"
};
var BLOCK_MAP = {
  "realtime-chart": { file: "RealtimeChartBlock.tsx", deps: ["card", "button", "badge"] },
  "interactive-chat": { file: "InteractiveChatBlock.tsx", deps: ["card", "input", "button", "badge"] },
  "pricing-table": { file: "PricingPlanBlock.tsx", deps: ["card", "button", "badge"] },
  "card-list": { file: "CardListBlock.tsx", deps: ["card", "input", "button", "badge"] },
  "interactive-slider": { file: "SliderShowcaseBlock.tsx", deps: ["card", "button", "badge"] },
  "metric-stats": { file: "MetricStatsBlock.tsx", deps: ["card", "badge"] },
  "file-explorer": { file: "FileExplorerBlock.tsx", deps: ["card", "button", "badge"] }
};
function handleAdd(name) {
  if (!name) {
    console.error("\n\u274C Please specify an item to add. Example: npx atomsystem add button\n");
    handleList();
    return;
  }
  const cwd = process.cwd();
  const normalized = name.toLowerCase().trim();
  if (COMPONENT_MAP[normalized]) {
    const fileName = COMPONENT_MAP[normalized];
    const src = path__default.default.join(PKG_ROOT, "components", "ui", fileName);
    const dest = path__default.default.join(cwd, "components", "ui", fileName);
    if (fs__default.default.existsSync(src)) {
      copyFileSafe(src, dest, `Component (${fileName})`);
      console.log(`
\u2705 Added ${normalized} component to components/ui/${fileName}
`);
    } else {
      console.error(`
\u274C Source component file not found: ${src}
`);
    }
    return;
  }
  if (BLOCK_MAP[normalized]) {
    const { file, deps } = BLOCK_MAP[normalized];
    console.log(`
\u{1F4E6} Adding block "${normalized}" and its dependent components...
`);
    deps.forEach((dep) => {
      const depFile = COMPONENT_MAP[dep];
      if (depFile) {
        const srcDep = path__default.default.join(PKG_ROOT, "components", "ui", depFile);
        const destDep = path__default.default.join(cwd, "components", "ui", depFile);
        if (fs__default.default.existsSync(srcDep)) {
          copyFileSafe(srcDep, destDep, `Dependent Component (${depFile})`);
        }
      }
    });
    const srcBlock = path__default.default.join(PKG_ROOT, "components", "blocks", file);
    const destBlock = path__default.default.join(cwd, "components", "blocks", file);
    if (fs__default.default.existsSync(srcBlock)) {
      copyFileSafe(srcBlock, destBlock, `Block (${file})`);
      console.log(`
\u2705 Block "${normalized}" successfully added to components/blocks/${file}
`);
    } else {
      console.error(`
\u274C Source block file not found: ${srcBlock}
`);
    }
    return;
  }
  console.error(`
\u274C Unknown item: "${name}".`);
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
function showHelp() {
  console.log(`
AtomSystem CLI - Universal Design Token & Agentic UI System

Usage:
  npx atomsystem <command> [options]

Commands:
  init            Initialize AI guidelines, tokens, specs, and CSS in your project
  add <name>      Add a component or block directly to your project
  list            List all available components and blocks
  help            Display this help message
  version         Print version info
`);
}
function showVersion() {
  const pkgPath = path__default.default.join(PKG_ROOT, "package.json");
  if (fs__default.default.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs__default.default.readFileSync(pkgPath, "utf-8"));
    console.log(`atomsystem v${pkg.version}`);
  } else {
    console.log("atomsystem v0.4.3");
  }
}
switch (command) {
  case "init":
    handleInit();
    break;
  case "add":
    handleAdd(targetName);
    break;
  case "list":
    handleList();
    break;
  case "version":
  case "-v":
  case "--version":
    showVersion();
    break;
  case "help":
  case "-h":
  case "--help":
  default:
    showHelp();
    break;
}
//# sourceMappingURL=cli.cjs.map
//# sourceMappingURL=cli.cjs.map