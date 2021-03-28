export interface IGame {
    awayScore: number;
    awayTeam: number; // todo: should be a team object
    balls: number;
    base1: boolean;
    base2: boolean;
    base3: boolean;
    homeScore: number;
    homeTeam: number; // todo: should be a team object
    inning: number;
    inningTop: boolean;
    inProgress: boolean;
    leverageIndex: number;
    outs: number;
    strikes: number;
    time: Date;
    url: string;
}

export class Game implements IGame {
    constructor(public awayScore: number,
        public awayTeam: number,
        public balls: number,
        public base1: boolean,
        public base2: boolean,
        public base3: boolean,
        public homeScore: number,
        public homeTeam: number,
        public inning: number,
        public inningTop: boolean,
        public inProgress: boolean,
        public leverageIndex: number,
        public outs: number,
        public strikes: number,
        public time: Date,
        public url: string) {
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
    }

    baseRunnerInt(): number {
        if (!this.base1 && !this.base2 && !this.base3) {       // bases empty
            return 0;
        } else if (this.base1 && !this.base2 && !this.base3) { // first base
            return 1;
        } else if (!this.base1 && this.base2 && !this.base3) { // second base
            return 2;
        } else if (!this.base1 && !this.base2 && this.base3) { // third base
            return 3;
        } else if (this.base1 && this.base2 && !this.base3) {  // first & second base
            return 4;
        } else if (this.base1 && !this.base2 && this.base3) {  // first & third base
            return 5;
        } else if (!this.base1 && this.base2 && this.base3) {  // second & third base
            return 6;
        } else {                                               // bases loaded
            return 7
        }
    }

    inningTopString(): string {
        return this.inningTop ? 'T' : 'B';
    }
}
