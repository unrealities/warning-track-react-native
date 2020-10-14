import React, { Component } from 'react';
import { Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Ellipse, G, Path, Polygon, Rect } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';

import { Game } from './game';
import { fetchUpdateAsync } from 'expo-updates';

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    appIsReady: false,
    games: [],
  };

  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  prepareResources = async () => {
    try {
      let newGames:Game[];
      newGames = [];
  
      GetGameDataByDay()
        .then(function(result:gameDataResponseGame[]) {
        
          if (!result || result.length == 0 ) { // check for empty result
            console.log("no games");
            return newGames;
          }
          result.map(
            game => {
              let awayScore = game.status.score.away;
              let awayTeam = convertTeamID(game.teams.away);
              let balls = game.status.count.balls;
              let base1 = game.status.baseState.First;
              let base2 = game.status.baseState.Second;
              let base3 = game.status.baseState.Third;
              let homeScore = game.status.score.home;
              let homeTeam = convertTeamID(game.teams.home);
              let inning = game.status.inning;
              let inningTop = game.status.topOfInning;
              let inProgress = game.status.inProgress;
              let leverageIndex = game.leverageIndex;
              let outs = game.status.outs;
              let strikes = game.status.count.strikes;
              let time = new Date(game.gameTime);
              let uri = game.mlbTVLink;
  
              let newGame = new Game(awayScore, awayTeam, balls, base1, base2, base3, homeScore, homeTeam, inning, inningTop, inProgress, leverageIndex, outs, strikes, time, uri);
              newGames.push(newGame);
            }
          );
          return newGames;
        }).then(result => this.setState({games: result, appIsReady: true}));
    } catch (e) {
      console.warn(e);
    } finally {
      async () => {
        await SplashScreen.hideAsync();
      };
    }
  };

  render() {
    if (!this.state.appIsReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/images/loading.gif')}
            onLoad={this._cacheSplashResourcesAsync}
          />
        </View>
      );
    } else {
      console.log("app is ready");
      console.log(this.state.appIsReady);
      console.log(this.state.games);
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'WarningTrack' }}/> */}
            <Stack.Screen name="Games">
              {props => <GamesScreen {...props} games={this.state.games} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }

  _cacheSplashResourcesAsync = async () => {
    const gif = require('./assets/images/loading.gif');
    return Asset.fromModule(gif).downloadAsync();
  };
}

export interface GamesProps {
  games: Game[];
}

class GamesScreen extends React.Component<GameProps> {
  constructor(props:GameProps){
    super(props);
  }

  render(){
    let backgroundImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iIzQ0YWEwMCI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiM1NWQ0MDAiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiM1NWQ0MDAiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=';

    return (
      <View style={styles.container}>
        <ImageBackground imageStyle={styles.backgroundImg}
                        source={{uri: backgroundImg}}
                        style={styles.background}>
          <GamesContainer games={this.props.games}/>
        </ImageBackground>
      </View>
    );
  }
}

function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>WarningTrack</Text>
    </View>
  );  
}

export interface gameDataResponseGame {
  gameTime: string;
  leverageIndex: number;
  mlbID: number;
  mlbTVLink: string;
  status: {
    baseState: {
      First: boolean;
      Second: boolean;
      Third: boolean;
    };
    count: {
      balls: number;
      strikes: number;
    };
    inning: number;
    inProgress: boolean;
    outs: number;
    score: {
      away: number;
      home: number;
    },
    topOfInning: boolean;
  };
  teams: {
    away: number;
    home: number;
  };
}

async function GetGameDataByDay() {
  const proxy = 'https://cors-anywhere.herokuapp.com/'; // TODO: Remove this
  const gameDayData = 'https://us-central1-warning-track-backend.cloudfunctions.net/GetGameDataByDay';

  let d = new Date();
  let date = [
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2),
    d.getFullYear()
  ].join('-');

  return fetch((proxy + gameDayData), {
      body: JSON.stringify({date: date}),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      method: 'POST',
      mode: 'cors'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.games;
    })
    .catch((error) => {
      console.error(error);
    }
  );
}

function convertTeamID(mlbID: number): number {
  const teams = require('./team.json');
  for (let team of teams) {
    if (team.mlb_id == mlbID) {
      return team.id;
    }
  }
  return 0;
}

export interface GamesState {
  games: Game[];
}

