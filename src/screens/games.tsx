import React from "react";
import { ScrollView } from "react-native";

import Background from "../components/background";
import { GameStyles } from "../styles/game";
import GamesContainer, { GamesProps } from "../components/game";

const GamesScreen = () => {
  return (
    <ScrollView contentContainerStyle={GameStyles.mainContainer}>
      <Background />
      <GamesContainer />
    </ScrollView>
  );
}

export default GamesScreen
