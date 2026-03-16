#!/usr/bin/env node
import inquirer from "inquirer";
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

// 프로젝트 루트 경로 (사용자가 실행한 곳)
const projectRoot = process.cwd();
const targetTokenDir = path.join(projectRoot, "tokens");
const targetTokenFile = path.join(targetTokenDir, "tokens.json");
const targetBuildDir = path.join(projectRoot, "build");
const targetBuildFile = path.join(targetBuildDir, "build-tokens.js");

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
      console.log("Installing Next.js and React...");

      try {
        await execPromise(
          "npm install next@latest react@latest react-dom@latest tailwindcss"
        );
        console.log("✅ Next.js and React Installation complete!");
      } catch (err) {
        console.error("❌ Error during Next.js/React installation:", err);
        return;
      }

      console.log("Installing style-dictionary for atom design tokens...");
      try {
        await execPromise("npm install style-dictionary -D");
        console.log("✅ style-dictionary Installation complete!");
      } catch (err) {
        console.error("❌ Error during style-dictionary installation:", err);
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

      const files = [
        {
          path: path.join(appDir, "ThemeProvider.tsx"),
          content: `"use client";
import { useEffect, useState } from "react";
import { themes } from "@/build/typescript/theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Record<string, string>>({});
  const [isThemeLoading, setThemeLoading] = useState(false);

  useEffect(() => {
    const listenStorageChange = () => {
      const newThemes: Record<string, string> = {};
      Object.entries(themes).forEach(([group, groupThemes]) => {
        const storedKey = group === "global" ? "theme" : \`theme-\${group}\`;
        const currentTheme = localStorage.getItem(storedKey) || groupThemes[0];
        newThemes[group] = currentTheme;
        
        document.documentElement.classList.remove(...groupThemes);
        document.documentElement.classList.add(currentTheme);
      });
      setTheme(newThemes);
    };

    listenStorageChange();
    window.addEventListener("storage", listenStorageChange);
    setThemeLoading(true);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);

  if (isThemeLoading === false) return null;
  return <>{children}</>;
};`,
        },
        {
          path: path.join(appDir, "layout.tsx"),
          content: `import { ThemeProvider } from "./ThemeProvider";
import "../css/global.css"; // Ensure to load the CSS configuration if possible

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`,
        },
        {
          path: path.join(appDir, "page.tsx"),
          content: `import { ThemeSelector } from "./components/Theme/Theme";

export default function Page() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>Hello, atomsystem!</h1>
      <ThemeSelector />
    </main>
  )
}`,
        },
      ];

      files.forEach(({ path, content }) => {
        fs.writeFileSync(path, content);
        console.log(`✅ Created ${path}`);
      });
    } else {
      console.log("🚀 Installation skipped.");
    }

    // ✅ 토큰 파일과 빌드 파일 복사 (Next.js 설치 여부와 관계없이 실행)
    if (!fs.existsSync(targetTokenDir)) mkdirSync(targetTokenDir, { recursive: true });
    copyFileSync(tokenFile, targetTokenFile);
    console.log(`✅ Copied: tokens/tokens.json -> ${targetTokenFile}`);

    if (!fs.existsSync(targetBuildDir)) mkdirSync(targetBuildDir, { recursive: true });
    copyFileSync(buildFile, targetBuildFile);
    console.log(`✅ Copied: build-tokens.js -> ${targetBuildFile}`);

    console.log("🚀 Token setup complete!");
  })
  .catch((error) => {
    console.error("❌ Error:", error);
  });
