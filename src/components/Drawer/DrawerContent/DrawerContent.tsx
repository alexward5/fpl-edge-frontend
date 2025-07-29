import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import GameweekSlider from "./GameweekSlider/GameweekSlider";
import { gql } from "../../../__generated__/gql";
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

const GET_TEAM_DATA = gql(`
    query GetTeamNames {
        teams {
            fbref_team
        }
    }
`);

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

    const [teamNames, setTeamNames] = useState<string[]>([]);

    const { data } = useQuery(GET_TEAM_DATA);
    useEffect(() => {
        if (data?.teams) {
            const sortedTeamNames = data.teams
                .map((team) => team.fbref_team)
                .sort((a, b) => a.localeCompare(b));
            setTeamNames(sortedTeamNames);
            setDisplayedTeams(sortedTeamNames);
        }
    }, [data]);

    const handleChangeMinPrice = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newValue = event.target.value;
        const digitCount = newValue.replace(/\D/g, "").length;

        // Check that input is valid float and is three digits or less
        if (/^$|^\d*\.?\d*$/.test(newValue) && digitCount <= 3) {
            setPlayerPriceRange([newValue, playerPriceRange[1]]);
        }
    };

    const handleChangeMaxPrice = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newValue = event.target.value;
        const digitCount = newValue.replace(/\D/g, "").length;

        // Check that input is valid float and is three digits or less
        if (/^$|^\d*\.?\d*$/.test(newValue) && digitCount <= 3) {
            setPlayerPriceRange([playerPriceRange[0], newValue]);
        }
    };

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

                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                }}
            >
                <GameweekSlider
                    gameweekRange={gameweekRange}
                    setGameweekRange={setGameweekRange}
                />
                <Divider />
                <PlayerFilters
                    displayedPositions={displayedPositions}
                    setDisplayedPositions={setDisplayedPositions}
                    playerPriceRange={playerPriceRange}
                    handleChangeMinPrice={handleChangeMinPrice}
                    handleChangeMaxPrice={handleChangeMaxPrice}
                />
                <Divider />
                <TeamFilter
                    teamNames={teamNames}
                    displayedTeams={displayedTeams}
                    setDisplayedTeams={setDisplayedTeams}
                />
            </Box>
        </Box>
    );
}
