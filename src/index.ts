#!/usr/bin/env node
import fs from 'fs'
import { Command } from 'commander'
import { pipeline } from 'stream'

import { CaesarShiftTransformer } from './caesar-shift.transform'
import { ActionOption, CommandOptions } from './index.types'
import { checkAccessToPath, checkRequiredOptions } from './util/validator'
import { showError } from './util/error'

const program = new Command()

program
  .option('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file text')
  .option('-o, --output <output>', 'an output file path')
  .option('-a, --action <action>', 'an action encode/decode path')

program.parse(process.argv)

const options = program.opts() as CommandOptions

checkRequiredOptions(options)
checkAccessToPath(options.input, fs.constants.F_OK)
checkAccessToPath(options.output, fs.constants.F_OK)
checkAccessToPath(options.input, fs.constants.R_OK)
checkAccessToPath(options.output, fs.constants.W_OK)

pipeline(
  options.input ? fs.createReadStream(options.input) : process.stdin,
  new CaesarShiftTransformer(options.shift as string, options.action as ActionOption),
  options.output ? fs.createWriteStream(options.output, { flags: 'a+' }) : process.stdout,
  (err) => {
    if (err) {
      showError(err.message)
    } else {
      console.log('SUCCESS')
    }
  },
)
