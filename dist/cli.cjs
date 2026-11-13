#!/usr/bin/env node
'use strict';

var fs2 = require('fs');
var path2 = require('path');
var url = require('url');
var http = require('http');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fs2__default = /*#__PURE__*/_interopDefault(fs2);
var path2__default = /*#__PURE__*/_interopDefault(path2);
var http__default = /*#__PURE__*/_interopDefault(http);

// src/tokenCompiler.ts
function compileTokensToCss(tokenJson) {
  const cssVars = [];
  function traverse(obj) {
    if (!obj || typeof obj !== "object") return;
    if (obj.variable && obj.$value !== void 0) {
      cssVars.push(`  ${obj.variable}: ${obj.$value};`);
      return;
    }
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$")) continue;
      traverse(obj[key]);
    }
  }
  traverse(tokenJson);
  return `:root {
${cssVars.join("\n")}
}
`;
}

// src/studioServer.ts
function startLocalTokenStudio(options = {}) {
  const port = options.port || 4e3;
  const cwd = options.cwd || process.cwd();
  const tokenJsonPath = path2__default.default.join(cwd, "tokens", "token.json");
  const cssPath = path2__default.default.join(cwd, "css", "atom-ui.css");
  path2__default.default.join(cwd, "atom.design.md");
  const server = http__default.default.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }
    const url = new URL(req.url || "/", `http://localhost:${port}`);
    if (url.pathname === "/api/tokens" && req.method === "GET") {
      let data = {};
      if (fs2__default.default.existsSync(tokenJsonPath)) {
        try {
          data = JSON.parse(fs2__default.default.readFileSync(tokenJsonPath, "utf-8"));
        } catch (e) {
          data = { error: "Failed to parse tokens/token.json" };
        }
      }
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(data));
      return;
    }
    if (url.pathname === "/api/tokens" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const newTokens = JSON.parse(body);
          const tokensDir = path2__default.default.dirname(tokenJsonPath);
          if (!fs2__default.default.existsSync(tokensDir)) fs2__default.default.mkdirSync(tokensDir, { recursive: true });
          fs2__default.default.writeFileSync(tokenJsonPath, JSON.stringify(newTokens, null, 2), "utf-8");
          const compiledCss = compileTokensToCss(newTokens);
          const cssDir = path2__default.default.dirname(cssPath);
          if (!fs2__default.default.existsSync(cssDir)) fs2__default.default.mkdirSync(cssDir, { recursive: true });
          fs2__default.default.writeFileSync(cssPath, compiledCss, "utf-8");
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ success: true, message: "Tokens and CSS compiled successfully!" }));
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }
    if (url.pathname === "/" || url.pathname === "/index.html") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(getStudioHtml());
      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  });
  server.listen(port, () => {
    console.log(`
\u{1F3A8} AtomSystem Local Token Studio running at:`);
    console.log(`   \u{1F449} http://localhost:${port}
`);
    console.log(`   Tokens file: ${path2__default.default.relative(cwd, tokenJsonPath)}`);
    console.log(`   Compiled CSS: ${path2__default.default.relative(cwd, cssPath)}`);
    console.log(`
Press Ctrl+C to stop the studio server.
`);
  });
  return server;
}
function getStudioHtml() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AtomSystem Local Token Studio</title>
  <style>
    :root {
      --bg: #0a0a0a;
      --card-bg: #141414;
      --border: #262626;
      --text: #ededed;
      --muted: #888888;
      --accent: #3182f6;
      --radius: 8px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Pretendard, sans-serif;
      padding: 32px 20px;
      line-height: 1.5;
    }
    .container { max-width: 1100px; margin: 0 auto; }
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 32px;
    }
    h1 { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
    p.desc { font-size: 13px; color: var(--muted); margin-top: 4px; }
    .badge {
      font-size: 11px;
      font-family: monospace;
      padding: 3px 8px;
      background: #1a1a1a;
      border: 1px solid var(--border);
      border-radius: 4px;
      color: var(--muted);
    }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    @media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
    }
    h2 { font-size: 15px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
    .field { margin-bottom: 16px; }
    label { display: block; font-size: 12px; font-weight: 500; margin-bottom: 6px; color: var(--text); }
    .meta { font-size: 11px; color: var(--muted); font-family: monospace; margin-top: 4px; }
    .input-row { display: flex; gap: 8px; align-items: center; }
    input[type="text"], select {
      flex: 1;
      background: #1e1e1e;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 8px 12px;
      font-size: 13px;
      border-radius: 6px;
      outline: none;
    }
    input[type="color"] {
      -webkit-appearance: none;
      border: 1px solid var(--border);
      width: 38px;
      height: 38px;
      border-radius: 6px;
      background: none;
      cursor: pointer;
      padding: 2px;
    }
    .btn-save {
      background: var(--text);
      color: var(--bg);
      border: none;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .btn-save:hover { opacity: 0.9; }
    .preview-box {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      background: #0f0f0f;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .preview-btn {
      padding: 10px 18px;
      border-radius: var(--sample-radius, 8px);
      background: var(--sample-primary, #3182f6);
      color: #ffffff;
      border: none;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .preview-card {
      padding: 16px;
      border-radius: var(--sample-radius, 8px);
      background: var(--sample-surface, #18181b);
      border: 1px solid var(--border);
      color: var(--text);
      font-size: 13px;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #10b981;
      color: #000;
      padding: 10px 18px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <div class="badge" style="margin-bottom: 8px; display: inline-block;">W3C DTCG Zero-Runtime</div>
        <h1>AtomSystem Local Token Studio</h1>
        <p class="desc">\uB85C\uCEEC \uD658\uACBD(tokens/token.json)\uC758 \uD1A0\uD070\uC744 GUI\uB85C \uC9C1\uC811 \uC218\uC815\uD558\uACE0 \uC2E4\uC2DC\uAC04\uC73C\uB85C css/atom-ui.css\uB85C \uC7AC\uCEF4\uD30C\uC77C\uD569\uB2C8\uB2E4.</p>
      </div>
      <button class="btn-save" onclick="saveTokens()">\uC800\uC7A5 \uBC0F CSS \uC7AC\uCEF4\uD30C\uC77C</button>
    </header>

    <div class="grid">
      <!-- 1. Color Tokens -->
      <div class="card">
        <h2>\u{1F3A8} \uC2DC\uB9E8\uD2F1 \uBE0C\uB79C\uB4DC & \uC11C\uD53C\uC2A4 \uD1A0\uD070</h2>
        
        <div class="field">
          <label>\uBE0C\uB79C\uB4DC \uB300\uD45C \uC0C9\uC0C1 (Primary Color)</label>
          <div class="input-row">
            <input type="color" id="picker-primary" oninput="onColorChange('primary', this.value)">
            <input type="text" id="val-primary" oninput="onColorChange('primary', this.value)">
          </div>
          <div class="meta">var(--atom-color-primary)</div>
        </div>

        <div class="field">
          <label>\uD638\uBC84 \uC0C1\uD0DC \uC0C9\uC0C1 (Primary Hover)</label>
          <div class="input-row">
            <input type="color" id="picker-primary-hover" oninput="onColorChange('primary-hover', this.value)">
            <input type="text" id="val-primary-hover" oninput="onColorChange('primary-hover', this.value)">
          </div>
          <div class="meta">var(--atom-color-primary-hover)</div>
        </div>

        <div class="field">
          <label>\uC11C\uD53C\uC2A4 \uBC30\uACBD (Surface Background)</label>
          <div class="input-row">
            <input type="color" id="picker-bg-surface" oninput="onColorChange('bg-surface', this.value)">
            <input type="text" id="val-bg-surface" oninput="onColorChange('bg-surface', this.value)">
          </div>
          <div class="meta">var(--atom-bg-surface)</div>
        </div>

        <div class="field">
          <label>\uAE30\uBCF8 \uBAA8\uC11C\uB9AC \uACE1\uB960 (Border Radius)</label>
          <select id="val-radius" onchange="onRadiusChange(this.value)">
            <option value="4px">4px (Sharp Minimal)</option>
            <option value="6px">6px (Swiss Modern)</option>
            <option value="8px">8px (Standard Clean)</option>
            <option value="12px">12px (Rounded Friendly)</option>
            <option value="16px">16px (Toss Soft)</option>
          </select>
          <div class="meta">var(--atom-radius-md)</div>
        </div>
      </div>

      <!-- 2. Live Previewer -->
      <div class="card">
        <h2>\u26A1 \uC2E4\uC2DC\uAC04 \uD1A0\uD070 \uBC18\uC601 \uD504\uB9AC\uBDF0</h2>
        <div class="preview-box" id="preview-box">
          <div class="preview-card" id="sample-card">
            <div style="font-weight: 600; margin-bottom: 4px;">\uB300\uC2DC\uBCF4\uB4DC \uC704\uC82F \uCEF4\uD3EC\uB10C\uD2B8</div>
            <div style="color: var(--muted); font-size: 12px; margin-bottom: 14px;">
              \uD1A0\uD070 \uBCC0\uACBD \uC2DC \uC2E4\uC2DC\uAC04\uC73C\uB85C \uB514\uC790\uC778\uC774 \uBC18\uC601\uB418\uBA70 \uC989\uC2DC CSS \uD30C\uC77C\uC5D0 \uB3D9\uAE30\uD654\uB429\uB2C8\uB2E4.
            </div>
            <button class="preview-btn" id="sample-btn">\uD655\uC778 \uBC0F \uC2B9\uC778</button>
          </div>

          <div style="font-size: 11px; font-family: monospace; color: var(--muted); background: #161616; padding: 12px; border-radius: 6px; border: 1px solid var(--border);">
            <div>// \uCEF4\uD30C\uC77C \uB300\uC0C1 \uD30C\uC77C</div>
            <div style="color: #60a5fa; margin-top: 4px;">tokens/token.json (W3C DTCG)</div>
            <div style="color: #34d399; margin-top: 2px;">css/atom-ui.css (0KB Pure CSS)</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast">\u2713 \uD1A0\uD070 \uBC0F CSS\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC7AC\uCEF4\uD30C\uC77C\uB418\uC5C8\uC2B5\uB2C8\uB2E4!</div>

  <script>
    let currentTokens = {};

    async function loadTokens() {
      try {
        const res = await fetch('/api/tokens');
        currentTokens = await res.json();
        populateFields();
        updatePreview();
      } catch (e) {
        console.error('Failed to fetch tokens', e);
      }
    }

    function populateFields() {
      const primary = currentTokens?.color?.brand?.['color-primary']?.$value || '#3182f6';
      const hover = currentTokens?.color?.brand?.['color-primary-hover']?.$value || '#1b64da';
      const surface = currentTokens?.color?.surface?.['bg-surface']?.$value || '#18181b';
      const radius = currentTokens?.borderRadius?.md?.$value || '8px';

      document.getElementById('picker-primary').value = primary.startsWith('#') ? primary : '#3182f6';
      document.getElementById('val-primary').value = primary;

      document.getElementById('picker-primary-hover').value = hover.startsWith('#') ? hover : '#1b64da';
      document.getElementById('val-primary-hover').value = hover;

      document.getElementById('picker-bg-surface').value = surface.startsWith('#') ? surface : '#18181b';
      document.getElementById('val-bg-surface').value = surface;

      document.getElementById('val-radius').value = radius;
    }

    function onColorChange(key, val) {
      if (!currentTokens.color) currentTokens.color = {};
      if (key === 'primary') {
        document.getElementById('picker-primary').value = val.startsWith('#') ? val : '#3182f6';
        document.getElementById('val-primary').value = val;
        if (!currentTokens.color.brand) currentTokens.color.brand = {};
        if (!currentTokens.color.brand['color-primary']) currentTokens.color.brand['color-primary'] = { variable: '--atom-color-primary' };
        currentTokens.color.brand['color-primary'].$value = val;
      }
      if (key === 'primary-hover') {
        document.getElementById('picker-primary-hover').value = val.startsWith('#') ? val : '#1b64da';
        document.getElementById('val-primary-hover').value = val;
        if (!currentTokens.color.brand) currentTokens.color.brand = {};
        if (!currentTokens.color.brand['color-primary-hover']) currentTokens.color.brand['color-primary-hover'] = { variable: '--atom-color-primary-hover' };
        currentTokens.color.brand['color-primary-hover'].$value = val;
      }
      if (key === 'bg-surface') {
        document.getElementById('picker-bg-surface').value = val.startsWith('#') ? val : '#18181b';
        document.getElementById('val-bg-surface').value = val;
        if (!currentTokens.color.surface) currentTokens.color.surface = {};
        if (!currentTokens.color.surface['bg-surface']) currentTokens.color.surface['bg-surface'] = { variable: '--atom-bg-surface' };
        currentTokens.color.surface['bg-surface'].$value = val;
      }
      updatePreview();
    }

    function onRadiusChange(val) {
      if (!currentTokens.borderRadius) currentTokens.borderRadius = {};
      if (!currentTokens.borderRadius.md) currentTokens.borderRadius.md = { variable: '--atom-radius-md' };
      currentTokens.borderRadius.md.$value = val;
      updatePreview();
    }

    function updatePreview() {
      const primary = document.getElementById('val-primary').value;
      const surface = document.getElementById('val-bg-surface').value;
      const radius = document.getElementById('val-radius').value;

      const btn = document.getElementById('sample-btn');
      const card = document.getElementById('sample-card');

      btn.style.backgroundColor = primary;
      btn.style.borderRadius = radius;
      card.style.backgroundColor = surface;
      card.style.borderRadius = radius;
    }

    async function saveTokens() {
      try {
        const res = await fetch('/api/tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentTokens)
        });
        const result = await res.json();
        if (result.success) {
          showToast();
        } else {
          alert('\uC800\uC7A5 \uC2E4\uD328: ' + result.error);
        }
      } catch (e) {
        alert('\uC11C\uBC84 \uD1B5\uC2E0 \uC624\uB958: ' + e.message);
      }
    }

    function showToast() {
      const toast = document.getElementById('toast');
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }

    loadTokens();
  </script>
</body>
</html>`;
}

// src/cli.ts
function getPkgRoot() {
  try {
    if (typeof __dirname !== "undefined") {
      return path2__default.default.resolve(__dirname, "..");
    }
    const currentFile = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('cli.cjs', document.baseURI).href)));
    return path2__default.default.resolve(path2__default.default.dirname(currentFile), "..");
  } catch {
    return process.cwd();
  }
}
var PKG_ROOT = getPkgRoot();
var args = process.argv.slice(2);
var command = args[0] || "help";
var targetName = args[1];
function copyFileSafe(src, dest, label) {
  const targetDir = path2__default.default.dirname(dest);
  if (!fs2__default.default.existsSync(targetDir)) {
    fs2__default.default.mkdirSync(targetDir, { recursive: true });
  }
  fs2__default.default.copyFileSync(src, dest);
  console.log(`  \u2713 ${label} -> ${path2__default.default.relative(process.cwd(), dest)}`);
}
function handleInit() {
  const cwd = process.cwd();
  console.log("\n\u{1F680} Initializing AtomSystem Universal Design System...\n");
  const srcAgentGuide = path2__default.default.join(PKG_ROOT, "presets", "agents.guide.md");
  if (fs2__default.default.existsSync(srcAgentGuide)) {
    copyFileSafe(srcAgentGuide, path2__default.default.join(cwd, "AGENTS.md"), "Universal AI Guide (AGENTS.md)");
    copyFileSafe(srcAgentGuide, path2__default.default.join(cwd, "CLAUDE.md"), "Claude Code Guidelines (CLAUDE.md)");
    copyFileSafe(srcAgentGuide, path2__default.default.join(cwd, ".cursorrules"), "Cursor Rules (.cursorrules)");
  }
  const srcSkill = path2__default.default.join(PKG_ROOT, "skills", "atomsystem.skill.md");
  if (fs2__default.default.existsSync(srcSkill)) {
    copyFileSafe(srcSkill, path2__default.default.join(cwd, ".agents", "skills", "atomsystem", "SKILL.md"), "Agent Skill (.agents/skills/atomsystem/SKILL.md)");
  }
  const specs = [
    { src: path2__default.default.join(PKG_ROOT, "presets", "default.design.md"), dest: path2__default.default.join(cwd, "atom.design.md"), label: "Design Tokens (atom.design.md)" },
    { src: path2__default.default.join(PKG_ROOT, "presets", "components.md"), dest: path2__default.default.join(cwd, "atom.components.md"), label: "Components Spec (atom.components.md)" },
    { src: path2__default.default.join(PKG_ROOT, "presets", "blocks.md"), dest: path2__default.default.join(cwd, "atom.blocks.md"), label: "Design Blocks Spec (atom.blocks.md)" },
    { src: path2__default.default.join(PKG_ROOT, "presets", "uxPattern.md"), dest: path2__default.default.join(cwd, "atom.uxPattern.md"), label: "UX Patterns (atom.uxPattern.md)" }
  ];
  specs.forEach((s) => {
    if (fs2__default.default.existsSync(s.src)) {
      copyFileSafe(s.src, s.dest, s.label);
    }
  });
  const srcToken = path2__default.default.join(PKG_ROOT, "tokens", "token.json");
  if (fs2__default.default.existsSync(srcToken)) {
    copyFileSafe(srcToken, path2__default.default.join(cwd, "tokens", "token.json"), "W3C DTCG Token JSON (tokens/token.json)");
  }
  const srcCss = path2__default.default.join(PKG_ROOT, "css", "atom-ui.css");
  if (fs2__default.default.existsSync(srcCss)) {
    copyFileSafe(srcCss, path2__default.default.join(cwd, "css", "atom-ui.css"), "Zero-Runtime Semantic CSS (css/atom-ui.css)");
  }
  console.log("\n\u2728 AtomSystem initialization completed successfully!");
  console.log("\n\u{1F3A8} Local Token Studio Available:");
  console.log('  Run "npx atomsystem studio" to launch the local web customizer GUI.');
  console.log("  You can visually edit tokens and immediately recompile css/atom-ui.css.");
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
    const src = path2__default.default.join(PKG_ROOT, "components", "ui", fileName);
    const dest = path2__default.default.join(cwd, "components", "ui", fileName);
    if (fs2__default.default.existsSync(src)) {
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
        const srcDep = path2__default.default.join(PKG_ROOT, "components", "ui", depFile);
        const destDep = path2__default.default.join(cwd, "components", "ui", depFile);
        if (fs2__default.default.existsSync(srcDep)) {
          copyFileSafe(srcDep, destDep, `Dependent Component (${depFile})`);
        }
      }
    });
    const srcBlock = path2__default.default.join(PKG_ROOT, "components", "blocks", file);
    const destBlock = path2__default.default.join(cwd, "components", "blocks", file);
    if (fs2__default.default.existsSync(srcBlock)) {
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
function handleBuildTokens() {
  const cwd = process.cwd();
  const tokenJsonPath = path2__default.default.join(cwd, "tokens", "token.json");
  const cssPath = path2__default.default.join(cwd, "css", "atom-ui.css");
  if (!fs2__default.default.existsSync(tokenJsonPath)) {
    console.error(`
\u274C tokens/token.json not found at ${tokenJsonPath}. Run 'npx atomsystem init' first.
`);
    return;
  }
  try {
    const tokens = JSON.parse(fs2__default.default.readFileSync(tokenJsonPath, "utf-8"));
    const css = compileTokensToCss(tokens);
    const cssDir = path2__default.default.dirname(cssPath);
    if (!fs2__default.default.existsSync(cssDir)) fs2__default.default.mkdirSync(cssDir, { recursive: true });
    fs2__default.default.writeFileSync(cssPath, css, "utf-8");
    console.log(`
\u2728 Successfully compiled tokens to ${path2__default.default.relative(cwd, cssPath)}!
`);
  } catch (err) {
    console.error(`
\u274C Failed to compile tokens: ${err.message}
`);
  }
}
function handleStudio() {
  const portArg = args.find((a) => a.startsWith("--port="));
  const port = portArg ? parseInt(portArg.split("=")[1], 10) : 4e3;
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
  const pkgPath = path2__default.default.join(PKG_ROOT, "package.json");
  if (fs2__default.default.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs2__default.default.readFileSync(pkgPath, "utf-8"));
    console.log(`atomsystem v${pkg.version}`);
  } else {
    console.log("atomsystem v0.6.4");
  }
}
switch (command) {
  case "init":
    handleInit();
    break;
  case "studio":
  case "editor":
    handleStudio();
    break;
  case "build:tokens":
  case "compile":
    handleBuildTokens();
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