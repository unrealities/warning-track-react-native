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
              }
            }}
          >
            <Tab.Screen 
              name="Games"
              options={{
                tabBarLabel: "Games",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="baseball-outline" size={24} color={"#63513c"} />
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
