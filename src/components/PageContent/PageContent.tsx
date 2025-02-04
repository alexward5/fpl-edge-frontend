import { useState } from "react";
// import "./Body.css";
import { useQuery, gql } from "@apollo/client";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import Drawer from "../Drawer/Drawer";
import TableContainer from "../TableContainer/TableContainer";

interface DisplayedData {
    fpl_player_code: string;
    fpl_web_name: string;
    fbref_team: string;
    fpl_player_position: string;
    fpl_player_cost: number;
    fpl_selected_by_percent: number;
    minutes: number;
    sumNPxG: number;
    sumxA: number;
    sumNPxP: number;
}

const GET_PLAYER_GAMEWEEK_DATA = gql(`
    query GetPlayerGameweekData {
        players {
            fpl_player_code
            fpl_web_name
            fbref_team
            fpl_player_position
            fpl_player_cost
            fpl_selected_by_percent
            player_gameweek_data {
                round
                minutes
                calc_fpl_npxp
                fbref_xg_assist
                fbref_npxg
            }
        }
    }
`);

function PageContent() {
    const { loading, data } = useQuery(GET_PLAYER_GAMEWEEK_DATA);

    const [gameweekRange, setGameweekRange] = useState<number[]>([1, 1]);
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

    if (loading) return <h1>Loading...</h1>;

    const numGameweeks = Math.max(
        ...data.players.map(
            (obj: { player_gameweek_data: any }) =>
                obj.player_gameweek_data.length,
        ),
    );

    const displayedData: DisplayedData[] = data.players.map((player: any) => {
        // Sum player expected stats from gameweek range
        let sumMinutes = 0;
        let sumNPxG = 0;
        let sumxA = 0;
        let sumNPxP = 0;
        player.player_gameweek_data.forEach((data: any) => {
            if (
                data.round >= gameweekRange[0] &&
                data.round <= gameweekRange[1]
            ) {
                sumMinutes += data.minutes;
                sumNPxG += data.fbref_npxg;
                sumxA += data.fbref_xg_assist;
                sumNPxP += data.calc_fpl_npxp;
            }
        });

        return {
            fpl_player_code: player.fpl_player_code,
            fpl_web_name: player.fpl_web_name,
            fbref_team: player.fbref_team,
            fpl_player_position: player.fpl_player_position,
            fpl_player_cost: player.fpl_player_cost,
            fpl_selected_by_percent: player.fpl_selected_by_percent,
            sumMinutes: sumMinutes,
            sumNPxG: sumNPxG,
            sumxA: sumxA,
            sumNPxP: sumNPxP,
        };
    });

    return (
        <Box sx={{ display: "flex" }}>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Drawer
                numGameweeks={numGameweeks}
                gameweekRange={gameweekRange}
                setGameweekRange={setGameweekRange}
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
            />
            <TableContainer loading={loading} displayedData={displayedData} />
        </Box>
    );
}

export default PageContent;
