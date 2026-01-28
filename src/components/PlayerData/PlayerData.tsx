import { useState, useEffect, useRef } from "react";
import { gql } from "../../__generated__/gql";
import { DataProvider } from "../../contexts/DataContext";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";
import PlayerDataDrawer from "../PlayerDataDrawer/PlayerDataDrawer";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@apollo/client";

const GET_PLAYER_DATA = gql(`
    query GetData {
        players {
            fpl_player_id
            fpl_web_name
            fpl_team_name
            fpl_player_position
            fpl_player_cost
            fpl_selected_by_percent
            player_gameweek_data {
                fpl_minutes
                fpl_round
                fpl_total_points
                fpl_goals_scored
                fpl_assists
                fpl_bps
                fpl_clean_sheet
                fpl_defensive_contribution
                fpl_expected_goals
                fpl_expected_assists
                fpl_xgi
                sm_shots_on_target
                sm_big_chances_created
                sm_key_passes
                calc_xgap
            }
        }
        teams {
            name
        }
        events {
            id
            is_current
            finished
        }
    }
`);

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

    const dataLoaded = useRef(false);
    const { loading, data } = useQuery(GET_PLAYER_DATA);
    useEffect(() => {
        let playersLoaded = false;
        let teamsLoaded = false;
        let gameweeksLoaded = false;

        if (data?.players) {
            const playerCosts = data.players.map((p) => p.fpl_player_cost);
            const maxPrice = Math.max(...playerCosts).toFixed(1);
            const minPrice = Math.min(...playerCosts).toFixed(1);
            setPlayerPriceRange([String(minPrice), String(maxPrice)]);
            playersLoaded = true;
        }
        if (data?.teams) {
            const teamNames = data.teams.map((team) => team.name);
            setDisplayedTeams(teamNames);
            teamsLoaded = true;
        }
        if (data?.events) {
            const numGameweeks = data.events.filter(
                (event) => event.finished || event.is_current,
            ).length;
            setGameweekRange([1, numGameweeks]);
            gameweeksLoaded = true;
        }

        if (playersLoaded && teamsLoaded && gameweeksLoaded) {
            dataLoaded.current = true;
        }
    }, [data]);

    const theme = useTheme();

    if (loading || !data?.players || !dataLoaded.current)
        return <LoadingIndicator />;

    return (
        <DataProvider value={data}>
            <Fade in={true} timeout={500}>
                <Box
                    sx={{
                        height: {
                            xs: "auto",
                            md: `calc(100% - ${theme.appBarHeightMd})`,
                        },
                        minHeight: {
                            xs: `calc(100vh - ${theme.appBarHeightXs})`,
                            md: "auto",
                        },
                        mt: {
                            xs: 0,
                            md: theme.appBarHeightMd,
                        },
                        width: { md: `calc(100% - ${theme.drawerWidth})` },
                        ml: { md: `${theme.drawerWidth}` },
                    }}
                >
                    <PlayerDataTable
                        displayedPositions={displayedPositions}
                        displayedTeams={displayedTeams}
                        playerPriceRange={playerPriceRange}
                        gameweekRange={gameweekRange}
                    />
                </Box>
            </Fade>
            <PlayerDataDrawer
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
        </DataProvider>
    );
}
