import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead";

interface DisplayedData {
    fplPlayerCode: string;
    fplWebName: string;
    fbrefTeam: string;
    fplPlayerPosition: string;
    fplPlayerCost: number;
    fplSelectedByPercent: number;
    sumMinutes: number;
    sumNPxG: number;
    sumxA: number;
    sumNPxP: number;
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable(props: any) {
    const { rows, page, rowsPerPage } = props;

    const [order, setOrder] = useState<Order>("desc");
    const [orderBy, setOrderBy] = useState<keyof DisplayedData>("sumNPxP");
    const [selected, setSelected] = useState<readonly number[]>([]);

    const handleRequestSort = (
        _: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
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

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
        >
            <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
            />
            <TableBody>
                {visibleRows.map((row, index) => {
                    const isItemSelected = selected.includes(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.fplPlayerCode}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </TableCell>
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                            >
                                {row.fplWebName}
                            </TableCell>
                            <TableCell align="right">{row.fbrefTeam}</TableCell>
                            <TableCell align="right">
                                {row.fplPlayerPosition}
                            </TableCell>
                            <TableCell align="right">
                                {row.fplPlayerCost}
                            </TableCell>
                            <TableCell align="right">
                                {row.fplSelectedByPercent}
                            </TableCell>
                            <TableCell align="right">
                                {row.sumMinutes}
                            </TableCell>
                            <TableCell align="right">{row.sumNPxG}</TableCell>
                            <TableCell align="right">{row.sumxA}</TableCell>
                            <TableCell align="right">{row.sumNPxP}</TableCell>
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
    );
}

// fplWebName: string;
// fbrefTeam: string;
// fplPlayerPosition: string;
// fplPlayerCost: number;
// fplSelectedByPercent: number;
// minutes: number;
// sumNPxG: number;
// sumxA: number;
// sumNPxP: number;
