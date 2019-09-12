declare module 'console-table-printer' {
    type ColumnType = {
        name: string;
        alignment?: 'left' | 'right';
    };
    type TableOptions = {
        style: 'thinBorder' | 'fatBorder';
        columns: ColumnType[];
    };
    class Table<T> {
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
