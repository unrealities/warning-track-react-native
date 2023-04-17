import React from "react"
import { SafeAreaView } from "react-native"

import Background from "../components/background"
import { GameStyles } from "../styles/game"
import GamesContainer from "../components/game"

const GamesScreen = () => {
  return (
    <SafeAreaView style={GameStyles.mainContainer}>
      <Background />
      <GamesContainer />
    </SafeAreaView>
  )
}

export default GamesScreen
