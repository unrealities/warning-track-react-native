import React, { useState } from "react"
import { FlatList, View } from "react-native"

import withBackground from "../utilities/background"
import GoogleLogin from "../components/googleLogin"

const SettingsContainer = () => {
  const [settings, setSettings] = useState<Settings>(null)

  return (
    <View>
      <GoogleLogin /> 
      <FlatList 
      data={settings}
      showsHorizontalScrollIndicator={false} />
    </View>
  )
}

export const SettingsScreen = () => {
  return (
    withBackground(SettingsContainer)
  )
}
