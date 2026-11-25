import fs from 'fs';
import path from 'path';
import http from 'http';
import { exec } from 'child_process';
import { compileTokensToCss } from './tokenCompiler';

export interface FloatingThemeServerOptions {
  port?: number;
  cwd?: string;
  openBrowser?: boolean;
}

interface ThemeSummary {
  id: string;
  name: string;
  description: string;
  mode: 'light' | 'dark';
  brandColor: string;
  bgPrimary: string;
  textPrimary: string;
}

function openUrlInBrowser(url: string): void {
  const platform = process.platform;
  const cmd =
    platform === 'win32'
      ? `start "" "${url}"`
      : platform === 'darwin'
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {
    // Ignore errors if headless
  });
}

function resolveColorValue(doc: Record<string, any>, rawValue?: string): string {
  if (!rawValue || typeof rawValue !== 'string') return '';
  if (!rawValue.startsWith('{') || !rawValue.endsWith('}')) return rawValue;
  const parts = rawValue.slice(1, -1).split('.');
  let cur: any = doc;
  for (const part of parts) {
    if (cur && typeof cur === 'object' && part in cur) {
      cur = cur[part];
    } else {
      return rawValue;
    }
  }
  return typeof cur?.$value === 'string' ? cur.$value : rawValue;
}

function readThemesFromTokens(tokenJsonPath: string): {
  activeThemeId: string;
  themes: ThemeSummary[];
} {
  const doc = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf-8'));
  const presets: Record<string, any> = doc?.theme?.presets || {};
  const activeThemeId: string = doc?.theme?.activeThemeId || Object.keys(presets)[0] || 'ocean-blue';

  const themes: ThemeSummary[] = Object.entries(presets).map(([id, preset]) => {
    const t = preset?.tokens || {};
    return {
      id,
      name: preset?.name || id,
      description: preset?.description || '',
      mode: preset?.mode === 'dark' ? 'dark' : 'light',
      brandColor: resolveColorValue(doc, t.primary?.$value || preset?.brandColor) || '#3182f6',
      bgPrimary: resolveColorValue(doc, t.bgPrimary?.$value) || (preset?.mode === 'dark' ? '#0f172a' : '#ffffff'),
      textPrimary: resolveColorValue(doc, t.textPrimary?.$value) || (preset?.mode === 'dark' ? '#f8fafc' : '#111111'),
    };
  });

  return { activeThemeId, themes };
}

export function applyThemeById(cwd: string, themeId: string): { name: string; mode: string } {
  const tokenJsonPath = path.join(cwd, 'tokens', 'tokens.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');
  const doc = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf-8'));
  const presets = doc?.theme?.presets || {};
  const selectedPreset = presets[themeId];
  if (!selectedPreset) {
    throw new Error(`Theme "${themeId}" not found.`);
  }

  doc.theme = doc.theme || {};
  doc.theme.activeThemeId = themeId;
  doc.updatedAt = new Date().toISOString();
  fs.writeFileSync(tokenJsonPath, `${JSON.stringify(doc, null, 2)}\n`, 'utf-8');

  let css = compileTokensToCss(doc);
  const cssDir = path.dirname(cssPath);
  if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });
  const marker = '/* === Universal Component Classes === */';
  if (fs.existsSync(cssPath)) {
    const existing = fs.readFileSync(cssPath, 'utf-8');
    const idx = existing.indexOf(marker);
    if (idx !== -1) css = `${css.trimEnd()}\n\n${existing.slice(idx)}`;
  }
  fs.writeFileSync(cssPath, css, 'utf-8');

  return { name: selectedPreset.name || themeId, mode: selectedPreset.mode || 'light' };
}

