import { Text, View, Image, StyleSheet} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'


const RootLayout = () => {
  return (
    <View>     
        <Link href="/getting_started">
         <View style={styles.container}>
            <Image
              source={require('./../assets/images/logo-small.png')}
           />
          </View>
        </Link>
    </View>
  )
}

export default RootLayout

const styles=StyleSheet.create({
  container:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#153B34',
    height:'100%',
    width:'100%'
  }
})