export interface Game {
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

/*TODO: convert bases to baseRunner*/
