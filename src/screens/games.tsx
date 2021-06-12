import React from "react";
import { ScrollView } from "react-native";

import Background from "../components/background";
import { GamesContainer, GamesProps } from "../components/game";

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
