import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { createRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";

export default function ({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert("Please enter your email");
      return;
    }
    if (!userPassword) {
      alert("Please enter your password");
      return;
    }
    setLoading(true);
    let dataToSend = { email: userEmail, password: userPassword };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("http://192.168.0.102:3000/api/user/login", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide loader
        setLoading(false);
        console.log(responseJson);
        //If server response is same as data matched
        if (responseJson.status === "success") {
          AsyncStorage.setItem("user_id", responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace("TabNavigator");
        } else {
          setErrortext(responseJson.msg);
          console.log("Please check your email and try again");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Image
        source={require("../assets/spotty.png")}
        style={{ resizeMode: "contain", flex: 1, alignSelf: "center" }}
      />
      <View style={{ flex: 2 }}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Email"
          onChangeText={(userEmail)=>setUserEmail(userEmail)}
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Password"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          onChangeText={(userPassword) => setUserPassword(userPassword)}
          ref={passwordInputRef}
          blurOnSubmit={false}
          //onSubmitEditing={Key}
          secureTextEntry={true}
          underlineColorAndroid="#f000"
          returnKeyType="next"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmitPress}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  inputStyle: {
    color: "black",
    marginTop: 25,
    borderRadius: 10,
    borderColor: "#ccc",
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10,
    paddingTop: 10,
    alignSelf: "center",
    width: "90%",
  },
  button: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
  },
  buttonText: { color: "#FFFFFF", paddingVertical: 10, fontSize: 16 },
});
