#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

function copyFileSafe(src: string, dest: string, label: string) {
  const targetDir = path.dirname(dest);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`  ✓ Created ${label} -> ${path.relative(process.cwd(), dest)}`);
}

function handleInit() {
  const cwd = process.cwd();
  console.log('\n🚀 Initializing AtomSystem in your project...\n');

  // 1. Install AI Agent Skill
  const srcSkill = path.join(PKG_ROOT, 'skills', 'atomsystem.skill.md');
  const destSkill = path.join(cwd, '.agents', 'skills', 'atomsystem', 'SKILL.md');
  if (fs.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, destSkill, 'AI Skill (.agents/skills/atomsystem/SKILL.md)');
  }

  // 2. Install Design Guide (.design.md)
  const srcDesign = path.join(PKG_ROOT, 'presets', 'default.design.md');
  const destDesign = path.join(cwd, 'atom.design.md');
  if (fs.existsSync(srcDesign)) {
    copyFileSafe(srcDesign, destDesign, 'Design Guide (atom.design.md)');
  }

  // 3. Install UX Pattern Guide (.uxPattern.md)
  const srcPattern = path.join(PKG_ROOT, 'presets', 'uxPattern.md');
  const destPattern = path.join(cwd, 'atom.uxPattern.md');
  if (fs.existsSync(srcPattern)) {
    copyFileSafe(srcPattern, destPattern, 'UX Pattern Guide (atom.uxPattern.md)');
  }

  // 4. Install Token JSON (tokens.json)
  const srcToken = path.join(PKG_ROOT, 'tokens', 'token.json');
  const destToken = path.join(cwd, 'tokens', 'token.json');
  if (fs.existsSync(srcToken)) {
    copyFileSafe(srcToken, destToken, 'Token JSON (tokens/token.json)');
  }

  console.log('\n✨ AtomSystem initialization completed!');
  console.log('\n📌 Next Steps:');
  console.log('1. Import AtomSystem CSS in your app (e.g. layout.tsx, App.vue, index.html):');
  console.log('   import "atomsystem/css/atom-ui.css";');
  console.log('2. Ask your AI coding assistant (Antigravity, Cursor, Copilot) to build UI:');
  console.log('   "atom.design.md와 atom.uxPattern.md를 참고하여 결제 화면 컴포넌트를 만들어줘."\n');
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
  const pkgPath = path.join(PKG_ROOT, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    console.log(`atomsystem v${pkg.version}`);
  } else {
    console.log('atomsystem v0.1.48');
  }
}

switch (command) {
  case 'init':
    handleInit();
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

