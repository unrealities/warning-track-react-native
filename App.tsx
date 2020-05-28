import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Svg from 'react-native-svg';
const { Path, G } = Svg;

export default function App() {
  return (
    <View style={styles.container}>
      <SvgBackground />
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class SvgBackground extends React.Component {
  render() {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="70" height="70">
        <Path fill="#4a0" d="M0 0H70V70H0z"></Path>
        <G fill="#55d400" transform="rotate(45)">
          <Path d="M0 0H99V25H0z"></Path>
          <Path d="M0 -50H99V-25H0z"></Path>
        </G>
      </Svg>
    );
  }
}
