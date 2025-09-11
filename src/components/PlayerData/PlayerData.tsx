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
            fpl_player_code
            fpl_web_name
            fbref_team
            fpl_player_position
            fpl_player_cost
            fpl_selected_by_percent
            player_gameweek_data {
                fbref_round
                fbref_minutes
                fbref_npxg
                fpl_gameweek
                fpl_total_points
                fpl_goals_scored
                fpl_assists
                fpl_bps
                fpl_clean_sheet
                fpl_defensive_contribution
                calc_fpl_npxp
                fbref_xg_assist
            }
        }
        teams {
            fbref_team
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
            const teamNames = data.teams.map((team) => team.fbref_team);
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