class GamesContainer extends React.Component<GamesProps, GamesState> {
  constructor(props:GamesProps){
    super(props);
    this.state = { games: this.props.games };
    console.log("GamesContainer");
    console.log(this.state.games);
  }

  render(){
    console.log(this.state.games);
    return (
      this.state.games.length > 0 ? this.state.games.map(game => game.inProgress ? <GameContainer game={game} /> : <PreGameContainer game={game} />) : <LoadingGames />
    );
  }
}

export interface GameProps {
  game: Game;
}

class GameContainer extends React.Component<GameProps> {
  constructor(props:GameProps){
    super(props);
  }

  componentDidMount(){
    console.log(this.props.game);
  }

  render() {
    return (
      <View style={styles.gameContainer} key={this.props.game.url}>
        <LeverageIndex value={this.props.game.leverageIndex} />
        <View style={styles.gameStateContainer}>
          <Score awayScore={this.props.game.awayScore} awayTeam={this.props.game.awayTeam} homeScore={this.props.game.homeScore} homeTeam={this.props.game.homeTeam} />
          <View style={styles.bsos}>
            <View style={styles.bsoContainer}>
              <Text>B:</Text>
              <BallsStrikesOuts value={this.props.game.balls} />
            </View>
            <View style={styles.bsoContainer}>
              <Text>S:</Text>
              <BallsStrikesOuts value={this.props.game.strikes} />
            </View>
            <View style={styles.bsoContainer}>
              <Text>O:</Text>
              <BallsStrikesOuts value={this.props.game.outs} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.inningStateContainer} onPress={() => Linking.openURL(this.props.game.url)}>
          <View style={styles.baseRunnerContainer}>
            <BaseRunner value={this.props.game.baseRunnerInt()}/>
          </View>
          <Text style={styles.inningTxtContainer}>{this.props.game.inningTopString()}{this.props.game.inning}</Text>
          <MLBTVLogo/>
        </TouchableOpacity>
      </View>
    );
  }
}

export interface PreGameProps {
  game: Game;
}

class PreGameContainer extends React.Component<PreGameProps> {
  constructor(props:PreGameProps){
    super(props);
  }

  componentDidMount(){
    console.log(this.props.game);
  }

