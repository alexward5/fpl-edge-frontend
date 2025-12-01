import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import type { ColumnConfig } from "../../../../types/TableColumn";

interface StickyTableCellProps {
    children: React.ReactNode;
    columnConfig: ColumnConfig;
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

    return (
        <TableCell
            sx={{
                minWidth: "135px",
                position: "sticky",
                left: 0,
                // Right border for sticky cells
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
