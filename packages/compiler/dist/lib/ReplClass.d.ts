import { Context } from '../types';
export declare class Repl {
    context: Context;
    constructor(context: Context);
    AUTHOR: string;
    VERSION: string;
    private running;
    private command;
    start(options: {
        prompt: string;
        eval: (cmd: string, context: Context) => Promise<number>;
    }): Promise<void>;
    stop(): void;
    clearCurrentCommand(): void;
}
