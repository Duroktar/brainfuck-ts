import { bf } from './lib/bf';
import { initialState } from "./lib/initialState"
import { State, BfOptions } from './types';
import { Repl } from './lib/ReplClass';
import { parseProgram } from './lib/parseProgram';

const handleError = (err) => console.log(err)

function myEval(cmd: string, context: State & { options: BfOptions }) {
    const [options, source] = parseProgram(cmd);
    context.options = { ...context.options, ...options }
    context.chars = source;
    bf(context, context.options)
        .then(exitCode => exitCode)
        .catch(err => handleError(err));
}

process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);

new Repl(initialState(1000))
    .start({ prompt: '\n~ ', eval: myEval })
    .catch(handleError)
