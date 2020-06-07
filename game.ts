export class Game {
    awayScore:number;
    awayTeam:string; // todo: should be a team object
    homeScore:number;
    homeTeam:string; // todo: should be a team object
    outs:number;

    constructor(awayTeam:string, awayScore:number, homeTeam:string, homeScore:number, outs:number) {
        this.awayScore = awayScore
        this.awayTeam = awayTeam
        this.homeScore = homeScore
        this.homeTeam = homeTeam
        this.outs = outs
    }
}
