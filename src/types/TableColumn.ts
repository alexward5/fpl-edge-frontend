export interface ColumnConfig {
    id: string;
    sticky?: boolean;
    stickyRightBorder?: boolean;
    sx: {
        width: string;
        minWidth: string;
        [key: string]: any;
    };
    headerConfig: {
        label: string;
        numeric: boolean;
        disablePadding?: boolean;
        sx?: Record<string, any>;
    };
}

export interface TableConfig {
    columns: ColumnConfig[];
}
