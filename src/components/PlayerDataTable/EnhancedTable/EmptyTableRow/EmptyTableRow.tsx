import TableRow from "@mui/material/TableRow";
import EnhancedTableCell from "../EnhancedTableCell/EnhancedTableCell";
import StickyTableCell from "../StickyTableCell/StickyTableCell";
import type { ColumnWithStickyMeta } from "../stickyColumns";

interface EmptyTableRowProps {
    columns: ColumnWithStickyMeta[];
}

export default function EmptyTableRow({ columns }: EmptyTableRowProps) {
    return (
        <TableRow
            sx={{
                opacity: 0,
            }}
        >
            {columns.map((column) => {
                return column.sticky ? (
                    <StickyTableCell
                        key={column.id}
                        columnConfig={column}
                        component="th"
                        scope="row"
                    >
                        {""}
                    </StickyTableCell>
                ) : (
                    <EnhancedTableCell key={column.id} columnConfig={column}>
                        {""}
                    </EnhancedTableCell>
                );
            })}
        </TableRow>
    );
}
