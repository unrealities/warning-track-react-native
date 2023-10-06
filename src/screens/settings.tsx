import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import User from '../models/user'
import withBackground from "../utilities/background"
import GoogleLogin from "../components/googleLogin"
import UserInfo from "../components/userInfo"
import UserSettingsInfo from "../components/userSettings"
import { getName, getGoogleID, getUserID, getUserSettings } from '../utilities/hooks/localStorage'

const SettingsContainer = () => {
  let u: User = {
    id: '',
    googleId: '',
    name: ''
  }
  let us: UserSettings = {
    userID: '',
    notificationsEnabled: false
  }

  const [user, setUser] = useState<User>(u)
  const [userSettings, setUserSettings] = useState<UserSettings>(us)

  useEffect(() => {
    const fetchUser = async () => {
      let id = await getUserID()
      let gid = await getGoogleID()
      let name = await getName()
      let u: User = {
        id: id,
        googleId: gid,
        name: name
      }
      setUser(u)
    }
    const fetchUserSettings = async () => {
      let us = await getUserSettings()
      setUserSettings(us)
    }
    fetchUser()
    fetchUserSettings()
  }, [])

  useEffect(() => {
    const fetchUserSettings = async () => {
      let us = await getUserSettings()
      setUserSettings(us)
    }
    fetchUserSettings()
  }, [user])

  return (
    <View style={styles.container}>
      <UserInfo user={user} />
      <UserSettingsInfo userSettings={userSettings} />
      <GoogleLogin user={user} />
    </View>
  )
}

export const SettingsScreen = (props: SettingsScreenProps) => {
  return (
    withBackground(SettingsContainer)
  )
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'stretch',
      flex: 1,
      flexDirection: 'column'
  }
})

export default SettingsScreen
