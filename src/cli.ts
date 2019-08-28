import { readFileSync } from "fs"
import { bf } from "./bf"

const fileName = process.argv[process.argv.length - 1]

if (process.argv.length < 2 || !fileName) {
    console.log('No file provided! Provide a brainfuck program path as the last part of the command.');
    process.exit(1);
}

console.log('Reading file: ', fileName, '\n')
const file = readFileSync(fileName!) + ''

process.exit(bf(file))
