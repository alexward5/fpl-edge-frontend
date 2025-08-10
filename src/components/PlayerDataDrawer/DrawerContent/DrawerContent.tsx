import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import GameweekSlider from "./GameweekSlider/GameweekSlider";
import PlayerFilters from "./PlayerFilters/PlayerFilters";
import TeamFilter from "./TeamFilter/TeamFilter";

type Props = {
    gameweekRange: number[];
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
    displayedTeams: string[];
    setDisplayedTeams: React.Dispatch<React.SetStateAction<string[]>>;
    displayedPositions: string[];
    setDisplayedPositions: React.Dispatch<React.SetStateAction<string[]>>;
    playerPriceRange: string[];
    setPlayerPriceRange: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function DrawerContent(props: Props) {
    const {
        gameweekRange,
        setGameweekRange,
        displayedTeams,
        setDisplayedTeams,
        displayedPositions,
        setDisplayedPositions,
        playerPriceRange,
        setPlayerPriceRange,
    } = props;

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
            }}
        >
            <Toolbar
                variant="regular"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                }}
            >
                <Box
                    component="img"
                    src="/temp-logo.png"
                    alt="Logo"
                    sx={{ height: "42px", width: "auto" }}
                />
            </Toolbar>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: "0px 15px",
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                }}
            >
                <GameweekSlider
                    gameweekRange={gameweekRange}
                    setGameweekRange={setGameweekRange}
                />
                <PlayerFilters
                    displayedPositions={displayedPositions}
                    setDisplayedPositions={setDisplayedPositions}
                    playerPriceRange={playerPriceRange}
                    setPlayerPriceRange={setPlayerPriceRange}
                />
                <TeamFilter
                    displayedTeams={displayedTeams}
                    setDisplayedTeams={setDisplayedTeams}
                />
            </Box>
        </Box>
    );
}
