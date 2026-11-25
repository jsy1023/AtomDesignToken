import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'dist', 'studio');

const studioAliasPlugin = {
  name: 'studio-spa-aliases',
  setup(build) {
    const shimsDir = path.join(ROOT, 'src', 'studioApp', 'shims');

    build.onResolve({ filter: /^next-intl$/ }, () => ({
      path: path.join(shimsDir, 'next-intl.tsx'),
    }));
    build.onResolve({ filter: /^@\/i18n\/routing$/ }, () => ({
      path: path.join(shimsDir, 'i18n-routing.tsx'),
    }));
    build.onResolve({ filter: /^next\/navigation$/ }, () => ({
      path: path.join(shimsDir, 'next-navigation.tsx'),
    }));
    build.onResolve({ filter: /^@\/components\/Header$/ }, () => ({
      path: path.join(shimsDir, 'StudioLocalHeader.tsx'),
    }));

    // Resolve `@/*` to project root
    build.onResolve({ filter: /^@\// }, (args) => {
      const subPath = args.path.slice(2);
      const base = path.join(ROOT, subPath);
      const candidates = [
        base,
        `${base}.tsx`,
        `${base}.ts`,
        `${base}.jsx`,
        `${base}.js`,
        `${base}.json`,
        path.join(base, 'index.tsx'),
        path.join(base, 'index.ts'),
        path.join(base, 'index.js'),
      ];
      for (const cand of candidates) {
        if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
          return { path: cand };
        }
      }
      return undefined;
    });
  },
};

async function buildStudioSpa() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // 1. Bundle React Studio SPA JS
  const result = await esbuild.build({
    entryPoints: [path.join(ROOT, 'src', 'studioApp', 'main.tsx')],
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['es2020'],
    outfile: path.join(OUT_DIR, 'studio.js'),
    plugins: [studioAliasPlugin],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    loader: {
      '.json': 'json',
    },
    metafile: false,
  });

  if (result.errors.length > 0) {
    throw new Error(`esbuild failed: ${result.errors.map((e) => e.text).join('\n')}`);
  }

  // 2. Compile Tailwind v4 + globals.css + atom-ui.css
  const globalsCssPath = path.join(ROOT, 'app', 'globals.css');
  const atomUiCssPath = path.join(ROOT, 'css', 'atom-ui.css');
  const globalsCss = fs.existsSync(globalsCssPath) ? fs.readFileSync(globalsCssPath, 'utf-8') : '@import "tailwindcss";\n';
  const atomUiCss = fs.existsSync(atomUiCssPath) ? fs.readFileSync(atomUiCssPath, 'utf-8') : '';

  const combinedInput = `${globalsCss}\n\n${atomUiCss}`;
  const cssResult = await postcss([tailwindcss({ base: ROOT })]).process(combinedInput, {
    from: globalsCssPath,
    to: path.join(OUT_DIR, 'studio.css'),
  });
  fs.writeFileSync(path.join(OUT_DIR, 'studio.css'), cssResult.css, 'utf-8');

  // 3. Write standalone index.html
  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AtomSystem Local Studio</title>
  <link rel="stylesheet" href="/studio.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/studio.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html, 'utf-8');

  console.log('✓ Built standalone Studio SPA -> dist/studio/{index.html,studio.js,studio.css}');
}

buildStudioSpa().catch((err) => {
  console.error('❌ Failed to build Studio SPA:', err);
  process.exit(1);
});
