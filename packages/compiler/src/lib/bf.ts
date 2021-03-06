import { debug, readlineSync } from "./io"
import { State, BfOptions, Print } from "../types"
import { matchBrackets } from "./matchBrackets"
import { CyclicComplexityError } from "./errors";

export async function bf(state: State, options: BfOptions = {}, print: Print) {

    const bracketPairs = matchBrackets(state.chars);
    const gotoMatch = () => state.charIndex = bracketPairs.get(state.charIndex);

    let maxDepth = options.maxDepth || 10_000;
    let depth = 0;

    let char: string = '';
    for (state.charIndex = 0 ; state.charIndex < state.chars.length ; state.charIndex++) {

        char = state.chars[state.charIndex]
        switch(char) {
            // >    increment the data pointer (to point to the next cell to the
            //      right)
            case '>': state.tapeIndex++;  break;
            // <    decrement the data pointer (to point to the next cell to the
            //      left)
            case '<': state.tapeIndex--;  break;

            // +	increment (increase by one) the byte at the data pointer
            case '+': state.tape[state.tapeIndex]++; break;
            // -	decrement (decrease by one) the byte at the data pointer
            case '-': state.tape[state.tapeIndex]--; break;

            // ,    accept a byte of input, store its value in byte at the data
            //      pointer
            case ',': state.tape[state.tapeIndex] = parseInt(await readlineSync()); break;
            // .	output the value of the byte at the data pointer
            case '.': print(state.tape[state.tapeIndex], options); break;

            // [    if the byte at the data pointer is zero, then instead of
            //      moving the instruction pointer forward to the next command,
            //      jump it forward to the command after the matching ] command
            case '[': state.tape[state.tapeIndex] === 0 && gotoMatch(); break;
            // ]    if the byte at the data pointer is nonzero, then instead of
            //      moving the instruction pointer forward to the next command,
            //      jump it back to the command after the matching [ command
            case ']': state.tape[state.tapeIndex] !== 0 && gotoMatch(); break;

            // $    Shortcut added for debugging purposes. Not a standard feat.
            case '$': debug(state); break;
            default : continue;
        }

        // Prevents freezes. Adjustable in the file header or with a bang command in the repl.
        if (depth > maxDepth)
            throw new CyclicComplexityError(maxDepth)
        else
            depth++
    }

    return 0
}
