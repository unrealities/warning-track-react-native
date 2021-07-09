import React from "react";
import { View } from "react-native";

import Background from "../components/background";
import { GameStyles } from "../styles/game";
import { GamesContainer, GamesProps } from "../components/game";

export class GamesScreen extends React.Component<GamesProps> {
  constructor(props: GamesProps) {
    super(props);
  }

  render() {
    return (
      <View style={GameStyles.gamesContainer}>
        <Background />
        <GamesContainer games={this.props.games} />
      </View>
    );
  }
}
