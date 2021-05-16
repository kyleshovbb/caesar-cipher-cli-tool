"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccessToPath = exports.checkRequiredOptions = void 0;
var fs_1 = __importDefault(require("fs"));
var error_1 = require("./error");
function checkRequiredOptions(options) {
    if (!options.shift || !options.action) {
        error_1.showError('Action and shift are required options');
    }
}
exports.checkRequiredOptions = checkRequiredOptions;
function checkAccessToPath(path, mode) {
    if (path) {
        try {
            fs_1.default.accessSync(path, mode);
        }
        catch (err) {
            error_1.parseError(err);
        }
    }
}
exports.checkAccessToPath = checkAccessToPath;
