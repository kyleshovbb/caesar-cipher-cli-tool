import { PathLike } from 'fs'

export type ActionOption = 'encode' | 'decode'

export interface CommandOptions {
  shift?: string
  action?: ActionOption
  input?: PathLike
  output?: PathLike
}

export enum ErrorCodes {
  readonly = 'EPERM',
  fileNotFound = 'ENOENT',
}
