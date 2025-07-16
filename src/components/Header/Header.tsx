import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

type Props = {
    handleDrawerToggle: () => void;
};

export default function Header(props: Props) {
    const { handleDrawerToggle } = props;

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                background:
                    "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(74,247,146,1) 53%)",
                color: "black",
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
