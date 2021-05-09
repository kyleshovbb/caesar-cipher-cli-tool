import fs from 'fs'

import { CommandOptions } from '../index.types'
import { parseError, showError } from './error'

export function checkRequiredOptions(options: CommandOptions): void {
  if (!options.shift || !options.action) {
    showError('Action and shift are required options')
  }
}

export function checkAccessToPath(path?: fs.PathLike, mode?: number): void {
  if (path) {
    try {
      fs.accessSync(path, mode)
    } catch (err) {
      parseError(err)
    }
  }
}
