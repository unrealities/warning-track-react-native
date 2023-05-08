import React, { useEffect } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { GoogleAuthProvider, getAuth, signInWithCredential, signOut } from "firebase/auth"
import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'

import { useAuthentication } from '../utilities/hooks/useAuthentication'

// TODO: Error when logging in
// Uncaught Error: Objects are not valid as a React child (found: object with keys {providerId, proactiveRefresh, reloadUserInfo, reloadListener, uid, auth, stsTokenManager, accessToken, displayName, email, emailVerified, phoneNumber, photoURL, isAnonymous, tenantId, providerData, metadata}). If you meant to render a collection of children, use an array instead.
const GoogleLogin = () => {
    const { user } = useAuthentication()

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

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
    }, [response])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Grape Juice: {user}</Text>
            <Pressable
                onPress={() => { user && user?.displayName != '' ? signOut(getAuth()) : promptAsync() }}
                style={styles.button}>
                <Text style={styles.buttonText}>{user && user?.displayName != '' ? 'Sign Out' : 'Sign In'}</Text>
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
