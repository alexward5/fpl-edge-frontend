import type Player from "../types/Player";
import type DataType from "../types/DataType";
import type LineChartData from "../types/LineChartData";

function formatLineChartData(
  gameweekStart: number,
  gameweekEnd: number,
  data: {
    players: Player[] | [];
  },
  dataType: DataType
) {
  // Array to hold data that will be passed into recharts LineChart component
  const formattedData: LineChartData[] | [] = [];

  // For each selected round/gameweek, e.g. 1..38, create an index in the chart data array
  // Each index is initialized with an object containing the round/gameweek number
  for (let i = gameweekStart; i <= gameweekEnd; i++) {
    // Gameweek 1 is in index 0, gameweek 2 is in index 1, etc.
    formattedData[i - 1] = { round: i };
  }

  // TODO: CLEAN THIS UP
  if (data?.players?.length) {
    data.players.forEach((playerData: Player) => {
      playerData?.player_gameweek_data &&
        playerData.player_gameweek_data.forEach((gameweek) => {
          formattedData[gameweek.round - 1][playerData.second_name] =
            gameweek[dataType.dataKey];
        });
    });
  }

  return formattedData;
}

export default formatLineChartData;
