import React from "react"
import { View, Text } from "react-native"

import { ScreenStyles } from "../styles/screen"

export function SettingsScreen() {
  return (
    <View style={ScreenStyles.container}>
      <Text style={ScreenStyles.headerTxt}>
        This is where you configure alerts.
      </Text>
      <Text style={ScreenStyles.settingsTxt}>Receive Alerts</Text>
    </View>
  )
}
