import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../../firebaseConfig';

const PointsDisplay = () => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const fetchOrCreatePoints = async () => {
      const user = auth.currentUser;
      if (user) {
        const userPointsRef = doc(db, "userPoints", user.uid);
        try {
          const docSnap = await getDoc(userPointsRef);
          if (docSnap.exists()) {
            setPoints(docSnap.data().points || 0);
          } else {
            // ユーザーのポイントドキュメントが存在しない場合、新規作成
            await setDoc(userPointsRef, { points: 0 });
            setPoints(0);
          }
        } catch (error) {
          console.error("ポイントの取得または作成中にエラーが発生しました:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("ユーザーがログインしていません");
        setLoading(false);
      }
    };

    // 初回の実行
    fetchOrCreatePoints();

    // 5秒ごとに実行
    const intervalId = setInterval(fetchOrCreatePoints, 500);

    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.counttable}>
          <Text style={styles.points}>読み込み中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.counttable}>
        <Text style={styles.points}>Points: {points}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
  },
  counttable: {
    width: 190,
    height: 140,
    backgroundColor: '#3cb371',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: -25
  },
  points: {
    fontSize: 30,
    fontFamily: 'Bebas Neue',
    textAlign: 'left',
    marginBottom: 'auto',
    marginVertical: "auto",
    color: 'white'
  }
});

export default PointsDisplay;