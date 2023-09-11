import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

//TODO: This needs to be dumb and take a user from settings
const UserInfo = (props: User) => {
    const [u] = useState<User>(props.user)
    console.log(u)
    return (
        <View style={styles.container}>
            <Text>User Info</Text>
            <Text>User ID: {u.id}</Text>
            <Text>Google ID: {u.googleId}</Text>
            <Text>Name: {u.name}</Text>
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
