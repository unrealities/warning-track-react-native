import settings from '../../../models/settings'

export const settingsConverter = {
    toFirestore: (settings) => {
        let s: Settings = {
            notificationsEnabled: settings.notificationsEnabled
        }
        return s
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        let s: Settings = {
            notificationsEnabled: data.notificationsEnabled
        }
        return s
    }
}
