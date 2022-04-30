import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

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
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: "#faf5e3",
          activeTintColor: "#593811",
          labelStyle: {
            color: "#63513c",
            fontSize: 18,
            fontWeight: "400",
          },
          style: {
            backgroundColor: "#faf5e3",
            borderTopColor: "#63513c",
            borderTopWidth: 2,
            shadowColor: "#2e261c",
            shadowOffset: { height: -2, width: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 1,
          }
        }}
      >
        <Tab.Screen
          name="Games"
          component={GamesScreen}
          options={{
            tabBarLabel: "Games",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="baseball-outline" color={"#63513c"} size={24} />
            ),
          }}
        />
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
