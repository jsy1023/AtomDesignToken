import { Command } from "commander"
import path from "path"
import prompts from "prompts"
import { z } from "zod"
import { logger } from "../utils/logger"
import { addComponent, components } from "../utils/component"

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
