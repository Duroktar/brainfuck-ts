process.stdin.setEncoding('utf8')

// This function reads only one line on console synchronously. After pressing
// `enter` key the console will stop listening for data.
export function readlineSync() {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        process.stdin.on('data', function (data) {
            process.stdin.pause(); // stops after one line reads
            resolve(data);
        });
    });
}

export function parseProgram(source: string) {
    if (source.startsWith('#')) {
        const [header, ...lines] = source.split('\n')
        const raw = header.slice(2).trim().split(' ')
                          .map(pairs).join(', ')
        const options = JSON.parse('{' + raw + '}')
        return [options, lines.join('').split('')]
    }
    return [{}, source.split('')]
}

function pairs(pair: string) {
    const [key, value] = pair.split('=')
    return `"${key}": "${value}"`;
}

export const debug = (tape, tapeIndex) => {
    console.log(tape); console.log('tapeIndex:', tapeIndex);
}

export function print(val: number, output, options) {
    if (options.printMode === 'fromCharCode') {
        output.push(String.fromCharCode(val));
    } else {
        output.push(val);
    }
}
export function flushOutput(output) {
    console.log(output.join(''));
}
