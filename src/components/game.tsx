import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

import { BSOStyles } from '../styles/ballsStrikesOuts';
import { BaseRunnerStyles } from '../styles/baseRunner';
import { GameStyles } from '../styles/game';
import { LogoStyles } from '../styles/logo';

import { BallsStrikesOuts } from '../components/ballsStrikesOuts';
import { BaseRunner } from '../components/baseRunner';
import { Game } from '../utilities/game';
import { LeverageIndex } from './leverageIndex';
import { Logos } from '../utilities/logos';
import { MLBTVLogo } from './logo';
import { Score } from './score';

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

export class PreGameContainer extends React.Component<PreGameProps> {
    constructor(props: PreGameProps) {
        super(props);
    }

    render() {
        return (
            <View style={GameStyles.gameContainer} key={this.props.game.url}>
                <View style={GameStyles.gameStateContainer}>
                    <View style={GameStyles.scoreContainer}>
                        <View style={LogoStyles.logoContainer}>
                            <Image style={LogoStyles.logo} source={Logos[this.props.game.awayTeam]} />
                        </View>
                        <View style={LogoStyles.logoContainer}>
                            <Image style={LogoStyles.logo} source={Logos[this.props.game.homeTeam]} />
                        </View>
                        <Text style={GameStyles.preGameTime}>{this.props.game.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                    </View>
                </View>
            </View>
        );
    }
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
                    <Score awayScore={this.props.game.awayScore} awayTeam={this.props.game.awayTeam} homeScore={this.props.game.homeScore} homeTeam={this.props.game.homeTeam} />
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
                <TouchableOpacity style={GameStyles.inningStateContainer} onPress={() => Linking.openURL(this.props.game.url)}>
                    <View style={BaseRunnerStyles.baseRunnerContainer}>
                        <BaseRunner value={this.props.game.baseRunnerInt()} />
                    </View>
                    <Text style={GameStyles.inningTxtContainer}>{this.props.game.inningTopString()}{this.props.game.inning}</Text>
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
            <View>
                { this.state.games.length > 0 ? this.state.games.map(game => game.inProgress ? <GameContainer game={game} key={game.url} /> : <PreGameContainer game={game} key={game.url} />) : <NoGames />}
            </View>
        );
    }
}

const NoGames: React.FC<{}> = (props) => {
    return (
        <View style={GameStyles.noGamesContainer}>
            <Text style={GameStyles.noGamesText}>No Games Today</Text>
        </View>
    )
}
