import React, { useEffect } from "react"
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { GoogleAuthProvider, getAuth, signInWithCredential, signOut } from "firebase/auth"
import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'

import { useAuthentication } from '../utilities/hooks/useAuthentication'
import { GameStyles } from "../styles/game"
import Background from "../components/background"

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={GameStyles.mainContainer}>
      <Background />
      <SettingsContainer />
    </SafeAreaView>
  )
}

function SettingsContainer() {
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
      const { id_token } = response.params
      const auth = getAuth()
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
    }
  }, [response])

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => { user?.displayName != '' ? signOut(getAuth()) : promptAsync() }}
        style={styles.button}>
        <Text style={styles.buttonText}>{user && user?.displayName != '' ? 'Sign Out' : 'Sign In'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    flex: 1,
    maxHeight: 40,
    padding: 10,
    width: 280
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Lobster-Regular',
    textAlign: 'center'
  },
  container: {
    alignItems: "center",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    paddingTop: 16,
    width: "100%",
  }
})
