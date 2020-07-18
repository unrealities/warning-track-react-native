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

  let game1 = new Game(5, 3, 3, false, false, false, 6, 4, 8, false, 3, 1, 2);
  let game2 = new Game(1, 1, 3, true, false, false, 7, 2, 4, true, 0, 1, 2);
  let games = [game1, game2];

  return (
    <View style={styles.container}>
      <ImageBackground imageStyle={styles.backgroundImg}
                       source={{uri: backgroundImg}}
                       style={styles.background}>
        <Text style={styles.headerTxt}>WarningTrack</Text>
        {games.map(game => <GameContainer game={game}/>)}
      </ImageBackground>
    </View>
  );
}

export interface GameContainerProps {
  game: Game;
}

const GameContainer: React.FC<GameContainerProps> = (props) => {
  return (
    <View style={styles.gameContainer}>
      <LeverageIndex value={props.game.leverageIndex} />
      <View>
        <Score awayScore={props.game.awayScore} awayTeam={props.game.awayTeam} homeScore={props.game.homeScore} homeTeam={props.game.homeTeam} />
        <View style={styles.bsos}>
          <View style={styles.bsoContainer}>
            <Text>B:</Text>
            <BallsStrikesOuts value={props.game.balls} />
          </View>
          <View style={styles.bsoContainer}>
            <Text>S:</Text>
            <BallsStrikesOuts value={props.game.strikes} />
          </View>
          <View style={styles.bsoContainer}>
            <Text>O:</Text>
            <BallsStrikesOuts value={props.game.outs} />
          </View>
        </View>
      </View>
      <View style={styles.inningStateContainer}>
        <View style={styles.baseRunnerContainer}>
          <BaseRunner value={props.game.baseRunnerInt()}/>
        </View>
        <Text style={styles.inningTxtContainer}>{props.game.inningTopString()}{props.game.inning}</Text>
      </View>
    </View>
  );
}

export interface LIProps {
  value: number;
}

