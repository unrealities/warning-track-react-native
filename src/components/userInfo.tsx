import React from "react"
import { StyleSheet, Text, View } from "react-native"
import User from '../models/user'

interface IUserInfoProps {
    user: User,
}

const UserInfo: React.FC<IUserInfoProps> = (props: IUserInfoProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.user.name}</Text>
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
