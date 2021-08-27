import type Player from "../types/Player";

function compareNames(a: Player, b: Player) {
  if (a.first_name < b.first_name) {
    return -1;
  }
  if (a.first_name > b.first_name) {
    return 1;
  }
  return 0;
}

export default compareNames;
