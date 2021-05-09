#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var commander_1 = require("commander");
var stream_1 = require("stream");
var caesar_shift_transform_1 = require("./caesar-shift.transform");
var program = new commander_1.Command();
program
    .option('-s, --shift <shift>', 'a shift')
    .option('-i, --input <input>', 'an input file text')
    .option('-o, --output <output>', 'an output file path')
    .option('-a, --action <action>', 'an action encode/decode path');
program.parse(process.argv);
var options = program.opts();
if (!options.shift || !options.action) {
    console.error('ERROR: Action and shift are required options');
    process.exit(9);
}
else {
    stream_1.pipeline(options.input ? fs_1.default.createReadStream(options.input) : process.stdin, new caesar_shift_transform_1.CaesarShiftTransformer(options.shift, options.action), options.output ? fs_1.default.createWriteStream(options.output, { flags: 'a+' }) : process.stdout, function (err) {
        if (err) {
            console.error('ERROR:', err);
        }
        else {
            console.log('SUCCESS');
        }
    });
}
