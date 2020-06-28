import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Svg, { Ellipse, G, Rect } from 'react-native-svg';
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
    let game = new Game(5, 3, 3, true, true, true, 6, 4, 3, 1, 2)
    return (
      <View style={styles.gameContainer}>
        <LeverageIndex value={game.leverageIndex} />
        <Score awayScore={game.awayScore} awayTeam={game.awayTeam} homeScore={game.homeScore} homeTeam={game.homeTeam} />
        <View style={styles.bsos}>
          <View style={styles.bsoContainer}>
            <Text>B:</Text>
            <BallsStrikesOuts value={game.balls} />
          </View>
          <View style={styles.bsoContainer}>
            <Text>S:</Text>
            <BallsStrikesOuts value={game.strikes} />
          </View>
          <View style={styles.bsoContainer}>
            <Text>O:</Text>
            <BallsStrikesOuts value={game.outs} />
          </View>
        </View>
        <View style={styles.baseRunnerContainer}>
          <BaseRunner value={1}/>
        </View>
      </View>
    );
  }
}

export interface LIProps {
  value: number;
}

const LeverageIndex: React.FC<LIProps> = (props) => {
  return (
    <View>
      <Text>{props.value}</Text>
    </View>
  )
}

export interface ScoreProps {
  awayScore: number;
  awayTeam: number;
  homeScore: number;
  homeTeam: number;
}

const Score: React.FC<ScoreProps> = (props) => {
  let awayTeamLogoURI = 'https://warningtrack.co/img/team_logos/' + props.awayTeam + '.svg';
  let homeTeamLogoURI = 'https://warningtrack.co/img/team_logos/' + props.homeTeam + '.svg';
  return (
    <View style={styles.scoreContainer}>
      <Image style={styles.logo} source={{uri: awayTeamLogoURI}} />
      <Text style={styles.score}>{props.awayScore}</Text>
      <Image style={styles.logo} source={{uri: homeTeamLogoURI}} />
      <Text style={styles.score}>{props.homeScore}</Text>
    </View>
  )
}

export interface BSOProps {
  value: number;
}

const BallsStrikesOuts: React.FC<BSOProps> = (props) => {
  let circles = "0 0 0 25";
  switch(props.value) {
    case 1:
      circles = "-45 0 45 25";
      break;
    case 2:
      circles = "0 0 1 25";
      break;
    case 3:
      circles = "0 0 45 25";
      break;
    case 4:
      circles = "0 0 90 25";
      break;
    default:
      circles = "0 0 0 25";
      break;
  }
  return (
    <View>
      <Svg viewBox={circles} width="60" height="16.67">
        <G id="b0">
          <Ellipse ry="10" rx="10" cy="12" cx="12" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
          <Ellipse ry="10" rx="10" cy="12" cx="34" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
          <Ellipse ry="10" rx="10" cy="12" cx="56" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
          <Ellipse ry="10" rx="10" cy="12" cx="78" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
        </G>
        <G id="b1">
          <Ellipse ry="10" rx="10" cy="12" cx="12" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="34" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
          <Ellipse ry="10" rx="10" cy="12" cx="56" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
          <Ellipse ry="10" rx="10" cy="12" cx="78" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
        </G>
        <G id="b2">
          <Ellipse ry="10" rx="10" cy="12" cx="12" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="34" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="56" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
          <Ellipse ry="10" rx="10" cy="12" cx="78" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
        </G>
        <G id="b3">
          <Ellipse ry="10" rx="10" cy="12" cx="12" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="34" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="56" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="78" stroke-linecap="null" stroke-linejoin="null" stroke="#e6db8a" fill="#ffffff"/>
        </G>
        <G id="b4">
          <Ellipse ry="10" rx="10" cy="12" cx="12" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="34" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="56" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
          <Ellipse ry="10" rx="10" cy="12" cx="78" stroke-linecap="null" stroke-linejoin="null" stroke="#baa400" fill="#f5d800"/>
        </G>
      </Svg>
    </View>
  )
}

export interface BaseRunnerProps {
  value: number;
}

const BaseRunner: React.FC<BaseRunnerProps> = (props) => {
  let bases = "0 0 34 26";
  switch(props.value) {
    case 1:
      bases = "0 0 34 26";
      break;
    case 2:
      bases = "0 0 34 26";
      break;
    case 3:
      bases = "0 0 34 26";
      break;
    case 4:
      bases = "0 0 34 26";
      break;
    default:
      bases = "0 0 34 26";
      break;
  }
  return (
    <View>
      <Svg viewBox={bases} width="68" height="52">
        <G id="br0">
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke="#225500" fill="#ffffff"/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke="#225500" fill="#ffffff"/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke="#225500" fill="#ffffff"/>
        </G>
        <G id="br1">
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke="#baa400" fill="#f5d800"/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke="#225500" fill="#ffffff"/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke="#225500" fill="#ffffff"/>
        </G>
        <G id="br2">
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke="#225500" fill="#ffffff"/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke="#baa400" fill="#f5d800"/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke="#225500" fill="#ffffff"/>
        </G>
        <G id="br3">
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke="#225500" fill="#ffffff"/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke="#225500" fill="#ffffff"/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke="#baa400" fill="#f5d800"/>
        </G>
        <G id="br4">
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke="#baa400" fill="#f5d800"/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke="#baa400" fill="#f5d800"/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke="#225500" fill="#ffffff"/>
        </G>
        <G id="br5">
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke="#baa400" fill="#f5d800"/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke="#225500" fill="#ffffff"/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke="#baa400" fill="#f5d800"/>
        </G>
        <G id="br6">
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke="#225500" fill="#ffffff"/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke="#baa400" fill="#f5d800"/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke="#baa400" fill="#f5d800"/>
        </G>
        <G id="br7">
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke="#baa400" fill="#f5d800"/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke="#baa400" fill="#f5d800"/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke="#baa400" fill="#f5d800"/>
        </G>    
      </Svg>
    </View>
  )
}

/*
<div class="game-container" ng-class="{'animated tada' : game.status.leverage_index > 3, 'not-in-progress': game.status.state < 22}">
        <div class="leverage-index" ng-if="game.status.state > 21" title="leverage index: {{game.status.leverage_index}}">
          <div>
            <svg viewBox="0 0 24 102" width="24" height="102">
              <use xlink:href="{{game.status.leverage_index| leverageToSvg}}" xlink:href="" />
            </svg>
          </div>
        </div>
        <div class="score game-box">
          <div class="score-container">
            <div class="team-logo" ng-style="{{game.teams.away | logoPosition}}">&nbsp;</div>
            <div class="team-score">{{game.status.score.away}} - {{game.status.score.home}}</div>
            <div class="team-logo" ng-style="{{game.teams.home | logoPosition}}">&nbsp;</div>
          </div>
          <div class="game-status" ng-if="game.status.state < 22">{{game | displayGameStatus}}</div>
        </div>
        <div class="game-box br" ng-if="game.status.state > 21">
          <div class="game-status">{{game | displayGameStatus}}</div>
        </div>
        <div class="watch-container" ng-if="game.status.state > 21">
          <div class="watch">
            <a href="{{game.links.mlb_tv}}" target="_blank">
              <img class="watch-image" src="img/mlbtv-logo-square.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
*/

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
  baseRunnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bso: {
    textAlign: 'center'
  },
  bsos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bsoContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
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
  logo: {
    height: 60,
    justifyContent: 'center',
    width: 60
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
    marginHorizontal: 12,
    textAlign: 'center'
  },
  scoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  team: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
