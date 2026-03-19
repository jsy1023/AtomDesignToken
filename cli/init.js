#!/usr/bin/env node
import inquirer from "inquirer";
import ora from "ora";
import { exec } from "child_process";
import fs, { copyFileSync, mkdirSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

const execPromise = promisify(exec);

// 현재 실행중인 CLI 파일의 디렉토리 찾기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 패키지 내부 경로 설정
const packageRoot = path.join(__dirname, "..");
const tokenFile = path.join(packageRoot, "tokens", "tokens.json");
const buildFile = path.join(packageRoot, "build", "build-tokens.js");
const textCssFile = path.join(packageRoot, "css", "text.css");

// 프로젝트 루트 경로 (사용자가 실행한 곳)
const projectRoot = process.cwd();
const targetTokenDir = path.join(projectRoot, "tokens");
const targetTokenFile = path.join(targetTokenDir, "tokens.json");
const targetBuildDir = path.join(projectRoot, "build");
const targetBuildFile = path.join(targetBuildDir, "build-tokens.js");
const targetCssDir = path.join(projectRoot, "css");
const targetTextCssFile = path.join(targetCssDir, "text.css");

// 파일 복사 헬퍼: 대상 디렉토리 생성 → 파일 복사 → 로그 출력
function copyTo(src, dest, label) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) mkdirSync(dir, { recursive: true });
  copyFileSync(src, dest);
  console.log(`✅ Copied: ${label} -> ${dest}`);
}

// 사용자 프로젝트에 package.json이 존재하는지 먼저 확인 (안전장치)
const packageJsonPath = path.join(projectRoot, "package.json");
if (!fs.existsSync(packageJsonPath)) {
  console.error("❌ Error: package.json not found in the current directory.");
  console.error("Please run 'npm init' or 'npm init -y' before running atomsystem-init.");
  process.exit(1);
}

