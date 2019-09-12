"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const util_1 = require("util");
function matchBrackets(chars) {
    const brackets = new Map();
    const stack = [];
    chars.forEach((c, i) => {
        if (c === '[')
            stack.push(i);
        if (c === ']') {
            const opening = stack.pop();
            if (util_1.isUndefined(opening))
                throw new errors_1.UnMatchedBracketsError();
            brackets.set(i, opening);
            brackets.set(opening, i);
        }
    });
    if (stack.length > 0)
        throw new errors_1.UnMatchedBracketsError();
    return brackets;
}
exports.matchBrackets = matchBrackets;
