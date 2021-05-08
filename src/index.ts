import fs from 'fs'
import { Command } from 'commander'
import { pipeline } from 'stream'

import { CommandOptions } from './index.types'
import { CaesarShiftTransformer } from './caesar-shift.transform'

const program = new Command()

program
  .option('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file text')
  .option('-o, --output <output>', 'an output file path')
  .option('-a, --action <action>', 'an action encode/decode path')

program.parse(process.argv)

const options = program.opts() as CommandOptions

if (!options.shift || !options.action) {
  console.error('ERROR: Action and shift are required options')
  // process.exit(9)
} else {
  pipeline(
    options.input ? fs.createReadStream(options.input) : process.stdin,
    new CaesarShiftTransformer(options.action, options.shift),
    options.output ? fs.createWriteStream(options.output) : process.stdout,
    (err) => {
      if (err) {
        console.error('ERROR:', err)
      } else {
        console.log('SUCCESS')
      }
    },
  )
}

process.exit()
