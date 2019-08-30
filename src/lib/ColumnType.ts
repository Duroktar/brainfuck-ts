
declare module 'console-table-printer' {
    type ColumnType = {
        name: string;
        alignment?: 'left' | 'right';
    };
    type TableOptions = {
        style: 'thinBorder' | 'fatBorder'; //style of border of the table
        columns: ColumnType[];
    };
    export class Table<T> {
        constructor(options?: string[] | TableOptions);
        addColumn(column: ColumnType): void;
        addColumns(columns: ColumnType[]): void;
        addRow(row: T, options?: {
            color: string;
        }): void;
        addRows(toBeInsertedRows: T[]): void;
        printTable(): void;
    }
}
