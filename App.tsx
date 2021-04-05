import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';

import { ConvertGames } from './src/utilities/game';
import { GamesScreen } from './src/screens/games';
import { HomeScreen } from './src/screens/home';

const Stack = createStackNavigator();
const splashImage = require('./assets/images/wt_splash.png');

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
      await ConvertGames()
        .then(result => this.setState({ games: result }));
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
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'WarningTrack' }}/>
            <Stack.Screen name="Games">
              {props => <GamesScreen {...props} games={this.state.games} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }

  _cacheSplashResourcesAsync = async () => {
    return Asset.fromModule(splashImage).downloadAsync();
  };
}
