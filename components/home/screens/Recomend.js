import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';

const Recomend = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([
    { id: "123", amount: "2kg", period: "1ヶ月", seller: "高専一郎", image: require("../screens/images/imo.jpg") },
    { id: "456", amount: "1kg", period: "0.5ヶ月", seller: "高専二郎", image: require("../screens/images/bou.jpg") },
    { id: "789", amount: "10kg", period: "2ヶ月", seller: "高専三郎", image: require("../screens/images/tomato.jpg") },
    { id: "101", amount: "5kg", period: "1.5ヶ月", seller: "高専四郎", image: require("../screens/images/imo.jpg") },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState({ amount: "", period: "", seller: "", image: null });

  const handlePress = (productId, sellerName) => {
    Alert.alert(
      "チャットへ移動",
      `${sellerName}とのチャット画面に移動しますか？`,
      [
        { text: "いいえ", style: "cancel" },
        { text: "はい", onPress: () => navigation.navigate('Chat', { productId: productId, sellerName: sellerName }) }
      ]
    );
  };

  const renderItem = (item) => (
    <TouchableOpacity key={item.id} onPress={() => handlePress(item.id, item.seller)}>
      <View style={styles.box}>
        <View style={styles.textbox}>
          <Text style={styles.text}>
            堆肥:{item.amount}{"\n"}熟成期間:{item.period}{"\n"}出品者:{item.seller}
          </Text>
        </View>
        <Image source={item.image} style={styles.imagebox} />
      </View>
    </TouchableOpacity>
  );

  const addNewPost = () => {
    if (newPost.amount && newPost.period && newPost.seller && newPost.image) {
      setPosts([...posts, { ...newPost, id: Date.now().toString() }]);
      setNewPost({ amount: "", period: "", seller: "", image: null });
      setModalVisible(false);
    } else {
      Alert.alert("エラー", "全ての項目を入力し、画像を選択してください。");
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setNewPost({...newPost, image: source});
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>堆肥提供先</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.boxContainer}>
          {posts.map(renderItem)}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="堆肥量"
            value={newPost.amount}
            onChangeText={(text) => setNewPost({...newPost, amount: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="熟成期間"
            value={newPost.period}
            onChangeText={(text) => setNewPost({...newPost, period: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="出品者名"
            value={newPost.seller}
            onChangeText={(text) => setNewPost({...newPost, seller: text})}
          />
          <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
            <Text style={styles.imageButtonText}>画像を選択</Text>
          </TouchableOpacity>
          {newPost.image && (
            <Image source={newPost.image} style={styles.previewImage} />
          )}
          <TouchableOpacity style={styles.submitButton} onPress={addNewPost}>
            <Text style={styles.submitButtonText}>投稿する</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>キャンセル</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 10,
    backgroundColor: "#D0A900",
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  boxContainer: {
    padding: 5,
  },
  box: {
    height: 140,
    width: "100%",
    marginVertical: 1,
    borderColor: "gray",
    borderWidth: 3,
    flexDirection: "row",
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
  textbox: {
    flex: 1,
    backgroundColor: "#D0A900",
    padding: 16,
    justifyContent: "center",
  },
  imagebox: {
    width: 200,
    height: 131,
    backgroundColor: "lightslategray",
  },

  addButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#D0A900',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  submitButton: {
    backgroundColor: "#D0A900",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  cancelButton: {
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  imageButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 15,
    resizeMode: 'cover',
  },
});

export default Recomend;