import React, { useState } from "react"
import { FlatList, View } from "react-native"

import withBackground from "../utilities/background"
import GoogleLogin from "../components/googleLogin"

export interface SettingContainerProps {
  name: String
}

const settings = [
  {
    id: 'notifications',
    name: 'notifications'
  }
]

const SettingsContainer = () => {
  const [settings, setSettings] = useState<Settings>(null)

  return (
    <View>
      <GoogleLogin /> 
      <FlatList 
        data={settings}
        renderItem={({item}) => <Setting name={item.name} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false} />
    </View>
  )
}

const SettingContainer = (props: SettingContainerProps) => {
  const [name] = useState<String>(props.name)

  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}

export const SettingsScreen = () => {
  return (
    withBackground(SettingsContainer)
  )
}
