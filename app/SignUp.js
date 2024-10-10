import { View, Text, StatusBar, StyleSheet, Image, Button, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Octicons }from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import Loading from '../components/Loading'
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/constants/authContext';
import CustomKeyboardView from '../components/CustomKeyboardView';



const SignUp = () => {
  const router = useRouter();
  const {register} = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");


  const handleRegister = async ()=>{
    if(!emailRef.current || !passwordRef.current || !usernameRef.current){
      Alert.alert("戻る", "すべての項目を入力してください")
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current)
    setLoading(false);

    console.log('got result: ', response)
    if(!response.success){
      Alert.alert('サインアップ', response.msg);
    }

  }


  return (
    <CustomKeyboardView>
      <SafeAreaView> 
        <StatusBar style="dark" />
        <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} className="flex-1 gap-12">
          {/* signIN image */}
          <View className="item-center">
          <Image style={styles.logo}
            source={require("../components/home/screens/images/header-logo.png")}
          />

          <View>
            <Text style={styles.text}>サインアップ</Text>
          </View>

        
            <Text style={styles.textbox}></Text>
            {/* inputs */}
            <View style={styles.box}>
              <Octicons style={styles.mail} name="mail" size={hp(2.7)} color="gray" />
              <TextInput 
                onChangeText={value=> emailRef.current=value}
                style={styles.textinput}
                placeholder='メールアドレス'
              />

              <Text style={styles.userbox}></Text>
            {/* inputs */}
              <Feather style={styles.user} name="user" size={hp(2.7)} color="gray" />
              <TextInput 
                onChangeText={value=> usernameRef.current=value}
                style={styles.userinput}
                placeholder='ユーザーネーム'
              />

              <Text style={styles.passbox}></Text>
            {/* inputs */}
              <Octicons style={styles.pass} name="lock" size={hp(2.7)} color="gray" />
              <TextInput 
                onChangeText={value=> passwordRef.current=value}
                style={styles.passinput}
                secureTextEntry
                placeholder='パスワード'
              />
         
          </View> 

          <View>
            {
              loading? (
                <View style={styles.load}>
                  <Loading size={hp(8)}/>
                </View>
              ):(
                <TouchableOpacity onPress={handleRegister} style={styles.signinbox} >
                  <View>
                    <Text style={styles.signintext}>サインアップ</Text>
                  </View>
                </TouchableOpacity>

              )
            }
          </View>

          <View>
            <Text style={styles.singuptext}>アカウントをお持ちの方は</Text>
            <Pressable onPress={()=> router.push('/SignIn')}>
              <Text style={styles.signuptext2}>サインイン</Text>
            </Pressable>
          </View>
        
          </View>
        </View>
      </SafeAreaView>
      </CustomKeyboardView>
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
    marginVertical: 25,
    borderRadius: 10,
  },

  userbox: {
    width: 300,
    height: 50,
    backgroundColor: "#e3e3e3",
    marginHorizontal: "auto",
    marginVertical: 20,
    borderRadius: 10,
  },

  userinput: {
    height: 20,
    marginLeft: 40,
    marginTop: 40,
  },

  user: {
    marginVertical: -60,
    marginLeft: 10,
  },

  pass: {
    marginVertical:-65,
    marginLeft: 10,

  },

  passinput: {
    height: 40,
    marginLeft:40,
    marginTop: 35,
  },

  signinbox: {
    width: 200,
    height: 50,
    backgroundColor: "#2e8b57",
    marginHorizontal: "auto",
    borderRadius: 10,
    marginTop: 125,
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
    marginLeft: 45,
    marginTop: 0,

  },

  signuptext2: {
    marginLeft: 220,
    marginTop: -18.4, 
    fontWeight: "bold",
    color: "#2e8b57",
  },
  
})

export default SignUp;