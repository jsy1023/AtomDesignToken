import { Command } from "commander"
import fs from "fs"
import path from "path"
import { exec } from "child_process"
import { promisify } from "util"
import ora from "ora"
import prompts from "prompts"
import { fileURLToPath } from "url"
import { z } from "zod"
import { logger } from "../utils/logger"
import { addComponent } from "../utils/component"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execPromise = promisify(exec)

// tsup --shims will provide __dirname in ESM
// In local dev, we need to find the source files relative to where the CLI is run or installed.

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
})

export const init = new Command()
  .name("init")
  .description("프로젝트를 초기화하고 atomsystem을 설정합니다.")
  .option("-y, --yes", "모든 질문에 'yes'로 응답합니다.", false)
  .option("-c, --cwd <cwd>", "작업 디렉토리 경로", process.cwd())
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse({
        ...opts,
        cwd: path.resolve(opts.cwd),
      })

      const projectRoot = options.cwd
      const packageJsonPath = path.join(projectRoot, "package.json")

      if (!fs.existsSync(packageJsonPath)) {
        logger.error("❌ 오류: 현재 디렉토리에서 package.json을 찾을 수 없습니다.")
        logger.info("'npm init'을 먼저 실행한 후 다시 시도해 주세요.")
        process.exit(1)
      }

      const answers = options.yes ? { installPackages: true } : await prompts({
        type: "confirm",
        name: "installPackages",
        message: "Next.js와 React를 설치하시겠습니까?",
        initial: true,
      })

      if (answers.installPackages) {
        const pkgSpinner = ora("Next.js와 React 설치 중...").start()
        try {
          await execPromise(
            "npm install next@latest react@latest react-dom@latest tailwindcss @tailwindcss/postcss postcss clsx react-modal typescript @types/react @types/node @types/react-dom @types/react-modal --legacy-peer-deps",
            { cwd: projectRoot }
          )
          pkgSpinner.succeed("Next.js와 React 설치 완료!")
        } catch (err) {
          pkgSpinner.fail("설치 중 오류 발생")
          logger.error(err)
          return
        }

        const sdSpinner = ora("style-dictionary 설치 중...").start()
        try {
          await execPromise("npm install style-dictionary -D --legacy-peer-deps", { cwd: projectRoot })
          sdSpinner.succeed("style-dictionary 설치 완료!")
        } catch (err) {
          sdSpinner.fail("style-dictionary 설치 중 오류 발생")
          logger.error(err)
          return
        }

        const gsSpinner = ora("gsap Animation 설치 중...").start()
        try {
          await execPromise("npm install gsap --legacy-peer-deps", { cwd: projectRoot })
          gsSpinner.succeed("gsap Animation 설치 완료!")
        } catch (err) {
          gsSpinner.fail("gsap Animation 설치 중 오류 발생")
          logger.error(err)
          return
        }

        // package.json 업데이트
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
          packageJson.type = "module"
          packageJson.scripts = {
            ...packageJson.scripts,
            "dev": "node build/build-tokens.js && next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint",
            "token-build": "node build/build-tokens.js",
          }
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
          logger.success("✅ package.json 스크립트 업데이트 완료.")
        } catch (err) {
          logger.error("❌ package.json 업데이트 오류:", err)
          return
        }

        // app 디렉토리 및 기본 파일 생성
        const appDir = path.join(projectRoot, "app")
        if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true })

        const files = [
          {
            path: path.join(appDir, "layout.tsx"),
            content: `import { ThemeProvider } from "./components/Theme/Theme";\nimport "./globals.css";\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en" suppressHydrationWarning>\n      <body>\n        <ThemeProvider />\n        {children}\n        <div id="modal-root"></div>\n      </body>\n    </html>\n  )\n}`,
          },
          {
            path: path.join(appDir, "globals.css"),
            content: `@import "tailwindcss";\n@import "../build/css/_variables.css";\n@import "../css/text.css";`,
          },
          {
            path: path.join(appDir, "page.tsx"),
            content: `import { ThemeSelector } from "./components/Theme/Theme";\nimport { Button } from "./components/Button/Button";\nimport { Card, CardHeader, CardContent, CardFooter } from "./components/Card/Card";\n\nexport default function Page() {\n  return (\n    <main style={{ padding: "40px", minHeight: "100vh", background: "var(--color-bg-wrapper)", transition: "background 0.3s ease" }}>\n      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>\n        <h1 style={{ fontSize: "var(--font-sizes-h2)", color: "var(--color-text-standard)", margin: 0 }}>Hello, atomsystem!</h1>\n        <p style={{ fontSize: "var(--font-sizes-body)", margin: 0 }}>\n          이 화면은 디자인 토큰이 적용된 샘플 화면입니다. 아래 테마를 변경해보세요.\n        </p>\n        \n        <ThemeSelector />\n\n        <Card>\n          <CardHeader>\n            <h2 style={{ fontSize: "var(--font-sizes-h3)", margin: 0 }}>Sample Card Components</h2>\n          </CardHeader>\n          <CardContent>\n            <p style={{ margin: 0, color: "var(--color-text-disabled)" }}>\n              이 카드는 테마 변경 시 배경색, 텍스트 색상, 테두리 색상이 자동으로 변경됩니다. \n              여기 있는 버튼들은 제공된 Button 컴포넌트로 구성되었습니다.\n            </p>\n          </CardContent>\n          <CardFooter>\n            <div style={{ display: "flex", gap: "12px" }}>\n               <Button type="primary">Primary Button</Button>\n               <Button type="secondary">Secondary Button</Button>\n               <Button type="gray">Gray Button</Button>\n            </div>\n          </CardFooter>\n        </Card>\n      </div>\n    </main>\n  )\n}`,
          },
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
          {
            path: path.join(projectRoot, "next.config.ts"),
            content: `import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = { reactStrictMode: false };\nexport default nextConfig;`,
          },
          {
            path: path.join(projectRoot, "postcss.config.mjs"),
            content: `/** @type {import('postcss-load-config').Config} */\nconst config = { plugins: { "@tailwindcss/postcss": {} } };\nexport default config;`,
          }
        ]

        for (const file of files) {
          fs.writeFileSync(file.path, file.content)
          logger.info(`✅ 파일 생성: ${file.path}`)
        }

        // 토큰 빌드 실행
        const buildTokensPath = path.join(projectRoot, "build", "build-tokens.js")
        if (fs.existsSync(buildTokensPath)) {
          const spin = ora("디자인 토큰 빌드 중...").start()
          try {
            await execPromise(`node "${buildTokensPath}"`, { cwd: projectRoot })
            spin.succeed("디자인 토큰 빌드 완료.")
          } catch (err) {
            spin.fail("토큰 빌드 실패")
            logger.error(err)
          }
        }
      }

      // 필수 파일 복사 (tokens/tokens.json, build/build-tokens.js, css/text.css)
      // Note: baseDir is already calculated in ../utils/component
      const { baseDir: pkgRoot } = await import("../utils/component")
      
      logger.info(`🔍 Debug: pkgRoot=${pkgRoot}`)

      const tokenFile = path.join(pkgRoot, "tokens", "tokens.json")
      const buildFile = path.join(pkgRoot, "build", "build-tokens.js")
      const textCssFile = path.join(pkgRoot, "css", "text.css")

      copyFile(tokenFile, path.join(projectRoot, "tokens", "tokens.json"))
      copyFile(buildFile, path.join(projectRoot, "build", "build-tokens.js"))
      copyFile(textCssFile, path.join(projectRoot, "css", "text.css"))

      // 기본 데모 컴포넌트 추가
      const addedComponents = new Set<string>()
      logger.info("⏳ 기본 데모 컴포넌트 설치 중...")
      // 명시적으로 필요한 컴포넌트들을 추가 (Theme이 Button을 포함하지만 안전을 위해 명시)
      addComponent("Button", projectRoot, addedComponents)
      addComponent("Theme", projectRoot, addedComponents)
      addComponent("Card", projectRoot, addedComponents)

      logger.success("🚀 Atomsystem 초기 설정 완료!")
    } catch (error) {
      logger.error("초기화 중 오류 발생:")
      logger.error(error)
    }
  })

function copyFile(src: string, dest: string) {
  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    logger.info(`✅ 복사 완료: ${src} -> ${dest}`)
  } else {
    logger.warn(`⚠️  파일을 찾을 수 없어 복사하지 못했습니다: ${src}`)
  }
}
