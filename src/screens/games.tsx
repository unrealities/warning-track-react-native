import React from "react";
import { ScrollView, View } from "react-native";

import Background from "../components/background";
import { GamesContainer, GamesProps } from "../components/game";
import { GameStyles } from "../styles/game";

export class GamesScreen extends React.Component<GamesProps> {
  constructor(props: GamesProps) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Background />
        <GamesContainer games={this.props.games} />
      </ScrollView>
    );
  }
}
