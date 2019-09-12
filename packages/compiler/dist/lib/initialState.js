"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initialState(memory, chars = []) {
    return {
        tape: new Array(memory).fill(0),
        tapeIndex: 0,
        chars: chars,
        charIndex: 0,
    };
}
exports.initialState = initialState;
