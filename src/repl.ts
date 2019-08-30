import { bf } from './lib/bf';
import { initialState } from "./lib/initialState"
import { Repl } from './lib/ReplClass';
import { parseProgram } from './lib/parseProgram';
import { Context } from './types';

function repl(cmd: string, context: Context) {
    const [options, source] = parseProgram(cmd);
    context.options = { ...context.options, ...options }
    context.state.chars = source;
    return bf(context.state, context.options)
        .then(exitCode => exitCode);
}

new Repl({ state: initialState(1000) })
    .start({ prompt: '\n~ ', eval: repl })
    .then()
