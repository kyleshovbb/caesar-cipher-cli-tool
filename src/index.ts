import { Command } from 'commander'

import { CaesarShift } from './caesar-shift'
import { CommandOptions } from './index.types'

const program = new Command()

program
  .option('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file text')
  .option('-o, --output <output>', 'an output file path')
  .option('-a, --action <action>', 'an action encode/decode path')

program.parse(process.argv)

const options = program.opts() as CommandOptions

if (!options.shift || !options.action) {
  console.error('ERROR: Action and shift are required')
} else {
  const caesarShift = new CaesarShift(options.action, options.shift)
  console.log('SUCCESS', caesarShift.input(), caesarShift.output())
}
