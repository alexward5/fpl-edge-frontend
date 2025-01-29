import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface Props {
    data: object[];
}

const columns: GridColDef[] = [
    { field: "fpl_web_name", headerName: "Name", width: 150 },
    { field: "fbref_team", headerName: "Team", width: 100 },
    { field: "fpl_player_position", headerName: "Position", width: 100 },
    {
        field: "fpl_player_cost",
        headerName: "Price",
        type: "number",
        width: 100,
    },
    {
        field: "fpl_selected_by_percent",
        headerName: "Selected %",
        type: "number",
        width: 100,
    },
];

const paginationModel = { page: 0, pageSize: 25 };

export default function DataTable(props: Props) {
    const { data } = props;

    // console.log(data);

    return (
        <Paper
            elevation={5}
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[25, 50, 100]}
                checkboxSelection
                sx={{ border: 0 }}
                getRowId={(row) => row.fpl_player_code}
                rowHeight={38}
            />
        </Paper>
    );
}
