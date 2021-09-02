import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useQuery, gql } from "@apollo/client";
import type Player from "../../types/Player";
import type DataType from "../../types/DataType";

const lineColors = ["#8884d8", "#10b54d", "#fc5d68"];

function PlayerLineChart({
  selectedPlayers,
  dataType,
  gameweekStart,
  gameweekEnd,
}: {
  selectedPlayers: Player[] | [];
  dataType: DataType;
  gameweekStart: number;
  gameweekEnd: number;
}) {
  // Array to hold data that will be passed into recharts LineChart component
  const chartDataArray: any[] = [];

  /**
   * For each selected round/gameweek, e.g. 1..38, create an index in the chart data array
   * Each index is initialized with an object containing the round/gameweek number
   */
  for (let i = gameweekStart; i <= gameweekEnd; i++) {
    // Gameweek 1 is in index 0, gameweek 2 is in index 1, etc.
    chartDataArray[i - 1] = { round: i };
  }

  const { data } = useQuery(
    gql`
      query GetSelectedPlayersData($ids: [Int!]!) {
        players(ids: $ids) {
          first_name
          second_name
          player_gameweek_data {
            round
            goals_scored
            assists
            bps
          }
        }
      }
    `,
    {
      variables: {
        // Pass array of ids for the selected players
        ids: selectedPlayers.map((selectedPlayer) => selectedPlayer.id),
      },
      // Only run query when there is at least one player selected
      skip: !selectedPlayers.length,
    }
  );

  // TODO: CLEAN THIS UP
  if (data?.players?.length) {
    data.players.forEach((playerData: Player) => {
      playerData?.player_gameweek_data &&
        playerData.player_gameweek_data.forEach((gameweekData) => {
          chartDataArray[gameweekData.round - 1][playerData.second_name] =
            gameweekData[dataType.dataKey];
        });
    });
  }

  return (
    <LineChart
      width={1100}
      height={650}
      data={chartDataArray ?? []}
      margin={{
        top: 10,
        right: 40,
        left: -20,
        bottom: 10,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="round" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Legend />
      {selectedPlayers.map((selectedPlayer, index) => (
        <Line
          key={selectedPlayer.id}
          type="monotone"
          dataKey={selectedPlayer.second_name}
          stroke={lineColors[index]}
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      ))}
    </LineChart>
  );
}

export default PlayerLineChart;
