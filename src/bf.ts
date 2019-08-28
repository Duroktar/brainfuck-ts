import { print, readlineSync, flushOutput, parseProgram, debug } from "./utils"

export function bf(src: string, memory = 20) {
    const output: string[] = [] // flushed to stdout on finish

    const tape = new Array(memory).fill(0)
    let tapeIndex = 0

    const [options, chars] = parseProgram(src)
    let charIndex = 0

    const bracketPairs = matchBrackets(chars)

    const gotoMatch = () => charIndex = bracketPairs.get(charIndex)

    // >	increment the data pointer (to point to the next cell to the right)
    const gt =  () => tapeIndex++;
    // <	decrement the data pointer (to point to the next cell to the left)
    const lt =  () => tapeIndex--;

    // +	increment (increase by one) the byte at the data pointer
    const inc = () => tape[tapeIndex]++;
    // -	decrement (decrease by one) the byte at the data pointer
    const dec = () => tape[tapeIndex]--;

    // ,    accept a byte of input, store its value in byte at the data pointer
    const set = to => tape[tapeIndex] = to;
    // .	output the value of the byte at the data pointer
    const out = () => print(tape[tapeIndex], output, options);

    // [    if the byte at the data pointer is zero, then instead of moving the
    //      instruction pointer forward to the next command, jump it forward to
    //      the command after the matching ] command
    const runLoop = () => tape[tapeIndex] === 0 && gotoMatch();

    // ]    if the byte at the data pointer is nonzero, then instead of moving
    //      the instruction pointer forward to the next command, jump it back to
    //      the command after the matching [ command
    const endLoop = () => tape[tapeIndex] !== 0 && gotoMatch();

    let char;
    for (charIndex = 0; charIndex < chars.length; charIndex++) {
        char = chars[charIndex]
        switch(char) {
            case '>': gt();  break;
            case '<': lt();  break;
            case '+': inc(); break;
            case '-': dec(); break;
            case '.': out(); break;
            case ',': set(async () => await readlineSync()); break;
            case '[': runLoop(); break;
            case ']': endLoop(); break;
            case '$': debug(tape, tapeIndex); break;
            default : continue;
        }
    }

    flushOutput(output)
    return 0
}

function matchBrackets(chars: string[]) {
    const brackets = new Map()
    const stack: number[] = []
    chars.forEach((c, i) => {
        if (c === '[') stack.push(i)
        if (c === ']') {
            const opening = stack.pop()
            brackets.set(i, opening)
            brackets.set(opening, i)
        }
    })
    return brackets
}
