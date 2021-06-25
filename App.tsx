import React from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { Ionicons } from '@expo/vector-icons';

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
      .catch((e) =>
        Alert.alert("prepareResources Error", "ConvertGames catch", [
          { text: e.toString() },
        ])
      );
    await hideAsync().catch((e) =>
      Alert.alert("prepareResources Error", "hideAsync catch", [
        { text: e.toString() },
      ])
    );
  };

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.prepareResources}
          onFinish={() => this.setState({ appIsReady: true })}
          onError={(e) =>
            Alert.alert("AppLoading Error", "onError catch", [
              { text: e.toString() },
            ])
          }
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
              options={{
                tabBarLabel: "Notification Test",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="md-checkmark-circle" size={32} color="green" />
                ),
              }}
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
