import "./Table.css";
import { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";

export default function Table(props: any) {
    const { data } = props;

    const columns = useMemo(
        () => [
            {
                accessorKey: "fpl_web_name",
                header: "Name",
            },
            {
                accessorKey: "fbref_team",
                header: "Team",
            },
            {
                accessorKey: "fpl_player_position",
                header: "Position",
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        data,
        columns,
    });

    return (
        <div className="table-container">
            <MaterialReactTable table={table} />
        </div>
    );
}