  render() {    
    let awayTeamLogoURI = 'https://warningtrack.co/img/team_logos/' + this.props.game.awayTeam + '.svg';
    let homeTeamLogoURI = 'https://warningtrack.co/img/team_logos/' + this.props.game.homeTeam + '.svg';

    return (
      <View style={styles.gameContainer} key={this.props.game.url}>
        <View style={styles.gameStateContainer}>
          <View style={styles.scoreContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={{uri: awayTeamLogoURI}} />
            </View>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={{uri: homeTeamLogoURI}} />
            </View>
            <Text style={styles.preGameTime}>{this.props.game.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
          </View>
        </View>
      </View>
    );
  }
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
      stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a"];
      fill = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
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

const LoadingGames: React.FC<{}> = (props) => {
  return (
    <View style={styles.loadingGamesContainer}>
      <Text style={styles.loadingGamesText}>Loading Games...</Text>
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
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{uri: awayTeamLogoURI}} />
      </View>
      <Text style={styles.score}>{props.awayScore}</Text>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{uri: homeTeamLogoURI}} />
      </View>
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
      stroke = ["#225500","#225500","#225500"];
      fill = ["#ffffff","#ffffff","#ffffff"];
      break;
  }
  return (
    <View style={styles.baseRunner}>
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

class MLBTVLogo extends React.Component {
  render(){
    return (
      <View style={styles.mlbTVContainer}>
        <Svg viewBox="0 0 335.85 81">
          <G>
            <Path fill="#fff" d="M321.54,0H12.22A12.3,12.3,0,0,0,3.56,3.52,12.15,12.15,0,0,0,0,12.23v54.5a12.1,12.1,0,0,0,3.54,8.68A12.25,12.25,0,0,0,12.22,79H321.54a12.25,12.25,0,0,0,12.19-12.27V12.23A12.14,12.14,0,0,0,321.54,0Z"/>
            <Path fill='#bc0022' d="M329.44,12.23a7.84,7.84,0,0,0-7.9-7.94H287.41L307,37l1.81.23,1.09,1.49v1.4l1.23.26,1.13,1.55v1.35l1.29.22,1.28,1.41V48A21.16,21.16,0,0,0,320,51.5c1.73.67,1.92,3.41,3,4.9,1.3,2.15,3.09,3,2.71,4.22-.88,3.21-4.17,8.63-7.23,8.89H306.35v5.2h15.19a7.93,7.93,0,0,0,7.9-8V12.23"/>
            <Path fill='#041e42' d="M246,69.56h-5.88c0-14.66,5-22.77,10.89-24.38.82-.15.43-4.16-.6-5.37,0,0-2.88,0-3.49,0s-.23-1-.23-1l2.78-5.94L249,31.17H238.82l8.45-5.9c.39-15.57,16.35-16.78,26-10.35C279,18.71,279.4,26.21,279,31.4c-.08.33-1.49.11-1.49.11s-1,5.68,1.57,5.68h11.23c4.58-.18,9,2.92,9,2.92l1.08-3.93L275.75,4.29H12.22a8.08,8.08,0,0,0-5.66,2.3,7.94,7.94,0,0,0-2.27,5.64v54.5a7.85,7.85,0,0,0,2.27,5.63,8,8,0,0,0,5.66,2.34H249c-1.21-2.08-2.6-4.45-3-5.14"/>
            <Path fill="#fff" d="M334.74,78.35c0-.61-.36-.7-.88-.7h-1.12v2.28h.48V79h.39l.53.91h.54l-.55-.91a.6.6,0,0,0,.61-.67m-.88.26h-.64v-.56h.53c.23,0,.52,0,.52.26s-.14.3-.41.3"/>
            <Path fill="#fff" d="M333.66,76.6a2.2,2.2,0,1,0,2.19,2.21,2.17,2.17,0,0,0-2.19-2.21m0,3.92a1.72,1.72,0,1,1,1.72-1.71,1.69,1.69,0,0,1-1.72,1.71"/>
            <Path fill="#fff" d="M141.75,38c2.41-1.29,4.7-5,4.7-8.39,0-7-5.93-12.62-14.32-12.62H111.24V62.8h21.3c8.45,0,15.78-4.45,15.78-13.61C148.32,43.67,145.92,40,141.75,38Zm-21.24-3.12V25.66h12.06a4.63,4.63,0,0,1,0,9.26Zm0,19.26V43.32H133.1a5.43,5.43,0,1,1,0,10.86Z"/>
            <Polygon fill="#fff" points="57.19 17.03 42.32 41.87 27.46 17.03 18.2 17.03 18.2 62.8 27.59 62.8 27.59 35.48 39.75 55.81 44.89 55.81 57.06 35.48 57.06 62.8 66.44 62.8 66.44 17.03 57.19 17.03"/>
            <Polygon fill="#fff" points="83.46 17.03 74.08 17.03 74.08 62.8 104.43 62.8 104.43 53.53 83.46 53.53 83.46 17.03"/>
            <Path fill="#fff" d="M158.89,52.31a5.53,5.53,0,1,0,5.53,5.53A5.53,5.53,0,0,0,158.89,52.31Z"/>
            <Path fill="#fff" d="M173.25,37.65h-10V29.49h29.43v8.16H182.57V63.1h-9.32Z"/>
            <Path fill="#fff" d="M195.72,29.49h10.37l7.63,21.27,7.68-21.27h10.18L217.94,63.34H209.3Z"/>
          </G>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
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
    maxWidth: 420,
    minHeight: 120,
    minWidth: 280,
    padding: 10,
    paddingTop: 50,
    justifyContent: 'center',
    shadowColor: '#225500',
    shadowOffset: {height: 4, width: 4},
    shadowOpacity: 0.5,
  },
  gameStateContainer: {
    marginTop: -20
  },
  headerTxt: {
    color: '#225500',
    fontFamily: 'Lobster_400Regular',
    fontSize: 48,
    textAlign: 'center'
  },
  inningStateContainer: {
    backgroundColor: '#55D400',
    borderColor: '#225500',
    borderRadius: 20,
    borderWidth: 1,
    height: 110,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -42,
    paddingTop: 2,
    width: 80
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
  loadingGamesContainer: {
    marginTop: 20
  },
  loadingGamesText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  logo: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 60,
    minWidth: 60,
    resizeMode: 'contain',
    width: '100%'
  },
  logoContainer: {
    height: '100%',
    marginHorizontal: 8,
    width: 60
  },
  mlbTVContainer: {
    padding: 8
  },
  preGameTime: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center'
  },
  score: {
    fontSize: 64,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: -4,
    textAlign: 'center'
  },
  scoreContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -20
  },
  team: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
