import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import type { ColumnWithStickyMeta } from "../stickyColumns";

interface StickyTableCellProps {
    children: React.ReactNode;
    columnConfig: ColumnWithStickyMeta;
    component?: TableCellProps["component"];
    id?: string;
    scope?: string;
}

export default function StickyTableCell({
    children,
    columnConfig,
    component,
    id,
    scope,
}: StickyTableCellProps) {
    const theme = useTheme();
    const { stickyMeta, stickyRightBorder } = columnConfig;
    const stickyLeft = stickyMeta?.left ?? 0;
    // Use explicit config if present, otherwise fallback to "last sticky column" logic
    const hasRightBorder =
        stickyRightBorder ?? stickyMeta?.isLastSticky ?? false;

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
