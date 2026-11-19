import http from 'http';
import fs from 'fs';
import path from 'path';
import { compileTokensToCss } from './tokenCompiler';
import {
  AI_COMPONENT_SUBMISSION_TEMPLATE,
  buildAiComponentSubmissionPrompt,
  StudioRegistry,
} from '../lib/data/studioData';
import {
  loadProjectRegistry,
  saveProjectRegistry,
  submitComponentSpec,
} from '../lib/services/studioRegistryServer';

function readRequestBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function sendJson(res: http.ServerResponse, statusCode: number, data: unknown) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

export function startLocalTokenStudio(options: { port?: number; cwd?: string } = {}) {
  const port = options.port || 4000;
  const cwd = options.cwd || process.cwd();

  const tokenJsonPath = path.join(cwd, 'tokens', 'tokens.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');
  const registryPath = path.join(cwd, 'tokens', 'tokens.json');

  const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    const url = new URL(req.url || '/', `http://localhost:${port}`);

    // 1. SSOT Studio Registry API
    if (url.pathname === '/api/studio/registry' && req.method === 'GET') {
      try {
        const result = loadProjectRegistry(cwd);
        sendJson(res, 200, {
          ...result,
          syncedAt: new Date().toISOString(),
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        sendJson(res, 500, { error: msg });
      }
      return;
    }

    // 2. Save Full Studio Registry (tokens/tokens.json + tokens/tokens.json + css/atom-ui.css)
    if (url.pathname === '/api/studio/save' && req.method === 'POST') {
      try {
        const raw = await readRequestBody(req);
        const body = JSON.parse(raw || '{}') as {
          registry?: StudioRegistry;
          tokensJson?: unknown;
          cssString?: string;
        };

        if (body.registry && typeof body.registry === 'object') {
          const formattedTokens =
            typeof body.tokensJson === 'string'
              ? body.tokensJson
              : body.tokensJson
              ? JSON.stringify(body.tokensJson, null, 2)
              : undefined;
          const result = saveProjectRegistry(cwd, body.registry, {
            tokensJson: formattedTokens,
            cssString: typeof body.cssString === 'string' ? body.cssString : undefined,
          });
          sendJson(res, 200, {
            success: true,
            filesWritten: result.filesWritten,
            registry: result.registry,
          });
          return;
        }

        sendJson(res, 400, { success: false, error: 'Missing registry payload.' });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Invalid JSON payload';
        sendJson(res, 400, { success: false, error: msg });
      }
      return;
    }

    // 3. Submit Standardized AI Component Spec -> Scaffolds components/ui/<Name>.tsx + updates SSOT
    if (url.pathname === '/api/studio/components' && req.method === 'POST') {
      try {
        const raw = await readRequestBody(req);
        const parsed = JSON.parse(raw || '{}');
        const spec = parsed?.spec && typeof parsed.spec === 'object' ? parsed.spec : parsed;
        const result = submitComponentSpec(cwd, spec);
        sendJson(res, result.success ? 200 : 400, result);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Invalid component JSON';
        sendJson(res, 400, { success: false, errors: [msg] });
      }
      return;
    }

    // 4. Auto-discover components/ui/* and recompile artifacts
    if (url.pathname === '/api/studio/sync' && req.method === 'POST') {
      try {
        const loaded = loadProjectRegistry(cwd);
        const saved = saveProjectRegistry(cwd, loaded.registry);
        sendJson(res, 200, {
          success: true,
          componentCount: saved.registry.components.length,
          discoveredFiles: loaded.discoveredFiles,
          filesWritten: saved.filesWritten,
          registry: saved.registry,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Sync failed';
        sendJson(res, 500, { success: false, error: msg });
      }
      return;
    }

    // 5. Backward-Compatible Tokens API (GET / POST)
    if (url.pathname === '/api/tokens' && req.method === 'GET') {
      let data: Record<string, unknown> = {};
      if (fs.existsSync(tokenJsonPath)) {
        try {
          data = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf-8'));
        } catch {
          data = { error: 'Failed to parse tokens/tokens.json' };
        }
      }
      sendJson(res, 200, data);
      return;
    }

    if (url.pathname === '/api/tokens' && req.method === 'POST') {
      try {
        const raw = await readRequestBody(req);
        const newTokens = JSON.parse(raw);

        const tokensDir = path.dirname(tokenJsonPath);
        if (!fs.existsSync(tokensDir)) fs.mkdirSync(tokensDir, { recursive: true });
        fs.writeFileSync(tokenJsonPath, JSON.stringify(newTokens, null, 2), 'utf-8');

        const compiledCss = compileTokensToCss(newTokens);
        const cssDir = path.dirname(cssPath);
        if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });

        let fullCss = compiledCss;
        if (fs.existsSync(cssPath)) {
          const existingCss = fs.readFileSync(cssPath, 'utf-8');
          const splitIndex = existingCss.indexOf('/* === Universal Component Classes === */');
          if (splitIndex !== -1) {
            fullCss = `${compiledCss.trimEnd()}\n\n${existingCss.slice(splitIndex)}`;
          }
        }
        fs.writeFileSync(cssPath, fullCss, 'utf-8');

        sendJson(res, 200, {
          success: true,
          message: 'Tokens and CSS compiled successfully (universal classes preserved)!',
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Invalid token JSON';
        sendJson(res, 400, { success: false, error: msg });
      }
      return;
    }

    // 6. Serve Enhanced Local SSOT Studio Web UI
    if (url.pathname === '/' || url.pathname === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(getStudioHtml());
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  });

  server.listen(port, () => {
    console.log(`\n🎨 AtomSystem Local SSOT Studio running at:`);
    console.log(`   👉 http://localhost:${port}\n`);
    console.log(`   Registry SSOT : ${path.relative(cwd, registryPath)}`);
    console.log(`   Tokens file   : ${path.relative(cwd, tokenJsonPath)}`);
    console.log(`   Compiled CSS  : ${path.relative(cwd, cssPath)}`);
    console.log(`\nPress Ctrl+C to stop the studio server.\n`);
  });

  return server;
}

function getStudioHtml(): string {
  const sampleSpecJson = JSON.stringify(AI_COMPONENT_SUBMISSION_TEMPLATE, null, 2)
    .replace(/<\/script/gi, '<\\/script');
  const aiPromptText = JSON.stringify(buildAiComponentSubmissionPrompt('새 UI 컴포넌트'));

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AtomSystem Local SSOT Studio</title>
  <link rel="stylesheet" href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css">
  <style>
    :root {
      --bg: #ffffff;
      --card-bg: #f8fafc;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --muted: #64748b;
      --accent: #3182f6;
      --success: #10b981;
      --danger: #ef4444;
      --radius: 10px;
      --font-sans: 'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0a0a0a;
        --card-bg: #141414;
        --surface: #1b1b1e;
        --border: #27272a;
        --text: #ededed;
        --muted: #a1a1aa;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      line-height: 1.5;
    }
    .shell { max-width: 1280px; margin: 0 auto; padding: 24px 20px; }
    header {
      display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;
      padding-bottom: 18px; border-bottom: 1px solid var(--border); margin-bottom: 20px;
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .badge {
      font-size: 11px; font-family: monospace; padding: 3px 8px;
      background: color-mix(in srgb, var(--accent) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
      border-radius: 6px; color: var(--accent); font-weight: 700;
    }
    h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    p.desc { font-size: 12px; color: var(--muted); }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .btn {
      padding: 8px 14px; border-radius: 8px; font-size: 12px; font-weight: 600;
      cursor: pointer; border: 1px solid var(--border); background: var(--surface); color: var(--text);
      font-family: inherit; transition: opacity 0.15s, border-color 0.15s;
    }
    .btn:hover { border-color: var(--accent); }
    .btn-primary { background: var(--accent); color: #ffffff; border-color: var(--accent); }
    .tabs {
      display: inline-flex; gap: 6px; padding: 4px; border-radius: 10px;
      background: var(--card-bg); border: 1px solid var(--border); margin-bottom: 20px;
    }
    .tab-btn {
      padding: 7px 14px; border-radius: 7px; border: none; background: transparent;
      color: var(--muted); font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit;
    }
    .tab-btn.active { background: var(--accent); color: #ffffff; }
    .studio-grid { display: grid; grid-template-columns: 280px 1fr; gap: 20px; align-items: start; }
    @media (max-width: 860px) { .studio-grid { grid-template-columns: 1fr; } }
    .panel {
      background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px;
    }
    .comp-list { display: flex; flex-direction: column; gap: 4px; max-height: 580px; overflow-y: auto; }
    .comp-item {
      width: 100%; text-align: left; padding: 9px 12px; border-radius: 7px;
      border: 1px solid transparent; background: transparent; color: var(--text);
      font-size: 12px; font-weight: 500; cursor: pointer; display: flex; justify-content: space-between;
      font-family: inherit;
    }
    .comp-item:hover { background: var(--surface); border-color: var(--border); }
    .comp-item.active { background: var(--accent); color: #ffffff; font-weight: 700; }
    .meta-mono { font-family: monospace; font-size: 11px; color: var(--muted); }
    .comp-item.active .meta-mono { color: rgba(255,255,255,0.85); }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; margin-top: 12px; }
    .spec-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px;
    }
    .spec-title { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
    .spec-sub { font-size: 11px; color: var(--muted); }
    .field { margin-bottom: 14px; }
    label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px; }
    input[type="text"], textarea, select {
      width: 100%; background: var(--surface); border: 1px solid var(--border); color: var(--text);
      padding: 9px 12px; font-size: 12px; border-radius: 8px; font-family: inherit;
    }
    textarea { font-family: monospace; min-height: 300px; line-height: 1.5; }
    .toast {
      position: fixed; bottom: 20px; right: 20px; background: var(--success); color: #ffffff;
      padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; display: none;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 99;
    }
    .hidden { display: none; }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <div>
        <div class="brand">
          <span class="badge">SSOT · Spoqa Han Sans Neo</span>
          <h1>AtomSystem Local Component &amp; Token Studio</h1>
        </div>
        <p class="desc">프로젝트 전체 컴포넌트 레지스트리(tokens/tokens.json), AI 컴포넌트 제출·자동 생성, CSS 컴파일을 통합 관리합니다.</p>
      </div>
      <div class="actions">
        <button class="btn" onclick="syncRegistry()">🔄 components/ui 자동 스캔 동기화</button>
        <button class="btn btn-primary" onclick="saveRegistry()">💾 프로젝트에 즉시 반영 (SSOT 저장)</button>
      </div>
    </header>

    <div class="tabs">
      <button class="tab-btn active" id="tab-btn-components" onclick="switchTab('components')">🧩 컴포넌트 레지스트리 (<span id="comp-count">0</span>)</button>
      <button class="tab-btn" id="tab-btn-submit" onclick="switchTab('submit')">🤖 AI 컴포넌트 양식 제출</button>
      <button class="tab-btn" id="tab-btn-tokens" onclick="switchTab('tokens')">🎛️ 빠른 토큰 &amp; CSS</button>
    </div>

    <!-- TAB 1: Component Registry Inspector -->
    <section id="tab-components" class="studio-grid">
      <div class="panel">
        <div class="field" style="margin-bottom: 10px;">
          <input type="text" id="comp-search" placeholder="컴포넌트 검색..." oninput="renderComponentList()" />
        </div>
        <div class="comp-list" id="comp-list"></div>
      </div>

      <div class="panel" id="comp-detail">
        <p class="desc">좌측 목록에서 컴포넌트를 선택하세요.</p>
      </div>
    </section>

    <!-- TAB 2: AI Component Submission -->
    <section id="tab-submit" class="panel hidden">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <div>
          <h2 style="font-size:15px; font-weight:800;">AI 컴포넌트 명세 제출 (Type · Variable · Status 자동 스캐폴딩)</h2>
          <p class="desc">제출하면 components/ui/&lt;Name&gt;.tsx, index.ts, tokens.json, css/atom-ui.css가 즉시 생성·반영됩니다.</p>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn" onclick="copyAiPrompt()">📋 AI 프롬프트 복사</button>
          <button class="btn" onclick="resetSampleJson()">✨ 샘플 JSON 채우기</button>
        </div>
      </div>

      <div class="field">
        <textarea id="ai-spec-json"></textarea>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <span class="meta-mono" id="submit-status"></span>
        <button class="btn btn-primary" onclick="submitAiComponent()">🚀 등록 &amp; 프로젝트 전체 반영</button>
      </div>
    </section>

    <!-- TAB 3: Quick Global Tokens -->
    <section id="tab-tokens" class="panel hidden">
      <h2 style="font-size:15px; font-weight:800; margin-bottom:12px;">글로벌 시맨틱 토큰 빠른 편집 (tokens/tokens.json)</h2>
      <div class="studio-grid" style="grid-template-columns: 1fr 1fr;">
        <div>
          <div class="field">
            <label>Primary Brand Color (--atom-color-primary)</label>
            <input type="text" id="quick-primary" value="#3182f6" />
          </div>
          <div class="field">
            <label>기본 Radius (--atom-radius-md)</label>
            <input type="text" id="quick-radius" value="8px" />
          </div>
          <button class="btn btn-primary" onclick="saveQuickTokens()">토큰 저장 및 CSS 재컴파일</button>
        </div>
        <div>
          <div class="spec-card">
            <div class="spec-title">SSOT 파일 경로</div>
            <div class="meta-mono" style="margin-top:6px;">
              • tokens/tokens.json<br>
              • tokens/tokens.json<br>
              • css/atom-ui.css<br>
              • components/ui/*.tsx
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div id="toast" class="toast">✓ 완료되었습니다!</div>

  <script>
    const SAMPLE_SPEC = ${sampleSpecJson};
    const AI_PROMPT = ${aiPromptText};
    let registryState = null;
    let selectedCompId = 'button';

    function showToast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => { el.style.display = 'none'; }, 3000);
    }

    function switchTab(name) {
      ['components', 'submit', 'tokens'].forEach((t) => {
        document.getElementById('tab-' + t).classList.toggle('hidden', t !== name);
        document.getElementById('tab-btn-' + t).classList.toggle('active', t === name);
      });
    }

    async function loadRegistry() {
      const res = await fetch('/api/studio/registry');
      const data = await res.json();
      registryState = data.registry;
      document.getElementById('comp-count').textContent = registryState.components.length;
      if (!registryState.components.some((c) => c.id === selectedCompId) && registryState.components[0]) {
        selectedCompId = registryState.components[0].id;
      }
      renderComponentList();
      renderComponentDetail();
    }

    function renderComponentList() {
      if (!registryState) return;
      const q = (document.getElementById('comp-search').value || '').toLowerCase();
      const listEl = document.getElementById('comp-list');
      const items = registryState.components.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
      listEl.innerHTML = items.map((c) =>
        '<button class="comp-item ' + (c.id === selectedCompId ? 'active' : '') + '" onclick="selectComponent(\\'' + c.id + '\\')">' +
          '<span>' + c.name + '</span>' +
          '<span class="meta-mono">' + (c.types ? c.types.length + 'T / ' : '') + c.variables.length + 'V</span>' +
        '</button>'
      ).join('');
    }

    function selectComponent(id) {
      selectedCompId = id;
      renderComponentList();
      renderComponentDetail();
    }

    function renderComponentDetail() {
      if (!registryState) return;
      const comp = registryState.components.find((c) => c.id === selectedCompId);
      const container = document.getElementById('comp-detail');
      if (!comp) return;
      const typesHtml = (comp.types || []).map((t) =>
        '<div class="spec-card"><div class="spec-title">' + t.name + '</div><div class="meta-mono">type="' + t.id + '"</div><p class="spec-sub" style="margin-top:6px;">' + (t.whenToUse || t.description || '') + '</p></div>'
      ).join('') || '<div class="meta-mono">기본 Standard Type 사용</div>';

      const varsHtml = (comp.variables || []).map((v) =>
        '<div class="spec-card"><div class="spec-title">' + v.name + '</div><div class="meta-mono">variable="' + v.id + '"</div><div class="meta-mono" style="margin-top:6px;">' +
          Object.entries(v.tokenBindings || {}).slice(0, 4).map(([k, val]) => k + ': ' + val).join('<br>') +
        '</div></div>'
      ).join('');

      container.innerHTML =
        '<div style="display:flex; justify-content:space-between; align-items:start; gap:12px; border-bottom:1px solid var(--border); padding-bottom:12px;">' +
          '<div><h2 style="font-size:18px; font-weight:800;">' + comp.name + '</h2><p class="desc">' + comp.description + '</p>' +
          (comp.sourceFile ? '<div class="meta-mono" style="margin-top:4px;">📄 ' + comp.sourceFile + '</div>' : '') + '</div>' +
          '<span class="badge">' + comp.category + '</span>' +
        '</div>' +
        '<h3 style="font-size:13px; margin-top:16px;">1. Types (' + ((comp.types || []).length) + ')</h3>' +
        '<div class="cards">' + typesHtml + '</div>' +
        '<h3 style="font-size:13px; margin-top:18px;">2. Variables &amp; Token Bindings (' + ((comp.variables || []).length) + ')</h3>' +
        '<div class="cards">' + varsHtml + '</div>';
    }

    async function syncRegistry() {
      const res = await fetch('/api/studio/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        registryState = data.registry;
        document.getElementById('comp-count').textContent = registryState.components.length;
        renderComponentList();
        renderComponentDetail();
        showToast('✓ ' + data.componentCount + '개 컴포넌트 스캔 및 CSS 재컴파일 완료');
      }
    }

    async function saveRegistry() {
      if (!registryState) return;
      const res = await fetch('/api/studio/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registry: registryState }),
      });
      const data = await res.json();
      if (data.success) showToast('✓ SSOT 레지스트리 및 CSS 저장 완료');
    }

    function copyAiPrompt() {
      navigator.clipboard.writeText(AI_PROMPT);
      showToast('✓ AI 컴포넌트 요청 프롬프트 복사됨');
    }

    function resetSampleJson() {
      document.getElementById('ai-spec-json').value = JSON.stringify(SAMPLE_SPEC, null, 2);
    }

    async function submitAiComponent() {
      const statusEl = document.getElementById('submit-status');
      try {
        const spec = JSON.parse(document.getElementById('ai-spec-json').value);
        const res = await fetch('/api/studio/components', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ spec }),
        });
        const data = await res.json();
        if (!data.success) {
          statusEl.textContent = '❌ ' + (data.errors || []).join(' | ');
          statusEl.style.color = 'var(--danger)';
          return;
        }
        registryState = data.registry;
        selectedCompId = data.component.id;
        document.getElementById('comp-count').textContent = registryState.components.length;
        renderComponentList();
        renderComponentDetail();
        switchTab('components');
        showToast('✓ ' + data.component.id + ' 스캐폴딩 & 전체 반영 완료!');
      } catch (e) {
        statusEl.textContent = '❌ JSON 오류: ' + e.message;
        statusEl.style.color = 'var(--danger)';
      }
    }

    async function saveQuickTokens() {
      const resGet = await fetch('/api/tokens');
      const cur = await resGet.json();
      if (!cur.color) cur.color = {};
      if (!cur.color.brand) cur.color.brand = {};
      cur.color.brand['color-primary'] = { $value: document.getElementById('quick-primary').value, variable: '--atom-color-primary' };
      const res = await fetch('/api/tokens', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cur) });
      const d = await res.json();
      if (d.success) showToast('✓ tokens.json & atom-ui.css 재컴파일 완료');
    }

    resetSampleJson();
    loadRegistry();
  </script>
</body>
</html>`;
}
