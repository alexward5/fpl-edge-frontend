import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./PlayerLineChartTools.css";
import PlayerListSelect from "../PlayerListDropdown/PlayerListSelect";
import DataTypeSelect from "../../components/DataTypeSelect/DataTypeSelect";
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

  // Sort the players list by first name in ascending order
  const sortedPlayers = data.players.slice().sort(compareNames);

  return (
    <div className="playerLineChartTools">
      <div className="playerLineChartOptions">
        <PlayerListSelect
          sortedPlayers={sortedPlayers}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />
        <DataTypeSelect
          dataType={dataType}
          setDataType={setDataType}
          lineChartDataTypes={lineChartDataTypes}
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
