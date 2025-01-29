import { useState } from "react";
import "./TableContainer.css";
import Table from "../Table/Table.tsx";
import TableControls from "../TableControls/TableControls.tsx";
import { useQuery, gql } from "@apollo/client";

// import { gql } from "../../src/__generated__/gql";

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

    return (
        <div style={{ height: "600px", width: "90%" }}>
            <TableControls
                gameweekRange={gameweekRange}
                setGameweekRange={setGameweekRange}
            />
            <Table data={data.players} />
        </div>
    );
}

export default TableContainer;
