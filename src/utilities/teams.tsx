export function ConvertTeamID(mlbID: number): number {
  const teams = require("./team.json");
  for (let team of teams) {
    if (team.mlb_id == mlbID) {
      return team.id;
    }
  }
  return 0;
}
