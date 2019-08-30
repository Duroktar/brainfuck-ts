export class UnMatchedBracketsError extends Error {
    constructor() {
        super("Brackets aren't balanced.");
    }
}

const handleError = (err) => console.error('unhandled:', err)
process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);
