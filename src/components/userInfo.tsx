import React from "react"
import { StyleSheet, Text, View } from "react-native"

//TODO: This needs to be dumb and take a user from settings
const UserInfo = (user: User) => {
    console.log(user["id"])
    return (
        <View style={styles.container}>
            <Text>User Info</Text>
            <Text>User ID: {user.id}</Text>
            <Text>Google ID: {user.googleId}</Text>
            <Text>Name: {user.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        padding: 8,
        width: 300
    },
    text: {
        flex: 1,
        fontFamily: 'Lobster-Regular',
        fontSize: 30,
        minHeight: 100,
        textAlign: 'center'
    }
})

export default UserInfo
