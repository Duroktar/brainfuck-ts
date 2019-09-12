"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnMatchedBracketsError extends Error {
    constructor() {
        super("Brackets aren't balanced.");
    }
}
exports.UnMatchedBracketsError = UnMatchedBracketsError;
class CyclicComplexityError extends Error {
    constructor(num) {
        super(`Max depth exceeded: value="${num}"`);
    }
}
exports.CyclicComplexityError = CyclicComplexityError;
const handleError = (err) => console.error('unhandled:', err);
process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);
