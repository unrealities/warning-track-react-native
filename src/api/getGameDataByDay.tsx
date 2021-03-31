interface gameDataResponseGame {
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
    // https://us-central1-warning-track-backend.cloudfunctions.net/GetGameDataByDay
    const functionName = 'GetGameDataByDay';
    const projectName = 'warning-track-backend';
    const region = 'us-central1';
    const url = 'https://' + region + '-' + projectName + '.cloudfunctions.net/' + functionName;


    // TODO: If no games on the date may give error
    let d = new Date();
    let rDate = [
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2),
        d.getFullYear()
    ].join('-');

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { date: rDate } })
    };

    return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data['games'];
        })
        .catch(error => {
            console.log(`error: ${JSON.stringify(error)}`);
            console.log(`error: ${error.stack}`)
        });
}
