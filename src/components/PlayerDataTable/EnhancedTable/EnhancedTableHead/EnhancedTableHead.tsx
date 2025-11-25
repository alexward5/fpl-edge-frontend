import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
// import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
    const createSortHandler =
        (property: keyof DisplayedData) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                    <TableCell
                        sx={{
                            fontWeight: "bold",
                            position: !isSmallScreen
                                ? "sticky"
                                : headCell.sticky
                                  ? "sticky"
                                  : "relative",
                            top: !isSmallScreen ? 0 : headCell.sticky ? 0 : "",
                            left: headCell.sticky ? 0 : "",
                            paddingLeft: headCell.sticky ? "15px" : "",
                            backgroundColor: theme.darkThemeSurfaceColor_1,
                            "&::after": headCell.sticky
                                ? {
                                      content: '""',
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                      bottom: 0,
                                      left: 0,
                                      background: `linear-gradient(to left, ${theme.darkThemeBorderColor} 1px, transparent 1px),
                                                   linear-gradient(to top, ${theme.darkThemeBorderColor} 1px, transparent 1px)`,
                                      backgroundPosition: "right, bottom",
                                      backgroundSize: "1px 100%, 100% 1px",
                                      backgroundRepeat: "no-repeat",
                                  }
                                : {
                                      // For non-sticky cells: just bottom border
                                      content: '""',
                                      position: "absolute",
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      height: "1px",
                                      backgroundColor:
                                          theme.darkThemeBorderColor,
                                  },
                            zIndex: !isSmallScreen
                                ? headCell.sticky
                                    ? theme.zIndex.appBar + 2
                                    : theme.zIndex.appBar + 1
                                : headCell.sticky
                                  ? 2
                                  : "",
                        }}
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "desc"}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                                "&:hover": { color: theme.themeMainTextColor },
                                "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: theme.themeMainColor,
                                },
                            }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "asc"
                                        ? "sorted ascending"
                                        : "sorted descending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
