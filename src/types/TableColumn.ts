export interface ColumnConfig {
    id: string;
    sticky?: boolean;
    /**
     * When true, the sticky cell will render a right-hand border to visually
     * separate it from the non-sticky portion of the table.
     */
    stickyRightBorder?: boolean;
    sx?: Record<string, any>;
}

export interface TableConfig {
    columns: ColumnConfig[];
}
