import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { logger } from "./logger"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Bundled version: dist/index.js (__dirname is dist)
// Dev version: src/commands/add.ts (__dirname is src/commands)
// Dev version: src/utils/component.ts (__dirname is src/utils)
function getBaseDir() {
  const isBuilt = path.basename(__dirname) === "dist" || fs.existsSync(path.join(__dirname, "index.js"))
  // If we are in src/utils or src/commands, we need to go up 2 levels to reach the root.
  // If we are in dist, we need to go up 1 level.
  // However, if we are in dist/utils (alternative bundling), we might need to go up 2 levels.
  // A more robust way is to look for package.json or app/templates.
  
  if (isBuilt) {
    return path.join(__dirname, "..")
  }
  
  // Try src/utils -> src -> root
  if (path.basename(__dirname) === "utils" || path.basename(__dirname) === "commands") {
    return path.join(__dirname, "..", "..")
  }
  
  return path.join(__dirname, "..", "..") // fallback
}

export const baseDir = getBaseDir()
export const templateDir = path.join(baseDir, "app", "templates")

logger.info(`🔍 Debug: baseDir=${baseDir}`)
logger.info(`🔍 Debug: templateDir=${templateDir}`)

export const components = [
  "Button", "Badge", "Card", "Collapse", "CodeBlock", "Navigation",
  "Sidebar", "Input", "Theme", "Tab", "Toast", "Pagination",
  "Table", "Modal", "TOC", "Dropdown"
]

export const dependenciesMap: Record<string, string[]> = {
  Theme: ["Button", "Form", "Modal"],
}

export function addComponent(comp: string, cwd: string, addedComponents: Set<string>) {
  if (addedComponents.has(comp)) return
  addedComponents.add(comp)

  const componentSourceDir = path.join(templateDir, comp)
  const componentPath = path.join(componentSourceDir, `${comp}.tsx`)
  const targetDir = path.join(cwd, "app", "components", comp)
  const targetPath = path.join(targetDir, `${comp}.tsx`)

  const cssFileName = `${comp}.css`.toLowerCase()
  const sourceCssPath = path.join(componentSourceDir, cssFileName)
  const targetCssPath = path.join(targetDir, cssFileName)

  if (fs.existsSync(componentPath)) {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
      logger.info(`디렉토리 생성: ${targetDir}`)
    }

    // 1) TSX 복사
    fs.copyFileSync(componentPath, targetPath)
    logger.success(`✅ ${comp} 컴포넌트(TSX)가 추가되었습니다: ${targetPath}`)

    // 2) CSS 복사 및 globals.css 업데이트
    if (fs.existsSync(sourceCssPath)) {
      fs.copyFileSync(sourceCssPath, targetCssPath)
      logger.success(`✅ ${comp} 컴포넌트(CSS)가 추가되었습니다: ${targetCssPath}`)

      updateGlobalsCss(comp, cssFileName, cwd)
    }

    // 3) 의존성 컴포넌트 처리
    if (dependenciesMap[comp]) {
      logger.info(`⏳ ${comp}의 의존성 컴포넌트 확인 중...`)
      for (const dep of dependenciesMap[comp]) {
        addComponent(dep, cwd, addedComponents)
      }
    }
  } else {
    logger.error(`❌ ${comp} 컴포넌트가 atomsystem에 존재하지 않습니다: ${comp}`)
  }
}

export function updateGlobalsCss(comp: string, cssFileName: string, cwd: string) {
  const globalsPath = path.join(cwd, "app", "globals.css")
  const importLine = `@import "./components/${comp}/${cssFileName}";`
  const componentSectionMarker = "/* Component Styles */"

  if (fs.existsSync(globalsPath)) {
    let content = fs.readFileSync(globalsPath, "utf8")

    if (!content.includes(importLine)) {
      if (content.includes(componentSectionMarker)) {
        const markerIndex = content.indexOf(componentSectionMarker)
        const afterMarker = content.slice(markerIndex)
        const lastImportIndex = afterMarker.lastIndexOf("@import")

        if (lastImportIndex !== -1) {
          const endOfLastImport = markerIndex + lastImportIndex + afterMarker.slice(lastImportIndex).indexOf("\n") + 1
          content = content.slice(0, endOfLastImport) + importLine + "\n" + content.slice(endOfLastImport)
        } else {
          content = content.slice(0, markerIndex + componentSectionMarker.length) + "\n" + importLine + "\n" + content.slice(markerIndex + componentSectionMarker.length)
        }
      } else {
        content = content.trimEnd() + "\n\n" + componentSectionMarker + "\n" + importLine + "\n"
      }

      fs.writeFileSync(globalsPath, content, "utf8")
      logger.success(`✅ globals.css에 ${comp} @import를 추가했습니다.`)
    }
  } else {
    logger.warn(`⚠️  globals.css를 찾을 수 없습니다. 수동으로 추가해 주세요:\n   ${importLine}`)
  }
}
