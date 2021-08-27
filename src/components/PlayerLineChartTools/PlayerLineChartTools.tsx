import "./PlayerLineChartTools.css";
import { useQuery, gql } from "@apollo/client";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PlayerLineChart from "../PlayerLineChart/PlayerLineChart";
import compareNames from "../../helpers/compareNames";
import type Player from "../../types/Player";

const top10Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
];

function PlayerLineChartTools() {
  const { loading, data } = useQuery(
    gql`
      query GetPlayerList {
        players {
          id
          first_name
          second_name
        }
      }
    `,
    { variables: { ids: [] } }
  );

  if (loading || !data.players.length) return <CircularProgress size={50} />;

  const sortedPlayers = data.players.slice().sort(compareNames);

  return (
    <div className="playerLineChartTools">
      <Autocomplete
        id="player-list-autocomplete"
        options={sortedPlayers}
        getOptionLabel={(option: Player) =>
          `${option.first_name} ${option.second_name}`
        }
        style={{ width: 250 }}
        renderInput={(params) => (
          <TextField {...params} label="Select Player" variant="outlined" />
        )}
      />
      <PlayerLineChart />
      <Autocomplete
        id="data-fields-autocomplete"
        options={top10Films}
        getOptionLabel={(option) => option.title}
        style={{ width: 250 }}
        renderInput={(params) => (
          <TextField {...params} label="Select Data Type" variant="outlined" />
        )}
      />
    </div>
  );
}

export default PlayerLineChartTools;
