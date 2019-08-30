export function matchBrackets(chars: string[]) {
    const brackets = new Map();
    const stack: number[] = [];
    chars.forEach((c, i) => {
        if (c === '[')
            stack.push(i);
        if (c === ']') {
            const opening = stack.pop();
            brackets.set(i, opening);
            brackets.set(opening, i);
        }
    });
    return brackets;
}
