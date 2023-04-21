import React from "react"
import { SafeAreaView } from "react-native"
import { GameStyles } from "../styles/game"
import Background from "../components/background"

export default function withBackground(WrappedComponent: Function) {
    return (
        <SafeAreaView style={GameStyles.mainContainer}>
            <Background />
            <WrappedComponent />
        </SafeAreaView>
    )
}
