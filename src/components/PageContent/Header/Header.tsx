import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
                color: "black",
                backgroundColor: "transparent",
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar
                disableGutters
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
                <Box
                    sx={{
                        backgroundColor: "transparent",
                        width: theme.drawerWidth,
                        height: theme.appBarHeightSm,
                        display: { xs: "none", sm: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src="/temp-logo.png"
                        alt="Logo"
                        sx={{ height: "42px", width: "auto" }}
                    />
                </Box>
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: `calc(100% - ${theme.drawerWidth})`,
                        },
                        height: "100%",
                        paddingLeft: 2,
                        display: "flex",
                        alignItems: "center",
                        background: `linear-gradient(90deg,rgb(255, 255, 255) 0%, ${theme.themeMainColor} 50%)`,
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
