import React, { useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import { ConvertGames } from "./src/utilities/game";
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

// Initialize Firebase
initializeApp({
  /* Config */
});

WebBrowser.maybeCompleteAuthSession();

export const BASE_URL = "http://192.168.1.8:8000/";

export const showErr = (err: string) => {
  Platform.OS === "ios"
      ? Alert.alert("Alert", err, [{ text: "OK" }])
      : ToastAndroid.show(err, ToastAndroid.LONG);
};

export const firebaseContextInfo = {
  config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
  },
  firebase: {},
};

export type userType = {
  name: string;
  email: string;
  picture: string;
};

export type authState = {
  state: "login" | "logout" | undefined;
  user?: userType | undefined;
};

export type authType = {
  changeAuthState: React.Dispatch<React.SetStateAction<authState>>;
  authState: authState;
};

export default class App extends React.Component {
  state = {
    appIsReady: false,
    games: [],
  };

  const[request, response, promptAsync] = Google.useIdTokenAuthRequest(
    clientId: process.env.GOOGLE_CLIENT_ID
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  componentDidMount = async () => {
    let FETCH_DELAY_MS = 30000;
    await preventAutoHideAsync().catch((e) => console.warn(e));
    await this.fetchGames()
    setInterval(this.fetchGames, FETCH_DELAY_MS);
  };

  prepareResources = async () => {
    await this.fetchGames();
  };

  async fetchGames() {
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
  }

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
