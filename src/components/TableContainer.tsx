import "./TableContainer.css";
import Table from "./Table.tsx";
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

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className="table-container">
                <Table data={data.players} />
            </div>
        </>
    );
}

export default TableContainer;
