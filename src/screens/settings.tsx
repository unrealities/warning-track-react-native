import React, { useState } from "react"
import { FlatList, StyleSheet, Switch, Text, View } from "react-native"

import withBackground from "../utilities/background"
import GoogleLogin from "../components/googleLogin"
import UserSettings from "../models/userSettings"

export interface SettingContainerProps {
  isEnabled: Boolean,
  name: String,
  user: User
}

const settings = [
  {
    id: 'notifications',
    name: 'notifications'
  }
]

const SettingsContainer = () => {
  return (
    <View>
      <GoogleLogin /> 
      <FlatList 
        data={settings}
        renderItem={({item}) => <SettingContainer name={item.name} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false} />
    </View>
  )
}

const SettingContainer = (props: SettingContainerProps) => {
  const [name] = useState<String>(props.name)
  const [enabled, setEnabled] = useState<Boolean>(props.isEnabled)

  const updateUserSettings = async (userToUpdate:User, notificationsEnabled:boolean) => {
    const userSettings: UserSettings = new UserSettings()
    userSettings.userID = userToUpdate.id
    userSettings.notificationsEnabled = notificationsEnabled
    const docRef = doc(db, 'userSettings', userSettings).withConverter(UserSettingsConverter)
    const docSnap = await getDoc(docRef)

    try {
      if (!docSnap.exists()) {
          getUserID().then(id => {
          userToUpdate.id = id
          setUser(userToUpdate)
        })
        await setDoc(doc(db, 'userSettings', userSettings).withConverter(UserSettingsConverter), userSettings)
      }
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const updateSetting = () => {
    setEnabled(!enabled)
    console.log(enabled)
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

export const SettingsScreen = () => {
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
      textAlign: 'center'
  }
})

export default SettingsScreen
