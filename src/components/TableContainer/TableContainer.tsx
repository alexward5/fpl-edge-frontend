import { useState } from "react";
import "./TableContainer.css";
import Table from "../Table/Table.tsx";
import TableControls from "../TableControls/TableControls.tsx";
import { useQuery, gql } from "@apollo/client";

// import { gql } from "../../src/__generated__/gql";

interface DisplayedData {
    fpl_player_code: string;
    fpl_web_name: string;
    fbref_team: string;
    fpl_player_position: string;
    fpl_player_cost: number;
    fpl_selected_by_percent: number;
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
                calc_fpl_npxp
                fbref_xg_assist
                fbref_npxg
            }
        }
    }
`);

function TableContainer() {
    const { loading, data } = useQuery(GET_PLAYER_GAMEWEEK_DATA);

    const [gameweekRange, setGameweekRange] = useState<number[]>([1, 24]);

    if (loading) return <h1>Loading...</h1>;

    const displayedData: DisplayedData[] = data.players.map((player: any) => {
        // Sum player expected stats from gameweek range
        let sumNPxG = 0;
        let sumxA = 0;
        let sumNPxP = 0;
        player.player_gameweek_data.forEach((data: any) => {
            if (
                data.round >= gameweekRange[0] &&
                data.round <= gameweekRange[1]
            ) {
                sumNPxG += data.calc_fpl_npxp;
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
            sumNPxG: sumNPxG,
            sumxA: sumxA,
            sumNPxP: sumNPxP,
        };
    });

    console.log(displayedData);

    return (
        <div style={{ height: "600px", width: "90%" }}>
            <TableControls
                gameweekRange={gameweekRange}
                setGameweekRange={setGameweekRange}
            />
            <Table data={displayedData} />
        </div>
    );
}

export default TableContainer;
