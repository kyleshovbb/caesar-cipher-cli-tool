"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaesarShiftTransformer = void 0;
var stream_1 = require("stream");
var CaesarShiftTransformer = /** @class */ (function (_super) {
    __extends(CaesarShiftTransformer, _super);
    function CaesarShiftTransformer(shift, action) {
        var _this = _super.call(this) || this;
        _this.lettersInEnglishAlphabet = 26;
        // Codes range for lower case letters
        _this.minLowerCaseLetterCode = 'a'.charCodeAt(0);
        _this.maxLowerCaseLetterCode = 'z'.charCodeAt(0);
        // Codes range for upper case letters
        _this.minUpperCaseLetterCode = 'A'.charCodeAt(0);
        _this.maxUpperCaseLetterCode = 'Z'.charCodeAt(0);
        _this.shift = _this.getFormattedShift(shift, action);
        return _this;
    }
    CaesarShiftTransformer.prototype._transform = function (chunk, encode, callback) {
        var decipher = '';
        var formattedChunk = chunk.toString('utf8');
        // Decipher each letter
        for (var _i = 0, formattedChunk_1 = formattedChunk; _i < formattedChunk_1.length; _i++) {
            var letter = formattedChunk_1[_i];
            if (!this.isEnglishLetter(letter)) {
                // Save not english letter
                decipher += letter;
            }
            else if (this.isUpperCaseLetter(letter)) {
                decipher += this.getTransformedLetter(letter, this.minUpperCaseLetterCode, this.maxUpperCaseLetterCode);
            }
            else {
                decipher += this.getTransformedLetter(letter, this.minLowerCaseLetterCode, this.maxLowerCaseLetterCode);
            }
        }
        callback(null, decipher);
    };
    CaesarShiftTransformer.prototype.isEnglishLetter = function (letter) {
        var letterCode = letter.charCodeAt(0);
        var isLowerCaseEnglishLetter = letterCode >= this.minLowerCaseLetterCode && letterCode <= this.maxLowerCaseLetterCode;
        var isUpperCaseEnglishLetter = letterCode >= this.minUpperCaseLetterCode && letterCode <= this.maxUpperCaseLetterCode;
        return isLowerCaseEnglishLetter || isUpperCaseEnglishLetter;
    };
    CaesarShiftTransformer.prototype.isUpperCaseLetter = function (letter) {
        return letter === letter.toUpperCase();
    };
    CaesarShiftTransformer.prototype.getTransformedLetter = function (letter, minLetterCode, maxLetterCode) {
        var transformedLetterCode = letter.charCodeAt(0) + this.shift;
        var englishTransformedLetterCode;
        // Create transformed letter code in english alphabetic range
        if (this.shift > 0) {
            englishTransformedLetterCode =
                transformedLetterCode > maxLetterCode ? transformedLetterCode - this.lettersInEnglishAlphabet : transformedLetterCode;
        }
        else {
            englishTransformedLetterCode =
                transformedLetterCode < minLetterCode ? transformedLetterCode + this.lettersInEnglishAlphabet : transformedLetterCode;
        }
        return String.fromCharCode(englishTransformedLetterCode);
    };
    CaesarShiftTransformer.prototype.getFormattedShift = function (shift, action) {
        var shiftNumber = Number(shift) % 26;
        return action === 'decode' ? shiftNumber * -1 : shiftNumber;
    };
    return CaesarShiftTransformer;
}(stream_1.Transform));
exports.CaesarShiftTransformer = CaesarShiftTransformer;