const LeverageIndex: React.FC<LIProps> = (props) => {
  let stroke = [];
  let fill = [];

  switch(props.value) {
    case 0:
      stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a"];
      fill = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
      break;
    case 1:
      stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a", "#baa400"];
      fill = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f5d800"];
      break;
    case 2:
      stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#baa400", "#baa400"];
      fill = ["#ffffff", "#ffffff", "#ffffff", "#f5d800", "#f5d800"];
      break;
    case 3:
      stroke = ["#e6db8a", "#e6db8a", "#baa400", "#baa400", "#baa400"];
      fill = ["#ffffff", "#ffffff", "#f5d800", "#f5d800", "#f5d800"];
      break;
    case 4:
      stroke = ["#e6db8a", "#baa400", "#baa400", "#baa400", "#baa400"];
      fill = ["#ffffff", "#f5d800", "#f5d800", "#f5d800", "#f5d800"];
      break;
    default:
      stroke = ["#baa400", "#baa400", "#baa400", "#baa400", "#baa400"];
      fill = ["#f5d800", "#f5d800", "#f5d800", "#f5d800", "#f5d800"];
      break;
  }

  return (
    <View style={styles.leverageIndex} >
      <Svg>
        <g>
          <path d="m2.08791,8.81967l7.57237,0l2.33991,-7.19372l2.33993,7.19372l7.57236,0l-6.12615,4.44591l2.34004,7.19373l-6.12617,-4.44603l-6.12616,4.44603l2.34004,-7.19373l-6.12616,-4.44591l0,0z" stroke-width="NaN" stroke={stroke[0]} fill={fill[0]}/>
          <path d="m2.08791,28.15304l7.57237,0l2.33991,-7.19372l2.33993,7.19372l7.57236,0l-6.12616,4.4459l2.34004,7.19373l-6.12617,-4.44604l-6.12616,4.44604l2.34004,-7.19373l-6.12616,-4.4459l0,0z" stroke-width="NaN" stroke={stroke[1]} fill={fill[1]}/>
          <path d="m2.08791,48.48639l7.57237,0l2.33991,-7.19372l2.33993,7.19372l7.57236,0l-6.12616,4.4459l2.34004,7.19373l-6.12617,-4.44604l-6.12616,4.44604l2.34004,-7.19373l-6.12616,-4.4459l0,0z" stroke-width="NaN" stroke={stroke[2]} fill={fill[2]}/>
          <path d="m2.08791,68.81975l7.57237,0l2.33991,-7.19373l2.33993,7.19373l7.57236,0l-6.12616,4.4459l2.34004,7.19373l-6.12617,-4.44604l-6.12616,4.44604l2.34004,-7.19373l-6.12616,-4.4459l0,0z" stroke-width="NaN" stroke={stroke[3]} fill={fill[3]}/>
          <path d="m2.08791,89.15311l7.57237,0l2.33991,-7.19372l2.33993,7.19372l7.57236,0l-6.12616,4.4459l2.34004,7.19373l-6.12617,-4.44604l-6.12616,4.44604l2.34004,-7.19373l-6.12616,-4.4459l0,0z" stroke-width="NaN" stroke={stroke[4]} fill={fill[4]}/>
        </g>
      </Svg>
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
  let stroke=[];
  let fill=[];

  switch(props.value) {
    case 0:
      stroke = ["#e6db8a","#e6db8a","#e6db8a","#e6db8a"];
      fill = ["#ffffff","#ffffff","#ffffff","#ffffff"];
      break;
    case 1:
      stroke = ["#baa400","#e6db8a","#e6db8a","#e6db8a"];
      fill = ["#f5d800","#ffffff","#ffffff","#ffffff"];
      break;
    case 2:
      stroke = ["#baa400","#baa400","#e6db8a","#e6db8a"];
      fill = ["#f5d800","#f5d800","#ffffff","#ffffff"];
      break;
    case 3:
      stroke = ["#baa400","#baa400","#baa400","#e6db8a"];
      fill = ["#f5d800","#f5d800","#f5d800","#ffffff"];
      break;
    case 4:
      stroke = ["#baa400","#baa400","#baa400","#baa400"];
      fill = ["#f5d800","#f5d800","#f5d800","#f5d800"];
      break;
    default:
      stroke = ["#e6db8a","#e6db8a","#e6db8a","#e6db8a"];
      fill = ["#ffffff","#ffffff","#ffffff","#ffffff"];
      break;
  }
  return (
    <View style={styles.bso}>
      <Svg viewBox="0 0 68 25" width="50" height="18.38">
        <G>
          <Ellipse ry="10" rx="10" cy="12" cx="12" stroke-linecap="null" stroke-linejoin="null" stroke={stroke[0]} fill={fill[0]}/>
          <Ellipse ry="10" rx="10" cy="12" cx="34" stroke-linecap="null" stroke-linejoin="null" stroke={stroke[1]} fill={fill[1]}/>
          <Ellipse ry="10" rx="10" cy="12" cx="56" stroke-linecap="null" stroke-linejoin="null" stroke={stroke[2]} fill={fill[2]}/>
          <Ellipse ry="10" rx="10" cy="12" cx="78" stroke-linecap="null" stroke-linejoin="null" stroke={stroke[3]} fill={fill[3]}/>
        </G>
      </Svg>
    </View>
  )
}

export interface BaseRunnerProps {
  value: number;
}

const BaseRunner: React.FC<BaseRunnerProps> = (props) => {
  let stroke=[];
  let fill=[];

  switch(props.value) {
    case 0:
      stroke = ["#225500","#225500","#225500"];
      fill = ["#ffffff","#ffffff","#ffffff"];
      break;
    case 1:
      stroke = ["#baa400","#225500","#225500"];
      fill = ["#f5d800","#ffffff","#ffffff"];
      break;
    case 2:
      stroke = ["#225500","#baa400","#225500"];
      fill = ["#ffffff","#f5d800","#ffffff"];
      break;
    case 3:
      stroke = ["#225500","#225500","#baa400"];
      fill = ["#ffffff","#ffffff","#f5d800"];
      break;
    case 4:
      stroke = ["#baa400","#baa400","#225500"];
      fill = ["#f5d800","#f5d800","#ffffff"];
      break;
    case 5:
      stroke = ["#baa400","#225500","#baa400"];
      fill = ["#f5d800","#ffffff","#f5d800"];
      break;
    case 6:
      stroke = ["#225500","#baa400","#baa400"];
      fill = ["#ffffff","#f5d800","#f5d800"];
      break;
    case 7:
      stroke = ["#baa400","#baa400","#baa400"];
      fill = ["#f5d800","#f5d800","#f5d800"];
      break;
    default:
      stroke = ["#baa400","#baa400","#baa400"];
      fill = ["#f5d800","#f5d800","#f5d800"];
      break;
  }
  return (
    <View style={styles.BaseRunner}>
      <Svg viewBox="0 0 34 26" width="68" height="52">
        <G>
          <Rect transform="rotate(45 25.07106781005859,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="20.07107" stroke={stroke[0]} fill={fill[0]}/>
          <Rect transform="rotate(45 17.071067810058594,9.071067810058592) " ry="1" rx="1" height="10" width="10" y="4.07107" x="12.07107" stroke={stroke[1]} fill={fill[1]}/>
          <Rect transform="rotate(45 9.071067810058596,17.071067810058594) " ry="1" rx="1" height="10" width="10" y="12.07107" x="4.07107" stroke={stroke[2]} fill={fill[2]}/>
        </G> 
      </Svg>
    </View>
  )
}

/*
<div class="game-container" ng-class="{'animated tada' : game.status.leverage_index > 3, 'not-in-progress': game.status.state < 22}">
        <div class="score game-box">
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
  baseRunner: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  baseRunnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bso: {
    flexDirection: 'column'
  },
  bsos: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bsoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },
  container: {
    height: '100%'
  },
  gameContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ECE2C2',
    borderWidth: 2,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    maxHeight: 150,
    padding: 10,
    paddingTop: 40,
    justifyContent: 'center',
    shadowColor: '#225500',
    shadowOffset: {height: 4, width: 4},
    shadowOpacity: 0.5,
    width: 400
  },
  headerTxt: {
    color: '#225500',
    fontFamily: 'Lobster_400Regular',
    fontSize: 32,
    textAlign: 'center'
  },
  inningStateContainer: {
    backgroundColor: '#55D400',
    borderColor: '#225500',
    borderRadius: 20,
    borderWidth: 1,
    height: 100,
    marginRight: 10,
    paddingTop: 12,
    width: 92
  },
  inningTxtContainer: {
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center'
  },
  leverageIndex: {
    flex: 1,
    flexDirection: 'column'
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
