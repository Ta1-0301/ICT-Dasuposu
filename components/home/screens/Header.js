import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../constants/authContext';
import { Button } from 'react-native-web';
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Header = () => {
    const navigation = useNavigation();

    const {logout} = useAuth();
    const handleLogout = async ()=>{
        await logout();
    }
    
  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <Image 
                style={styles.logo}
                source={require("../screens/images/header-logo.png")} 
            />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.NewPost} onPress={() => navigation.navigate("NewPost")}>
                <Image 
                    source={require("../screens/images/plus.png")}
                    style={styles.icon}    
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.Chat} onPress={() => navigation.navigate("Chat")}>
                <Image 
                    source={require("../screens/images/chat.png")}
                    style={styles.icon}    
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.profile} onPress={handleLogout}>
                <Image 
                    source={require("../../../app/(app)/image/logout.png")}
                    style={styles.icon}    
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 40,
    },

    iconsContainer: {
        flexDirection:"row",
    },

    logo: {
        marginTop: -30,
        marginLeft: -10,
        width: 160,
        height: 50,
    },

    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginTop: -30,
        resizeMode: "contain",
    },
})

export default Header