export type State = {
    tape:       number[];
    tapeIndex:  number;
    chars:      string[];
    charIndex:  number;
}

export type BfOptions = {
    printMode?: 'fromCharCode' | 'literal'
};
