// TODO: Do not use EXPO_PUBLIC for firebase secrets
export const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
    authDomain: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}.firebaseapp.com`,
    databaseURL: `https://${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}.firebaseio.com`,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}.appspot.com`,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDERID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENTID,
}
