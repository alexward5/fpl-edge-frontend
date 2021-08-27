import { useState, Dispatch, SetStateAction } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import type Player from "../../types/Player";

function PlayerListSelect({
  sortedPlayers,
  setSelectedPlayers,
}: {
  sortedPlayers: Player[];
  setSelectedPlayers: Dispatch<SetStateAction<Player[] | []>>;
}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      onChange={(event, newValue: Player | null) => {
        if (newValue) {
          setSelectedPlayers((prevSelectedPlayers: Player[]) => [
            ...prevSelectedPlayers,
            newValue,
          ]);
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
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
  );
}

export default PlayerListSelect;
