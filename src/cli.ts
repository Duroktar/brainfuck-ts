import { readFileSync } from "fs"
import { extname } from "path"
import { initialState } from "./lib/initialState"
import { bf } from "./lib/bf"
import { parseProgram } from "./lib/parseProgram";

const fileName = process.argv[process.argv.length - 1]

if (process.argv.length < 2 || extname(fileName) !== '.bf') {
    import('./repl').catch();
}
else {
    console.log('Reading file: ', fileName, '\n')
    const source = readFileSync(fileName!) + ''

    const [options, chars] = parseProgram(source);

    bf(initialState(1000, chars), options)
        .then(exitCode => process.exit(exitCode))
}

