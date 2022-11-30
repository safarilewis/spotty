import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home(props) {
  const handleLogout = () => {
    AsyncStorage.clear();
    props.navigation.replace('Auth');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Button title="LOGOUT" style={styles.button} onPress={handleLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
    marginLeft: 10,
  },
  button: {},
});
