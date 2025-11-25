import { useState, forwardRef } from "react";
import { orderBy } from "natural-orderby";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
// import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead";

import type DisplayedData from "../../../types/DisplayedData";

type Order = "asc" | "desc";

type Props = {
    rows: DisplayedData[];
    page: number;
    rowsPerPage: number;
};

// Use forwardRef to pass ref of TableContainer to the parent component
// so that we can scroll to the top of the table when user changes page
const EnhancedTable = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { rows, page, rowsPerPage } = props;

    const [order, setOrder] = useState<Order>("desc");
    const [orderColumn, setOrderBy] =
        useState<keyof DisplayedData>("sumPoints");
    const [selected, setSelected] = useState<readonly number[]>([]);

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => {
        const isDesc = orderColumn === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            const newSelected = rows.map((n: DisplayedData) => n.fplPlayerCode);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    // Avoid a layout jump when reaching the last page with empty rows
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const orderedRows = orderBy(rows, [orderColumn], order);

    const visibleRows = [...orderedRows].slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <TableContainer
            sx={{
                flex: { xs: "none", sm: 1 },
                overflow: { xs: "visible", sm: "auto" },
            }}
            ref={ref}
        >
            <Table
                stickyHeader={!isSmallScreen}
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"small"}
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderColumn}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                />
                <TableBody>
                    {visibleRows.map((row, index) => {
                        const isItemSelected = selected.includes(
                            row.fplPlayerCode,
                        );
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                                // hover
                                onClick={(event) =>
                                    handleClick(event, row.fplPlayerCode)
                                }
                                // role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.fplPlayerCode}
                                // selected={isItemSelected}
                                selected={false}
                                // sx={{ cursor: "pointer" }}
                                sx={{
                                    backgroundColor:
                                        index % 2 === 0
                                            ? theme.darkThemeSurfaceColor_2
                                            : theme.darkThemeSurfaceColor_3,
                                }}
                            >
                                {/* <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    size="small"
                                    checked={isItemSelected}
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                    name={`${row.fplPlayerCode.toString()}-checkbox`}
                                />
                            </TableCell> */}
                                <TableCell
                                    sx={{
                                        minWidth: "135px",
                                        position: "sticky",
                                        left: 0,
                                        paddingLeft: "15px",
                                        borderRight: `1px solid ${theme.darkThemeBorderColor}`,
                                        backgroundColor:
                                            index % 2 === 0
                                                ? theme.darkThemeSurfaceColor_2
                                                : theme.darkThemeSurfaceColor_3,
                                        zIndex: {
                                            xs: 1,
                                            sm: theme.zIndex.appBar + 1,
                                        },
                                    }}
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    {row.fplWebName}
                                </TableCell>
                                <TableCell
                                    sx={{ width: "145px", minWidth: "145px" }}
                                    align="right"
                                >
                                    {row.fbrefTeam}
                                </TableCell>
                                <TableCell align="right">
                                    {row.fplPlayerPosition}
                                </TableCell>
                                <TableCell align="right">
                                    {row.fplPlayerCost}
                                </TableCell>
                                <TableCell align="right">
                                    {row.sumPoints}
                                </TableCell>
                                <TableCell align="right">
                                    {row.gamesPlayed}
                                </TableCell>
                                <TableCell align="right">
                                    {row.sumMinutes}
                                </TableCell>
                                <TableCell align="right">
                                    {row.sumGoals}
                                </TableCell>
                                <TableCell align="right">
                                    {row.sumAssists}
                                </TableCell>
                                <TableCell align="right">
                                    {row.sumNPxG}
                                </TableCell>
                                <TableCell align="right">{row.sumxA}</TableCell>
                                <TableCell align="right">
                                    {row.sumNPxP}
                                </TableCell>
                                <TableCell align="right">
                                    {row.sumDefensiveContributions}
                                </TableCell>
                                <TableCell align="right">
                                    {row.sumBPS}
                                </TableCell>
                                <TableCell align="right">
                                    {row.fplSelectedByPercent}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: 33 * emptyRows,
                            }}
                        >
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default EnhancedTable;
