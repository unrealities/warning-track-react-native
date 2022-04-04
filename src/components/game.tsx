import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import moment from "moment";

import { BSOStyles } from "../styles/ballsStrikesOuts";
import { BaseRunnerStyles } from "../styles/baseRunner";
import { GameStyles } from "../styles/game";
import { LogoStyles } from "../styles/logo";

import { BallsStrikesOuts } from "../components/ballsStrikesOuts";
import { BaseRunner } from "../components/baseRunner";
import { ConvertGames, Game } from "../utilities/game";
import { LeverageIndex } from "./leverageIndex";
import { MLBTVLogo } from "./logo";
import { TeamLogo } from "../components/teamLogo";
import { Score } from "./score";

export interface GameProps {
  game: Game;
}

export interface GameState {
  scaleValue: Animated.Value;
}

export interface GamesProps {
  games: Game[];
}

export interface GamesState {
  games: Game[];
}
export interface PreGameProps {
  game: Game;
}

export interface PostGameProps {
  game: Game;
}

export interface NoGameProps {
  game: Game;
}


export class GameContainer extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(0),
    };
  }

  componentDidMount = () => {
    if (this.excitingGame()) {
      this.state.scaleValue.setValue(1);
      gameAnimation(600, this.state.scaleValue);
    }
  };

  excitingGame = () => {
    return this.props.game.leverageIndex > 4;
  };

  render() {
    const animationChange = 1.2;
    const animatedGameContainerStyles = gameAnimationStyle(
      animationChange * StyleSheet.flatten(GameStyles.gameContainer).maxHeight,
      StyleSheet.flatten(GameStyles.gameContainer).maxHeight,
      animationChange * StyleSheet.flatten(GameStyles.gameContainer).maxWidth,
      StyleSheet.flatten(GameStyles.gameContainer).maxWidth,
      this.state.scaleValue,
      GameStyles.gameStateContainer
    );

    return (
      <Animated.View
        style={animatedGameContainerStyles}
        key={this.props.game.url}
      >
        <LeverageIndex value={this.props.game.leverageIndex} />
        <View style={GameStyles.gameStateContainer}>
          <Score
            awayScore={this.props.game.awayScore}
            awayTeam={this.props.game.awayTeam}
            homeScore={this.props.game.homeScore}
            homeTeam={this.props.game.homeTeam}
          />
          <View style={BSOStyles.bsos}>
            <View style={BSOStyles.bsoContainer}>
              <Text>B:</Text>
              <BallsStrikesOuts value={this.props.game.balls} />
            </View>
            <View style={BSOStyles.bsoContainer}>
              <Text>S:</Text>
              <BallsStrikesOuts value={this.props.game.strikes} />
            </View>
            <View style={BSOStyles.bsoContainer}>
              <Text>O:</Text>
              <BallsStrikesOuts value={this.props.game.outs} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={GameStyles.inningStateContainer}
          onPress={() => Linking.openURL(this.props.game.url)}
        >
          <View style={BaseRunnerStyles.baseRunnerContainer}>
            <BaseRunner value={this.props.game.baseRunnerInt()} />
          </View>
          <Text style={GameStyles.inningTxtContainer}>
            {this.props.game.inningTopString()}
            {this.props.game.inning}
          </Text>
          <MLBTVLogo />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const GamesContainer = (props: GamesProps) => {
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    try {
      ConvertGames().then(cg => {setGames(cg)})
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => fetchGames(), 3000);
    return () => clearInterval(intervalId);
  }, [games]);

  const gamesContainer = () => {
    if (games.length <= 0) {
      return <NoGames />;
    }

    return games.map((game) => {
      switch (game.viewType) {
        case "post":
          return <PostGameContainer game={game} key={game.url} />;
        case "pre":
          return <PreGameContainer game={game} key={game.url} />;
        default:
          return <GameContainer game={game} key={game.url} />;
      }
    });
  }

  return (
    <View style={GameStyles.gamesContainer}>{gamesContainer()}</View>
  );
}

