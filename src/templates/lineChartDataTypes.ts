import DataType from "../types/DataType";

const lineChartDataTypes: DataType[] = [
  {
    displayName: "Goals Scored",
    dataKey: "goals_scored",
    defaultFormat: "cumulative",
  },
  { displayName: "Assists", dataKey: "assists", defaultFormat: "cumulative" },
  { displayName: "Bonus Points", dataKey: "bps", defaultFormat: "weekly" },
];

export default lineChartDataTypes;
