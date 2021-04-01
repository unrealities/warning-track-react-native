import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';

import { Game } from './game';
import { GamesScreen } from './src/screens/games';
// import { HomeScreen } from './src/screens/home';

import { ConvertTeamID } from './src/utilities/teams';
import { GetGameDataByDay } from './src/api/getGameDataByDay';

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    appIsReady: false,
    games: [],
  };

  async componentDidMount() {
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
            return newGames;
          }

          result.map(
            game => {
              let awayScore = game.status.score.away;
              let awayTeam = ConvertTeamID(game.teams.away);
              let balls = game.status.count.balls;
              let base1 = game.status.baseState.First;
              let base2 = game.status.baseState.Second;
              let base3 = game.status.baseState.Third;
              let homeScore = game.status.score.home;
              let homeTeam = ConvertTeamID(game.teams.home);
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
