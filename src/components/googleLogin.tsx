import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { GoogleAuthProvider, UserCredential, getAuth, signInWithCredential, signOut } from "firebase/auth"
import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'

import { getGoogleID, getUserID, setGoogleID, setName } from '../utilities/hooks/localStorage'
import User from '../models/user'

interface IGoogleLoginProps {
    user: User,
}

const GoogleLogin: React.FC<IGoogleLoginProps> = (props: IGoogleLoginProps) => {
    const [user, setUser] = useState<User>(props.user)
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId: Constants?.expoConfig?.extra?.androidClientId,
        expoClientId: Constants?.expoConfig?.extra?.expoClientId,
        iosClientId: Constants?.expoConfig?.extra?.iosClientId,
        webClientId: Constants?.expoConfig?.extra?.webClientId,
        scopes: [
            'profile',
            'email',
            'openid',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    })

    const onLoginSucceeded = async (token: string, res: UserCredential) => {
        user.id = await getUserID()
        user.name = await getGoogleID()
        user.googleId = res.user.uid
        setGoogleID(user.googleId)
        if (res.user.displayName) {
            user.name = res.user.displayName
            setName(res.user.displayName)
        }
        console.log(user)
        setUser(user)
    }

    useEffect(() => {
        const googleLogIn = async () => {
            const auth = getAuth()

            try {
                if (response?.type === 'success') {
                    const { id_token } = response.params
                    const auth = getAuth()
                    const creds = GoogleAuthProvider.credential(id_token)
                    const res = await signInWithCredential(auth, creds)
                    const token = await res.user.getIdToken()
                    onLoginSucceeded(token, res)
                }
            } catch (e: any) {
                console.error(e)
            }
        }
        googleLogIn()
    }, [response])

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => { user.googleId != '' ? signOut(getAuth()) : promptAsync() }}
                style={styles.button}>
                <Text style={styles.buttonText}>{props.user.name}</Text>
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
