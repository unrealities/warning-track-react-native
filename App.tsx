import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import * as WebBrowser from 'expo-web-browser'
import * as Network from 'expo-network'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

import { getAnalytics, isSupported } from 'firebase/analytics'
import { Ionicons } from '@expo/vector-icons'
import uuid from 'react-native-uuid'

import GamesScreen from './src/screens/games'
import { SettingsScreen } from './src/screens/settings'
import { firebaseConfig } from './src/config/firebase'
import { getAuth, signInAnonymously } from 'firebase/auth'
import User from './src/models/user'
import { UserConverter } from './src/utilities/firestore/converters/user'
import { getName, getUserID } from './src/utilities/hooks/localStorage'

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null)
WebBrowser.maybeCompleteAuthSession()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

SplashScreen.preventAutoHideAsync()

const App = () => {
  let [fontsLoaded] = useFonts({
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  const [isNetworkConnected, setIsNetworkConnected] = useState<boolean>(true)
  const [user, setUser] = useState<User>({
    id: uuid.v4().toString(),
    googleId: '',
    name: 'default'
  })
  const Tab = createBottomTabNavigator()

  useEffect(() => {
    const setLocalUser = async () => {
      const id = await getUserID()
      const name = await getName()
      setUser({ ...user, id, name })
    }

    setLocalUser()
  }, [])

  useEffect(() => {
    const networkConnected = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync()
        setIsNetworkConnected(networkState.isInternetReachable)
      } catch (e) {
        console.error("No network connection")
      }
    }

    const updateUser = async (userToUpdate: User) => {
      const docRef = doc(db, 'users', userToUpdate.id).withConverter(UserConverter)
      const docSnap = await getDoc(docRef)

      try {
        if (!docSnap.exists()) {
          const id = await getUserID()
          userToUpdate.id = id
          setUser(userToUpdate)
          await setDoc(doc(db, 'users', userToUpdate.id).withConverter(UserConverter), userToUpdate)
        }
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }

    const setCloudUser = async () => {
      if (!auth.currentUser) {
        await signInAnonymously(auth)
      }
    }

    networkConnected()
    if (isNetworkConnected) {
      setCloudUser()
      updateUser(user)
    }
  }, [isNetworkConnected])

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Games"
          screenOptions={{
            tabBarActiveBackgroundColor: "#faf5e3",
            tabBarActiveTintColor: "#593811",
            tabBarLabelStyle: {
              color: "#63513c",
              fontSize: 18,
              fontWeight: "400",
            },
            tabBarStyle: {
              backgroundColor: "#faf5e3",
              borderTopColor: "#63513c",
              borderTopWidth: 2,
              shadowColor: "#2e261c",
              shadowOffset: { height: -2, width: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 1,
            }
          }}
        >
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Settings",
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name="construct-outline" size={24} color={"#63513c"} />
              ),
            }}
          />
          <Tab.Screen
            name="Games"
            component={GamesScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Games",
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name="baseball-outline" color={"#63513c"} size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default App
