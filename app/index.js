import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from 'react-navigation';
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./SignUp";
import database from '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAhjroYDINyVKnojiMnFgZDS-r2pkS17ZQ",
  authDomain: "procon-2024-1feac.firebaseapp.com",
  databaseURL: "https://procon-2024-1feac-default-rtdb.firebaseio.com",
  projectId: "procon-2024-1feac",
  storageBucket: "procon-2024-1feac.appspot.com",
  messagingSenderId: "1063940012584",
  appId: "1:1063940012584:web:7b3e64c7dc47529a25931d",
  measurementId: "G-XEQ921VP5P"
};

const Stack = createStackNavigator();

export default function home() {
  return (
    <View style={styles.container}>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },

});