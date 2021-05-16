"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showError = exports.parseError = void 0;
var index_types_1 = require("../index.types");
function parseError(error) {
    if (error.code === index_types_1.ErrorCodes.fileNotFound) {
        showError("Operation not permitted. No file found at '" + error.path + "' path");
    }
    else if (error.code === index_types_1.ErrorCodes.readonly) {
        showError("Operation not permitted. Not enough access to edit file at '" + error.path + "' path");
    }
    else {
        showError(error.message);
    }
}
exports.parseError = parseError;
function showError(errorMessage) {
    console.error('ERROR:', errorMessage);
    process.exit(9);
}
exports.showError = showError;
