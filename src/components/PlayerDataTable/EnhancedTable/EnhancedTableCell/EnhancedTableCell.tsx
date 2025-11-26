import TableCell from "@mui/material/TableCell";

interface ColumnConfig {
    id: string;
    sticky?: boolean;
    sx?: Record<string, any>;
}

interface EnhancedTableCellProps {
    columnConfig: ColumnConfig;
    children: React.ReactNode;
    id?: string;
}

export default function EnhancedTableCell({
    columnConfig,
    children,
    id,
}: EnhancedTableCellProps) {
    return (
        <TableCell sx={columnConfig.sx} id={id}>
            {children}
        </TableCell>
    );
}
