"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("./io");
const matchBrackets_1 = require("./matchBrackets");
const errors_1 = require("./errors");
async function bf(state, options = {}, print) {
    const bracketPairs = matchBrackets_1.matchBrackets(state.chars);
    const gotoMatch = () => state.charIndex = bracketPairs.get(state.charIndex);
    let maxDepth = options.maxDepth || 10000;
    let depth = 0;
    let char = '';
    for (state.charIndex = 0; state.charIndex < state.chars.length; state.charIndex++) {
        char = state.chars[state.charIndex];
        switch (char) {
            case '>':
                state.tapeIndex++;
                break;
            case '<':
                state.tapeIndex--;
                break;
            case '+':
                state.tape[state.tapeIndex]++;
                break;
            case '-':
                state.tape[state.tapeIndex]--;
                break;
            case ',':
                state.tape[state.tapeIndex] = parseInt(await io_1.readlineSync());
                break;
            case '.':
                print(state.tape[state.tapeIndex], options);
                break;
            case '[':
                state.tape[state.tapeIndex] === 0 && gotoMatch();
                break;
            case ']':
                state.tape[state.tapeIndex] !== 0 && gotoMatch();
                break;
            case '$':
                io_1.debug(state);
                break;
            default: continue;
        }
        if (depth > maxDepth)
            throw new errors_1.CyclicComplexityError(maxDepth);
        else
            depth++;
    }
    return 0;
}
exports.bf = bf;
