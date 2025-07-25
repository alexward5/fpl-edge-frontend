import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";

type Props = {
    handleDrawerToggle: () => void;
};

export default function Header(props: Props) {
    const { handleDrawerToggle } = props;

    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${theme.drawerWidth})` },
                ml: { sm: theme.drawerWidth },
                background: `linear-gradient(90deg,rgb(255, 255, 255) 0%, ${theme.themeMainColor} 50%)`,
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
