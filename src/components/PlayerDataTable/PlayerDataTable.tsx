import { useState } from "react";
import Box from "@mui/material/Box";
import EnhancedTable from "../EnhancedTable/EnhancedTable";
import EnhancedTablePagination from "../EnhancedTable/EnhancedTablePagination/EnhancedTablePagination";

import DisplayedData from "../../types/DisplayedData";

type Props = {
    displayedData: DisplayedData[];
};

export default function PlayerDataTable(props: Props) {
    const { displayedData } = props;

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(50);

    return (
        <>
            <Box
                sx={{
                    height: `calc(100% - 52px)`,
                    overflow: "auto",
                }}
            >
                <EnhancedTable
                    rows={displayedData}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            </Box>
            <EnhancedTablePagination
                rows={displayedData}
                rowsPerPage={rowsPerPage}
                page={page}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            />
        </>
    );
}
