import "./TableContainer.css";
import Table from "./Table.tsx";
import { useQuery, gql } from "@apollo/client";

// import { gql } from "../../src/__generated__/gql";

const GET_PLAYER_GAMEWEEK_DATA = gql(`
    query GetPlayerGameweekData {
        players {
            fpl_web_name
            fbref_team
            fpl_player_position
        }
    }
`);

function TableContainer() {
    const { loading, data } = useQuery(GET_PLAYER_GAMEWEEK_DATA);

    if (loading) return <p>Loading...</p>;

    console.log(data);

    return (
        <>
            <Table data={data.players} className="table-container" />
        </>
    );
}

export default TableContainer;
