export interface ColumnConfig {
    id: string;
    sticky?: boolean;
    sx?: Record<string, any>;
}

export interface TableConfig {
    columns: ColumnConfig[];
}

