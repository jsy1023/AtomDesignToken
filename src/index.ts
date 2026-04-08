#!/usr/bin/env node
import { Command } from "commander"
import { add } from "./commands/add"
import { init } from "./commands/init"

import { readFileSync } from "fs"
import { join } from "path"

async function main() {
  const packageJsonPath = join(__dirname, "../package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"))

  const program = new Command()
    .name("atomsystem")
    .description("Atom Ground Design System CLI")
    .version(packageJson.version)

  program.addCommand(add)
  program.addCommand(init)

  program.parse()
}

main()
