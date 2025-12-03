import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Checkbox from "@mui/material/Checkbox";
import StickyTableHeader from "../StickyTableHeader/StickyTableHeader";
import type DisplayedData from "../../../../types/DisplayedData";
import type { ColumnWithStickyMeta } from "../stickyColumns";

interface EnhancedTableHeadProps {
    columns: ColumnWithStickyMeta[];
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: "asc" | "desc";
    orderBy: string;
    rowCount: number;
}

export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
    const {
        columns,
        // onSelectAllClick,
        order,
        orderBy,
        // numSelected,
        // rowCount,
        onRequestSort,
    } = props;

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        size="small"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "Select all displayed rows",
                        }}
                    />
                </TableCell> */}
                {columns.map((column) => (
                    <StickyTableHeader
                        key={column.id}
                        columnConfig={column}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={onRequestSort}
                    />
                ))}
            </TableRow>
        </TableHead>
    );
}
