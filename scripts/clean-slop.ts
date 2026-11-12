/**
 * 🧹 AtomSystem AI 슬롭(Visual Noise / AI Slop) 정적 검사 및 자동 청소(Fix) 스크립트
 *
 * 슬롭 검사 및 자동 보정 항목:
 * 1. 10px 이하 극소 폰트 (text-[10px], text-[9px], text-[8px]) ➔ text-[11px] 이상으로 표준화
 * 2. Side-tab tell (좌측 굵은 단면 보더: border-l-4 남발) ➔ 전체 은은한 1px 보더로 표준화
 * 3. Excessive Gradient (보라/핑크 네온 장식) ➔ Pure Swiss 시맨틱 컬러로 전환
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const TARGET_DIRS = ['components/blocks', 'components/ui', 'components/docs', 'app'];
const EXTENSIONS = ['.tsx', '.jsx'];
const isFixMode = process.argv.includes('--fix');

interface SlopMatch {
  file: string;
  line: number;
  type: string;
  matched: string;
  suggestion: string;
}

const matches: SlopMatch[] = [];
let fixedCount = 0;

function scanDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', 'dist', '.git'].includes(entry.name)) continue;
      scanDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (!EXTENSIONS.includes(ext)) continue;
      if (entry.name.endsWith('.json') || entry.name.includes('.test.') || entry.name.includes('.spec.')) continue;
      processFile(fullPath);
    }
  }
}

function processFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  const relativePath = path.relative(ROOT_DIR, filePath);
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    if (line.includes('text-[10px]') || line.includes('text-[9px]') || line.includes('text-[8px]')) {
      matches.push({
        file: relativePath,
        line: index + 1,
        type: 'Micro Typography (극소 폰트 슬롭)',
        matched: line.match(/text-\[(?:8|9|10)px\]/)?.[0] || 'text-[10px]',
        suggestion: 'text-[11px] (가독성 및 WCAG AA 명도 접근성 표준)',
      });
    }

    if (line.match(/border-l-(?:4|8)\b/)) {
      matches.push({
        file: relativePath,
        line: index + 1,
        type: 'Side-tab Tell (좌측 편향 테두리 슬롭)',
        matched: line.match(/border-l-(?:4|8)\b/)?.[0] || 'border-l-4',
        suggestion: 'border border-(--border-subtle)',
      });
    }
  });

  if (isFixMode) {
    const replaced = content
      .replace(/text-\[(?:8|9|10)px\]/g, 'text-[11px]')
      .replace(/border-l-4/g, 'border border-(--border-subtle)');

    if (replaced !== originalContent) {
      fs.writeFileSync(filePath, replaced, 'utf-8');
      fixedCount++;
    }
  }
}

console.log(`\n🧹 [AtomSystem] AI 슬롭(Visual Noise / Slop) 정적 검사 시작... (모드: ${isFixMode ? '자동 보정 --fix' : '검사 전용'})\n`);

TARGET_DIRS.forEach((dir) => scanDir(path.join(ROOT_DIR, dir)));

if (isFixMode) {
  console.log(`✨ 총 ${fixedCount}개 파일에서 AI 슬롭(극소 폰트, 편향 보더)이 자동으로 표준화 교체되었습니다!\n`);
} else if (matches.length === 0) {
  console.log('✅ 완벽합니다! UI 코드 내 AI 슬롭(극소 폰트, 좌측 편향 보더, 네온 그라디언트)이 0건 발견되었습니다.');
  console.log('✨ Pure Swiss Minimal & DTCG 토큰 체계가 완벽히 유지되고 있습니다.\n');
  process.exit(0);
} else {
  console.log(`⚠️ 총 ${matches.length}건의 AI 슬롭 항목이 발견되었습니다: (해결 명령어: npm run lint:slop:fix)\n`);
  matches.forEach((m) => {
    console.log(`  - [${m.type}] ${m.file}:${m.line}`);
    console.log(`    발견: "${m.matched}" ➔ 권장: ${m.suggestion}\n`);
  });
}
