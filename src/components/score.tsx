import React from 'react';
import { Image, Text, View } from 'react-native';

import { LogoStyles } from '../styles/logo';
import { ScoreStyles } from '../styles/score';

export interface ScoreProps {
    awayScore: number;
    awayTeam: number;
    homeScore: number;
    homeTeam: number;
}

export const Score: React.FC<ScoreProps> = (props) => {
    let awayTeamLogoURI = 'assets/images/team_logos/' + props.awayTeam + '.svg'; 
    let homeTeamLogoURI = 'assets/images/team_logos/' + props.homeTeam + '.svg';

    return (
        <View style={ScoreStyles.scoreContainer}>
            <View style={LogoStyles.logoContainer}>
                <Image style={LogoStyles.logo} source={require('../../' + awayTeamLogoURI)} />
            </View>
            <Text style={ScoreStyles.score}>{props.awayScore}</Text>
            <View style={LogoStyles.logoContainer}>
                <Image style={LogoStyles.logo} source={require('../../' + homeTeamLogoURI)} />
            </View>
            <Text style={ScoreStyles.score}>{props.homeScore}</Text>
        </View>
    )
}
