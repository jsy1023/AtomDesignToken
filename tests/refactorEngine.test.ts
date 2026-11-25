import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, it, expect } from 'vitest';
import { scanAndRefactorDirectory } from '../src/refactorEngine';

const tempDirs: string[] = [];

function makeTempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'atom-refactor-test-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()!;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('scanAndRefactorDirectory', () => {
  it('detects hardcoded styles and direct palette references in dry-run without modifying files', () => {
    const tmp = makeTempDir();
    const targetFile = path.join(tmp, 'SampleCard.tsx');
    const originalContent = [
      'export function SampleCard() {',
      '  return (',
      '    <div className="p-[16px] rounded-[8px] bg-gray-100 text-blue-500" style={{ color: "#3182f6", background: "var(--atom-palette-white)" }}>',
      '      Hello',
      '    </div>',
      '  );',
      '}',
    ].join('\n');

    fs.writeFileSync(targetFile, originalContent, 'utf-8');

    const report = scanAndRefactorDirectory(tmp, { fix: false });

    expect(report.scannedFiles).toBe(1);
    expect(report.fixedFiles).toBe(0);
    expect(report.totalMatches).toBeGreaterThanOrEqual(5);
    expect(fs.readFileSync(targetFile, 'utf-8')).toBe(originalContent);
  });

  it('replaces hardcoded values and direct palette variables when fix is true', () => {
    const tmp = makeTempDir();
    const targetFile = path.join(tmp, 'DemoButton.tsx');
    const originalContent = [
      'export const style = { color: "#3182f6", bg: "var(--atom-palette-white)", border: "var(--atom-palette-gray-200)" };',
      'export const cls = "p-[16px] rounded-[8px] text-blue-500 bg-gray-100";',
    ].join('\n');

    fs.writeFileSync(targetFile, originalContent, 'utf-8');

    const report = scanAndRefactorDirectory(tmp, { fix: true });

    expect(report.fixedFiles).toBe(1);
    const updated = fs.readFileSync(targetFile, 'utf-8');
    expect(updated).toContain('var(--accent-primary)');
    expect(updated).toContain('var(--bg-primary)');
    expect(updated).toContain('var(--border-subtle)');
    expect(updated).toContain('p-(--space-4)');
    expect(updated).toContain('rounded-(--radius-lg)');
    expect(updated).toContain('text-(--accent-primary)');
    expect(updated).toContain('bg-(--bg-secondary)');
  });

  it('ignores token definition files and node_modules', () => {
    const tmp = makeTempDir();
    const nmDir = path.join(tmp, 'node_modules');
    fs.mkdirSync(nmDir, { recursive: true });
    fs.writeFileSync(path.join(nmDir, 'lib.tsx'), 'const c = "#3182f6";', 'utf-8');
    fs.writeFileSync(path.join(tmp, 'atom-ui.css'), ':root { --x: #3182f6; }', 'utf-8');
    fs.writeFileSync(path.join(tmp, 'tokens.json'), '{ "x": "#3182f6" }', 'utf-8');

    const report = scanAndRefactorDirectory(tmp, { fix: true });

    expect(report.scannedFiles).toBe(0);
    expect(report.totalMatches).toBe(0);
  });
});
