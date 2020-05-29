import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

export default function App() {
  return (
    <View style={styles.container}>
      <SvgBackground />
      <Text>WarningTrack</Text>
    </View>
  );
}

export class SvgBackground extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Svg height="100%" width="100%">
          <Path fill="#4a0" d="M0 0H70V70H0z"></Path>
          <G fill="#55d400" transform="rotate(45)">
            <Path d="M0 0H99V25H0z"></Path>
            <Path d="M0 -50H99V-25H0z"></Path>
          </G>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  }
});
