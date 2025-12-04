import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import type { ColumnConfig } from "../../../../types/TableColumn";
import { createRowCells } from "../tableCellFactory";

interface EmptyTableRowProps {
    columns: ColumnConfig[];
}

export default function EmptyTableRow({ columns }: EmptyTableRowProps) {
    const theme = useTheme();

    // Create dummy row data matching the expected shape just for the keys
    const dummyRow = columns.reduce((acc, col) => {
        acc[col.id] = "";
        return acc;
    }, {} as any);

    // Reuse the factory but potentially override/hide content via opacity on row
    return (
        <TableRow
            sx={{
                opacity: 0,
            }}
        >
            {createRowCells(dummyRow, columns, "empty", "", theme)}
        </TableRow>
    );
}
