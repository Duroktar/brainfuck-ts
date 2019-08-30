import { readlineSync } from './io';
import { State } from '../types';

export class Repl<CTX = State> {
    constructor(public context: CTX) { }
    public AUTHOR = 'duroktar@gmail.com'
    public VERSION = '1.0.0'
    private running = false;
    private command = '';
    public async start(options: {
        prompt: string;
        eval: (...a: any) => any;
    }) {
        this.running = true;
        console.log('___.                .__        _____              __    ')
        console.log('\\_ |______________  |__| _____/ ____\\_ __   ____ |  | __')
        console.log(' | __ \\_  __ \\__  \\ |  |/    \\   __\\  |  \\_/ ___\\|  |/ /')
        console.log(' | \\_\\ \\  | \\// __ \\|  |   |  \\  | |  |  /\\  \\___|    < ')
        console.log(' |___  /__|  (____  /__|___|  /__| |____/  \\___  >__|_ \\')
        console.log('     \\/           \\/        \\/                 \\/     \\/')
        console.log(` Version: ${this.VERSION}; Written by: ${this.AUTHOR};`)
        console.log(' (hint: enter $ to display the program tape)')
        while (this.running) {
            process.stdout.write('' + options.prompt)
            this.command = await readlineSync();
            options.eval(this.command, this.context);
        }
    }
    public stop() {
        this.running = false;
    }
    public clearCurrentCommand() {
        this.command = '';
    }
}
