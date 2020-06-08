export class Game {
    awayScore:number;
    awayTeam:string; // todo: should be a team object
    balls:number;
    base1:boolean;
    base2:boolean;
    base3:boolean;
    homeScore:number;
    homeTeam:string; // todo: should be a team object
    leverageIndex:number;
    outs:number;
    strikes:number;

    constructor(awayTeam:string, awayScore:number, balls:number, base1:boolean, base2:boolean, base3:boolean, 
                homeTeam:string, homeScore:number, leverageIndex:number, outs:number, strikes:number) {
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
}
