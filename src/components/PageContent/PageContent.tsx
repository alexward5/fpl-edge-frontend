import { useState } from "react";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import Drawer from "../Drawer/Drawer";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";

function PageContent() {
    const [maxPlayerPrice, setMaxPlayerPrice] = useState<string>("");

    const [gameweekRange, setGameweekRange] = useState<number[]>([1, 1]);
    const [displayedPositions, setDisplayedPositions] = useState<string[]>([
        "DEF",
        "MID",
        "FWD",
    ]);
    const [displayedTeams, setDisplayedTeams] = useState<string[]>([]);

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

    const DRAWER_WIDTH = 240;

    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Drawer
                gameweekRange={gameweekRange}
                setGameweekRange={setGameweekRange}
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
                displayedTeams={displayedTeams}
                setDisplayedTeams={setDisplayedTeams}
                displayedPositions={displayedPositions}
                setDisplayedPositions={setDisplayedPositions}
                maxPlayerPrice={maxPlayerPrice}
                setMaxPlayerPrice={setMaxPlayerPrice}
            />
            <Box
                sx={{
                    height: {
                        xs: `calc(100% - 56px)`,
                        sm: `calc(100% - 64px)`,
                    },
                    mt: { xs: "56px", sm: "64px" },
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                }}
            >
                <PlayerDataTable
                    displayedPositions={displayedPositions}
                    displayedTeams={displayedTeams}
                    maxPlayerPrice={maxPlayerPrice}
                    setMaxPlayerPrice={setMaxPlayerPrice}
                    gameweekRange={gameweekRange}
                />
            </Box>
        </>
    );
}

export default PageContent;
