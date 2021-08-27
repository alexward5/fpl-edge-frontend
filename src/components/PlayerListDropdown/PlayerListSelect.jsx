import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import type Player from "../../types/Player";

function PlayerListSelect(props) {
  const { sortedPlayers } = props;

  return (
    <Autocomplete
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
