import fs from 'fs';
import os from 'os';
import path from 'path';
import type { AddressInfo } from 'net';
import { afterEach, describe, expect, it } from 'vitest';
import { submitComponentSpec, loadProjectRegistry } from '../lib/services/studioRegistryServer';
import { startLocalTokenStudio } from '../src/studioServer';
import { applyThemeById, startFloatingThemeServer } from '../src/themeFloatingServer';

const tempDirs: string[] = [];

function createTempProject(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'atom-studio-sec-'));
  tempDirs.push(dir);
  fs.mkdirSync(path.join(dir, 'tokens'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'css'), { recursive: true });
  fs.copyFileSync(
    path.resolve(process.cwd(), 'tokens', 'tokens.json'),
    path.join(dir, 'tokens', 'tokens.json')
  );
  fs.writeFileSync(
    path.join(dir, 'css', 'atom-ui.css'),
    ':root { --bg-primary: #ffffff; }\n\n/* === Universal Component Classes === */\n.atom-btn { display: inline-flex; }\n',
    'utf-8'
  );
  return dir;
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    if (dir && fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
});

describe('studioRegistryServer & themeFloatingServer & CORS security', () => {
  it('scaffolds a submitted component into SSOT while preserving Universal Component Classes in CSS', () => {
    const proj = createTempProject();
    const res = submitComponentSpec(proj, {
      id: 'metric-badge',
      name: 'Metric Badge',
      category: 'Data',
      description: 'KPI delta indicator',
      types: [{ id: 'soft', name: 'Soft', whenToUse: 'KPI cards' }],
      variables: [
        {
          id: 'success',
          name: 'Success',
          tokenBindings: {
            background: '--atom-color-success-subtle',
            textColor: '--atom-color-success',
          },
        },
      ],
    });

    expect(res.success).toBe(true);
    expect(fs.existsSync(path.join(proj, 'components', 'ui', 'MetricBadge.tsx'))).toBe(true);
    const css = fs.readFileSync(path.join(proj, 'css', 'atom-ui.css'), 'utf-8');
    expect(css).toContain('/* === Universal Component Classes === */');
    expect(css).toContain('.atom-btn');

    const reloaded = loadProjectRegistry(proj);
    expect(reloaded.registry.components.some((c) => c.id === 'metric-badge')).toBe(true);
  });

  it('switches active theme via applyThemeById and recompiles CSS', () => {
    const proj = createTempProject();
    const doc = JSON.parse(fs.readFileSync(path.join(proj, 'tokens', 'tokens.json'), 'utf-8'));
    const themeIds = Object.keys(doc?.theme?.presets || {});
    expect(themeIds.length).toBeGreaterThan(0);

    const targetId = themeIds[themeIds.length - 1];
    const applied = applyThemeById(proj, targetId);
    expect(applied.name).toBeTruthy();

    const updatedDoc = JSON.parse(fs.readFileSync(path.join(proj, 'tokens', 'tokens.json'), 'utf-8'));
    expect(updatedDoc.theme.activeThemeId).toBe(targetId);
  });

  it('binds studio and floating theme servers to 127.0.0.1 and blocks untrusted cross-origin code writes', async () => {
    const proj = createTempProject();
    const studio = startLocalTokenStudio({ port: 0, cwd: proj });
    await new Promise<void>((resolve) => {
      if (studio.listening) resolve();
      else studio.once('listening', () => resolve());
    });

    const addr = studio.address() as AddressInfo;
    expect(addr.address).toBe('127.0.0.1');
    const baseUrl = `http://127.0.0.1:${addr.port}`;

    try {
      // 1. External origin blocked with 403
      const evilRes = await fetch(`${baseUrl}/api/studio/components`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://evil.example',
        },
        body: JSON.stringify({ id: 'pwned' }),
      });
      expect(evilRes.status).toBe(403);

      // 2. Sandboxed null origin blocked on code-writing endpoint
      const nullCodeRes = await fetch(`${baseUrl}/api/studio/components`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'null',
        },
        body: JSON.stringify({ id: 'pwned' }),
      });
      expect(nullCodeRes.status).toBe(403);

      // 3. Figma plugin (Origin: null) allowed on registry read
      const figmaReadRes = await fetch(`${baseUrl}/api/studio/registry`, {
        headers: { Origin: 'null', 'X-Atom-Client': 'figma-plugin' },
      });
      expect(figmaReadRes.status).toBe(200);
    } finally {
      studio.closeAllConnections?.();
      await new Promise<void>((resolve) => studio.close(() => resolve()));
    }

    const floating = startFloatingThemeServer({ port: 0, cwd: proj, openBrowser: false });
    await new Promise<void>((resolve) => {
      if (floating.listening) resolve();
      else floating.once('listening', () => resolve());
    });
    const floatAddr = floating.address() as AddressInfo;
    expect(floatAddr.address).toBe('127.0.0.1');

    try {
      const evilThemeRes = await fetch(`http://127.0.0.1:${floatAddr.port}/api/theme`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://attacker.example' },
        body: JSON.stringify({ themeId: 'ocean-blue' }),
      });
      expect(evilThemeRes.status).toBe(403);
    } finally {
      floating.closeAllConnections?.();
      await new Promise<void>((resolve) => floating.close(() => resolve()));
    }
  });
});
