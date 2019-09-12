"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bf_1 = require("./lib/bf");
const io_1 = require("./lib/io");
const initialState_1 = require("./lib/initialState");
const ReplClass_1 = require("./lib/ReplClass");
const parseProgram_1 = require("./lib/parseProgram");
function repl(cmd, context) {
    const [options, source] = parseProgram_1.parseProgram(cmd);
    context.options = { ...context.options, ...options };
    context.state.chars = source;
    return bf_1.bf(context.state, context.options, io_1.print)
        .then(exitCode => exitCode);
}
new ReplClass_1.Repl({ state: initialState_1.initialState(1000) })
    .start({ prompt: '\n~ ', eval: repl })
    .then();
