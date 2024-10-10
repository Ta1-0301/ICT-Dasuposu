import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/home/screens/Header'
import Recomend from '../../components/home/screens/Recomend'
import Point from '../../components/home/screens/Point'
import Bar from '../../components/home/screens/Bar'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import index from '../index';
import '@react-native-firebase/app';


const home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Point />
      <Bar />
      <Recomend />
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})
export default home