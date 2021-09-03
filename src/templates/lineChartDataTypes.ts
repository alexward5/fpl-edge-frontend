import DataType from "../types/DataType";

const lineChartDataTypes: DataType[] = [
  {
    displayName: "Goals Scored",
    dataKey: "goals_scored",
    defaultFormat: "cumulative",
  },
  { displayName: "Assists", dataKey: "assists", defaultFormat: "cumulative" },
  {
    displayName: "Influence",
    dataKey: "influence",
    defaultFormat: "cumulative",
  },
  {
    displayName: "Creativity",
    dataKey: "creativity",
    defaultFormat: "cumulative",
  },
  { displayName: "Threat", dataKey: "threat", defaultFormat: "cumulative" },
  { displayName: "Bonus Points", dataKey: "bps", defaultFormat: "cumulative" },
  { displayName: "Minutes", dataKey: "minutes", defaultFormat: "cumulative" },
];

export default lineChartDataTypes;
