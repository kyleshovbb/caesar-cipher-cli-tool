import { Command } from 'commander'

import { CommandOptions } from './index.types'

const program = new Command()

program
  .option('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file text')
  .option('-o, --output <output>', 'an output file path')
  .option('-a, --action <action>', 'an action encode/decode path')

program.parse(process.argv)

const options = program.opts() as CommandOptions

console.log(options)
