import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, it, expect } from 'vitest';
import { analyzeProject, importAnalyzedProject } from '../src/projectAnalyzer';

const tempDirs: string[] = [];

function makeTempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'atom-analyzer-test-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()!;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('projectAnalyzer', () => {
  it('analyzes source files in an isolated temp project and extracts brand colors, radii, and component candidates', () => {
    const tmp = makeTempDir();
    const srcDir = path.join(tmp, 'src', 'components');
    fs.mkdirSync(srcDir, { recursive: true });

    fs.writeFileSync(
      path.join(srcDir, 'BillingCard.tsx'),
      [
        'export function BillingCard() {',
        '  return (',
        '    <div className="rounded-lg border border-gray-200" style={{ backgroundColor: "#ffffff" }}>',
        '      <button className="bg-indigo-600 hover:bg-indigo-700 text-white" style={{ color: "#4f46e5" }}>Pay</button>',
        '      <input type="text" placeholder="Email" />',
        '    </div>',
        '  );',
        '}',
      ].join('\n'),
      'utf-8'
    );

    const report = analyzeProject(tmp);

    expect(report.projectRoot).toBe(tmp);
    expect(report.scannedFiles).toBe(1);
    expect(report.suggestedBrandColor).toBe('#4f46e5');
    expect(report.extractedRadii.some((r) => r.value === 'rounded-lg')).toBe(true);

    const candidateIds = report.candidates.map((c) => c.id);
    expect(candidateIds).toContain('button');
    expect(candidateIds).toContain('input');
  });

  it('imports analyzed brand theme and component specs into the temp project SSOT without touching the real workspace', () => {
    const tmp = makeTempDir();
    const srcDir = path.join(tmp, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'App.tsx'),
      '<button className="bg-emerald-500">Save</button>',
      'utf-8'
    );

    const report = analyzeProject(tmp);
    const buttonCandidate = report.candidates.find((c) => c.id === 'button');
    expect(buttonCandidate).toBeDefined();

    const result = importAnalyzedProject(tmp, {
      themeName: 'Temp Emerald Theme',
      brandColor: '#10b981',
      specs: buttonCandidate ? [buttonCandidate.spec] : [],
    });

    expect(result.success).toBe(true);
    expect(result.importedComponents).toContain('button');
    expect(fs.existsSync(path.join(tmp, 'tokens', 'tokens.json'))).toBe(true);
    expect(fs.existsSync(path.join(tmp, 'css', 'atom-ui.css'))).toBe(true);
    expect(fs.existsSync(path.join(tmp, 'components', 'ui', 'Button.tsx'))).toBe(true);

    const savedTokens = JSON.parse(
      fs.readFileSync(path.join(tmp, 'tokens', 'tokens.json'), 'utf-8')
    );
    expect(savedTokens.theme.activeThemeId).toBe('imported-project-theme');
  });
});
