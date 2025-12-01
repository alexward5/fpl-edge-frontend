import TableRow from "@mui/material/TableRow";
import EnhancedTableCell from "../EnhancedTableCell/EnhancedTableCell";
import StickyTableCell from "../StickyTableCell/StickyTableCell";
import type { TableConfig } from "../../../../types/TableColumn";

interface EmptyTableRowProps {
    config: TableConfig;
}

export default function EmptyTableRow({ config }: EmptyTableRowProps) {
    return (
        <TableRow
            sx={{
                opacity: 0,
            }}
        >
            {config.columns.map((column) => {
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
