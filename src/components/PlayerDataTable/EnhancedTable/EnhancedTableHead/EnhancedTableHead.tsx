import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Checkbox from "@mui/material/Checkbox";
import StickyTableHeader from "../StickyTableHeader/StickyTableHeader";

import type DisplayedData from "../../../../types/DisplayedData";

interface HeadCell {
    disablePadding: boolean;
    id: keyof DisplayedData;
    label: string;
    numeric: boolean;
    sticky?: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: "fplWebName",
        numeric: false,
        disablePadding: true,
        label: "Player",
        sticky: true,
    },
    {
        id: "fbrefTeam",
        numeric: true,
        disablePadding: false,
        label: "Team",
    },
    {
        id: "fplPlayerPosition",
        numeric: true,
        disablePadding: false,
        label: "Position",
    },
    {
        id: "fplPlayerCost",
        numeric: true,
        disablePadding: false,
        label: "Price",
    },
    {
        id: "sumPoints",
        numeric: true,
        disablePadding: false,
        label: "Points",
    },
    {
        id: "gamesPlayed",
        numeric: true,
        disablePadding: false,
        label: "Games",
    },
    {
        id: "sumMinutes",
        numeric: true,
        disablePadding: false,
        label: "Minutes",
    },
    {
        id: "sumGoals",
        numeric: true,
        disablePadding: false,
        label: "Goals",
    },
    {
        id: "sumAssists",
        numeric: true,
        disablePadding: false,
        label: "Assists",
    },
    {
        id: "sumNPxG",
        numeric: true,
        disablePadding: false,
        label: "NPxG",
    },
    {
        id: "sumxA",
        numeric: true,
        disablePadding: false,
        label: "xA",
    },
    {
        id: "sumNPxP",
        numeric: true,
        disablePadding: false,
        label: "NPxGAP",
    },
    {
        id: "sumDefensiveContributions",
        numeric: true,
        disablePadding: false,
        label: "DC",
    },
    {
        id: "sumBPS",
        numeric: true,
        disablePadding: false,
        label: "BPS",
    },
    {
        id: "fplSelectedByPercent",
        numeric: true,
        disablePadding: false,
        label: "Selected %",
    },
];

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
                {headCells.map((headCell) => (
                    <StickyTableHeader
                        key={headCell.id}
                        headCell={headCell}
                        isSticky={headCell.sticky}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={onRequestSort}
                    />
                ))}
            </TableRow>
        </TableHead>
    );
}
