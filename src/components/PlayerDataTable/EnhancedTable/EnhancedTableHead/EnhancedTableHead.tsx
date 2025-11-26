import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Checkbox from "@mui/material/Checkbox";
import StickyTableHeader from "../StickyTableHeader/StickyTableHeader";
import tableConfigJson from "../../PlayerDataTableConfig.json";

import type DisplayedData from "../../../../types/DisplayedData";

// Type assertion for the imported JSON config
const tableConfig = tableConfigJson as { columns: any[] };

interface EnhancedTableProps {
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

export default function EnhancedTableHead(props: EnhancedTableProps) {
    const {
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
                {tableConfig.columns.map((column) => {
                    // Create headCell object from column config
                    const headCell = {
                        id: column.id,
                        label: column.headerConfig.label,
                        numeric: column.headerConfig.numeric,
                        disablePadding: column.headerConfig.disablePadding,
                    };

                    return (
                        <StickyTableHeader
                            key={column.id}
                            headCell={headCell}
                            isSticky={column.sticky}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={onRequestSort}
                        />
                    );
                })}
            </TableRow>
        </TableHead>
    );
}
