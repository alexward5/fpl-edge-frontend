import { Dispatch, SetStateAction } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import type Player from "../../types/Player";

// Temporary max number of players to display on chart, to be removed after further development
const MAX_PLAYERS = 3;

function PlayerListSelect({
  sortedPlayers,
  selectedPlayers,
  setSelectedPlayers,
}: {
  sortedPlayers: Player[];
  selectedPlayers: Player[] | [];
  setSelectedPlayers: Dispatch<SetStateAction<Player[] | []>>;
}) {
  return (
    <Autocomplete
      onChange={(event, newValue: Player | null) => {
        // Check that a player's name has been selected and the player is not already in selectedPlayers
        if (
          newValue &&
          !selectedPlayers.find((player) => player.id === newValue.id)
        ) {
          // When player is selected, add them to the parent component's selectedPlayers state
          setSelectedPlayers((prevSelectedPlayers: Player[]) => [
            ...prevSelectedPlayers,
            newValue,
          ]);
        }
      }}
      id="player-list-autocomplete"
      options={sortedPlayers}
      getOptionLabel={(option: Player) =>
        `${option.first_name} ${option.second_name}`
      }
      style={{ width: 250 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Player to Add"
          variant="outlined"
        />
      )}
      disabled={selectedPlayers.length === MAX_PLAYERS}
    />
  );
}

export default PlayerListSelect;
