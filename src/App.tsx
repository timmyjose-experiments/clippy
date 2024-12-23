import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Calculator from './screens/Calculator'
import { Alert, Settings } from 'react-native'
import { useEffect, useState } from 'react'

export type RootStackParamList = {
  Home: undefined
  Calculator: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const [invocationURL, setInvocationURL] = useState<string | null>(null)

  useEffect(() => {
    try {
      // log all settings
      console.log(`Settings: ${Settings}`)

      // try to get the invocationURL set in the app clip
      const url = Settings.get('invocationURL')
      if (url) {
        setInvocationURL(url)
      }

      console.log(`invocationURL = ${invocationURL}`)

      if (url) {
        Alert.alert(`invocationURL = ${url}`)
      }
    } catch (err: any) {
      setInvocationURL(null)
    }
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Calculator' component={Calculator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App