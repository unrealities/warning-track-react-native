import React from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

import { ConvertGames } from "./src/utilities/game";
import { GamesScreen } from "./src/screens/games";
import { NotificationsScreen } from "./src/screens/notifications";
import { SettingsScreen } from "./src/screens/settings";

const splashImage = require("./assets/images/wt_splash.png");
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  state = {
    appIsReady: false,
    games: [],
  };

  componentDidMount = async () => {
    await preventAutoHideAsync().catch((e) => console.warn(e));
  };

  prepareResources = async () => {
    await ConvertGames()
      .then((result) => this.setState({ games: result }))
      .catch((e) => console.warn(e));
    await hideAsync().catch((e) => Alert.alert(
      'prepareResources Error',
      'hideAsync catch',
      [{ text: e }]
    ));
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
              {(props) => <GamesScreen {...props} games={this.state.games} />}
            </Tab.Screen>
            <Tab.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ title: "Notification Test" }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "Settings" }}
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
