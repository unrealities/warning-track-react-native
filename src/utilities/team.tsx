export interface ITeam {
    abbreviation: string;
    hashtag: string;
    id: number;
    mlbID: number;
}

export default class Team implements ITeam {
    constructor(
        public abbreviation: string,
        public hashtag: string,
        public id: number,
        public mlbID: number,
    ) {
        this.abbreviation = abbreviation;
        this.hashtag = hashtag;
        this.id = id;
        this.mlbID = mlbID;
    }
}
