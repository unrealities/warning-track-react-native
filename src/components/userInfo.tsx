import React, { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { getName, getGoogleID, getUserID } from '../utilities/hooks/localStorage'

//TODO: This needs to be dumb and take a user from settings
const UserInfo = () => {
    let u: User = {
        id: '',
        googleId: '',
        name: ''
    }

    useEffect(() => {
        const getUser = async () => {
            u.id = await getUserID()
            u.googleId = await getGoogleID()
            u.name = await getName()
        }
        getUser()
    })

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
