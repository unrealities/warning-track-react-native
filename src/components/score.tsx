import React from 'react';
import { Text, View } from 'react-native';

import { LogoStyles } from '../styles/logo';
import { ScoreStyles } from '../styles/score';
import { TeamLogo } from '../components/teamLogo';

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
                <TeamLogo id={props.awayTeam} />
            </View>
            <Text style={ScoreStyles.score}>{props.awayScore}</Text>
            <View style={LogoStyles.logoContainer}>
                <TeamLogo id={props.homeTeam} />
            </View>
            <Text style={ScoreStyles.score}>{props.homeScore}</Text>
        </View>
    )
}
