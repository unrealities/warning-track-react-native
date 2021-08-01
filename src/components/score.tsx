import React from "react";
import { Text, View } from "react-native";

import { LogoStyles } from "../styles/logo";
import { ScoreStyles } from "../styles/score";
import { TeamLogo } from "../components/teamLogo";
import { Team } from "../utilities/team";

export interface ScoreProps {
  awayScore: number;
  awayTeam: Team;
  homeScore: number;
  homeTeam: Team;
}

export const Score: React.FC<ScoreProps> = (props) => {
  return (
    <View style={ScoreStyles.scoreContainer}>
      <View style={LogoStyles.logoContainer}>
        <TeamLogo id={props.awayTeam.id} />
      </View>
      <Text style={ScoreStyles.score}>{props.awayScore}</Text>
      <View style={LogoStyles.logoContainer}>
        <TeamLogo id={props.homeTeam.id} />
      </View>
      <Text style={ScoreStyles.score}>{props.homeScore}</Text>
    </View>
  );
};
