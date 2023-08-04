import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import UserSettings from '../../models/userSettings'

const googleID = 'googleID'
const name = 'name'
const userID = 'userID'
const userSettingsNotificationsEnabled = 'userSettingsNotificationsEnabled'

async function setGoogleID(id: string) {
  await AsyncStorage.setItem(googleID, id)
}

async function setName(name: string) {
  await AsyncStorage.setItem(name, name)
}

async function setUserID(id: string) {
  await AsyncStorage.setItem(userID, id)
}

async function setUserSettings(us: UserSettings) {
  await AsyncStorage.setItem(userSettingsNotificationsEnabled, us.notificationsEnabled.toString())
}

export async function getGoogleID() {
  let id = await AsyncStorage.getItem(googleID)
  if (id) {
    return id
  } else {
    return ''
  }
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
