import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";

import type DisplayedData from "../../../types/DisplayedData";

interface HeadCell {
    disablePadding: boolean;
    id: keyof DisplayedData;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: "fplWebName",
        numeric: false,
        disablePadding: true,
        label: "Name",
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
        label: "NPxP",
    },
    {
        id: "sumBPS",
        numeric: true,
        disablePadding: false,
        label: "BPS",
    },
    {
        id: "sumPoints",
        numeric: true,
        disablePadding: false,
        label: "Points",
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
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler =
        (property: keyof DisplayedData) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "Select all displayed rows",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ fontWeight: "bold" }}
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
