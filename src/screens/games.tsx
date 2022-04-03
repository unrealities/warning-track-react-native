import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import Background from "../components/background";
import { GameStyles } from "../styles/game";
import GamesContainer, { GamesProps } from "../components/game";

const GamesScreen = (props: GamesProps) => {
  const [games] = useState(props.games)

  useEffect(() => {
    console.log(games);
  }, []);

  return (
    <ScrollView contentContainerStyle={GameStyles.mainContainer}>
      <Background />
      <GamesContainer games={games} />
    </ScrollView>
  );
}

export default GamesScreen
