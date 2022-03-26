import { ConvertTeamID } from "./teams";
import { Team } from "./team";
import { GetGameDataByDay, GameDataResponseGame } from "../../src/services/getGameDataByDay";

export interface IGame {
  awayScore: number;
  awayTeam: Team;
  balls: number;
  base1: boolean;
  base2: boolean;
  base3: boolean;
  homeScore: number;
  homeTeam: Team;
  inning: number;
  inningTop: boolean;
  inProgress: boolean;
  leverageIndex: number;
  outs: number;
  strikes: number;
  time: Date;
  url: string;
  viewType: string;
}

export class Game implements IGame {
  constructor(
    public awayScore: number,
    public awayTeam: Team,
    public balls: number,
    public base1: boolean,
    public base2: boolean,
    public base3: boolean,
    public homeScore: number,
    public homeTeam: Team,
    public inning: number,
    public inningTop: boolean,
    public inProgress: boolean,
    public leverageIndex: number,
    public outs: number,
    public strikes: number,
    public time: Date,
    public url: string,
    public viewType: string,
  ) {
    this.awayScore = awayScore;
    this.awayTeam = awayTeam;
    this.balls = balls;
    this.base1 = base1;
    this.base2 = base2;
    this.base3 = base3;
    this.homeScore = homeScore;
    this.homeTeam = homeTeam;
    this.inning = inning;
    this.inningTop = inningTop;
    this.inProgress = inProgress;
    this.leverageIndex = leverageIndex;
    this.outs = outs;
    this.strikes = strikes;
    this.time = time;
    this.url = url;
    this.viewType = viewType;
  }

  baseRunnerInt(): number {
    if (!this.base1 && !this.base2 && !this.base3) {
      // bases empty
      return 0;
    } else if (this.base1 && !this.base2 && !this.base3) {
      // first base
      return 1;
    } else if (!this.base1 && this.base2 && !this.base3) {
      // second base
      return 2;
    } else if (!this.base1 && !this.base2 && this.base3) {
      // third base
      return 3;
    } else if (this.base1 && this.base2 && !this.base3) {
      // first & second base
      return 4;
    } else if (this.base1 && !this.base2 && this.base3) {
      // first & third base
      return 5;
    } else if (!this.base1 && this.base2 && this.base3) {
      // second & third base
      return 6;
    } else {
      // bases loaded
      return 7;
    }
  }

  inningTopString(): string {
    return this.inningTop ? "T" : "B";
  }
}

export async function ConvertGames() {
  let newGames: Game[];
  newGames = [];

  function viewTypeString(game: GameDataResponseGame): string {
    if (game.status.inProgress) {
      return 'live';
    }
    return (game.status.score.away > 0 || game.status.score.home > 0) ? 'post' : 'pre';
  }

  try {
    return await GetGameDataByDay().then((result) => {
      console.log(result);
      if (!result) {
        return newGames;
      }

      if (result instanceof Array) {
        result.map((game: GameDataResponseGame) => {
          let awayScore = game.status.score.away;
          let awayTeam = ConvertTeamID(game.teams.away);
          let balls = game.status.count.balls;
          let base1 = game.status.baseState.First;
          let base2 = game.status.baseState.Second;
          let base3 = game.status.baseState.Third;
          let homeScore = game.status.score.home;
          let homeTeam = ConvertTeamID(game.teams.home);
          let inning = game.status.inning;
          let inningTop = game.status.topOfInning;
          let inProgress = game.status.inProgress;
          let leverageIndex = game.leverageIndex;
          let outs = game.status.outs;
          let strikes = game.status.count.strikes;
          let time = new Date(game.gameTime);
          let uri = game.mlbTVLink;
          let viewType = viewTypeString(game);

          let newGame = new Game(
            awayScore,
            awayTeam,
            balls,
            base1,
            base2,
            base3,
            homeScore,
            homeTeam,
            inning,
            inningTop,
            inProgress,
            leverageIndex,
            outs,
            strikes,
            time,
            uri,
            viewType
          );
          newGames.push(newGame);
        });
      }
      
      return newGames;
    });
  } catch (e) {
    return newGames;
  }
}
