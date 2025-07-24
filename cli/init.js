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
const tokenFile = path.join(packageRoot, "token.json");
const buildFile = path.join(packageRoot, "/build/build-tokens.js");

// 프로젝트 루트 경로 (사용자가 실행한 곳)
const projectRoot = process.cwd();
const targetTokenFile = path.join(projectRoot, "token.json");
const targetBuildDir = path.join(projectRoot, "build");
const targetBuildFile = path.join(projectRoot, "/build/build-tokens.js");

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
        console.log("✅ Installation complete!");
      } catch (err) {
        console.error("❌ Error during installation:", err);
        return;
      }

      // package.json 업데이트
      const packageJsonPath = path.join(projectRoot, "package.json");
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf8")
        );

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
          path: path.join(appDir, "layout.tsx"),
          content: `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,
        },
        {
          path: path.join(appDir, "page.tsx"),
          content: `export default function Page() {
  return <h1>Hello, Next.js!</h1>
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

    // ✅ 토큰 파일 복사 (Next.js 설치 여부와 관계없이 실행)
    copyFileSync(tokenFile, targetTokenFile);
    console.log(`✅ Copied: token.json -> ${targetTokenFile}`);

    if (!fs.existsSync(targetBuildDir)) mkdirSync(targetBuildDir);
    copyFileSync(buildFile, targetBuildFile);
    console.log(`✅ Copied: build-token.json -> ${targetTokenFile}`);

    console.log("🚀 Token setup complete!");
  })
  .catch((error) => {
    console.error("❌ Error:", error);
  });
