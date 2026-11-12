import http from 'http';
import fs from 'fs';
import path from 'path';
import { compileTokensToCss } from './tokenCompiler';

export function startLocalTokenStudio(options: { port?: number; cwd?: string } = {}) {
  const port = options.port || 4000;
  const cwd = options.cwd || process.cwd();

  // Find token files
  const tokenJsonPath = path.join(cwd, 'tokens', 'token.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');
  const designMdPath = path.join(cwd, 'atom.design.md');

  const server = http.createServer((req, res) => {
    // CORS headers for local usage
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    const url = new URL(req.url || '/', `http://localhost:${port}`);

    // API: GET tokens
    if (url.pathname === '/api/tokens' && req.method === 'GET') {
      let data: any = {};
      if (fs.existsSync(tokenJsonPath)) {
        try {
          data = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf-8'));
        } catch (e) {
          data = { error: 'Failed to parse tokens/token.json' };
        }
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(data));
      return;
    }

    // API: POST update tokens
    if (url.pathname === '/api/tokens' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const newTokens = JSON.parse(body);

          // 1. Save tokens/token.json
          const tokensDir = path.dirname(tokenJsonPath);
          if (!fs.existsSync(tokensDir)) fs.mkdirSync(tokensDir, { recursive: true });
          fs.writeFileSync(tokenJsonPath, JSON.stringify(newTokens, null, 2), 'utf-8');

          // 2. Compile and save to css/atom-ui.css
          const compiledCss = compileTokensToCss(newTokens);
          const cssDir = path.dirname(cssPath);
          if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });
          fs.writeFileSync(cssPath, compiledCss, 'utf-8');

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, message: 'Tokens and CSS compiled successfully!' }));
        } catch (err: any) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }

    // Serve Local Token Studio Web UI
    if (url.pathname === '/' || url.pathname === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(getStudioHtml());
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  });

  server.listen(port, () => {
    console.log(`\n🎨 AtomSystem Local Token Studio running at:`);
    console.log(`   👉 http://localhost:${port}\n`);
    console.log(`   Tokens file: ${path.relative(cwd, tokenJsonPath)}`);
    console.log(`   Compiled CSS: ${path.relative(cwd, cssPath)}`);
    console.log(`\nPress Ctrl+C to stop the studio server.\n`);
  });

  return server;
}

function getStudioHtml(): string {
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
        <p class="desc">로컬 환경(tokens/token.json)의 토큰을 GUI로 직접 수정하고 실시간으로 css/atom-ui.css로 재컴파일합니다.</p>
      </div>
      <button class="btn-save" onclick="saveTokens()">저장 및 CSS 재컴파일</button>
    </header>

    <div class="grid">
      <!-- 1. Color Tokens -->
      <div class="card">
        <h2>🎨 시맨틱 브랜드 & 서피스 토큰</h2>
        
        <div class="field">
          <label>브랜드 대표 색상 (Primary Color)</label>
          <div class="input-row">
            <input type="color" id="picker-primary" oninput="onColorChange('primary', this.value)">
            <input type="text" id="val-primary" oninput="onColorChange('primary', this.value)">
          </div>
          <div class="meta">var(--atom-color-primary)</div>
        </div>

        <div class="field">
          <label>호버 상태 색상 (Primary Hover)</label>
          <div class="input-row">
            <input type="color" id="picker-primary-hover" oninput="onColorChange('primary-hover', this.value)">
            <input type="text" id="val-primary-hover" oninput="onColorChange('primary-hover', this.value)">
          </div>
          <div class="meta">var(--atom-color-primary-hover)</div>
        </div>

        <div class="field">
          <label>서피스 배경 (Surface Background)</label>
          <div class="input-row">
            <input type="color" id="picker-bg-surface" oninput="onColorChange('bg-surface', this.value)">
            <input type="text" id="val-bg-surface" oninput="onColorChange('bg-surface', this.value)">
          </div>
          <div class="meta">var(--atom-bg-surface)</div>
        </div>

        <div class="field">
          <label>기본 모서리 곡률 (Border Radius)</label>
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
        <h2>⚡ 실시간 토큰 반영 프리뷰</h2>
        <div class="preview-box" id="preview-box">
          <div class="preview-card" id="sample-card">
            <div style="font-weight: 600; margin-bottom: 4px;">대시보드 위젯 컴포넌트</div>
            <div style="color: var(--muted); font-size: 12px; margin-bottom: 14px;">
              토큰 변경 시 실시간으로 디자인이 반영되며 즉시 CSS 파일에 동기화됩니다.
            </div>
            <button class="preview-btn" id="sample-btn">확인 및 승인</button>
          </div>

          <div style="font-size: 11px; font-family: monospace; color: var(--muted); background: #161616; padding: 12px; border-radius: 6px; border: 1px solid var(--border);">
            <div>// 컴파일 대상 파일</div>
            <div style="color: #60a5fa; margin-top: 4px;">tokens/token.json (W3C DTCG)</div>
            <div style="color: #34d399; margin-top: 2px;">css/atom-ui.css (0KB Pure CSS)</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast">✓ 토큰 및 CSS가 성공적으로 재컴파일되었습니다!</div>

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
          alert('저장 실패: ' + result.error);
        }
      } catch (e) {
        alert('서버 통신 오류: ' + e.message);
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
