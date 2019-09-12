"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const initialState_1 = require("./lib/initialState");
const bf_1 = require("./lib/bf");
const io_1 = require("./lib/io");
const parseProgram_1 = require("./lib/parseProgram");
const fileName = process.argv[process.argv.length - 1];
if (process.argv.length < 2 || path_1.extname(fileName) !== '.bf') {
    Promise.resolve().then(() => __importStar(require('./repl'))).catch();
}
else {
    console.log('Reading file: ', fileName, '\n');
    const source = fs_1.readFileSync(fileName) + '';
    const [options, chars] = parseProgram_1.parseProgram(source);
    bf_1.bf(initialState_1.initialState(1000, chars), options, io_1.print)
        .then(exitCode => {
        console.log();
        process.exit(exitCode);
    });
}
