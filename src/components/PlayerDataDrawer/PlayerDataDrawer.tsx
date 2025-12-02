import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Fade from "@mui/material/Fade";
import DrawerContent from "./DrawerContent/DrawerContent";
import { useTheme } from "@mui/material/styles";

type Props = {
    gameweekRange: number[];
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
    mobileOpen: boolean;
    handleDrawerTransitionEnd: () => void;
    handleDrawerClose: () => void;
    displayedTeams: string[];
    setDisplayedTeams: React.Dispatch<React.SetStateAction<string[]>>;
    displayedPositions: string[];
    setDisplayedPositions: React.Dispatch<React.SetStateAction<string[]>>;
    playerPriceRange: string[];
    setPlayerPriceRange: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function PlayerDataDrawer(props: Props) {
    const {
        gameweekRange,
        setGameweekRange,
        mobileOpen,
        handleDrawerTransitionEnd,
        handleDrawerClose,
        displayedTeams,
        setDisplayedTeams,
        displayedPositions,
        setDisplayedPositions,
        playerPriceRange,
        setPlayerPriceRange,
    } = props;

    const theme = useTheme();

    return (
        <Fade in={true} timeout={500}>
            <Box
                component="nav"
                sx={{
                    width: { md: theme.drawerWidth },
                    flexShrink: { md: 0 },
                }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: theme.drawerWidth,
                            borderRight: `1px solid ${theme.darkThemeBorderColor}`,
                        },
                    }}
                >
                    <DrawerContent
                        gameweekRange={gameweekRange}
                        setGameweekRange={setGameweekRange}
                        displayedTeams={displayedTeams}
                        setDisplayedTeams={setDisplayedTeams}
                        displayedPositions={displayedPositions}
                        setDisplayedPositions={setDisplayedPositions}
                        playerPriceRange={playerPriceRange}
                        setPlayerPriceRange={setPlayerPriceRange}
                    />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: theme.drawerWidth,
                            borderRight: "none",
                        },
                    }}
                    open
                >
                    <DrawerContent
                        gameweekRange={gameweekRange}
                        setGameweekRange={setGameweekRange}
                        displayedTeams={displayedTeams}
                        setDisplayedTeams={setDisplayedTeams}
                        displayedPositions={displayedPositions}
                        setDisplayedPositions={setDisplayedPositions}
                        playerPriceRange={playerPriceRange}
                        setPlayerPriceRange={setPlayerPriceRange}
                    />
                </Drawer>
            </Box>
        </Fade>
    );
}
