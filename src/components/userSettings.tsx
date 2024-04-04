import React, { useState } from 'react'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { FlatList, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import * as Notifications from 'expo-notifications'

import UserSettings from '../models/userSettings'
import { firebaseConfig } from '../config/firebase'
import { UserSettingsConverter } from '../utilities/firestore/converters/settings'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const settings = [
    {
        id: 'notifications',
        name: 'notifications'
    }
]

export interface SettingContainerProps {
    isEnabled: boolean,
    name: string,
    userID: string
}

interface IUserSettingsInfoProps {
    userSettings: UserSettings,
}

const UserSettingsInfo: React.FC<IUserSettingsInfoProps> = (props: IUserSettingsInfoProps) => {
    return (
        <View>
            <FlatList
                data={settings}
                renderItem={({ item }) => <SettingContainer name={item.name} isEnabled={false} userID={props.userSettings.userID} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false} />
        </View>
    )
}

const SettingContainer = (props: SettingContainerProps) => {
    const [name] = useState<string>(props.name)
    const [enabled, setEnabled] = useState<boolean>(props.isEnabled)

    const updateUserSettings = async (userIDToUpdate: string, notificationsEnabled: boolean) => {
        const userSettings: UserSettings = new UserSettings()
        userSettings.userID = userIDToUpdate
        userSettings.notificationsEnabled = notificationsEnabled

        try {
            await setDoc(doc(db, 'userSettings', userSettings.userID).withConverter(UserSettingsConverter), userSettings)
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    const updateSetting = (isEnabled: boolean) => {
        setEnabled(isEnabled)
        updateUserSettings(props.userID, isEnabled)
    }

    const triggerNotifications = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'You’ve got mail! 📬',
                body: 'Here is the notification body',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        })
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={triggerNotifications}>
                <Text>Trigger Local Notifications</Text>
            </Pressable>
            <Text style={styles.text}>{name}</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={enabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={updateSetting}
                style={styles.switch}
                value={enabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: 200
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        maxWidth: 300
    },
    switch: {
        flex: 1,
        maxWidth: 36
    },
    text: {
        flex: 1,
        fontFamily: 'Lobster-Regular',
        fontSize: 24,
        paddingRight: 10,
        minWidth: 160,
        maxWidth: 160
    }
})

export default UserSettingsInfo