// TODO: No Bounce
const NoGames = () => {
  const animate = new Animated.Value(0);
  const [scaleValue] = useState(animate);
  let noGamesText = "No Games Today";

  const animationChange = 0.8;
  const animatedGameContainerStyles = gameAnimationStyle(
    animationChange * StyleSheet.flatten(GameStyles.gameContainer).minHeight,
    StyleSheet.flatten(GameStyles.gameContainer).minHeight,
    animationChange * StyleSheet.flatten(GameStyles.gameContainer).width,
    StyleSheet.flatten(GameStyles.gameContainer).width, scaleValue, GameStyles.noGamesContainer
  );

  useEffect(() => {
    scaleValue.setValue(0);
    gameAnimation(600, scaleValue);
  }, []);

  return (
    <Animated.View style={animatedGameContainerStyles}>
      <Text style={GameStyles.noGamesText}>{noGamesText}</Text>
    </Animated.View>
  );
};

export class PreGameContainer extends React.Component<PreGameProps, GameState> {
  constructor(props: PreGameProps) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(0),
    };
  }

  componentDidMount = () => {
    this.state.scaleValue.setValue(0);
    gameAnimation(600, this.state.scaleValue);
  };

  render() {
    const animationChange = 0.8;
    const animatedGameContainerStyles = gameAnimationStyle(
      animationChange * StyleSheet.flatten(GameStyles.gameContainer).minHeight,
      StyleSheet.flatten(GameStyles.gameContainer).minHeight,
      animationChange * StyleSheet.flatten(GameStyles.gameContainer).width,
      StyleSheet.flatten(GameStyles.gameContainer).width,
      this.state.scaleValue,
      GameStyles.gameContainer
    );

    return (
      <Animated.View
        style={animatedGameContainerStyles}
        key={this.props.game.url}
      >
        <View style={GameStyles.nonLiveGameContainer}>
          <View style={LogoStyles.logoContainer}>
            <TeamLogo id={this.props.game.awayTeam.id} />
          </View>
          <View style={GameStyles.atContainer}>
            <Text style={GameStyles.atTxt}>@</Text>
          </View>
          <View style={LogoStyles.logoContainer}>
            <TeamLogo id={this.props.game.homeTeam.id} />
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL(this.props.game.url)}
          >
            <Text style={GameStyles.preGameTime}>
              {moment(this.props.game.time).format("LT")}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

export class PostGameContainer extends React.Component<PostGameProps> {
  constructor(props: PostGameProps) {
    super(props);
  }

  render() {
    return (
      <View style={GameStyles.nonLiveGameContainer} key={this.props.game.url}>
        <View style={GameStyles.gameStateContainer}>
          <View style={GameStyles.scoreContainer}>
            <Score
              awayScore={this.props.game.awayScore}
              awayTeam={this.props.game.awayTeam}
              homeScore={this.props.game.homeScore}
              homeTeam={this.props.game.homeTeam}
            />
            <TouchableOpacity
              style={GameStyles.finalTxtContainer}
              onPress={() => Linking.openURL(this.props.game.url)}
            >
              <Text style={GameStyles.finalTxt}>F</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

let gameAnimationStyle = (
  heightStart: number,
  heightFinish: number,
  widthStart: number,
  widthFinish: number,
  scaleValue: Animated.Value,
  style: ViewStyle
) => {
  const height = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [heightStart, heightFinish],
  });
  const width = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [widthStart, widthFinish],
  });

  return [
    style,
    {
      height: height,
      width: width,
    },
  ];
};

let gameAnimation = (duration: number, scaleValue: Animated.Value) => {
  Animated.timing(scaleValue, {
    duration: duration,
    easing: Easing.bounce,
    toValue: 1,
    useNativeDriver: false,
  }).start();
};

export default GamesContainer
