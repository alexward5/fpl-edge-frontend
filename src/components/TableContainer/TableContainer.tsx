import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Table from "../Table/Table.tsx";

export default function ResponsiveDrawer(props: any) {
    const { loading, displayedData } = props;

    if (loading)
        return (
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: "100px",
                }}
            >
                <Toolbar />
                <div>Loading...</div>
            </Box>
        );

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                width: "100px",
            }}
        >
            <Toolbar />
            <Table data={displayedData} />
        </Box>
    );
}
