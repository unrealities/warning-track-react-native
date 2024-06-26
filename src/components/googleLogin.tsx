import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { GoogleAuthProvider, UserCredential, getAuth, onAuthStateChanged, signInWithCredential, signOut } from "firebase/auth"
import { makeRedirectUri } from 'expo-auth-session'
import Constants from "expo-constants"
import * as Google from 'expo-auth-session/providers/google'

import { getGoogleID, getUserID, getUserSettings, setGoogleID, setName, setUserSettings } from '../utilities/hooks/localStorage'
import User from '../models/user'

interface IGoogleLoginProps {
    user: User,
}

const EXPO_REDIRECT_PARAMS = {
    useProxy: true,
    projectNameForProxy: '@unrealities/warning-track' // get this from a variable
}

const NATIVE_REDIRECT_PARAMS = { native: 'warning-track://' } // get this from a variable

const REDIRECT_PARAMS =
  Constants.appOwnership === 'expo'
    ? EXPO_REDIRECT_PARAMS
    : NATIVE_REDIRECT_PARAMS

const GOOGLE_CONFIG = {
  androidClientId: process.env.EXPO_PUBLIC_CLIENTID_ANDROID,
  expoClientId: process.env.EXPO_PUBLIC_CLIENTID_EXPO,
  iosClientId: process.env.EXPO_PUBLIC_CLIENTID_IOS,
  redirectUri: makeRedirectUri(REDIRECT_PARAMS),
  webClientId: process.env.EXPO_PUBLIC_CLIENTID_WEB,
}

// TODO: Do no use EXPO_PUBLIC
const GoogleLogin: React.FC<IGoogleLoginProps> = (props: IGoogleLoginProps) => {
    const [user, setUser] = useState<User>(props.user)
    const [signedInUser, setSignedInUser] = useState<boolean>(false)
    const [request, response, promptAsync] = Google.useAuthRequest(GOOGLE_CONFIG)

    const onLoginSucceeded = async (token: string, res: UserCredential) => {
        user.id = await getUserID()
        user.name = await getGoogleID()
        user.googleId = res.user.uid
        setGoogleID(user.googleId)
        if (res.user.displayName) {
            user.name = res.user.displayName
            setName(res.user.displayName)
        }
        setUser(user)
        const userSettings = await getUserSettings()
        setUserSettings(userSettings)
    }

    useEffect(() => {
        const googleLogIn = async () => {
            const auth = getAuth()
            try {
                if (response?.type === 'success') {
                    const { id_token } = response.params
                    const creds = GoogleAuthProvider.credential(id_token)
                    const res = await signInWithCredential(auth, creds)
                    const token = await res.user.getIdToken()
                    onLoginSucceeded(token, res)
                }
            } catch (e: any) {
                console.error(e)
            }
            onAuthStateChanged(auth, (user) => {
                if (user) { setSignedInUser(true) }
            })
        }
        googleLogIn()
    }, [response])

    const signOutUser = async () => {
        const auth = getAuth()
        const result = await signOut(auth)
        setSignedInUser(false)
        setGoogleID('')
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => { signedInUser ? signOutUser() : promptAsync() }}
                style={styles.button}>
                <Text style={styles.buttonText}>{signedInUser ? 'Sign Out ' + props.user.name : 'Sign In'}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignContent: "center",
        alignSelf: "center",
        backgroundColor: "#faf5e3",
        borderColor: "#593811",
        borderWidth: 3,
        borderRadius: 20,
        minHeight: 46,
        marginTop: 20,
        padding: 20,
        shadowColor: "#153600",
        shadowOffset: { height: 6, width: 6 },
        shadowOpacity: 0.5
    },
    buttonText: {
        color: "#63513c",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        padding: 8,
        width: 300
    },
    text: {
        flex: 1,
        fontFamily: 'Lobster-Regular',
        fontSize: 30,
        minHeight: 100,
        textAlign: 'center'
    }
})

export default GoogleLogin
