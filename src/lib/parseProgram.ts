import { BfOptions } from "../types";

export function parseProgram(source: string): [BfOptions | undefined, string[]] {
    if (source.startsWith('#')) {
        const [header, ...lines] = source.split('\n');
        const raw = header.slice(2).trim().split(' ')
            .map(pairs).join(', ');
        const options = JSON.parse('{' + raw + '}');
        return [options, lines.join('').split('')];
    }
    return [undefined, source.split('')];
}

function pairs(pair: string) {
    const [key, value] = pair.split('=')
    return `"${key}": "${value}"`;
}
