import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../styles'
import { Pressable, Text } from 'react-native'
import * as UserDefaultsSuiteIos from 'user-defaults-suite-ios'
import { useEffect, useState } from 'react'

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [invocationURL, setInvocationURL] = useState<string | null>(null)

  useEffect(() => {
    try {
      // try to get the invocationURL set in the app clip
      const url = UserDefaultsSuiteIos.getForSuite('group.com.timmyjose.clippy', 'invocationURL')
      if (url) {
        setInvocationURL(url)
        console.log(`invocationURL = ${invocationURL}`)
      }
    } catch (err: any) {
      setInvocationURL(null)
    }
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      { invocationURL && (<Text>Invocation URL: {invocationURL}</Text>)}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Calculator')}>
        <Text>Calculator</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Home