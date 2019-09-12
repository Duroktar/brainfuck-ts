"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("./io");
const errors_1 = require("./errors");
class Repl {
    constructor(context) {
        this.context = context;
        this.AUTHOR = 'duroktar@gmail.com';
        this.VERSION = '1.0.0';
        this.running = false;
        this.command = '';
    }
    async start(options) {
        this.running = true;
        console.log('___.                .__        _____              __    ');
        console.log('\\_ |______________  |__| _____/ ____\\_ __   ____ |  | __');
        console.log(' | __ \\_  __ \\__  \\ |  |/    \\   __\\  |  \\_/ ___\\|  |/ /');
        console.log(' | \\_\\ \\  | \\// __ \\|  |   |  \\  | |  |  /\\  \\___|    < ');
        console.log(' |___  /__|  (____  /__|___|  /__| |____/  \\___  >__|_ \\');
        console.log('     \\/           \\/        \\/                 \\/     \\/');
        console.log(` Version: ${this.VERSION}; Written by: ${this.AUTHOR};`);
        console.log(' (hint: enter $ to display the program tape)');
        while (this.running) {
            process.stdout.write('' + options.prompt);
            this.command += await io_1.readlineSync();
            try {
                await options.eval(this.command, this.context);
                this.command = '';
            }
            catch (e) {
                if (e instanceof errors_1.UnMatchedBracketsError) {
                }
                else
                    throw e;
            }
        }
    }
    stop() {
        this.running = false;
    }
    clearCurrentCommand() {
        this.command = '';
    }
}
exports.Repl = Repl;
