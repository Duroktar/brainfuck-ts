import { UnMatchedBracketsError } from "./errors";
import { isUndefined } from "util";

export function matchBrackets(chars: string[]) {
    const brackets = new Map();
    const stack: number[] = [];
    chars.forEach((c, i) => {
        if (c === '[')
            stack.push(i);
        if (c === ']') {
            const opening = stack.pop();
            if (isUndefined(opening))
                throw new UnMatchedBracketsError();
            brackets.set(i, opening);
            brackets.set(opening, i);
        }
    });

    if (stack.length > 0)
        throw new UnMatchedBracketsError();

    return brackets;
}


