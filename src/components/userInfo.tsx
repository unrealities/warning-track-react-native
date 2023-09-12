import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { getName, getGoogleID, getUserID } from '../utilities/hooks/localStorage'
import User from '../models/user'

//TODO: This needs to be dumb and take a user from settings
const UserInfo = () => {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        let u = {
            id: '',
            googleId: '',
            name: ''
        }

        async function fetchUser() {
            return {getUserID, getGoogleID, getName}
        }

        fetchUser().then((id, gid, name) => {
            let user:User = {
                id: id,
                googleId: gid,
                name: name
            }
            setUser(user)
        })
    }, [])

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
