import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./PlayerLineChartTools.css";
import PlayerListSelect from "../PlayerListDropdown/PlayerListSelect";
import PlayerLineChart from "../PlayerLineChart/PlayerLineChart";
import compareNames from "../../helpers/compareNames";
import lineChartDataTypes from "../../templates/lineChartDataTypes";
import type Player from "../../types/Player";
import type DataType from "../../types/DataType";

const gameweekStart = 1;
const gameweekEnd = 38;

function PlayerLineChartTools() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[] | []>([]);
  const [dataType, setDataType] = useState<DataType>(lineChartDataTypes[0]);

  const { loading, data } = useQuery(
    gql`
      query GetPlayerList {
        players {
          id
          first_name
          second_name
        }
      }
    `
  );

  if (loading) return <CircularProgress size={50} />;

  // Sort the players list by first name
  const sortedPlayers = data.players.slice().sort(compareNames);

  return (
    <div className="playerLineChartTools">
      <div className="playerLineChartOptions">
        <PlayerListSelect
          sortedPlayers={sortedPlayers}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />
        <Autocomplete
          onChange={(event, newValue: DataType | null) => {
            if (newValue) setDataType(newValue);
          }}
          id="data-fields-autocomplete"
          options={lineChartDataTypes}
          getOptionLabel={(option) => option.displayName}
          style={{ width: 250 }}
          renderInput={(params) => (
            <TextField {...params} label="Data Type" variant="outlined" />
          )}
        />
      </div>
      <PlayerLineChart
        selectedPlayers={selectedPlayers}
        dataType={dataType}
        gameweekStart={gameweekStart}
        gameweekEnd={gameweekEnd}
      />
    </div>
  );
}

export default PlayerLineChartTools;
