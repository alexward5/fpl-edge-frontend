import { useState } from "react";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import Drawer from "../Drawer/Drawer";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";
import { useTheme } from "@mui/material/styles";

function PageContent() {
    const [gameweekRange, setGameweekRange] = useState<number[]>([1, 1]);
    const [displayedPositions, setDisplayedPositions] = useState<string[]>([
        "DEF",
        "MID",
        "FWD",
    ]);
    const [displayedTeams, setDisplayedTeams] = useState<string[]>([]);
    const [playerPriceRange, setPlayerPriceRange] = useState<string[]>([
        "",
        "",
    ]);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const theme = useTheme();

    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Drawer
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
                displayedPositions={displayedPositions}
                setDisplayedPositions={setDisplayedPositions}
                displayedTeams={displayedTeams}
                setDisplayedTeams={setDisplayedTeams}
                playerPriceRange={playerPriceRange}
                setPlayerPriceRange={setPlayerPriceRange}
                gameweekRange={gameweekRange}
                setGameweekRange={setGameweekRange}
            />
            <Box
                sx={{
                    height: {
                        xs: `calc(100% - 56px)`,
                        sm: `calc(100% - 64px)`,
                    },
                    mt: { xs: "56px", sm: "64px" },
                    width: { sm: `calc(100% - ${theme.drawerWidth})` },
                    ml: { sm: `${theme.drawerWidth}` },
                }}
            >
                <PlayerDataTable
                    displayedPositions={displayedPositions}
                    displayedTeams={displayedTeams}
                    playerPriceRange={playerPriceRange}
                    setPlayerPriceRange={setPlayerPriceRange}
                    gameweekRange={gameweekRange}
                />
            </Box>
        </>
    );
}

export default PageContent;
