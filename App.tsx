import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';

import { Game } from './game';

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
    let game = new Game('Cardinals', 3, 'Cubs', 4, 0)
    return (
      <View style={styles.gameContainer}>
        <Text style={styles.team}>{game['awayTeam']}</Text>
        <Text style={styles.score}>{game['awayScore']}</Text>
        <Text style={styles.team}>{game['homeTeam']}</Text>
        <Text style={styles.score}>{game['homeScore']}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  backgroundImg: {
    alignItems: 'center',
    backgroundColor: '#44aa00',
    borderRadius: 0,
    resizeMode: 'repeat'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  gameContainer: {
    backgroundColor: '#ECE2C2',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    justifyContent: 'space-around',
    shadowColor: '#225500',
    shadowOffset: {height: 4, width: 4},
    shadowOpacity: 0.5
  },
  headerTxt: {
    color: '#225500',
    fontFamily: 'Lobster_400Regular',
    fontSize: 32,
    textAlign: 'center'
  },
  score: {
    textAlign: 'center'
  },
  team: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
