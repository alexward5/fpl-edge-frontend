import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";

interface ColumnConfig {
    id: string;
    sticky?: boolean;
    sx?: Record<string, any>;
}

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
                paddingLeft: "15px",
                // Right border for sticky cells
                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "1px",
                    backgroundColor: theme.darkThemeBorderColor,
                },
                backgroundColor: "inherit",
                zIndex: {
                    xs: 1,
                    sm: theme.zIndex.appBar + 1,
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
