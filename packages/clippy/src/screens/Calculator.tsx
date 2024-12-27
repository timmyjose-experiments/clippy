import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../styles'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useCallback, useState } from 'react'

const Calculator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [res, setRes] = useState<number | null>(null)

  const handleAdd = useCallback(async () => {
    const sum = x + y
    setRes(sum)
  }, [x, y])

  const handleSub = useCallback(async () => {
    const diff = x - y
    setRes(diff)
  }, [x, y])

  const handleMul = useCallback(async () => {
    const prod = x * y
    setRes(prod)
  }, [x, y])

  const handleDiv = useCallback(async () => {
    const quot = y == 0 ? 0 : x / y
    setRes(quot)
  }, [x, y])

  return (
    <SafeAreaView style={styles.container}>
      { res && (<Text>{res}</Text>)}
      <TextInput
        style={styles.textInput}
        keyboardType='numeric'
        value={x.toString()}
        onChangeText={text => setX(parseFloat(text))} />
      <TextInput
        style={styles.textInput}
        keyboardType='numeric'
        value={y.toString()}
        onChangeText={text => setY(parseFloat(text))} />
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          style={styles.smallButton}
          onPress={handleAdd}>
         <Text>Add</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={handleSub}>
         <Text>Sub</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={handleMul}>
         <Text>Mul</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={handleDiv}>
         <Text>Div</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Calculator
