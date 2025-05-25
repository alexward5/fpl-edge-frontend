import TablePagination from "@mui/material/TablePagination";
import DisplayedData from "../../../types/DisplayedData";

type Props = {
    rows: DisplayedData[];
    rowsPerPage: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
};

export default function EnhancedTablePagination(props: Props) {
    const {
        rows,
        rowsPerPage,
        page,
        handleChangePage,
        handleChangeRowsPerPage,
    } = props;

    return (
        <TablePagination
            sx={{ backgroundColor: "lightgray" }}
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
