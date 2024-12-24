import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Calculator from './screens/Calculator'

export type RootStackParamList = {
  Home: undefined
  Calculator: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
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