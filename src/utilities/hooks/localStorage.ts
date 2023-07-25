import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

const name = 'name'
const userID = 'userID'

async function setName(name: string) {
  await AsyncStorage.setItem(name, name)
}

async function setUserID(id: string) {
  await AsyncStorage.setItem(userID, id)
}

export async function getName() {
  let n = await AsyncStorage.getItem(name)
  if (n) {
    return n
  } else {
    let defaultName = 'default name'
    setName(defaultName)
    return defaultName
  }
}

export async function getUserID() {
  let id = await AsyncStorage.getItem(userID)
  if (id) {
    return id
  } else {
    let newUserID = uuid.v4().toString()
    setUserID(newUserID)
    return newUserID
  }
}
