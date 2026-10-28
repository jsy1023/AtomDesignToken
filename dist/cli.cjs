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
function copyFileSafe(src, dest, label) {
  const targetDir = path__default.default.dirname(dest);
  if (!fs__default.default.existsSync(targetDir)) {
    fs__default.default.mkdirSync(targetDir, { recursive: true });
  }
  fs__default.default.copyFileSync(src, dest);
  console.log(`  \u2713 Created ${label} -> ${path__default.default.relative(process.cwd(), dest)}`);
}
function handleInit() {
  const cwd = process.cwd();
  console.log("\n\u{1F680} Initializing AtomSystem in your project...\n");
  const srcSkill = path__default.default.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  const destSkill = path__default.default.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md");
  if (fs__default.default.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, destSkill, "AI Skill (.agents/skills/atomsystem/SKILL.md)");
  }
  const srcDesign = path__default.default.join(PKG_ROOT, "presets", "default.design.md");
  const destDesign = path__default.default.join(cwd, "atom.design.md");
  if (fs__default.default.existsSync(srcDesign)) {
    copyFileSafe(srcDesign, destDesign, "Design Guide (atom.design.md)");
  }
  const srcPattern = path__default.default.join(PKG_ROOT, "presets", "uxPattern.md");
  const destPattern = path__default.default.join(cwd, "atom.uxPattern.md");
  if (fs__default.default.existsSync(srcPattern)) {
    copyFileSafe(srcPattern, destPattern, "UX Pattern Guide (atom.uxPattern.md)");
  }
  const srcToken = path__default.default.join(PKG_ROOT, "tokens", "token.json");
  const destToken = path__default.default.join(cwd, "tokens", "token.json");
  if (fs__default.default.existsSync(srcToken)) {
    copyFileSafe(srcToken, destToken, "Token JSON (tokens/token.json)");
  }
  console.log("\n\u2728 AtomSystem initialization completed!");
  console.log("\n\u{1F4CC} Next Steps:");
  console.log("1. Import AtomSystem CSS in your app (e.g. layout.tsx, App.vue, index.html):");
  console.log('   import "atomsystem/css/atom-ui.css";');
  console.log("2. Ask your AI coding assistant (Antigravity, Cursor, Copilot) to build UI:");
  console.log('   "atom.design.md\uC640 atom.uxPattern.md\uB97C \uCC38\uACE0\uD558\uC5EC \uACB0\uC81C \uD654\uBA74 \uCEF4\uD3EC\uB10C\uD2B8\uB97C \uB9CC\uB4E4\uC5B4\uC918."\n');
}
function showHelp() {
  console.log(`
AtomSystem CLI - Universal Design Token & Agentic UI System

Usage:
  npx atomsystem <command> [options]

Commands:
  init         Initialize AtomSystem assets (AI Skill, design.md, uxPattern.md, token.json)
  help         Display this help message
  version      Print version info
`);
}
function showVersion() {
  const pkgPath = path__default.default.join(PKG_ROOT, "package.json");
  if (fs__default.default.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs__default.default.readFileSync(pkgPath, "utf-8"));
    console.log(`atomsystem v${pkg.version}`);
  } else {
    console.log("atomsystem v0.1.48");
  }
}
switch (command) {
  case "init":
    handleInit();
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