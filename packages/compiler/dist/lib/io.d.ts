import { State } from "../types";
import { BfOptions } from "../types";
export declare function readlineSync(): Promise<string>;
export declare function print(val: number, options?: BfOptions): void;
export declare const debug: (state: State) => void;
