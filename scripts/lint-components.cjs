const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components', 'src/studioApp'];
const excludePaths = [
  'components/ui',
  'components/common/icons',
  'components/common/CodeHighlight.tsx',
  'components/blocks/FileExplorerBlock.tsx', // contains mock code string template
  'node_modules',
  '.next'
];

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    const relPath = fullPath.replace(/\\/g, '/');
    if (stat && stat.isDirectory()) {
      if (!excludePaths.some(ex => relPath.includes(ex))) {
        results = results.concat(getFiles(fullPath));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      if (!excludePaths.some(ex => relPath.includes(ex))) {
        results.push(relPath);
      }
    }
  });
  return results;
}

const allFiles = targetDirs.flatMap(getFiles);
const violations = [];

const rawButtonRegex = /<button[\s>]/;
const rawInputRegex = /<input[\s>]/;
const rawSelectRegex = /<select[\s>]/;
const rawTextareaRegex = /<textarea[\s>]/;
const rawTableRegex = /<table[\s>]/;

allFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    // Allow template string mocks
    if (trimmed.includes('`') && (trimmed.includes('<button') || trimmed.includes('<input')) && !trimmed.includes('return')) {
      return;
    }

    if (rawButtonRegex.test(trimmed)) {
      violations.push({ file: filePath, line: index + 1, type: '<button>', tag: 'Button', text: trimmed.slice(0, 80) });
    }
    if (rawInputRegex.test(trimmed)) {
      // Allow native HTML5 color picker if type="color"
      if (!trimmed.includes('type="color"')) {
        violations.push({ file: filePath, line: index + 1, type: '<input>', tag: 'Input', text: trimmed.slice(0, 80) });
      }
    }
    if (rawSelectRegex.test(trimmed)) {
      violations.push({ file: filePath, line: index + 1, type: '<select>', tag: 'NativeSelect or Select', text: trimmed.slice(0, 80) });
    }
    if (rawTextareaRegex.test(trimmed)) {
      violations.push({ file: filePath, line: index + 1, type: '<textarea>', tag: 'Textarea', text: trimmed.slice(0, 80) });
    }
    if (rawTableRegex.test(trimmed)) {
      violations.push({ file: filePath, line: index + 1, type: '<table>', tag: 'Table', text: trimmed.slice(0, 80) });
    }
  });
});

if (violations.length > 0) {
  console.error(`\n❌ [Component-Only Enforcement Failed]: Found ${violations.length} unauthorized raw HTML tags!`);
  console.error('All UI controls must be imported from "@/components/ui". Direct raw HTML tags are strictly forbidden.\n');
  violations.forEach(v => {
    console.error(`  - ${v.file}:${v.line} uses raw ${v.type} -> Replace with <${v.tag}> from "@/components/ui"`);
    console.error(`    Code: ${v.text}`);
  });
  console.error('\nRun "npm run lint:components" to verify after refactoring.\n');
  process.exit(1);
} else {
  console.log('✅ [Component-Only Enforcement Passed]: 0 raw HTML tags found! All UI controls strictly adhere to @/components/ui.');
  process.exit(0);
}
