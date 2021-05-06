export class CaesarShift {
  private actionText: string
  private shift: number

  constructor(actionText: string, shift: string) {
    this.actionText = actionText
    this.shift = Number(shift)
  }

  private hasUpperCase(letter: string): boolean {
    return letter === letter.toUpperCase()
  }

  private shiftActionText(): string {
    let decipher = ''

    // Decipher each letter
    for (const letter of this.actionText) {
      // If letter is uppercase then add uppercase letters
      if (this.hasUpperCase(letter)) {
        decipher += String.fromCharCode(((letter.charCodeAt(0) + this.shift - 65) % 26) + 65)
      } else {
        // Else add lowercase letters
        decipher += String.fromCharCode(((letter.charCodeAt(0) + this.shift - 97) % 26) + 97)
      }
    }

    return decipher
  }

  public input(): string {
    return this.actionText
  }

  public output(): string {
    return this.shiftActionText()
  }
}
