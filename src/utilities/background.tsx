import React from "react"
import { SafeAreaView, View } from "react-native"
import { GameStyles } from "../styles/game"
import Background from "../components/background"

export default function withBackground(WrappedComponent: Function) {
    return (
        <SafeAreaView style={GameStyles.mainContainer}>
            <View style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                bottom: 0,
                zIndex: -1,
            }}>
                <Background />
            </View>
            <WrappedComponent props={...this.props}/>
        </SafeAreaView>
    )
}
