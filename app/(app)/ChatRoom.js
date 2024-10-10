import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../../constants/authContext';
import { useRoute } from '@react-navigation/native';

const ChatRoom = () => {
  const route = useRoute();
  const { user } = useAuth();
  const otherUserId = route.params?.otherUserId;
  const otherUsername = route.params?.otherUsername;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // エラー状態を確認
  if (!otherUserId || !otherUsername) {
    return (
      <View style={styles.container}>
        <Text>エラー: チャットルームの情報が不足しています。</Text>
      </View>
    );
  }

  useEffect(() => {
    if (!user?.uid) return; // ユーザーが認証されていない場合は何もしない

    const chatId = [user.uid, otherUserId].sort().join('_');
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [user?.uid, otherUserId]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '' || !user?.uid) return;

    const chatId = [user.uid, otherUserId].sort().join('_');
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    
    try {
      await addDoc(messagesRef, {
        text: inputMessage,
        createdAt: new Date(),
        userId: user.uid,
        username: user.displayName || 'Anonymous'
      });

      setInputMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
      // ここでユーザーにエラーを通知することもできます
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.userId === user?.uid ? styles.sentMessage : styles.receivedMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>
        {item.createdAt?.toDate().toLocaleTimeString() || 'Time unknown'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="メッセージを入力..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>送信</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#D0A900',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default ChatRoom;