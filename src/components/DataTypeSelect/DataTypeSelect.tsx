import { Dispatch, SetStateAction } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DataType from "../../types/DataType";

function DataTypesSelect({
  dataType,
  setDataType,
  lineChartDataTypes,
}: {
  dataType: DataType;
  setDataType: Dispatch<SetStateAction<DataType>>;
  lineChartDataTypes: DataType[];
}) {
  return (
    <FormControl variant="outlined">
      <InputLabel id="data-type-select-label">Data Type</InputLabel>
      <Select
        labelId="data-type-select-label"
        id="data-type-selectd"
        value={dataType.dataKey}
        onChange={(event: SelectChangeEvent<string>) => {
          // Not able to use an object as select value with Material UI
          // So instead use a string and find the corresponding DataType object when we need to update the parent component's state
          const foundType = lineChartDataTypes.find(
            (lineChartDataType) =>
              lineChartDataType.dataKey === (event.target.value as string)
          );
          if (foundType) setDataType(foundType);
        }}
        label="Data Type"
        style={{ width: 250 }}
      >
        {lineChartDataTypes.map((lineChartDataType) => (
          <MenuItem
            key={lineChartDataType.dataKey}
            value={lineChartDataType.dataKey}
          >
            {lineChartDataType.displayName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DataTypesSelect;
