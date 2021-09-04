import type Player from "../types/Player";
import type DataType from "../types/DataType";
import type LineChartData from "../types/LineChartData";

/**
 * This function returns an array formatted in the way that recharts' LineChart component expects
 * Each index in the array contains an object that represents a single gameweek
 * That object contains one key for the gameweek/round number, and an optional key for each selected player
 *
 * If Salah and Kane are selected, the array would look like this:
 *  [
 *    {
 *      round: 1,
 *      Salah: <Salah's GW1 goal count>,
 *      Kane: <Kane's GW1 goal count>
 *    },
 *    {
 *      round: 2,
 *      Salah: <Salah's GW2 goal count>,
 *      Kane: <Kane's GW2 goal count>
 *    },
 *    etc.
 *  ]
 */
function formatLineChartData(
  gameweekStart: number,
  gameweekEnd: number,
  data: {
    players: Player[] | [];
  },
  dataType: DataType
): LineChartData[] | [] {
  // Array to hold gameweek data for selected players
  const formattedData: LineChartData[] | [] = [];

  // For each selected round/gameweek, e.g. 1..38, create an index in the chart data array
  // Each index is initialized with an object containing the round/gameweek number
  for (let i = gameweekStart; i <= gameweekEnd; i++) {
    // Gameweek 1 is in index 0, gameweek 2 is in index 1, etc.
    formattedData[i - 1] = { round: i };
  }

  const rawGameweekData = data?.players ?? [];

  // The defaultFormat for each data type can either be "weekly" or "cumulative"
  rawGameweekData.forEach((player: Player) => {
    // Keep track of running total for the selected stat for cumulative format
    let sum = 0;
    (player?.player_gameweek_data ?? []).forEach((gameweek) => {
      if (typeof gameweek[dataType.dataKey] === "number") {
        sum = sum + (gameweek[dataType.dataKey] as number);
      }
      // Add the player-specific data to the appropriate index in the array
      formattedData[gameweek.round - 1][player.second_name] =
        dataType.defaultFormat === "cumulative"
          ? sum
          : gameweek[dataType.dataKey];
    });
  });

  return formattedData;
}

export default formatLineChartData;
