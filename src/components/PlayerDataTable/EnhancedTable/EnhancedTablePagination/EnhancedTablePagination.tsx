import TablePagination from "@mui/material/TablePagination";
import DisplayedData from "../../../../types/DisplayedData";

type Props = {
    rows: DisplayedData[];
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    scrollToTop: () => void;
};

export default function EnhancedTablePagination(props: Props) {
    const { rows, rowsPerPage, setRowsPerPage, page, setPage, scrollToTop } =
        props;

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
        scrollToTop(); // Scroll to top of table
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        scrollToTop(); // Scroll to top of table
    };

    return (
        <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
        />
    );
}
