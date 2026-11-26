import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  ensureUiBarrelExport,
  generateComponentTsx,
  toKebabCase,
  toPascalCase,
  validateSubmissionSpec,
} from '../lib/services/componentScaffold';

const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    if (dir && fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
});

describe('componentScaffold', () => {
  it('converts between kebab-case and PascalCase cleanly', () => {
    expect(toPascalCase('rating-chip')).toBe('RatingChip');
    expect(toKebabCase('ThemeSwitcher.tsx')).toBe('theme-switcher');
  });

  it('rejects invalid component specs and accepts valid 3-tier specs', () => {
    const invalid = validateSubmissionSpec({ id: 'Bad_ID', category: 'Unknown' });
    expect(invalid.valid).toBe(false);
    if (!invalid.valid) {
      expect(invalid.errors.length).toBeGreaterThanOrEqual(4);
    }

    const valid = validateSubmissionSpec({
      id: 'status-pill',
      name: 'Status Pill',
      category: 'Feedback',
      description: 'Compact semantic status pill',
      types: [
        { id: 'soft', name: 'Soft', whenToUse: 'Inline status labels' },
        { id: 'outlined', name: 'Outlined', whenToUse: 'High-contrast borders' },
      ],
      variables: [
        {
          id: 'primary',
          name: 'Primary',
          tokenBindings: {
            background: '--atom-color-primary-subtle',
            textColor: '--atom-color-primary',
          },
        },
      ],
    });

    expect(valid.valid).toBe(true);
    if (valid.valid) {
      const tsx = generateComponentTsx(valid.spec);
      expect(tsx).toContain('export const StatusPill =');
      expect(tsx).not.toContain('@/lib/');
      expect(tsx).toContain('--atom-status-pill-');
    }
  });

  it('updates components/ui/index.ts barrel exports idempotently', () => {
    const uiDir = fs.mkdtempSync(path.join(os.tmpdir(), 'atom-barrel-'));
    tempDirs.push(uiDir);

    expect(ensureUiBarrelExport(uiDir, 'StatusPill')).toBe(true);
    expect(ensureUiBarrelExport(uiDir, 'StatusPill')).toBe(false);
    expect(ensureUiBarrelExport(uiDir, 'RatingChip')).toBe(true);

    const content = fs.readFileSync(path.join(uiDir, 'index.ts'), 'utf-8');
    expect(content.match(/StatusPill/g)?.length).toBe(1);
    expect(content).toContain("export * from './RatingChip';");
  });
});
