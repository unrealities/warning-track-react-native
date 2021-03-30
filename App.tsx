import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';

import { Game } from './game';
import { GameContainer, GameProps, PreGameContainer } from './src/components/game';

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    appIsReady: false,
    games: [],
  };

  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
  }

  prepareResources = async () => {
    try {
      let newGames: Game[];
      newGames = [];

      await GetGameDataByDay()
        .then(result => {
          if (!result || result.length == 0) {
            console.log("no games");
            return newGames;
          }

          result.map(
            game => {
              let awayScore = game.status.score.away;
              let awayTeam = convertTeamID(game.teams.away);
              let balls = game.status.count.balls;
              let base1 = game.status.baseState.First;
              let base2 = game.status.baseState.Second;
              let base3 = game.status.baseState.Third;
              let homeScore = game.status.score.home;
              let homeTeam = convertTeamID(game.teams.home);
              let inning = game.status.inning;
              let inningTop = game.status.topOfInning;
              let inProgress = game.status.inProgress;
              let leverageIndex = game.leverageIndex;
              let outs = game.status.outs;
              let strikes = game.status.count.strikes;
              let time = new Date(game.gameTime);
              let uri = game.mlbTVLink;

              let newGame = new Game(awayScore, awayTeam, balls, base1, base2, base3, homeScore, homeTeam, inning, inningTop, inProgress, leverageIndex, outs, strikes, time, uri);
              newGames.push(newGame);
            }
          );
          return newGames;
        }).then(result => this.setState({ games: result }));
    } catch (e) {
      console.warn(e);
    } finally {
      async () => {
        await SplashScreen.hideAsync();
      };
    }
  };

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.prepareResources}
          onFinish={() => this.setState({ appIsReady: true })}
          onError={console.warn}
        />
      );
    } else {
      console.log(this.state.games);
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'WarningTrack' }}/> */}
            <Stack.Screen name="Games">
              {props => <GamesScreen {...props} games={this.state.games} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }

  _cacheSplashResourcesAsync = async () => {
    const img = require('./assets/images/wt_splash.png');
    return Asset.fromModule(img).downloadAsync();
  };
}

export interface GamesProps {
  games: Game[];
}

class GamesScreen extends React.Component<GameProps> {
  constructor(props: GameProps) {
    super(props);
  }

  render() {
    let backgroundImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iIzQ0YWEwMCI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiM1NWQ0MDAiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiM1NWQ0MDAiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=';

    return (
      <View style={styles.container}>
        <ImageBackground imageStyle={styles.backgroundImg}
          source={{ uri: backgroundImg }}
          style={styles.background}>
          <GamesContainer games={this.props.games} />
        </ImageBackground>
      </View>
    );
  }
}

function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>WarningTrack</Text>
    </View>
  );
}

export interface gameDataResponseGame {
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

async function GetGameDataByDay() {
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

function convertTeamID(mlbID: number): number {
  const teams = require('./team.json');
  for (let team of teams) {
    if (team.mlb_id == mlbID) {
      return team.id;
    }
  }
  return 0;
}

export interface GamesState {
  games: Game[];
}

class GamesContainer extends React.Component<GamesProps, GamesState> {
  constructor(props: GamesProps) {
    super(props);
    this.state = { games: this.props.games };
  }

  render() {
    return (
      <View>
        { this.state.games.length > 0 ? this.state.games.map(game => game.inProgress ? <GameContainer game={game} key={game.url} /> : <PreGameContainer game={game} key={game.url} />) : <NoGames />}
      </View>
    );
  }
}

const NoGames: React.FC<{}> = (props) => {
  return (
    <View style={styles.noGamesContainer}>
      <Text style={styles.noGamesText}>No Games Today</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  backgroundImg: {
    alignItems: 'center',
    backgroundColor: '#44aa00',
    borderRadius: 0,
    resizeMode: 'repeat'
  },
  container: {
    height: '100%'
  },
  headerTxt: {
    color: '#225500',
    fontFamily: 'Lobster_400Regular',
    fontSize: 48,
    textAlign: 'center'
  },
  noGamesContainer: {
    marginTop: 20
  },
  noGamesText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  team: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
