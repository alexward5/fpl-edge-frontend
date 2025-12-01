import TableCell from "@mui/material/TableCell";
import type { ColumnConfig } from "../../../../types/TableColumn";

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
        <TableCell
            sx={{
                minWidth: "80px",
                paddingLeft: "4px",
                paddingRight: "4px",
                ...columnConfig.sx,
            }}
            id={id}
        >
            {children}
        </TableCell>
    );
}
