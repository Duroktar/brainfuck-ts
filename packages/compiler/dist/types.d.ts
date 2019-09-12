export declare type State = {
    tape: number[];
    tapeIndex: number;
    chars: string[];
    charIndex: number;
};
export declare type BfOptions = {
    printMode?: 'fromCharCode' | 'literal';
    maxDepth?: number;
};
export declare type Context = {
    state: State;
    options?: BfOptions;
};
export declare type Print = (val: number, options: BfOptions) => any;
