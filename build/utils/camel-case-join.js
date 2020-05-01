"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const capitalize_first_letter_1 = __importDefault(require("./capitalize-first-letter"));
function camelCaseJoin(words) {
    const joint = words.reduce((acc, word = '', index) => {
        const current = index ? capitalize_first_letter_1.default(word) : word;
        const str = acc + current;
        return str;
    }, '');
    return joint;
}
exports.default = camelCaseJoin;
