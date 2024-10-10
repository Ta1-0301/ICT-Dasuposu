import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { app } from '../../../firebaseConfig'; // firebaseConfig.jsからappをインポート

const Reco = () => {
    const [percentage, setPercentage] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const db = getDatabase(app);
    const compostRef = ref(db, '/serial0001/ComposterL/AppOne'); // 'compost'はデータベースのパスです。必要に応じて変更してください。

    useEffect(() => {
        // データベースの初期値を取得
        onValue(compostRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setIsOn(data.start);
            }
        });
    }, []);

    const resetState = () => {
        setPercentage(0);
        setIsOn(false);
        updateDatabase(false, false);
    };

    const updateDatabase = (isStarted, isComplete) => {
        set(compostRef, {
            complete: isComplete,
            start: isStarted
        });
    };

    useEffect(() => {
        let interval;
        if (isOn && percentage < 200) {
            interval = setInterval(() => {
                setPercentage((prevPercentage) => {
                    if (prevPercentage < 100) {
                        return prevPercentage + 1;
                    }
                    clearInterval(interval);
                    updateDatabase(false, true); // 100%になったらcompleteをtrueに
                    Alert.alert(
                        "完了",
                        "堆肥熟成が完了しました",
                        [{ 
                            text: "OK", 
                            onPress: () => {
                                console.log("OK Pressed");
                                resetState();
                            } 
                        }]
                    );
                    return 100;
                });
            }, 300); 
        }
        return () => clearInterval(interval);
    }, [isOn, percentage]);

    const toggleSwitch = () => {
        const newState = !isOn;
        setIsOn(newState);
        updateDatabase(newState, false); // startの値のみ変更、completeは常にfalse
    };
  
    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <Text style={styles.shindo}>{`${percentage}%`}</Text>
            </View>
            <TouchableOpacity onPress={toggleSwitch} style={styles.onswich}>
                <View style={[styles.track, isOn ? styles.trackOn : styles.trackOff]}>
                    <View style={[styles.thumb, isOn ? styles.thumbOn : styles.thumbOff]} />
                </View>
                <Text style={styles.ONcounter}>{isOn ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
    },

    table: {
        width: 190,
        height: 140,
        backgroundColor: '#3cb371',
        borderRadius: 20,
        marginHorizontal: 197,
        marginTop: -140,

    },
    shindo: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 30,
        marginHorizontal: "auto",
    },

    onswich: {
        width: 150,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 216,
        marginTop: -90
    },

    ONcounter: {
        marginHorizontal: "auto",
        marginTop: 20,
        fontWeight: "bold",
    },
});

export default Reco;