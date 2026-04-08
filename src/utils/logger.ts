import chalk from "chalk"

export const logger = {
  error(...args: unknown[]) {
    console.error(chalk.red(...args))
  },
  warn(...args: unknown[]) {
    console.warn(chalk.yellow(...args))
  },
  info(...args: unknown[]) {
    console.info(chalk.cyan(...args))
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args))
  },
  log(...args: unknown[]) {
    console.log(...args)
  },
  break() {
    console.log("")
  },
}
