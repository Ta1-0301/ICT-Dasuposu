import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'

export default function ChatList({users}) {
  return (
    <View style={styles.container}>
        <FlatList 
            data={users}
            contentContainerStyle={{paddingVertical: 25}}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => <ChatItem item={item} index={index} />}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
})