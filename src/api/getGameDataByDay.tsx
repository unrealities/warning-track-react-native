interface GameDataResponseGame {
    gameTime: string;
    leverageIndex: number;
    mlbID: number;
    mlbTVLink: string;
    status: {
        baseState: {
            First: boolean;
            Second: boolean;
            Third: boolean;
        };
        count: {
            balls: number;
            strikes: number;
        };
        inning: number;
        inProgress: boolean;
        outs: number;
        score: {
            away: number;
            home: number;
        },
        topOfInning: boolean;
    };
    teams: {
        away: number;
        home: number;
    };
}

export async function GetGameDataByDay() {
    const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { date: getGameDataByDayDate() } })
    };

    return await fetch(getGameDataByDayURI(), requestOptions)
        .then(response => response.json())
        .then(data => {
            return data['games'];
        })
        .catch(error => {
            console.log(`error: ${JSON.stringify(error)}`);
            console.log(`error: ${error.stack}`)
        });
}

// ex. 04-23-2021
function getGameDataByDayDate() {
    let d = new Date();
    let rDate = [
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2),
        d.getFullYear()
    ].join('-');
    return rDate;
}

// https://us-central1-warning-track-backend.cloudfunctions.net/GetGameDataByDay
function getGameDataByDayURI() {
    const functionName = 'GetGameDataByDay';
    const projectName = 'warning-track-backend';
    const region = 'us-central1';
    const uri = 'https://' + region + '-' + projectName + '.cloudfunctions.net/' + functionName;
    return uri;
}
