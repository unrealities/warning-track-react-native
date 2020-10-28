# warning-track-react-native

This app was created via: `expo init WarningTrack`.
Use `expo start`
May need to run `react-native run-android`

The ultimate purpose is create front-end functionality for the firebase `warning-track-backend`

## Expo

[Expo](https://docs.expo.io/) is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase.

`npm install yarn`
`yarn add expo`

## React Native Firebase

[React Native Firebase](https://rnfirebase.io/) is the officially recommended collection of packages that brings React Native support for all Firebase services on both Android and iOS apps.

This allows us to easily access the backend in Firebase

`expo install @react-native-firebase/app`

There are credentials that you need to get from Google that are stored in `/android/app/google-services.json` that are excluded from this repo.
