import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

import { ConvertGames, Game } from "./src/utilities/game";
import { GamesScreen } from "./src/screens/games";
import { NotificationsScreen } from "./src/screens/notifications";
import { SettingsScreen } from "./src/screens/settings";

const splashImage = require("./assets/images/wt_splash.png");
const Tab = createBottomTabNavigator();

// TODO: 
// Need to setup sign to allow customization of app and alerts
// https://blog.expo.dev/firebase-github-authentication-with-react-native-2543e32697b4
// https://docs.expo.dev/versions/latest/sdk/auth-session/
// https://docs.expo.dev/guides/authentication/#google
// https://raw.githubusercontent.com/sakshampuri/ms-monorepo/e1c0aab01422c9e79bf5b8bc4dc6b9d9fbe60eab/app/src/Components/index.ts

WebBrowser.maybeCompleteAuthSession();

// TODO: issues with this being a class and not a function
interface AppState {
  appIsReady: boolean;
  games: Game[];
}
export default class App extends React.Component<{},AppState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      appIsReady: false,
      games: [],
    };
    this.fetchGames = this.fetchGames.bind(this)
  }

  componentDidMount = async () => {
    let FETCH_DELAY_MS = 30000;
    await preventAutoHideAsync().catch((e) => console.warn(e));
    await this.fetchGames()
    await hideAsync().catch((e) => console.warn(e.toString()));
    setInterval(this.fetchGames, FETCH_DELAY_MS);
  };

  async fetchGames() {
    ConvertGames().then(games => {
      this.setState({ games: games });
    });
  }

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.fetchGames}
          onFinish={() => this.setState({ appIsReady: true })}
          onError={(e) => console.warn(e.toString())}
        />
      );
    } else {
      return (
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeBackgroundColor: "#ede5ca",
              activeTintColor: "#593811",
              labelStyle: {
                color: "#63513c",
                fontSize: 18,
                fontWeight: "400",
              },
              style: {
                backgroundColor: "#ece2c2",
                borderTopColor: "#63513c",
                borderTopWidth: 3,
              }
            }}
          >
            <Tab.Screen
              name="Games"
              options={{
                tabBarLabel: "Games",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="baseball-outline" color={"#63513c"} size={24} />
                ),
              }}
            >
              {(props) => <GamesScreen {...props} games={this.state.games} />}
            </Tab.Screen>
            <Tab.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{
                tabBarLabel: "Notification Test",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="alert-circle-outline" size={24} color={"#63513c"} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="construct-outline" size={24} color={"#63513c"} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  }

  _cacheSplashResourcesAsync = async () => {
    return Asset.fromModule(splashImage).downloadAsync();
  };
}
