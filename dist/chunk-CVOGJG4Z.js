import fs from 'fs';
import path from 'path';

// src/refactorEngine.ts
var TOKEN_REPLACEMENTS = [
  // A. Arbitrary Hex Colors in styles/classes
  {
    pattern: /#3182f6\b/gi,
    replacement: "var(--accent-primary)",
    type: "color"
  },
  {
    pattern: /#1b64da\b/gi,
    replacement: "var(--accent-primary-hover)",
    type: "color"
  },
  {
    pattern: /#111111\b/gi,
    replacement: "var(--text-primary)",
    type: "color"
  },
  {
    pattern: /#666666\b/gi,
    replacement: "var(--text-secondary)",
    type: "color"
  },
  {
    pattern: /#eaeaea\b/gi,
    replacement: "var(--border-subtle)",
    type: "color"
  },
  {
    pattern: /#d4d4d8\b/gi,
    replacement: "var(--border-strong)",
    type: "color"
  },
  {
    pattern: /#f9f9fb\b/gi,
    replacement: "var(--bg-secondary)",
    type: "color"
  },
  // B. Tailwind Standard Colors to Semantic Tokens
  // Text Colors
  {
    pattern: /\btext-blue-[56]00\b/g,
    replacement: "text-(--accent-primary)",
    type: "tailwind-color"
  },
  {
    pattern: /\btext-(gray|neutral|zinc)-900\b/g,
    replacement: "text-(--text-primary)",
    type: "tailwind-color"
  },
  {
    pattern: /\btext-(gray|neutral|zinc)-[56]00\b/g,
    replacement: "text-(--text-secondary)",
    type: "tailwind-color"
  },
  {
    pattern: /\btext-(gray|neutral|zinc)-400\b/g,
    replacement: "text-(--text-muted)",
    type: "tailwind-color"
  },
  // Background Colors
  {
    pattern: /\bbg-blue-[56]00\b/g,
    replacement: "bg-(--accent-primary)",
    type: "tailwind-color"
  },
  {
    pattern: /\bbg-(gray|neutral|zinc)-[51]00\b/g,
    replacement: "bg-(--bg-secondary)",
    type: "tailwind-color"
  },
  {
    pattern: /\bbg-(gray|neutral|zinc)-200\b/g,
    replacement: "bg-(--bg-tertiary)",
    type: "tailwind-color"
  },
  // Border Colors
  {
    pattern: /\bborder-(gray|neutral|zinc)-200\b/g,
    replacement: "border-(--border-subtle)",
    type: "tailwind-color"
  },
  {
    pattern: /\bborder-(gray|neutral|zinc)-300\b/g,
    replacement: "border-(--border-strong)",
    type: "tailwind-color"
  },
  {
    pattern: /\bborder-blue-[56]00\b/g,
    replacement: "border-(--accent-primary)",
    type: "tailwind-color"
  },
  // C. Arbitrary Inline Spacing
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[4px\]/g,
    replacement: "$1-(--space-1)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[8px\]/g,
    replacement: "$1-(--space-2)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[12px\]/g,
    replacement: "$1-(--space-3)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[16px\]/g,
    replacement: "$1-(--space-4)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[24px\]/g,
    replacement: "$1-(--space-6)",
    type: "spacing"
  },
  {
    pattern: /\b([p|m|px|py|pl|pr|pt|pb])-\[32px\]/g,
    replacement: "$1-(--space-8)",
    type: "spacing"
  },
  {
    pattern: /\bgap-\[8px\]/g,
    replacement: "gap-(--space-2)",
    type: "spacing"
  },
  {
    pattern: /\bgap-\[12px\]/g,
    replacement: "gap-(--space-3)",
    type: "spacing"
  },
  {
    pattern: /\bgap-\[16px\]/g,
    replacement: "gap-(--space-4)",
    type: "spacing"
  },
  // D. Arbitrary Inline Radius
  {
    pattern: /\brounded-\[4px\]/g,
    replacement: "rounded-(--radius-sm)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[6px\]/g,
    replacement: "rounded-(--radius)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[8px\]/g,
    replacement: "rounded-(--radius-lg)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[12px\]/g,
    replacement: "rounded-(--radius-xl)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[16px\]/g,
    replacement: "rounded-(--radius-2xl)",
    type: "radius"
  },
  {
    pattern: /\brounded-\[9999px\]/g,
    replacement: "rounded-(--radius-full)",
    type: "radius"
  }
];
var SCAN_EXTENSIONS = /* @__PURE__ */ new Set([".tsx", ".jsx", ".ts", ".js", ".css", ".html"]);
var IGNORE_DIRS = /* @__PURE__ */ new Set(["node_modules", ".next", ".git", "dist", "build", "coverage", ".gemini"]);
var IGNORE_FILES = /* @__PURE__ */ new Set([
  "globals.css",
  "atom-ui.css",
  "token.json",
  "tokens.json",
  "tokens.ts",
  "awesomeThemes.ts",
  "refactorEngine.ts"
]);
function scanAndRefactorDirectory(rootDir, options = {}) {
  const report = {
    scannedFiles: 0,
    totalMatches: 0,
    fixedFiles: 0,
    matches: []
  };
  function walk(currentPath) {
    const stats = fs.statSync(currentPath);
    if (stats.isDirectory()) {
      const dirName = path.basename(currentPath);
      if (IGNORE_DIRS.has(dirName)) return;
      const entries = fs.readdirSync(currentPath);
      for (const entry of entries) {
        walk(path.join(currentPath, entry));
      }
    } else if (stats.isFile()) {
      const fileName = path.basename(currentPath);
      if (IGNORE_FILES.has(fileName)) return;
      const ext = path.extname(currentPath);
      if (!SCAN_EXTENSIONS.has(ext)) return;
      report.scannedFiles++;
      const content = fs.readFileSync(currentPath, "utf-8");
      let modifiedContent = content;
      let hasFileChanges = false;
      const lines = content.split("\n");
      TOKEN_REPLACEMENTS.forEach((rule) => {
        lines.forEach((line, lineIndex) => {
          if (rule.pattern.test(line)) {
            rule.pattern.lastIndex = 0;
            const matchResult = line.match(rule.pattern);
            if (matchResult) {
              matchResult.forEach((matchedStr) => {
                const replacementStr = typeof rule.replacement === "function" ? rule.replacement(matchedStr) : rule.replacement;
                report.matches.push({
                  file: path.relative(process.cwd(), currentPath),
                  line: lineIndex + 1,
                  original: matchedStr,
                  replacement: replacementStr,
                  type: rule.type
                });
                report.totalMatches++;
              });
            }
          }
        });
        if (options.fix && rule.pattern.test(modifiedContent)) {
          rule.pattern.lastIndex = 0;
          modifiedContent = modifiedContent.replace(rule.pattern, rule.replacement);
          hasFileChanges = true;
        }
      });
      if (options.fix && hasFileChanges && modifiedContent !== content) {
        fs.writeFileSync(currentPath, modifiedContent, "utf-8");
        report.fixedFiles++;
      }
    }
  }
  walk(rootDir);
  return report;
}

export { TOKEN_REPLACEMENTS, scanAndRefactorDirectory };
//# sourceMappingURL=chunk-CVOGJG4Z.js.map
//# sourceMappingURL=chunk-CVOGJG4Z.js.map