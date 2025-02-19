#!/usr/bin/env node
import inquirer from "inquirer";
import { exec } from "child_process";
import fs from "fs"; // 파일 시스템 작업을 위한 모듈
import path from "path"; // 경로 작업을 위한 모듈

// 사용자에게 질문을 던져서 Next.js와 React를 설치할지 물어봅니다.
inquirer
  .prompt([
    {
      type: "confirm",
      name: "installPackages",
      message: "Do you want to install Next.js and React?",
      default: true,
    },
  ])
  .then((answers) => {
    if (answers.installPackages) {
      console.log("Installing Next.js and React...");

      // 두 패키지를 동시에 설치하는 명령어
      exec(
        "npm install next@latest react@latest react-dom@latest",
        (err, stdout, stderr) => {
          if (err) {
            console.error(`Error: ${stderr}`);
          } else {
            console.log(stdout);
            console.log("Installation complete!");

            // package.json에 scripts 추가
            const packageJsonPath = path.join(process.cwd(), "package.json");
            fs.readFile(packageJsonPath, "utf8", (err, data) => {
              if (err) {
                console.error("Error reading package.json:", err);
                return;
              }

              const packageJson = JSON.parse(data);

              // scripts 항목 추가
              packageJson.scripts = packageJson.scripts || {};
              packageJson.scripts.dev = "next dev";
              packageJson.scripts.build = "next build";
              packageJson.scripts.start = "next start";
              packageJson.scripts.lint = "next lint";

              // 수정된 package.json을 덮어씁니다.
              fs.writeFile(
                packageJsonPath,
                JSON.stringify(packageJson, null, 2),
                (err) => {
                  if (err) {
                    console.error("Error updating package.json:", err);
                  } else {
                    console.log("Updated package.json with scripts.");
                  }
                }
              );
            });

            // app 디렉토리 생성 및 layout.tsx, page.tsx 파일 추가
            const appDir = path.join(process.cwd(), "app");
            const layoutPath = path.join(appDir, "layout.tsx");
            const pagePath = path.join(appDir, "page.tsx");

            // app 디렉토리가 없으면 생성
            if (!fs.existsSync(appDir)) {
              fs.mkdirSync(appDir);
            }

            // layout.tsx 파일 내용
            const layoutContent = `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`;

            // page.tsx 파일 내용
            const pageContent = `export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
`;

            // layout.tsx 파일 생성
            fs.writeFile(layoutPath, layoutContent, (err) => {
              if (err) {
                console.error("Error creating layout.tsx:", err);
              } else {
                console.log("Created layout.tsx.");
              }
            });

            // page.tsx 파일 생성
            fs.writeFile(pagePath, pageContent, (err) => {
              if (err) {
                console.error("Error creating page.tsx:", err);
              } else {
                console.log("Created page.tsx.");
              }
            });
          }
        }
      );
    } else {
      console.log("Installation skipped.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
