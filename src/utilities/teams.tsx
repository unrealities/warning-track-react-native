import { Team } from "./team";

export function ConvertTeamID(mlbID: number): Team {
  const teams = require("./team.json");
  for (let team of teams) {
    if (team.mlb_id == mlbID) {
      let newTeam = new Team(
        team.abbreviation,
        team.hashtag,
        team.id,
        team.mlbID,
      );
      return newTeam;
    }
  }
  let blankTeam = new Team(
    "N/A",
    "",
    0,
    0,
  );
  return blankTeam;
}
