import React, { useState } from "react"
import { FlatList, StyleSheet, View, Text } from "react-native"

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
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
