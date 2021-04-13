import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import { ConvertGames } from './src/utilities/game';
import { GamesScreen } from './src/screens/games';
import { SettingsScreen } from './src/screens/settings';

const splashImage = require('./assets/images/wt_splash.png');
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  // TODO: Add notifications
  // https://docs.expo.io/push-notifications/overview/
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
      SplashScreen.hideAsync();
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
          <Tab.Navigator>
            <Tab.Screen name="Games">
              {props => <GamesScreen {...props} games={this.state.games} />}
            </Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  }

  _cacheSplashResourcesAsync = async () => {
    return Asset.fromModule(splashImage).downloadAsync();
  };
}
