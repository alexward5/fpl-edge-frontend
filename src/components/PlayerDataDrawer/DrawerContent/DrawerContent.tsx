import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import GameweekSlider from "./GameweekSlider/GameweekSlider";
import Divider from "@mui/material/Divider";
import PlayerFilters from "./PlayerFilters/PlayerFilters";
import TeamFilter from "./TeamFilter/TeamFilter";
import { useTheme } from "@mui/material/styles";

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

    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
                backgroundColor: theme.darkThemeSurfaceColor_1,
            }}
        >
            <Toolbar
                variant="regular"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: `1px solid ${theme.darkThemeBorderColor}`,
                }}
            >
                <Box
                    component="img"
                    src="/logo-dark.png"
                    alt="Logo"
                    sx={{ height: "40px", width: "auto" }}
                />
            </Toolbar>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: "0px 15px",
                    borderRight: `1px solid ${theme.darkThemeBorderColor}`,
                }}
            >
                <GameweekSlider
                    gameweekRange={gameweekRange}
                    setGameweekRange={setGameweekRange}
                />
                <Divider sx={{ marginBottom: "8px" }} />
                <PlayerFilters
                    displayedPositions={displayedPositions}
                    setDisplayedPositions={setDisplayedPositions}
                    playerPriceRange={playerPriceRange}
                    setPlayerPriceRange={setPlayerPriceRange}
                />
                <Divider sx={{ marginTop: "15px", marginBottom: "10px" }} />
                <TeamFilter
                    displayedTeams={displayedTeams}
                    setDisplayedTeams={setDisplayedTeams}
                />
            </Box>
        </Box>
    );
}
