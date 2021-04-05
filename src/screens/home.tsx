import React from 'react';
import { View, Text } from 'react-native';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';

import { ScreenStyles } from '../styles/screen';

export function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  return (
    <View style={ScreenStyles.container}>
      <Text style={ScreenStyles.headerTxt}>WarningTrack</Text>
    </View>
  );
}
