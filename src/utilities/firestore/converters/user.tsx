import User from '../../../models/user'

export const UserConverter = {
    toFirestore: (user) => {
        let u: User = {
            id: user.id,
            name: user.name
        }
        return u
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        let u: User = {
            id: data.id,
            name: data.name
        }
        return u
    }
}
