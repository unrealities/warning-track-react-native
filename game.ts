export interface IGame {
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
}

export class Game implements IGame {
    constructor(public awayScore: number,
        public awayTeam: number,
        public balls: number,
        public base1: boolean,
        public base2: boolean,
        public base3: boolean,
        public homeScore: number,
        public hometeam: number,
        public leverageIndex: number,
        public outs: number,
        public strikes: number) {

    }

    /*TODO: convert bases to baseRunner*/
}
