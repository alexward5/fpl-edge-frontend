import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import type { ColumnConfig } from "../../../../types/TableColumn";

interface StickyTableCellProps {
    children: React.ReactNode;
    columnConfig: ColumnConfig;
    /**
     * Horizontal offset (in px) from the left edge of the table for this
     * sticky column. This lets us support multiple sticky columns without
     * them overlapping.
     */
    stickyLeft?: number;
    /**
     * Whether this sticky column should render a right-hand border to
     * visually separate it from the scrollable columns.
     */
    hasRightBorder?: boolean;
    component?: TableCellProps["component"];
    id?: string;
    scope?: string;
}

export default function StickyTableCell({
    children,
    columnConfig,
    stickyLeft = 0,
    hasRightBorder = false,
    component,
    id,
    scope,
}: StickyTableCellProps) {
    const theme = useTheme();

    return (
        <TableCell
            sx={{
                // Let the column config control width; fall back to a sensible
                // default if nothing is provided.
                minWidth:
                    columnConfig.sx?.minWidth ??
                    columnConfig.sx?.width ??
                    "135px",
                position: "sticky",
                left: stickyLeft,
                // Optional right border for sticky cells
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
                backgroundColor: "inherit",
                zIndex: {
                    xs: 1,
                    md: theme.zIndex.appBar + 1,
                },
                ...columnConfig.sx,
            }}
            component={component}
            id={id}
            scope={scope}
            padding="none"
        >
            {children}
        </TableCell>
    );
}
