import fs from 'fs';
import path from 'path';

const GLOBAL_CSS_CANDIDATES = [
  'app/globals.css',
  'src/app/globals.css',
  'app/global.css',
  'src/app/global.css',
  'src/index.css',
  'src/styles/globals.css',
  'styles/globals.css',
  'src/globals.css',
  'src/App.css',
  'app/layout.css',
];

export interface CssLinkResult {
  updatedFiles: string[];
  alreadyLinkedFiles: string[];
  foundCssFiles: string[];
}

function toPosixRelativeImport(fromFile: string, targetFile: string): string {
  const rel = path.relative(path.dirname(fromFile), targetFile).split(path.sep).join('/');
  return rel.startsWith('.') ? rel : `./${rel}`;
}

/**
 * Ensures the project's global CSS file(s) import the local `css/atom-ui.css`
 * generated/updated by AtomSystem Studio instead of `node_modules` or nothing.
 */
export function ensureLocalCssLinked(cwd: string): CssLinkResult {
  const localAtomCss = path.join(cwd, 'css', 'atom-ui.css');
  const updatedFiles: string[] = [];
  const alreadyLinkedFiles: string[] = [];
  const foundCssFiles: string[] = [];

  if (!fs.existsSync(localAtomCss)) {
    return { updatedFiles, alreadyLinkedFiles, foundCssFiles };
  }

  for (const relCandidate of GLOBAL_CSS_CANDIDATES) {
    const absCssFile = path.join(cwd, relCandidate);
    if (!fs.existsSync(absCssFile)) continue;

    foundCssFiles.push(relCandidate);
    const content = fs.readFileSync(absCssFile, 'utf-8');
    const relImportPath = toPosixRelativeImport(absCssFile, localAtomCss);
    const importStatement = `@import "${relImportPath}";`;

    // 1. Upgrade package-level import (`atomsystem/css/atom-ui.css`) to local relative path
    const pkgImportRegex = /(@import\s+['"])atomsystem\/css\/atom-ui\.css(['"]\s*;?)/g;
    if (pkgImportRegex.test(content)) {
      const nextContent = content.replace(pkgImportRegex, `$1${relImportPath}$2`);
      if (nextContent !== content) {
        fs.writeFileSync(absCssFile, nextContent, 'utf-8');
        updatedFiles.push(relCandidate);
        continue;
      }
    }

    // 2. Skip if local atom-ui.css is already imported
    if (content.includes('atom-ui.css')) {
      alreadyLinkedFiles.push(relCandidate);
      continue;
    }

    // 3. Insert right after `@import "tailwindcss";` if present, else after `@charset`, else at top
    const tailwindImportMatch = content.match(/^@import\s+['"]tailwindcss['"]\s*;?[^\n]*\n?/m);
    let nextContent: string;
    if (tailwindImportMatch && tailwindImportMatch.index !== undefined) {
      const insertPos = tailwindImportMatch.index + tailwindImportMatch[0].length;
      const prefix = content.slice(0, insertPos);
      const suffix = content.slice(insertPos);
      const needsLeadingNewline = !prefix.endsWith('\n');
      nextContent = `${prefix}${needsLeadingNewline ? '\n' : ''}${importStatement}\n${suffix}`;
    } else {
      const charsetMatch = content.match(/^@charset\s+[^;]+;\s*\n?/i);
      if (charsetMatch && charsetMatch.index !== undefined) {
        const insertPos = charsetMatch.index + charsetMatch[0].length;
        nextContent = `${content.slice(0, insertPos)}${importStatement}\n${content.slice(insertPos)}`;
      } else {
        nextContent = `${importStatement}\n${content}`;
      }
    }

    fs.writeFileSync(absCssFile, nextContent, 'utf-8');
    updatedFiles.push(relCandidate);
  }

  return { updatedFiles, alreadyLinkedFiles, foundCssFiles };
}
