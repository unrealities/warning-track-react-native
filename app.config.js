require("dotenv").config();

const myValue = 'warning-track-backend'

export default {
    android: {
      package: "com.unrealities.warningtrackbackend"
    },
    ios: {
      bundleIdentifier: "com.unrealities.warningtrackbackend",
      "infoPlist": {
        "CFBundleURLTypes": [
          {
            "CFBundleURLSchemes": [process.env.CLIENTID_IOS]
          }
        ]
      }
    },
    name: myValue,
    plugins: ["expo-router"],
    version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.0.0',
    extra: {
      firebaseApiKey: process.env.FIREBASE_APIKEY,
      firebaseAppId: process.env.FIREBASE_APPID,
      firebaseAppId: process.env.FIREBASE_MEASUREMENTID,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
      firebaseProjectId: process.env.FIREBASE_PROJECTID,
      themoviedb_key: process.env.THEMOVIEDB_APIKEY,
      expoClientId: process.env.CLIENTID_EXPO,
      iosClientId: process.env.CLIENTID_IOS,
      iosURLConfig: process.env.IOS_URLSCHEME,
      webClientId: process.env.CLIENTID_WEB
    }
  }
