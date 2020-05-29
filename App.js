import React from "react";
import { StyleSheet, View, Text, StatusBar, Dimensions } from "react-native";
import { Avatar } from "react-native-elements";
import firebase from "firebase";
import SignInScreen from "./src/screens/SignInScreen";

const firebaseConfig = {
  // <Paste your firebase config file Here.>
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <View style={styles.background}>
        <Text style={styles.OTPstyle}>OTP Authentication</Text>
      </View>

      <View style={styles.container}>
        <SignInScreen />
      </View>
      <Avatar
        containerStyle={styles.avatarStyle}
        size={70}
        rounded
        source={{
          uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        }}
        showAccessory
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "75%",
    width: Dimensions.get("screen").width,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    top: "25%",
  },
  background: {
    height: "35%",
    width: Dimensions.get("screen").width,
    backgroundColor: "#283747",
  },
  OTPstyle: {
    fontSize: 24,
    color: "#FFFFFF",
    letterSpacing: 2,
    fontWeight: "bold",
    top: 50,
    alignSelf: "center",
  },
  avatarStyle: {
    position: "absolute",
    alignSelf: "center",
    top: "20%",
    borderColor: "#283747",
    borderWidth: 5,
  },
});
