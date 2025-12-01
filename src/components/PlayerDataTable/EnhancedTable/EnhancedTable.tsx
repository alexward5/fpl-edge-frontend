import { useState, forwardRef } from "react";
import { orderBy } from "natural-orderby";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
// import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead";
import EnhancedTableCell from "./EnhancedTableCell/EnhancedTableCell";
import StickyTableCell from "./StickyTableCell/StickyTableCell";
import EmptyTableRow from "./EmptyTableRow/EmptyTableRow";
import tableConfigJson from "../PlayerDataTableConfig.json";

import type DisplayedData from "../../../types/DisplayedData";

const tableConfig = tableConfigJson as { columns: any[] };

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

    const orderedRows = orderBy(rows, [orderColumn], order);

    const visibleRows = [...orderedRows].slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    // Calculate empty rows needed to fill the page
    const emptyRows = Math.max(0, rowsPerPage - visibleRows.length);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <TableContainer
            sx={{
                flex: { xs: "none", md: 1 },
                overflow: { xs: "visible", md: "auto" },
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
                                {tableConfig.columns.map(
                                    (column, columnIndex) => {
                                        const cellValue =
                                            row[
                                                column.id as keyof DisplayedData
                                            ];

                                        // Only first column gets id for accessibility/row identification
                                        const cellId =
                                            columnIndex === 0
                                                ? labelId
                                                : undefined;

                                        // Check if this column is currently selected for sorting
                                        const isSelectedColumn =
                                            column.id === orderColumn;

                                        // Create enhanced column config with styling for selected column
                                        const enhancedColumnConfig = {
                                            ...column,
                                            sx: {
                                                ...column.sx,
                                                ...(isSelectedColumn && {
                                                    fontWeight:
                                                        theme.typography
                                                            .fontWeightBold,
                                                }),
                                            },
                                        };

                                        return column.sticky ? (
                                            <StickyTableCell
                                                key={column.id}
                                                columnConfig={
                                                    enhancedColumnConfig
                                                }
                                                component="th"
                                                id={cellId}
                                                scope="row"
                                            >
                                                {cellValue}
                                            </StickyTableCell>
                                        ) : (
                                            <EnhancedTableCell
                                                key={column.id}
                                                columnConfig={
                                                    enhancedColumnConfig
                                                }
                                                id={cellId}
                                            >
                                                {cellValue}
                                            </EnhancedTableCell>
                                        );
                                    },
                                )}
                            </TableRow>
                        );
                    })}
                    {emptyRows > 0 &&
                        Array.from({ length: emptyRows }).map((_, index) => (
                            <EmptyTableRow
                                key={`empty-${index}`}
                                config={tableConfig}
                            />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default EnhancedTable;
