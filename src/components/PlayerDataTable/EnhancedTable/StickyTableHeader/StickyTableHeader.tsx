import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import type DisplayedData from "../../../../types/DisplayedData";

interface StickyTableHeaderProps {
    headCell: {
        disablePadding: boolean;
        id: keyof DisplayedData;
        label: string;
        numeric: boolean;
    };
    isSticky?: boolean;
    order: "asc" | "desc";
    orderBy: string;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => void;
    sx?: Record<string, any>;
}

export default function StickyTableHeader({
    headCell,
    isSticky = false,
    order,
    orderBy,
    onRequestSort,
    sx = {},
}: StickyTableHeaderProps) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const isVerticalSticky = !isSmallScreen;
    const baseZIndex = theme.zIndex.appBar;

    const createSortHandler =
        (property: keyof DisplayedData) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableCell
            sx={{
                fontWeight: "bold",
                position: isVerticalSticky || isSticky ? "sticky" : "relative",
                top: isVerticalSticky || isSticky ? 0 : undefined,
                left: isSticky ? 0 : undefined,
                paddingLeft: "4px",
                paddingRight: "4px",
                backgroundColor: theme.darkThemeSurfaceColor_1,
                paddingTop: 0,
                paddingBottom: 0,
                whiteSpace: "nowrap",
                // Borders using pseudo-element (needed for sticky elements)
                "&::after": {
                    content: '""',
                    position: "absolute",
                    ...(isSticky
                        ? {
                              // Sticky cell: right + bottom borders
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
                          }
                        : {
                              // Non-sticky cell: bottom border only
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: "1px",
                              backgroundColor: theme.darkThemeBorderColor,
                              pointerEvents: "none",
                          }),
                },
                zIndex: isVerticalSticky
                    ? isSticky
                        ? baseZIndex + 2
                        : baseZIndex + 1
                    : isSticky
                      ? 2
                      : undefined,
                ...sx, // Allow config to override any of these styles
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
                    display: "flex",
                    alignItems: "center",
                    height: "38px",
                    "&:hover": {
                        color: theme.themeMainTextColor,
                    },
                    "&.Mui-active .MuiTableSortLabel-icon": {
                        color: theme.themeMainColor,
                        marginRight: "2px", // Reduce gap between text and arrow
                    },
                    "& .MuiTableSortLabel-icon": {
                        marginRight: "2px", // Reduce gap for inactive state arrow
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
    );
}
