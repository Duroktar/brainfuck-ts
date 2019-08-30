process.stdin.setEncoding('utf8');
import { State } from "../types";
import { BfOptions } from "../types";
import { Table } from 'console-table-printer';

// This function reads only one line on console synchronously. After pressing
// `enter` key the console will stop listening for data.
export function readlineSync(): Promise<string> {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        let readStream = process.stdin.on('data', data => {
            // ! prevents a memory leak..
            readStream.removeAllListeners();

            process.stdin.pause(); // stops after one line reads
            resolve(data);
        });
    });
}

export function print(val: number, options: BfOptions = {}) {
    if (options.printMode === 'fromCharCode') {
        process.stdout.write(String.fromCharCode(val));
    } else if (options.printMode === 'literal') {
        process.stdout.write(`${val}`);
    } else {
        process.stdout.write(`${val}`);
    }
}

export const debug = (state: State) => {

    const row = {}; const row2 = {};
    const tapeBufferedIndex = state.tapeIndex - (state.tapeIndex % 10);
    const charBufferedIndex = state.charIndex - (state.charIndex % 10);
    const tape = state.tape.slice(tapeBufferedIndex, state.tapeIndex+10);
    const chars = state.chars.slice(charBufferedIndex, state.charIndex+10);
    tape.forEach((v, i) => { row[i+tapeBufferedIndex] = v || '0' });
    chars.forEach((v, i) => { row2[i+charBufferedIndex] = v || '0' });

    const msg = ` TAPE: size=${state.tape.length}; cursor=${state.tapeIndex}; /`;
    console.log(new Array(msg.length).fill('_').join(''));
    console.log(msg);
    const p = new Table(Object.keys(row));
    p.addRow(row);
    p.addRow({ [`${state.tapeIndex}`]: '↑' }, { color: 'green' });
    p.printTable();

    // const msg2 = ` CHARS: size=${state.chars.length}; cursor=${state.charIndex} /`;
    // console.log(` CHARS: size=${state.chars.length}; cursor=${state.charIndex}`);
    // console.log(new Array(msg.length).fill('_').join(''));
    // const p2 = new Table(Object.keys(row2));
    // p2.addRow(row);
    // p2.addRow({ [`${state.charIndex}`]: '↑' }, { color: 'red' });
    // p2.printTable();
}
