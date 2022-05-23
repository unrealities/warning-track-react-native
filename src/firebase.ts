import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

import * as gs from "../google-services.json"

// Initialize Firebase
// TODO: dangerous 0 index calls
// TODO: measurementId for google-analytics
const firebaseApp = initializeApp({
    apiKey: gs.client[0].api_key[0].current_key,
    authDomain: gs.project_info.project_id + ".firebaseapp.com",
    projectId: gs.project_info.project_id,
    storageBucket: gs.project_info.storage_bucket,
    messagingSenderId: gs.project_info.project_number,
    appId: gs.client[0].client_info.mobilesdk_app_id
});

// Initialize Firestore
export const firestore = getFirestore();

export default firebaseApp;
