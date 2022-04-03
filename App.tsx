import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

import { ConvertGames, Game } from "./src/utilities/game";
import GamesScreen from "./src/screens/games";
import { NotificationsScreen } from "./src/screens/notifications";
import { SettingsScreen } from "./src/screens/settings";

const Tab = createBottomTabNavigator();

// TODO: 
// Need to setup sign to allow customization of app and alerts
// https://blog.expo.dev/firebase-github-authentication-with-react-native-2543e32697b4
// https://docs.expo.dev/versions/latest/sdk/auth-session/
// https://docs.expo.dev/guides/authentication/#google
// https://raw.githubusercontent.com/sakshampuri/ms-monorepo/e1c0aab01422c9e79bf5b8bc4dc6b9d9fbe60eab/app/src/Components/index.ts

WebBrowser.maybeCompleteAuthSession();

const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    try {
      ConvertGames().then(cg => {setGames(cg)})
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {fetchGames()}, 3000);
    return () => clearInterval(intervalId);
  }, [games]);

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
          {(props) => <GamesScreen {...props} games={games} />}
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

export default App
