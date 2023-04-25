import React, { useCallback, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as WebBrowser from 'expo-web-browser'
import * as Network from 'expo-network'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { Ionicons } from '@expo/vector-icons'

import GamesScreen from './src/screens/games'
import { NotificationsScreen } from './src/screens/notifications'
import { SettingsScreen } from './src/screens/settings'
import { firebaseConfig } from './src/config/firebase'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null)
WebBrowser.maybeCompleteAuthSession()

SplashScreen.preventAutoHideAsync()

const App = () => {
  // const { user } = useAuthentication()

  let [fontsLoaded] = useFonts({
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf')
  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  const [isNetworkConnected, setIsNetworkConnected] = useState<boolean>(true)
  const Tab = createBottomTabNavigator()

  useEffect(() => {
    const networkConnected = async () => {
      try {
        await Network.getNetworkStateAsync().then((networkState) => {
          networkState.isInternetReachable ? setIsNetworkConnected(true) : setIsNetworkConnected(false)
        })
      } catch (e) {
        console.error("No network connection")
      }
    }
    networkConnected()
  })

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Games"
        tabBarOptions={{
          activeBackgroundColor: "#faf5e3",
          activeTintColor: "#593811",
          labelStyle: {
            color: "#63513c",
            fontSize: 18,
            fontWeight: "400",
          },
          style: {
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
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="construct-outline" size={24} color={"#63513c"} />
            ),
          }}
        />
        <Tab.Screen
          name="Games"
          component={GamesScreen}
          options={{
            tabBarLabel: "Games",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="baseball-outline" color={"#63513c"} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