function getFloatingInjectScript(port: number): string {
  return `(function(){
  if (window.__atomFloatingThemeLoaded) return;
  window.__atomFloatingThemeLoaded = true;
  var BASE = 'http://localhost:${port}';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;';
  var panel = document.createElement('div');
  panel.style.cssText = 'display:none;width:280px;max-height:360px;overflow-y:auto;margin-bottom:8px;padding:10px;border-radius:12px;background:var(--bg-primary,#141821);color:var(--text-primary,#f3f4f6);border:1px solid var(--border-strong,#262c3a);box-shadow:0 16px 40px rgba(0,0,0,.35);';
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = '🎨 Theme';
  btn.style.cssText = 'padding:8px 14px;border-radius:999px;border:1px solid var(--border-strong,#262c3a);background:var(--accent-primary,#3182f6);color:#fff;font-size:12px;font-weight:600;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.25);';
  btn.onclick = function(){ panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; };
  wrap.appendChild(panel);
  wrap.appendChild(btn);
  document.body.appendChild(wrap);
  function applyCss(th){
    var r = document.documentElement;
    r.setAttribute('data-atom-theme', th.id);
    r.style.colorScheme = th.mode;
    if (th.brandColor) { r.style.setProperty('--accent-primary', th.brandColor); r.style.setProperty('--atom-color-primary', th.brandColor); }
    if (th.bgPrimary) { r.style.setProperty('--bg-primary', th.bgPrimary); r.style.setProperty('--atom-bg-primary', th.bgPrimary); }
    if (th.textPrimary) { r.style.setProperty('--text-primary', th.textPrimary); r.style.setProperty('--atom-text-primary', th.textPrimary); }
  }
  fetch(BASE + '/api/themes').then(function(r){ return r.json(); }).then(function(data){
    var activeId = data.activeThemeId;
    var themes = data.themes || [];
    var cur = themes.find(function(t){ return t.id === activeId; });
    if (cur) btn.textContent = '🎨 ' + cur.name;
    panel.innerHTML = '';
    themes.forEach(function(th){
      var item = document.createElement('button');
      item.type = 'button';
      item.style.cssText = 'width:100%;display:flex;align-items:center;justify-content:space-between;padding:7px 9px;margin:2px 0;border-radius:8px;border:1px solid transparent;background:' + (th.id===activeId?'rgba(59,130,246,.15)':'transparent') + ';color:inherit;font-size:12px;cursor:pointer;text-align:left;';
      item.innerHTML = '<span>' + th.name + '</span><span style="opacity:.7;font-size:11px">' + (th.id===activeId?'✓':th.mode) + '</span>';
      item.onclick = function(){
        applyCss(th);
        btn.textContent = '🎨 ' + th.name;
        fetch(BASE + '/api/theme', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ themeId: th.id }) });
      };
      panel.appendChild(item);
    });
  });
})();`;
}

