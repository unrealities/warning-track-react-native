import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

import { GameStyles } from '../styles/game';
import { LogoStyles } from '../styles/logo';
import { Game } from '../../game';

export interface GameProps {
    game: Game;
}
export interface PreGameProps {
    game: Game;
}

export class PreGameContainer extends React.Component<PreGameProps> {
    constructor(props: PreGameProps) {
        super(props);
    }

    render() {
        let awayTeamLogoURI = 'assets/images/team_logos/' + this.props.game.awayTeam + '.svg';
        let homeTeamLogoURI = 'assets/images/team_logos/' + this.props.game.homeTeam + '.svg';

        return (
            <View style={GameStyles.gameContainer} key={this.props.game.url}>
                <View style={GameStyles.gameStateContainer}>
                    <View style={GameStyles.scoreContainer}>
                        <View style={LogoStyles.logoContainer}>
                            <Image style={LogoStyles.logo} source={require('./' + awayTeamLogoURI)} />
                        </View>
                        <View style={LogoStyles.logoContainer}>
                            <Image style={LogoStyles.logo} source={require('./' + homeTeamLogoURI)} />
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
                        <BaseRunner value={this.props.game.baseRunnerInt()} />
                    </View>
                    <Text style={styles.inningTxtContainer}>{this.props.game.inningTopString()}{this.props.game.inning}</Text>
                    <MLBTVLogo />
                </TouchableOpacity>
            </View>
        );
    }
}
