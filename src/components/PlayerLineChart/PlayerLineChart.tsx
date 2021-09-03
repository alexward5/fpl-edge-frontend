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
import formatLineChartData from "../../helpers/formatLineChartData";
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
            influence
            creativity
            threat
            bps
            minutes
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

  const formattedData = formatLineChartData(
    gameweekStart,
    gameweekEnd,
    data,
    dataType
  );

  return (
    <LineChart
      width={1000}
      height={600}
      data={formattedData ?? []}
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
