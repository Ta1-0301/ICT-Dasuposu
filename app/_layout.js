import { View, Text } from "react-native";
import React from "react";
import { Slot, useSegments, useRouter, } from "expo-router";
import { useEffect } from "react";
import '../global.css';
import { useAuth, AuthContextProvider } from '../constants/authContext';


const Mainlayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();


    useEffect(()=>{
        // check if user is authenticated or not 
        if(typeof isAuthenticated=='undefined') return;
        const inApp = segments[0]== '(app)';
        if(isAuthenticated && !inApp){
            //redirect to home
            router.replace('home');
        }else if(isAuthenticated==false){
            // redirect to signIn
            router.replace('SignIn');
        }
    },[isAuthenticated])

    return <Slot />
}

export default function _layout() {
    return (
        <AuthContextProvider>
            <Mainlayout />
        </AuthContextProvider>
    )
}