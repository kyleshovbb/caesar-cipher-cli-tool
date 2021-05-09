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
var validator_1 = require("./util/validator");
var error_1 = require("./util/error");
var program = new commander_1.Command();
program
    .option('-s, --shift <shift>', 'a shift')
    .option('-i, --input <input>', 'an input file text')
    .option('-o, --output <output>', 'an output file path')
    .option('-a, --action <action>', 'an action encode/decode path');
program.parse(process.argv);
var options = program.opts();
validator_1.checkRequiredOptions(options);
validator_1.checkAccessToPath(options.input, fs_1.default.constants.F_OK);
validator_1.checkAccessToPath(options.output, fs_1.default.constants.F_OK);
validator_1.checkAccessToPath(options.input, fs_1.default.constants.R_OK);
validator_1.checkAccessToPath(options.output, fs_1.default.constants.W_OK);
stream_1.pipeline(options.input ? fs_1.default.createReadStream(options.input) : process.stdin, new caesar_shift_transform_1.CaesarShiftTransformer(options.shift, options.action), options.output ? fs_1.default.createWriteStream(options.output, { flags: 'a+' }) : process.stdout, function (err) {
    if (err) {
        error_1.showError(err.message);
    }
    else {
        console.log('SUCCESS');
    }
});
