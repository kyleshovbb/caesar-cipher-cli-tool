import { ErrorCodes } from '../index.types'

export function parseError(error: any): void {
  if (error.code === ErrorCodes.fileNotFound) {
    showError(`Operation not permitted. No file found at '${error.path}' path`)
  } else if (error.code === ErrorCodes.readonly) {
    showError(`Operation not permitted. Not enough access to edit file at '${error.path}' path`)
  } else {
    showError(error.message)
  }
}

export function showError(errorMessage: string): void {
  console.error('ERROR:', errorMessage)
  process.exit(9)
}
