import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../assets/spotty.png";

export default function SplashScreen({ navigation }) {
  //activity indicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value == null ? "Auth" : "TabNavigator")
      );
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={{ width: "90%", margin: 30, resizeMode: "contain" }}
      />
      <ActivityIndicator
        animating={animating}
        color="green"
        size={"large"}
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    }
});