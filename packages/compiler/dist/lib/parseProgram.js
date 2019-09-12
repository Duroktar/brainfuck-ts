"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseProgram(source) {
    if (source.startsWith('#')) {
        const [header, ...lines] = source.split('\n');
        const raw = header.slice(2).trim().split(' ')
            .map(pairs).join(', ');
        const options = JSON.parse('{' + raw + '}');
        return [options, lines.join('').split('')];
    }
    return [undefined, source.split('')];
}
exports.parseProgram = parseProgram;
function pairs(pair) {
    const [key, value] = pair.split('=');
    return `"${key}": "${value}"`;
}
