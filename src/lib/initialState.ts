export function initialState(memory: number, chars: string[] = []) {
    return {
        tape: new Array(memory).fill(0),
        tapeIndex: 0,
        chars: chars,
        charIndex: 0,
    };
}
