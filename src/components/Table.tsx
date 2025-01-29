import "./Table.css";
import { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";

const data = [
    {
        name: "John",
        age: 30,
        status: "active",
    },
    {
        name: "Sara",
        age: 25,
        status: "inactive",
    },
];

export default function Table() {
    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "age",
                header: "Age",
            },
            {
                accessorKey: "status",
                header: "Status",
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
