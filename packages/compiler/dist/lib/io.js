"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_table_printer_1 = require("console-table-printer");
try {
    process.stdin.setEncoding('utf8');
}
catch { }
function readlineSync() {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        let readStream = process.stdin.on('data', data => {
            readStream.removeAllListeners();
            process.stdin.pause();
            resolve(data);
        });
    });
}
exports.readlineSync = readlineSync;
function print(val, options = {}) {
    if (options.printMode === 'fromCharCode') {
        process.stdout.write(String.fromCharCode(val));
    }
    else if (options.printMode === 'literal') {
        process.stdout.write(`${val}`);
    }
    else {
        process.stdout.write(`${val}`);
    }
}
exports.print = print;
exports.debug = (state) => {
    const row = {};
    const row2 = {};
    const tapeBufferedIndex = state.tapeIndex - (state.tapeIndex % 10);
    const charBufferedIndex = state.charIndex - (state.charIndex % 10);
    const tape = state.tape.slice(tapeBufferedIndex, state.tapeIndex + 10);
    const chars = state.chars.slice(charBufferedIndex, state.charIndex + 10);
    tape.forEach((v, i) => { row[i + tapeBufferedIndex] = v || '0'; });
    chars.forEach((v, i) => { row2[i + charBufferedIndex] = v || '0'; });
    console.log(`____________________________`);
    console.log(`LEGEND: 1st row = Tape Index`);
    console.log(`        2nd row = Tape Value`);
    console.log(`        Arrow   = Current Tape Index`);
    const p = new console_table_printer_1.Table(Object.keys(row));
    p.addRow(row);
    p.addRow({ [`${state.tapeIndex}`]: '↑' }, { color: 'green' });
    p.printTable();
    console.log(` TAPE:  Size: ${state.tape.length}, Cursor: ${state.tapeIndex}`);
};
