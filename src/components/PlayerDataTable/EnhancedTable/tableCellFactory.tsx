import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import type DisplayedData from "../../../types/DisplayedData";
import type { ColumnConfig } from "../../../types/TableColumn";

// Helper to convert width string to number
const parsePx = (value: string): number => {
    const match = value.match(/^(\d+)\s*px$/);
    return match ? parseInt(match[1], 10) : 0;
};

const getStickyStyle = (
    column: ColumnConfig,
    left: number,
    isLastSticky: boolean,
    theme: any,
    isHeader: boolean = false,
    additionalSx: any = {},
) => {
    const isSticky = column.sticky ?? false;
    // Use explicit config if present, otherwise fallback to "last sticky column" logic
    const hasRightBorder = column.stickyRightBorder ?? isLastSticky ?? false;

    if (!isSticky) {
        return {
            ...column.sx,
            ...additionalSx,
        };
    }

    return {
        position: "sticky",
        left,
        // Set border using gradient (needed for sticky cells)
        ...(hasRightBorder && {
            "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "1px",
                backgroundColor: theme.darkThemeBorderColor,
                pointerEvents: "none",
            },
        }),
        backgroundColor: isHeader ? theme.darkThemeSurfaceColor_1 : "inherit",
        zIndex: {
            xs: 1,
            md: theme.zIndex.appBar + (isHeader ? 2 : 1),
        },
        ...column.sx,
        ...additionalSx,
    };
};

export const createRowCells = (
    row: DisplayedData,
    columns: ColumnConfig[],
    rowId: string,
    orderColumn: string,
    theme: any,
) => {
    let stickyLeft = 0;
    const stickyColumns = columns.filter((c) => c.sticky);
    const lastStickyId = stickyColumns[stickyColumns.length - 1]?.id;

    return columns.map((column, columnIndex) => {
        const cellValue = row[column.id as keyof DisplayedData];
        const cellId = columnIndex === 0 ? rowId : undefined;
        const isSelectedColumn = column.id === orderColumn;
        const isLastSticky = column.id === lastStickyId;
        const isSticky = column.sticky ?? false;

        const currentLeft = stickyLeft;
        if (isSticky) {
            stickyLeft += parsePx(column.sx.width);
        }

        const additionalSx = isSelectedColumn
            ? { fontWeight: theme.typography.fontWeightBold }
            : {};

        const sx = getStickyStyle(
            column,
            currentLeft,
            isLastSticky,
            theme,
            false,
            additionalSx,
        );

        return (
            <TableCell
                key={column.id}
                component={isSticky ? "th" : "td"}
                id={cellId}
                scope={isSticky ? "row" : undefined}
                padding="none"
                sx={sx}
            >
                {cellValue}
            </TableCell>
        );
    });
};

export const createHeaderCells = (
    columns: ColumnConfig[],
    order: "asc" | "desc",
    orderBy: string,
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => void,
    theme: any,
    isSmallScreen: boolean,
) => {
    let stickyLeft = 0;
    const stickyColumns = columns.filter((c) => c.sticky);
    const lastStickyId = stickyColumns[stickyColumns.length - 1]?.id;

    const createSortHandler =
        (property: keyof DisplayedData) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return columns.map((column) => {
        const { headerConfig, id, sticky, sx } = column;
        const isSticky = sticky ?? false;
        const currentLeft = stickyLeft;

        if (isSticky) {
            stickyLeft += parsePx(column.sx.width);
        }

        const isLastSticky = id === lastStickyId;

        const headCell = {
            id: id as keyof DisplayedData,
            label: headerConfig.label,
            numeric: headerConfig.numeric,
        };

        const stickyStyle = isSticky
            ? getStickyStyle(column, currentLeft, isLastSticky, theme, true)
            : {};

        // Additional header specific styles
        const isVerticalSticky = !isSmallScreen;
        const baseZIndex = theme.zIndex.appBar;

        const headerSx = {
            // Default header styles
            paddingLeft: "4px",
            paddingRight: "4px",
            backgroundColor: theme.darkThemeSurfaceColor_1,
            paddingTop: 0,
            paddingBottom: 0,
            whiteSpace: "nowrap",

            // Base styles (overrides)
            ...sx,
            ...(headerConfig.sx || {}),

            // Sticky behavior (Horizontal AND/OR Vertical)
            position: isVerticalSticky || isSticky ? "sticky" : "relative",
            top: isVerticalSticky || isSticky ? 0 : undefined,

            // If horizontal sticky, add sticky styles from helper
            ...(isSticky ? stickyStyle : {}),

            zIndex: isVerticalSticky
                ? isSticky
                    ? baseZIndex + 2
                    : baseZIndex + 1
                : isSticky
                  ? 2
                  : undefined,
        };

        // Set border using gradient (needed for sticky cells)
        if (isSticky) {
            headerSx["&::after"] = {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: [
                    `linear-gradient(to left, ${theme.darkThemeBorderColor} 1px, transparent 1px)`,
                    `linear-gradient(to top, ${theme.darkThemeBorderColor} 1px, transparent 1px)`,
                ].join(", "),
                backgroundPosition: "right, bottom",
                backgroundSize: "1px 100%, 100% 1px",
                backgroundRepeat: "no-repeat",
                pointerEvents: "none",
            };
        } else {
            headerSx["&::after"] = {
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: theme.darkThemeBorderColor,
                pointerEvents: "none",
                content: '""',
                position: "absolute",
            };
        }

        const isSortable = headerConfig.sortable !== false;

        if (!isSortable) {
            headerSx.cursor = "default";
            headerSx.userSelect = "none";
        }

        return (
            <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={headerSx}
            >
                {isSortable ? (
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "desc"}
                        onClick={createSortHandler(headCell.id)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "38px",
                            "&:hover": {
                                color: theme.themeMainTextColor,
                            },
                            "&.Mui-active .MuiTableSortLabel-icon": {
                                color: theme.themeMainColor,
                                marginRight: "2px",
                            },
                            "& .MuiTableSortLabel-icon": {
                                marginRight: "2px",
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
                ) : (
                    headCell.label
                )}
            </TableCell>
        );
    });
};
