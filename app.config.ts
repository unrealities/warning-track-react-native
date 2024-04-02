import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const myValue: string = "warning-track-backend";

  return {
    ...config,
    android: {
      googleServicesFile: "./google-services.json",
      icon: "./assets/images/wt.png",
      package: "co.warningtrack.android",
      splash: {
        backgroundColor: "#44aa00",
        image: "./assets/images/wt_splash.png",
        resizeMode: "contain"
      }
    },
    assetBundlePatterns: ["assets/images/*"],
    description: "Mobile version of warningtrack.co",
    githubUrl: "https://github.com/unrealities/warning-track-react-native",
    icon: "./assets/images/wt.png",
    ios: {
      bundleIdentifier: "com.unrealities.warningtrackbackend",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [process.env.EXPO_PUBLIC_CLIENTID_IOS],
          },
        ],
      },
      googleServicesFile: "./GoogleService-Info.plist",
      splash: {
        backgroundColor: "#44aa00",
        image: "./assets/images/wt_splash.png",
        resizeMode: "contain"
      }
    },
    name: myValue,
    platforms: ["ios", "android", "web"],
    plugins: [
      [ "expo-router"],
      [ "@react-native-google-signin/google-signin"],
      [ "expo-notifications",
        {
          "icon": "./assets/images/wt.png",
          "color": "#ffffff"
        }
      ]
    ],
    scheme: "warningtrack",
    slug: myValue,
    splash: {
      backgroundColor: "#44aa00",
      image: "./assets/images/wt_splash.png",
      resizeMode: "contain"
    },
    version: process.env.EXPO_PUBLIC_PROJECT_VERSION || "1.0.0",
    web: {
      config: {
        firebase: {
          apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
          authDomain: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}.firebaseapp.com`,
          databaseURL: `https://${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}.firebaseio.com`,
          projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
          storageBucket: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}.appspot.com`,
          messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDERID,
          appId: process.env.EXPO_PUBLIC_FIREBASE_APPID,
          measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENTID,
        },
        favicon: "./assets/images/wt.png"
      }
    },
  };
};
