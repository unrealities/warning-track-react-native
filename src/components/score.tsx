import React from 'react';
import { Image, Text, View } from 'react-native';

import { LogoStyles } from '../styles/logo';
import { ScoreStyles } from '../styles/score';
import { Logos } from '../utilities/logos';

export interface ScoreProps {
    awayScore: number;
    awayTeam: number;
    homeScore: number;
    homeTeam: number;
}

export const Score: React.FC<ScoreProps> = (props) => {
    return (
        <View style={ScoreStyles.scoreContainer}>
            <View style={LogoStyles.logoContainer}>
                <Image style={LogoStyles.logo} source={Logos[this.props.awayTeam]} />
            </View>
            <Text style={ScoreStyles.score}>{props.awayScore}</Text>
            <View style={LogoStyles.logoContainer}>
                <Image style={LogoStyles.logo} source={Logos[this.props.homeTeam]} />
            </View>
            <Text style={ScoreStyles.score}>{props.homeScore}</Text>
        </View>
    )
}
