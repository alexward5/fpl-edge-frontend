import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface Props {
    data: object[];
}

const columns: GridColDef[] = [
    { field: "fpl_web_name", headerName: "Name", width: 150 },
    { field: "fbref_team", headerName: "Team", width: 120 },
    { field: "fpl_player_position", headerName: "Position", width: 120 },
    {
        field: "fpl_player_cost",
        headerName: "Price",
        type: "number",
        width: 120,
    },
    {
        field: "fpl_selected_by_percent",
        headerName: "Selected %",
        type: "number",
        width: 120,
    },
    {
        field: "sumMinutes",
        headerName: "Minutes",
        type: "number",
        width: 120,
    },
    {
        field: "sumNPxG",
        headerName: "NPxG",
        type: "number",
        width: 120,
    },
    {
        field: "sumxA",
        headerName: "xA",
        type: "number",
        width: 120,
    },
    {
        field: "sumNPxP",
        headerName: "NPxP",
        type: "number",
        width: 120,
    },
];

const paginationModel = { page: 0, pageSize: 25 };

export default function DataTable(props: Props) {
    const { data } = props;

    return (
        <Paper elevation={5}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 25, 50, 100]}
                checkboxSelection
                sx={{ border: 0, height: "100%" }}
                getRowId={(row) => row.fpl_player_code}
                rowHeight={38}
            />
        </Paper>
    );
}
