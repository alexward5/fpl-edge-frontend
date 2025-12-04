import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type DisplayedData from "../../../../types/DisplayedData";
import type { ColumnConfig } from "../../../../types/TableColumn";
import { createHeaderCells } from "../tableCellFactory";

interface EnhancedTableHeadProps {
    columns: ColumnConfig[];
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
        order,
        orderBy,
        onRequestSort,
    } = props;

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <TableHead>
            <TableRow>
                {createHeaderCells(
                    columns,
                    order,
                    orderBy,
                    onRequestSort,
                    theme,
                    isSmallScreen
                )}
            </TableRow>
        </TableHead>
    );
}
