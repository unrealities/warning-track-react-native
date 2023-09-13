import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { getName, getGoogleID, getUserID } from '../utilities/hooks/localStorage'
import User from '../models/user'

//TODO: This needs to be dumb and take a user from settings
const UserInfo = () => {
    let u:User = {
        id: '',
        googleId: '',
        name: ''
    }
    const [user, setUser] = useState<User>(u)

    useEffect(() => {
        const fetchUser = async () => {
            let id = await getUserID()
            let gid = await getGoogleID()
            let name = await getName()
            let u = {
                id: id,
                googleId: gid,
                name: name
            }
            return u
        }

        fetchUser().then((u) => {
            let foundUser:User = {
                id: u.id,
                googleId: u.googleId,
                name: u.name
            }
            setUser(foundUser)
        })
    }, [user])

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
