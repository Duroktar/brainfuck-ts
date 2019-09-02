export class UnMatchedBracketsError extends Error {
    constructor() {
        super("Brackets aren't balanced.");
    }
}
export class CyclicComplexityError extends Error {
    constructor(num: number) {
        super(`Max depth exceeded: value="${num}"`);
    }
}

const handleError = (err) => console.error('unhandled:', err)
process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);
