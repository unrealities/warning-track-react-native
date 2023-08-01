import React, { useState } from "react"
import { FlatList, StyleSheet, Switch, Text, View } from "react-native"

import { initializeApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

import withBackground from "../utilities/background"
import { useAuthentication } from '../utilities/hooks/useAuthentication'
import GoogleLogin from "../components/googleLogin"
import UserSettings from "../models/userSettings"
import { firebaseConfig } from "../config/firebase"
import { UserSettingsConverter } from '../utilities/firestore/converters/settings'

export interface SettingContainerProps {
  isEnabled: boolean,
  name: string,
  userID: string
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const settings = [
  {
    id: 'notifications',
    name: 'notifications'
  }
]

// TODO: This needs to update when a user signs in and reflect current status
const SettingsContainer = () => {
  const { user } = useAuthentication()
  let body = <Text style={styles.text}>{ user ? user?.displayName : 'Sign In to Access Settings'}</Text>
  
  if (user) {
    body = <FlatList 
      data={settings}
      renderItem={({item}) => <SettingContainer name={item.name} isEnabled={false} userID={user.uid} />}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false} />
  }

  return (
    <View>
      { body }
      <GoogleLogin />
    </View>
  )
}

const SettingContainer = (props: SettingContainerProps) => {
  const [name] = useState<string>(props.name)
  const [enabled, setEnabled] = useState<boolean>(props.isEnabled)

  const updateUserSettings = async (userIDToUpdate:string, notificationsEnabled:boolean) => {
    const userSettings: UserSettings = new UserSettings()
    userSettings.userID = userIDToUpdate
    userSettings.notificationsEnabled = notificationsEnabled

    try {
      await setDoc(doc(db, 'userSettings', userSettings.userID).withConverter(UserSettingsConverter), userSettings)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const updateSetting = (isEnabled:boolean) => {
    setEnabled(isEnabled)
    updateUserSettings(props.userID, isEnabled)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={enabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={updateSetting}
        value={enabled}
      />
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
      paddingTop: 10,
      textAlign: 'center'
  }
})

export default SettingsScreen
