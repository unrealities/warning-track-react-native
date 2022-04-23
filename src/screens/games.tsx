import React from "react";
import { ScrollView, View } from "react-native";

import Background from "../components/background";
import { GameStyles } from "../styles/game";
import GamesContainer, { GamesProps } from "../components/game";

const GamesScreen = () => {
  return (
    <View>
      <Background />
      <ScrollView contentContainerStyle={GameStyles.mainContainer}>
        <GamesContainer />
      </ScrollView>
    </View>
  );
}

export default GamesScreen
