import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';

export default function App() {
  let backgroundImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iIzQ0YWEwMCI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiM1NWQ0MDAiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiM1NWQ0MDAiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=';

  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  return (
    <View style={styles.container}>
      <ImageBackground imageStyle={styles.backgroundImg}
                       source={{uri: backgroundImg}}
                       style={styles.background}>
        <Text style={styles.headerTxt}>WarningTrack</Text>
        <GameContainer/>
      </ImageBackground>
    </View>
  );
}

export class GameContainer extends Component {
  render () {
    return (
      <View style={styles.gameContainer}>
        <Text style={styles.team}>Cubs</Text>
        <Text style={styles.team}>Cardinals</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImg: {
    backgroundColor: '#44aa00',
    borderRadius: 0,
    resizeMode: 'repeat'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  gameContainer: {
    justifyContent: 'center'
  },
  headerTxt: {
    color: '#225500',
    fontFamily: 'Lobster_400Regular',
    fontSize: 32
  },
  team: {
    textAlign: 'center'
  }
});
