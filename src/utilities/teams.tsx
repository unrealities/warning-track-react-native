import Team from "./team";

export default function ConvertTeamID(mlbID: number): Team {
  const jsonTeams = require("./team.json");
  return jsonTeams[mlbID.toString()] as Team;
}
