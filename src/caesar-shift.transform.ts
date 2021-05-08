import { Transform, TransformCallback } from 'stream'

import { ActionOption } from './index.types'

export class CaesarShiftTransformer extends Transform {
  private shift: number

  private lettersInEnglishAlphabet = 26

  // Codes range for lower case letters
  private minLowerCaseLetterCode = 'a'.charCodeAt(0)
  private maxLowerCaseLetterCode = 'z'.charCodeAt(0)

  // Codes range for upper case letters
  private minUpperCaseLetterCode = 'A'.charCodeAt(0)
  private maxUpperCaseLetterCode = 'Z'.charCodeAt(0)

  constructor(action: ActionOption, shift: string) {
    super()
    this.shift = this.getFormattedShift(shift, action)
  }

  _transform(chunk: any, encode: BufferEncoding, callback: TransformCallback): void {
    let decipher = ''
    const formattedChunk: string = chunk.toString('utf8')

    // Decipher each letter
    for (const letter of formattedChunk) {
      if (!this.isEnglishLetter(letter)) {
        // Save not english letter
        decipher += letter
      } else if (this.isUpperCaseLetter(letter)) {
        decipher += this.getTransformedLetter(letter, this.minUpperCaseLetterCode, this.maxUpperCaseLetterCode)
      } else {
        decipher += this.getTransformedLetter(letter, this.minLowerCaseLetterCode, this.maxLowerCaseLetterCode)
      }
    }

    callback(null, decipher)
  }

  private isEnglishLetter(letter: string) {
    const letterCode = letter.charCodeAt(0)
    const isLowerCaseEnglishLetter = letterCode >= this.minLowerCaseLetterCode && letterCode <= this.maxLowerCaseLetterCode
    const isUpperCaseEnglishLetter = letterCode >= this.minUpperCaseLetterCode && letterCode <= this.maxUpperCaseLetterCode
    return isLowerCaseEnglishLetter || isUpperCaseEnglishLetter
  }

  private isUpperCaseLetter(letter: string): boolean {
    return letter === letter.toUpperCase()
  }

  private getTransformedLetter(letter: string, minLetterCode: number, maxLetterCode: number) {
    const transformedLetterCode = letter.charCodeAt(0) + this.shift
    let englishTransformedLetterCode: number

    // Create transformed letter code in english alphabetic range
    if (this.shift > 0) {
      englishTransformedLetterCode =
        transformedLetterCode > maxLetterCode ? transformedLetterCode - this.lettersInEnglishAlphabet : transformedLetterCode
    } else {
      englishTransformedLetterCode =
        transformedLetterCode < minLetterCode ? transformedLetterCode + this.lettersInEnglishAlphabet : transformedLetterCode
    }

    return String.fromCharCode(englishTransformedLetterCode)
  }

  private getFormattedShift(shift: string, action: ActionOption) {
    const shiftNumber = Number(shift) % 26
    return action === 'decode' ? shiftNumber * -1 : shiftNumber
  }
}
