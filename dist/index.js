#!/usr/bin/env node

// node_modules/tsup/assets/esm_shims.js
import path from "path";
import { fileURLToPath } from "url";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { Command as Command3 } from "commander";

// src/commands/add.ts
import { Command } from "commander";
import fs from "fs";
import path2 from "path";
import prompts from "prompts";
import { z } from "zod";

// src/utils/logger.ts
import chalk from "chalk";
var logger = {
  error(...args) {
    console.error(chalk.red(...args));
  },
  warn(...args) {
    console.warn(chalk.yellow(...args));
  },
  info(...args) {
    console.info(chalk.cyan(...args));
  },
  success(...args) {
    console.log(chalk.green(...args));
  },
  log(...args) {
    console.log(...args);
  },
  break() {
    console.log("");
  }
};

// src/commands/add.ts
var templateDir = path2.join(process.cwd(), "app", "templates");
var components = [
  "Button",
  "Badge",
  "Card",
  "Collapse",
  "CodeBlock",
  "Navigation",
  "Sidebar",
  "Input",
  "Theme",
  "Tab",
  "Toast",
  "Pagination",
  "Table",
  "Modal",
  "TOC",
  "Dropdown"
];
var dependenciesMap = {
  Theme: ["Button", "Form", "Modal"]
};
var addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  all: z.boolean(),
  cwd: z.string()
});
var add = new Command().name("add").description("\uD504\uB85C\uC81D\uD2B8\uC5D0 \uCEF4\uD3EC\uB10C\uD2B8\uB97C \uCD94\uAC00\uD569\uB2C8\uB2E4.").argument("[components...]", "\uCD94\uAC00\uD560 \uCEF4\uD3EC\uB10C\uD2B8 \uC774\uB984 \uBAA9\uB85D").option("-a, --all", "\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uBAA8\uB4E0 \uCEF4\uD3EC\uB10C\uD2B8\uB97C \uCD94\uAC00\uD569\uB2C8\uB2E4.", false).option("-c, --cwd <cwd>", "\uC791\uC5C5 \uB514\uB809\uD1A0\uB9AC \uACBD\uB85C", process.cwd()).action(async (componentsArg, opts) => {
  try {
    const options = addOptionsSchema.parse({
      components: componentsArg,
      ...opts,
      cwd: path2.resolve(opts.cwd)
    });
    let selectedComponents = options.components || [];
    if (options.all) {
      selectedComponents = components;
    }
    if (selectedComponents.length === 0) {
      const { components: promptedComponents } = await prompts({
        type: "multiselect",
        name: "components",
        message: "\uCD94\uAC00\uD560 \uCEF4\uD3EC\uB10C\uD2B8\uB97C \uC120\uD0DD\uD558\uC138\uC694:",
        choices: components.map((comp) => ({ title: comp, value: comp }))
      });
      selectedComponents = promptedComponents;
    }
    if (!selectedComponents || selectedComponents.length === 0) {
      logger.warn("\uC120\uD0DD\uB41C \uCEF4\uD3EC\uB10C\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    const addedComponents = /* @__PURE__ */ new Set();
    for (const comp of selectedComponents) {
      addComponent(comp, options.cwd, addedComponents);
    }
  } catch (error) {
    logger.error("\uCEF4\uD3EC\uB10C\uD2B8 \uCD94\uAC00 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.");
    logger.error(error);
  }
});
function addComponent(comp, cwd, addedComponents) {
  if (addedComponents.has(comp)) return;
  addedComponents.add(comp);
  const componentSourceDir = path2.join(templateDir, comp);
  const componentPath = path2.join(componentSourceDir, `${comp}.tsx`);
  const targetDir = path2.join(cwd, "app", "components", comp);
  const targetPath = path2.join(targetDir, `${comp}.tsx`);
  const cssFileName = `${comp}.css`.toLowerCase();
  const sourceCssPath = path2.join(componentSourceDir, cssFileName);
  const targetCssPath = path2.join(targetDir, cssFileName);
  if (fs.existsSync(componentPath)) {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      logger.info(`\uB514\uB809\uD1A0\uB9AC \uC0DD\uC131: ${targetDir}`);
    }
    fs.copyFileSync(componentPath, targetPath);
    logger.success(`\u2705 ${comp} \uCEF4\uD3EC\uB10C\uD2B8(TSX)\uAC00 \uCD94\uAC00\uB418\uC5C8\uC2B5\uB2C8\uB2E4: ${targetPath}`);
    if (fs.existsSync(sourceCssPath)) {
      fs.copyFileSync(sourceCssPath, targetCssPath);
      logger.success(`\u2705 ${comp} \uCEF4\uD3EC\uB10C\uD2B8(CSS)\uAC00 \uCD94\uAC00\uB418\uC5C8\uC2B5\uB2C8\uB2E4: ${targetCssPath}`);
      updateGlobalsCss(comp, cssFileName, cwd);
    }
    if (dependenciesMap[comp]) {
      logger.info(`\u23F3 ${comp}\uC758 \uC758\uC874\uC131 \uCEF4\uD3EC\uB10C\uD2B8 \uD655\uC778 \uC911...`);
      for (const dep of dependenciesMap[comp]) {
        addComponent(dep, cwd, addedComponents);
      }
    }
  } else {
    logger.error(`\u274C ${comp} \uCEF4\uD3EC\uB10C\uD2B8\uAC00 atomsystem\uC5D0 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`);
  }
}
function updateGlobalsCss(comp, cssFileName, cwd) {
  const globalsPath = path2.join(cwd, "app", "globals.css");
  const importLine = `@import "./components/${comp}/${cssFileName}";`;
  const componentSectionMarker = "/* Component Styles */";
  if (fs.existsSync(globalsPath)) {
    let content = fs.readFileSync(globalsPath, "utf8");
    if (!content.includes(importLine)) {
      if (content.includes(componentSectionMarker)) {
        const markerIndex = content.indexOf(componentSectionMarker);
        const afterMarker = content.slice(markerIndex);
        const lastImportIndex = afterMarker.lastIndexOf("@import");
        if (lastImportIndex !== -1) {
          const endOfLastImport = markerIndex + lastImportIndex + afterMarker.slice(lastImportIndex).indexOf("\n") + 1;
          content = content.slice(0, endOfLastImport) + importLine + "\n" + content.slice(endOfLastImport);
        } else {
          content = content.slice(0, markerIndex + componentSectionMarker.length) + "\n" + importLine + "\n" + content.slice(markerIndex + componentSectionMarker.length);
        }
      } else {
        content = content.trimEnd() + "\n\n" + componentSectionMarker + "\n" + importLine + "\n";
      }
      fs.writeFileSync(globalsPath, content, "utf8");
      logger.success(`\u2705 globals.css\uC5D0 ${comp} @import\uB97C \uCD94\uAC00\uD588\uC2B5\uB2C8\uB2E4.`);
    }
  } else {
    logger.warn(`\u26A0\uFE0F  globals.css\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC218\uB3D9\uC73C\uB85C \uCD94\uAC00\uD574 \uC8FC\uC138\uC694:
   ${importLine}`);
  }
}

// src/commands/init.ts
import { Command as Command2 } from "commander";
import fs2 from "fs";
import path3 from "path";
import { exec } from "child_process";
import { promisify } from "util";
import ora from "ora";
import prompts2 from "prompts";
import { z as z2 } from "zod";
var execPromise = promisify(exec);
var initOptionsSchema = z2.object({
  cwd: z2.string(),
  yes: z2.boolean()
});
var init = new Command2().name("init").description("\uD504\uB85C\uC81D\uD2B8\uB97C \uCD08\uAE30\uD654\uD558\uACE0 atomsystem\uC744 \uC124\uC815\uD569\uB2C8\uB2E4.").option("-y, --yes", "\uBAA8\uB4E0 \uC9C8\uBB38\uC5D0 'yes'\uB85C \uC751\uB2F5\uD569\uB2C8\uB2E4.", false).option("-c, --cwd <cwd>", "\uC791\uC5C5 \uB514\uB809\uD1A0\uB9AC \uACBD\uB85C", process.cwd()).action(async (opts) => {
  try {
    const options = initOptionsSchema.parse({
      ...opts,
      cwd: path3.resolve(opts.cwd)
    });
    const projectRoot = options.cwd;
    const packageJsonPath = path3.join(projectRoot, "package.json");
    if (!fs2.existsSync(packageJsonPath)) {
      logger.error("\u274C \uC624\uB958: \uD604\uC7AC \uB514\uB809\uD1A0\uB9AC\uC5D0\uC11C package.json\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      logger.info("'npm init'\uC744 \uBA3C\uC800 \uC2E4\uD589\uD55C \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.");
      process.exit(1);
    }
    const answers = options.yes ? { installPackages: true } : await prompts2({
      type: "confirm",
      name: "installPackages",
      message: "Next.js\uC640 React\uB97C \uC124\uCE58\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
      initial: true
    });
    if (answers.installPackages) {
      const pkgSpinner = ora("Next.js\uC640 React \uC124\uCE58 \uC911...").start();
      try {
        await execPromise(
          "npm install next@latest react@latest react-dom@latest tailwindcss @tailwindcss/postcss postcss clsx react-modal typescript @types/react @types/node @types/react-dom @types/react-modal",
          { cwd: projectRoot }
        );
        pkgSpinner.succeed("Next.js\uC640 React \uC124\uCE58 \uC644\uB8CC!");
      } catch (err) {
        pkgSpinner.fail("\uC124\uCE58 \uC911 \uC624\uB958 \uBC1C\uC0DD");
        logger.error(err);
        return;
      }
      const sdSpinner = ora("style-dictionary \uC124\uCE58 \uC911...").start();
      try {
        await execPromise("npm install style-dictionary -D", { cwd: projectRoot });
        sdSpinner.succeed("style-dictionary \uC124\uCE58 \uC644\uB8CC!");
      } catch (err) {
        sdSpinner.fail("style-dictionary \uC124\uCE58 \uC911 \uC624\uB958 \uBC1C\uC0DD");
        logger.error(err);
        return;
      }
      try {
        const packageJson = JSON.parse(fs2.readFileSync(packageJsonPath, "utf8"));
        packageJson.type = "module";
        packageJson.scripts = {
          ...packageJson.scripts,
          "dev": "node build/build-tokens.js && next dev",
          "build": "next build",
          "start": "next start",
          "lint": "next lint",
          "token-build": "node build/build-tokens.js"
        };
        fs2.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        logger.success("\u2705 package.json \uC2A4\uD06C\uB9BD\uD2B8 \uC5C5\uB370\uC774\uD2B8 \uC644\uB8CC.");
      } catch (err) {
        logger.error("\u274C package.json \uC5C5\uB370\uC774\uD2B8 \uC624\uB958:", err);
        return;
      }
      const appDir = path3.join(projectRoot, "app");
      if (!fs2.existsSync(appDir)) fs2.mkdirSync(appDir, { recursive: true });
      const files = [
        {
          path: path3.join(appDir, "layout.tsx"),
          content: `import { ThemeProvider } from "./components/Theme/Theme";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider />
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  )
}`
        },
        {
          path: path3.join(appDir, "globals.css"),
          content: `@import "tailwindcss";
@import "../build/css/_variables.css";
@import "../css/text.css";`
        },
        {
          path: path3.join(appDir, "page.tsx"),
          content: `import { ThemeSelector } from "./components/Theme/Theme";
import { Button } from "./components/Button/Button";
import { Card, CardHeader, CardContent, CardFooter } from "./components/Card/Card";

export default function Page() {
  return (
    <main style={{ padding: "40px", minHeight: "100vh", background: "var(--color-bg-wrapper)", transition: "background 0.3s ease" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        <h1 style={{ fontSize: "var(--font-sizes-h2)", color: "var(--color-text-standard)", margin: 0 }}>Hello, atomsystem!</h1>
        <p style={{ fontSize: "var(--font-sizes-body)", margin: 0 }}>
          \uC774 \uD654\uBA74\uC740 \uB514\uC790\uC778 \uD1A0\uD070\uC774 \uC801\uC6A9\uB41C \uC0D8\uD50C \uD654\uBA74\uC785\uB2C8\uB2E4. \uC544\uB798 \uD14C\uB9C8\uB97C \uBCC0\uACBD\uD574\uBCF4\uC138\uC694.
        </p>
        
        <ThemeSelector />

        <Card>
          <CardHeader>
            <h2 style={{ fontSize: "var(--font-sizes-h3)", margin: 0 }}>Sample Card Components</h2>
          </CardHeader>
          <CardContent>
            <p style={{ margin: 0, color: "var(--color-text-disabled)" }}>
              \uC774 \uCE74\uB4DC\uB294 \uD14C\uB9C8 \uBCC0\uACBD \uC2DC \uBC30\uACBD\uC0C9, \uD14D\uC2A4\uD2B8 \uC0C9\uC0C1, \uD14C\uB450\uB9AC \uC0C9\uC0C1\uC774 \uC790\uB3D9\uC73C\uB85C \uBCC0\uACBD\uB429\uB2C8\uB2E4. 
              \uC5EC\uAE30 \uC788\uB294 \uBC84\uD2BC\uB4E4\uC740 \uC81C\uACF5\uB41C Button \uCEF4\uD3EC\uB10C\uD2B8\uB85C \uAD6C\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4.
            </p>
          </CardContent>
          <CardFooter>
            <div style={{ display: "flex", gap: "12px" }}>
               <Button type="primary">Primary Button</Button>
               <Button type="secondary">Secondary Button</Button>
               <Button type="gray">Gray Button</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}`
        },
        {
          path: path3.join(projectRoot, "tsconfig.json"),
          content: JSON.stringify({
            compilerOptions: {
              target: "ES2017",
              lib: ["dom", "dom.iterable", "esnext"],
              allowJs: true,
              skipLibCheck: true,
              strict: true,
              noEmit: true,
              esModuleInterop: true,
              module: "esnext",
              moduleResolution: "bundler",
              resolveJsonModule: true,
              isolatedModules: true,
              jsx: "preserve",
              incremental: true,
              plugins: [{ name: "next" }],
              paths: {
                "@/*": ["./*"]
              }
            },
            include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
            exclude: ["node_modules"]
          }, null, 2)
        },
        {
          path: path3.join(projectRoot, "next.config.ts"),
          content: `import type { NextConfig } from "next";

const nextConfig: NextConfig = { reactStrictMode: false };
export default nextConfig;`
        },
        {
          path: path3.join(projectRoot, "postcss.config.mjs"),
          content: `/** @type {import('postcss-load-config').Config} */
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;`
        }
      ];
      for (const file of files) {
        fs2.writeFileSync(file.path, file.content);
        logger.info(`\u2705 \uD30C\uC77C \uC0DD\uC131: ${file.path}`);
      }
      const buildTokensPath = path3.join(projectRoot, "build", "build-tokens.js");
      if (fs2.existsSync(buildTokensPath)) {
        const spin = ora("\uB514\uC790\uC778 \uD1A0\uD070 \uBE4C\uB4DC \uC911...").start();
        try {
          await execPromise(`node "${buildTokensPath}"`, { cwd: projectRoot });
          spin.succeed("\uB514\uC790\uC778 \uD1A0\uD070 \uBE4C\uB4DC \uC644\uB8CC.");
        } catch (err) {
          spin.fail("\uD1A0\uD070 \uBE4C\uB4DC \uC2E4\uD328");
          logger.error(err);
        }
      }
    }
    const tokenFile = path3.join(__dirname, "..", "..", "tokens", "tokens.json");
    const buildFile = path3.join(__dirname, "..", "..", "build", "build-tokens.js");
    const textCssFile = path3.join(__dirname, "..", "..", "css", "text.css");
    copyFile(tokenFile, path3.join(projectRoot, "tokens", "tokens.json"));
    copyFile(buildFile, path3.join(projectRoot, "build", "build-tokens.js"));
    copyFile(textCssFile, path3.join(projectRoot, "css", "text.css"));
    logger.success("\u{1F680} Atomsystem \uCD08\uAE30 \uC124\uC815 \uC644\uB8CC!");
  } catch (error) {
    logger.error("\uCD08\uAE30\uD654 \uC911 \uC624\uB958 \uBC1C\uC0DD:");
    logger.error(error);
  }
});
function copyFile(src, dest) {
  const dir = path3.dirname(dest);
  if (!fs2.existsSync(dir)) fs2.mkdirSync(dir, { recursive: true });
  if (fs2.existsSync(src)) {
    fs2.copyFileSync(src, dest);
    logger.info(`\u2705 \uBCF5\uC0AC \uC644\uB8CC: ${src} -> ${dest}`);
  } else {
    logger.warn(`\u26A0\uFE0F  \uD30C\uC77C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${src}`);
  }
}

// src/index.ts
import { readFileSync } from "fs";
import { join } from "path";
async function main() {
  const packageJsonPath = join(__dirname, "../package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  const program = new Command3().name("atomsystem").description("Atom Ground Design System CLI").version(packageJson.version);
  program.addCommand(add);
  program.addCommand(init);
  program.parse();
}
main();
