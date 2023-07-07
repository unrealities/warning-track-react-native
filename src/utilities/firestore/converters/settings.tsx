import UserSettings from '../../../models/userSettings'

export const UserSettingsConverter = {
    toFirestore: (settings) => {
        let s: UserSettings = {
            userID: settings.userID,
            notificationsEnabled: settings.notificationsEnabled
        }
        return s
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        let s: UserSettings = {
            userID: data.userID,
            notificationsEnabled: data.notificationsEnabled
        }
        return s
    }
}
