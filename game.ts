export class Game {
    awayScore: number;
    awayTeam: number; // todo: should be a team object
    balls: number;
    base1: boolean;
    base2: boolean;
    base3: boolean;
    homeScore: number;
    homeTeam: number; // todo: should be a team object
    leverageIndex: number;
    outs: number;
    strikes: number;

    constructor(awayTeam: number, awayScore: number, balls: number, base1: boolean, base2: boolean, base3: boolean, 
                homeTeam: number, homeScore: number, leverageIndex: number, outs: number, strikes: number) {
        this.awayScore = awayScore
        this.awayTeam = awayTeam
        this.balls = balls
        this.base1= base1
        this.base2= base2
        this.base3= base3
        this.homeScore = homeScore
        this.homeTeam = homeTeam
        this.leverageIndex = leverageIndex
        this.outs = outs
        this.strikes = strikes
    }

    /*TODO: convert bases to baseRunner*/
}
