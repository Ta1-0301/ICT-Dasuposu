import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ChatItem({ item, index }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat Item</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  text: {
    fontSize: 16,
  }
})