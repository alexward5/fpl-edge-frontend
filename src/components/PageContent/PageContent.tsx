import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import Drawer from "../Drawer/Drawer";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";

import type {
    GetPlayerDataQuery,
    PlayerGameweekData,
} from "../../__generated__/graphql";

const GET_PLAYER_GAMEWEEK_DATA = gql(`
    query GetPlayerData {
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
                calc_fpl_npxp
                fbref_xg_assist
                fbref_npxg
                fpl_gameweek
            }
        }
    }
`);

function PageContent() {
    const [playerData, setPlayerData] = useState<GetPlayerDataQuery>();
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

    const { loading, data } = useQuery(GET_PLAYER_GAMEWEEK_DATA);
    useEffect(() => {
        if (data) {
            setPlayerData(data);
        }
    }, [data]);

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

    if (loading || !playerData) return <h1>Loading...</h1>;

    const numGameweeks = Math.max(
        ...playerData.players.map(
            (obj: { player_gameweek_data: PlayerGameweekData[] }) =>
                obj.player_gameweek_data.length,
        ),
    );

    const DRAWER_WIDTH = 240;

    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Drawer
                numGameweeks={numGameweeks}
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
