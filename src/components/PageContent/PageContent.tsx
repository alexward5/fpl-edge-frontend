import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./Header/Header";
import Drawer from "../Drawer/Drawer";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";
import { useTheme } from "@mui/material/styles";
import { useLoading } from "../../contexts/LoadingContext";

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
    const { isLoading } = useLoading();

    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            {isLoading ? (
                <Box
                    sx={{
                        height: {
                            xs: `calc(100% - ${theme.appBarHeightXs})`,
                            sm: `calc(100% - ${theme.appBarHeightSm})`,
                        },
                        mt: {
                            xs: theme.appBarHeightXs,
                            sm: theme.appBarHeightSm,
                        },
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress
                        sx={{
                            color: "black",
                        }}
                    />
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            height: {
                                xs: `calc(100% - ${theme.appBarHeightXs})`,
                                sm: `calc(100% - ${theme.appBarHeightSm})`,
                            },
                            mt: {
                                xs: theme.appBarHeightXs,
                                sm: theme.appBarHeightSm,
                            },
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
                </>
            )}
        </>
    );
}

export default PageContent;
