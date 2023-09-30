import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, initializeAuth, onAuthStateChanged, User } from 'firebase/auth'
import { getReactNativePersistence } from "firebase/auth/react-native"
import { firebaseConfig } from '../../config/firebase'
import AsyncStorage from "@react-native-async-storage/async-storage"

const app = initializeApp(firebaseConfig)
initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
const auth = getAuth(app)

export function useAuthentication() {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user)
            } else {
                // User is signed out
                setUser(undefined)
            }
        })

        return unsubscribeFromAuthStatusChanged
    }, [])

    return {
        user
    }
}