// 사용자에게 Next.js 설치 여부 질문
inquirer
  .prompt([
    {
      type: "confirm",
      name: "installPackages",
      message: "Do you want to install Next.js and React?",
      default: true,
    },
  ])
  .then(async (answers) => {
    if (answers.installPackages) {
      const pkgSpinner = ora("Installing Next.js and React...").start();

      try {
        await execPromise(
          "npm install next@latest react@latest react-dom@latest tailwindcss @tailwindcss/postcss postcss clsx react-modal typescript @types/react @types/node @types/react-dom @types/react-modal"
        );
        pkgSpinner.succeed("Next.js and React installation complete!");
      } catch (err) {
        pkgSpinner.fail("Error during Next.js/React installation");
        console.error(err);
        return;
      }

      const sdSpinner = ora("Installing style-dictionary for atom design tokens...").start();
      try {
        await execPromise("npm install style-dictionary -D");
        sdSpinner.succeed("style-dictionary installation complete!");
      } catch (err) {
        sdSpinner.fail("Error during style-dictionary installation");
        console.error(err);
        return;
      }

      // package.json 업데이트
      const packageJsonPath = path.join(projectRoot, "package.json");
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf8")
        );

        packageJson.type = "module";
        packageJson.scripts = {
          ...packageJson.scripts,
          "dev": "node build/build-tokens.js && next dev",
          "build": "next build",
          "start": "next start",
          "lint": "next lint",
          "token-build": "node build/build-tokens.js",
        };

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log("✅ Updated package.json with scripts.");
      } catch (err) {
        console.error("❌ Error updating package.json:", err);
        return;
      }

      // app 디렉토리 생성 및 파일 추가
      const appDir = path.join(projectRoot, "app");
      if (!fs.existsSync(appDir)) mkdirSync(appDir);

      // components 및 Theme 디렉토리 생성은 add.js 가 알아서 처리하므로 여기서는 page.tsx 와 layout.tsx, globals.css 만 생성합니다.
      const files = [
        {
          path: path.join(appDir, "layout.tsx"),
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
}`,
        },
        {
          path: path.join(appDir, "globals.css"),
          content: `@import "tailwindcss";
@import "../build/css/_variables.css";
@import "../css/text.css";`,
        },
        {
          path: path.join(appDir, "page.tsx"),
          content: `import { ThemeSelector } from "./components/Theme/Theme";
import { Button } from "./components/Button/Button";
import { Card, CardHeader, CardContent, CardFooter } from "./components/Card/Card";

export default function Page() {
  return (
    <main style={{ padding: "40px", minHeight: "100vh", background: "var(--color-bg-wrapper)", transition: "background 0.3s ease" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        <h1 style={{ fontSize: "var(--font-sizes-h2)", color: "var(--color-text-standard)", margin: 0 }}>Hello, atomsystem!</h1>
        <p style={{ fontSize: "var(--font-sizes-body)", margin: 0 }}>
          이 화면은 디자인 토큰이 적용된 샘플 화면입니다. 아래 테마를 변경해보세요.
        </p>
        
        <ThemeSelector />

        <Card>
          <CardHeader>
            <h2 style={{ fontSize: "var(--font-sizes-h3)", margin: 0 }}>Sample Card Components</h2>
          </CardHeader>
          <CardContent>
            <p style={{ margin: 0, color: "var(--color-text-disabled)" }}>
              이 카드는 테마 변경 시 배경색, 텍스트 색상, 테두리 색상이 자동으로 변경됩니다. 
              여기 있는 버튼들은 제공된 Button 컴포넌트로 구성되었습니다.
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
}`,
        },
        // ✅ tsconfig.json: "@/*" 경로 별칭 설정 (예: @/build/typescript/theme)
        {
          path: path.join(projectRoot, "tsconfig.json"),
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
          }, null, 2),
        },
        // ✅ next.config.ts: Next.js 기본 설정
        {
          path: path.join(projectRoot, "next.config.ts"),
          content: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
};

export default nextConfig;`,
        },
        // ✅ postcss.config.mjs: Tailwind CSS v4 PostCSS 플러그인 등록 (@theme, @import "tailwindcss" 인식)
        {
          path: path.join(projectRoot, "postcss.config.mjs"),
          content: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`,
        },
      ];

      files.forEach(({ path, content }) => {
        fs.writeFileSync(path, content);
        console.log(`✅ Created ${path}`);
      });

      // ✅ 토큰 빌드 먼저 실행: Theme.tsx가 @/build/typescript/theme를 import하므로
      // 컴포넌트 복사 전에 build-tokens.js를 실행해 theme.ts를 미리 생성해야 합니다.
      const buildTokensPath = path.join(projectRoot, "build", "build-tokens.js");
      if (fs.existsSync(buildTokensPath)) {
        const tokenBuildSpinner = ora("Building design tokens (generating build/typescript/theme.ts)...").start();
        try {
          await execPromise(`node "${buildTokensPath}"`, { cwd: projectRoot });
          tokenBuildSpinner.succeed("Design tokens built successfully!");
        } catch (err) {
          tokenBuildSpinner.fail("Error during token build");
          console.error(err);
          return;
        }
      } else {
        console.warn("⚠️  build-tokens.js not found, skipping token build.");
      }

      // add.js를 실행하여 Theme, Card 컴포넌트 및 하위 의존성을 복사합니다.
      const addScriptPath = path.join(__dirname, "add.js");
      if (fs.existsSync(addScriptPath)) {
        console.log("⏳ Adding default components via add.js...");
        try {
          // Theme 설치 (Theme 내부에 Button 등이 포함되어 있음)
          await execPromise(`node "${addScriptPath}" Theme`, { cwd: projectRoot });
          // Card 설치
          await execPromise(`node "${addScriptPath}" Card`, { cwd: projectRoot });
          console.log("✅ Default components (Theme, Card, Button 등) added successfully.");
        } catch (err) {
          console.error("❌ Failed to add components:", err);
        }
      }
    } else {
      console.log("🚀 Installation skipped.");
    }

    // ✅ 필수 파일 복사 (Next.js 설치 여부와 관계없이 실행)
    copyTo(tokenFile,   targetTokenFile,   "tokens/tokens.json");
    copyTo(buildFile,   targetBuildFile,   "build/build-tokens.js");
    copyTo(textCssFile, targetTextCssFile, "css/text.css");

    console.log("🚀 Token setup complete!");
  })
  .catch((error) => {
    console.error("❌ Error:", error);
  });
