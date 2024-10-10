import { View, Text, StatusBar, StyleSheet, Image, Button, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Octicons }from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import Loading from '../components/Loading';
import { useAuth } from '@/constants/authContext';


const SignIn = () => {
  //const navigation = useNavigation();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");


  const handleLogin = async ()=>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert("サインイン", "すべての項目を入力ください")
      return;

    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    console.log('sign in response: ', response);
    if(!response.success){
      Alert.alert('サインイン', response.msg)
    }

    // login proccess

  }


  return (
    <SafeAreaView> 
      <StatusBar style="dark" />
      <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} className="flex-1 gap-12">
        {/* signIN image */}
        <View className="item-center">
        <Image style={styles.logo}
          source={require("../components/home/screens/images/header-logo.png")}
        />

        <View>
          <Text style={styles.text}>サインイン</Text>
        </View>

        <View className="gap-10">
          <Text style={styles.textbox}></Text>
          {/* inputs */}
          <View style={styles.box}>
            <Octicons style={styles.mail} name="mail" size={hp(2.7)} color="gray" />
            <TextInput 
              onChangeText={value=> emailRef.current=value}
              style={styles.textinput}
              placeholder='メールアドレス'
            />

            <Text style={styles.passbox}></Text>
          {/* inputs */}
            <Octicons style={styles.pass} name="lock" size={hp(2.7)} color="gray" />
            <TextInput 
              onChangeText={value=> passwordRef.current=value}
              style={styles.passinput}
              placeholder='パスワード'
              secureTextEntry
            />
         
          </View> 
        </View>

        <View>
          {
            loading? (
              <View style={styles.load}>
                <Loading size={hp(8)}/>
              </View>
            ):(
              <TouchableOpacity style={styles.signinbox} onPress={handleLogin}>
                <View>
                  <Text style={styles.signintext}>サインイン</Text>
                </View>
              </TouchableOpacity>

            )
          }
        </View>

        <View>
          <Text style={styles.singuptext}>アカウントをお持ちでない方は</Text>
          <Pressable onPress={()=> router.push('/SignUp')}>
            <Text style={styles.signuptext2}>サインアップ</Text>
          </Pressable>
        </View>
        
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 75,
    marginHorizontal: "auto",
    marginTop: 180,
  },

  text: {
    fontSize: 40,
    marginHorizontal: "auto",
  },

  box: {
    width: 300,
    height: 50,
    backgroundColor: "#e3e3e3",
    marginHorizontal: "auto",
    borderRadius: 10,
  },

  mail: {
    marginTop: 15,
    marginLeft: 5,
  },

  textinput: {
    marginLeft: 40,
    marginTop: -27,
  },

  passbox: {
    width: 300,
    height: 50,
    backgroundColor: "#e3e3e3",
    marginHorizontal: "auto",
    marginVertical: 30,
    borderRadius: 10,
  },

  pass: {
    marginVertical:-65,
    marginLeft: 10,

  },

  passinput: {
    height: 40,
    marginLeft:40,
    marginTop: 30,
  },

  signinbox: {
    width: 200,
    height: 50,
    backgroundColor: "#2e8b57",
    marginHorizontal: "auto",
    borderRadius: 10,
    marginVertical: 80,
  },

  signintext: {
    color: "white",
    marginHorizontal: "auto",
    marginTop: 15,
    fontWeight: "bold",
  },

  load: {
    marginHorizontal: 'auto',
    marginTop: 50,
  },

  singuptext: {
    marginLeft: 30,
    marginTop: -75,

  },

  signuptext2: {
    marginLeft: 230,
    marginTop: -19.2, 
    fontWeight: "bold",
    color: "#2e8b57",
  },
  
})

export default SignIn;