function getFloatingWidgetHtml(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AtomSystem Floating Theme Menu</title>
  <style>
    :root { color-scheme: light dark; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0b0d12;
      color: #f3f4f6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .floating-panel {
      width: 100%;
      max-width: 420px;
      background: #141821;
      border: 1px solid #262c3a;
      border-radius: 16px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
      overflow: hidden;
    }
    .panel-header {
      padding: 16px 18px;
      border-bottom: 1px solid #262c3a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .panel-title { font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    .panel-sub { font-size: 11px; color: #9ca3af; margin-top: 2px; }
    .badge {
      font-size: 11px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(49, 130, 246, 0.16);
      color: #60a5fa;
      border: 1px solid rgba(49, 130, 246, 0.35);
    }
    .theme-list {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 460px;
      overflow-y: auto;
    }
    .theme-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 11px 12px;
      border-radius: 10px;
      border: 1px solid #262c3a;
      background: #1a202c;
      color: inherit;
      cursor: pointer;
      text-align: left;
      transition: border-color 0.15s, background 0.15s, transform 0.1s;
    }
    .theme-item:hover { border-color: #4b5563; background: #202736; }
    .theme-item.active { border-color: #3b82f6; background: rgba(59, 130, 246, 0.14); }
    .theme-left { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .swatch {
      width: 24px;
      height: 24px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.2);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .swatch-dot { width: 10px; height: 10px; border-radius: 999px; }
    .theme-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .theme-desc { font-size: 11px; color: #9ca3af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px; }
    .theme-meta { font-size: 11px; color: #9ca3af; font-family: ui-monospace, monospace; flex-shrink: 0; }
    .panel-footer {
      padding: 10px 16px;
      border-top: 1px solid #262c3a;
      font-size: 11px;
      color: #9ca3af;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .status-ok { color: #34d399; font-weight: 600; }
  </style>
</head>
<body>
  <div class="floating-panel">
    <div class="panel-header">
      <div>
        <div class="panel-title">🎨 AtomSystem Theme Picker</div>
        <div class="panel-sub">선택 즉시 tokens/tokens.json &amp; css/atom-ui.css 전체 반영</div>
      </div>
      <span class="badge" id="active-badge">loading...</span>
    </div>
    <div class="theme-list" id="theme-list"></div>
    <div class="panel-footer">
      <span id="status-text">프로젝트와 무관하게 독립 실행 중</span>
      <span>Ctrl+C 로 종료</span>
    </div>
  </div>
  <script>
    async function loadThemes() {
      const res = await fetch('/api/themes');
      const data = await res.json();
      render(data.themes, data.activeThemeId);
    }
    function render(themes, activeId) {
      document.getElementById('active-badge').textContent = activeId;
      const list = document.getElementById('theme-list');
      list.innerHTML = '';
      for (const th of themes) {
        const btn = document.createElement('button');
        btn.className = 'theme-item' + (th.id === activeId ? ' active' : '');
        btn.innerHTML =
          '<div class="theme-left">' +
            '<div class="swatch" style="background:' + th.bgPrimary + '">' +
              '<div class="swatch-dot" style="background:' + th.brandColor + '"></div>' +
            '</div>' +
            '<div>' +
              '<div class="theme-name">' + th.name + '</div>' +
              '<div class="theme-desc">' + (th.description || th.id) + '</div>' +
            '</div>' +
          '</div>' +
          '<span class="theme-meta">' + (th.id === activeId ? '✓ Active' : th.mode) + '</span>';
        btn.onclick = async () => {
          const status = document.getElementById('status-text');
          status.textContent = '적용 중...';
          status.className = '';
          const r = await fetch('/api/theme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ themeId: th.id }),
          });
          const out = await r.json();
          if (out.success) {
            status.textContent = '✓ ' + th.name + ' 적용 완료 (css/atom-ui.css 재컴파일됨)';
            status.className = 'status-ok';
            render(themes, th.id);
          } else {
            status.textContent = '오류: ' + (out.error || 'failed');
          }
        };
        list.appendChild(btn);
      }
    }
    loadThemes();
  </script>
</body>
</html>`;
}

export function startFloatingThemeServer(options: FloatingThemeServerOptions = {}): http.Server {
  const port = options.port ?? 4010;
  const cwd = options.cwd ?? process.cwd();
  const tokenJsonPath = path.join(cwd, 'tokens', 'tokens.json');

  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url || '/', `http://localhost:${port}`);

    if (req.method === 'GET' && url.pathname === '/floating.js') {
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'no-cache' });
      res.end(getFloatingInjectScript(port));
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/themes') {
      try {
        const data = readThemesFromTokens(tokenJsonPath);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
      } catch (err: any) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/theme') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const result = applyThemeById(cwd, parsed.themeId);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, ...result }));
        } catch (err: any) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(getFloatingWidgetHtml());
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n🎨 AtomSystem Floating Theme Menu running at:`);
    console.log(`   👉 ${url}\n`);
    console.log(`   Tokens file : ${path.relative(cwd, tokenJsonPath)}`);
    console.log(`   Target CSS  : css/atom-ui.css`);
    console.log(`\nPress Ctrl+C to stop the floating theme menu.\n`);
    if (options.openBrowser !== false) {
      openUrlInBrowser(url);
    }
  });

  return server;
}
