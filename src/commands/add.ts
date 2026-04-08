import { Command } from "commander"
import fs from "fs"
import path from "path"
import prompts from "prompts"
import { z } from "zod"
import { logger } from "../utils/logger"

// tsup --shims will provide __dirname in ESM if needed
// const templateDir = path.join(__dirname, "..", "app", "templates")
// For now, using process.cwd() for templates if running from source roots
const templateDir = path.join(process.cwd(), "app", "templates")

const components = [
  "Button", "Badge", "Card", "Collapse", "CodeBlock", "Navigation",
  "Sidebar", "Input", "Theme", "Tab", "Toast", "Pagination",
  "Table", "Modal", "TOC", "Dropdown"
]

const dependenciesMap: Record<string, string[]> = {
  Theme: ["Button", "Form", "Modal"],
}

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  all: z.boolean(),
  cwd: z.string(),
})

export const add = new Command()
  .name("add")
  .description("프로젝트에 컴포넌트를 추가합니다.")
  .argument("[components...]", "추가할 컴포넌트 이름 목록")
  .option("-a, --all", "사용 가능한 모든 컴포넌트를 추가합니다.", false)
  .option("-c, --cwd <cwd>", "작업 디렉토리 경로", process.cwd())
  .action(async (componentsArg, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components: componentsArg,
        ...opts,
        cwd: path.resolve(opts.cwd),
      })

      let selectedComponents = options.components || []

      if (options.all) {
        selectedComponents = components
      }

      if (selectedComponents.length === 0) {
        const { components: promptedComponents } = await prompts({
          type: "multiselect",
          name: "components",
          message: "추가할 컴포넌트를 선택하세요:",
          choices: components.map((comp) => ({ title: comp, value: comp })),
        })
        selectedComponents = promptedComponents
      }

      if (!selectedComponents || selectedComponents.length === 0) {
        logger.warn("선택된 컴포넌트가 없습니다.")
        return
      }

      const addedComponents = new Set<string>()

      for (const comp of selectedComponents) {
        addComponent(comp, options.cwd, addedComponents)
      }

    } catch (error) {
      logger.error("컴포넌트 추가 중 오류가 발생했습니다.")
      logger.error(error)
    }
  })

function addComponent(comp: string, cwd: string, addedComponents: Set<string>) {
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
    logger.error(`❌ ${comp} 컴포넌트가 atomsystem에 존재하지 않습니다.`)
  }
}

function updateGlobalsCss(comp: string, cssFileName: string, cwd: string) {
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
