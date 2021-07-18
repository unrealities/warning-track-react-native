import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

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

export class GameContainer extends React.Component<GameProps> {
  constructor(props: GameProps) {
    super(props);
  }

  render() {
    return (
      <View style={GameStyles.gameContainer} key={this.props.game.url}>
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
      </View>
    );
  }
}

export class GamesContainer extends React.Component<GamesProps, GamesState> {
  constructor(props: GamesProps) {
    super(props);
    this.state = { games: this.props.games };
  }

  render() {
    return (
      // TODO: This is terrible coding style
      // TODO: Properly handle suspended games. inProgress = false. leverageIndex > -1
      <View style={GameStyles.gamesContainer}>
        { this.state.games.length <= 0 ? ( <NoGames /> ) : null }
        { this.state.games.map((game) =>
            ( game.inProgress || game.leverageIndex > -1 ) ? (
              <GameContainer game={game} key={game.url} />
            ) : game.awayScore > 0 || game.homeScore > 0 ? (
              <PostGameContainer game={game} key={game.url} />
            ) : (
              <PreGameContainer game={game} key={game.url} />
            )
          )
        }
      </View>
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

export class PreGameContainer extends React.Component<PreGameProps> {
  constructor(props: PreGameProps) {
    super(props);
  }

  render() {
    return (
      <View style={GameStyles.gameContainer} key={this.props.game.url}>
        <View style={GameStyles.nonLiveGameContainer}>
          <View style={LogoStyles.logoContainer}>
            <TeamLogo id={this.props.game.awayTeam} />
          </View>
          <View style={GameStyles.atContainer}>
            <Text style={GameStyles.atTxt}>@</Text>
          </View>
          <View style={LogoStyles.logoContainer}>
            <TeamLogo id={this.props.game.homeTeam} />
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(this.props.game.url)} >
            <Text style={GameStyles.preGameTime}>{moment(this.props.game.time).format("LT")}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
