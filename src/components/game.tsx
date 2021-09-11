import React from "react";
import {
  Animated,
  Easing,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import moment from "moment";

import { BSOStyles } from "../styles/ballsStrikesOuts";
import { BaseRunnerStyles } from "../styles/baseRunner";
import { GameStyles } from "../styles/game";
import { LogoStyles } from "../styles/logo";

import { BallsStrikesOuts } from "../components/ballsStrikesOuts";
import { BaseRunner } from "../components/baseRunner";
import { Game } from "../utilities/game";
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

// TODO: Pulse component when five stars
export class GameContainer extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(0),
    };
  }

  componentDidMount = () => {
    if (this.excitingGame()) {
      this.scale();
    }
  };

  excitingGame = () => {
    return this.props.game.leverageIndex > 4;
  };

  scale = () => {
    this.state.scaleValue.setValue(0);
    Animated.timing(this.state.scaleValue, {
      duration: 600,
      easing: Easing.bounce,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    // bounce the games when the page is loaded
    const height = this.state.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 100], // TODO: can this be made a variable or tied to a stylesheet?
    });

    const width = this.state.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 410],
    });

    const animatedGameContainerStyles = [
      GameStyles.gameContainer,
      {
        height: height,
        width: width,
      },
    ];

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

export class GamesContainer extends React.Component<GamesProps, GamesState> {
  constructor(props: GamesProps) {
    super(props);
    this.state = { games: this.props.games };
  }

  gamesContainer() {
    if (this.state.games.length <= 0) {
      return <NoGames />;
    }

    return this.state.games.map((game) => {
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

  render() {
    return (
      <View style={GameStyles.gamesContainer}>{this.gamesContainer()}</View>
    );
  }
}

const NoGames: React.FC<{}> = (props) => {
  return (
    <View style={GameStyles.noGamesContainer}>
      <Text style={GameStyles.noGamesText}>No Games Today</Text>
    </View>
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
    this.scale();
  };

  scale = () => {
    this.state.scaleValue.setValue(0);
    Animated.timing(this.state.scaleValue, {
      duration: 600,
      easing: Easing.bounce,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    // bounce the games when the page is loaded
    const height = this.state.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 100], // TODO: can this be made a variable or tied to a stylesheet?
    });

    const width = this.state.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 410],
    });

    const animatedGameContainerStyles = [
      GameStyles.gameContainer,
      {
        height: height,
        width: width,
      },
    ];

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

let gameBounceStyle = (minHeight: number, minWidth: number, maxHeight: number, maxWidth: number, scaleValue: Animated.Value) => {
  const height = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [minHeight, maxHeight], // TODO: can this be tied to a stylesheet?
  });

  const width = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [minWidth, maxWidth],
  });

  return [
    GameStyles.gameContainer,
    {
      height: height,
      width: width,
    },
  ];
}
