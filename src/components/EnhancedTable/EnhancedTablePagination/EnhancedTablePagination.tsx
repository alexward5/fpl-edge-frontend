import TablePagination from "@mui/material/TablePagination";

export default function EnhancedTablePagination(props: any) {
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
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
