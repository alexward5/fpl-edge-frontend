import { useState } from "react";
import Box from "@mui/material/Box";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";
import Drawer from "../Drawer/Drawer";
import { useTheme } from "@mui/material/styles";

type Props = {
    handleDrawerClose: () => void;
    handleDrawerTransitionEnd: () => void;
    mobileOpen: boolean;
};

export default function PlayerData(props: Props) {
    const { handleDrawerClose, handleDrawerTransitionEnd, mobileOpen } = props;

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

    const theme = useTheme();

    return (
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
    );
}
