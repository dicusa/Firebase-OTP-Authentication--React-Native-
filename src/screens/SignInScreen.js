import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Input, Button, Avatar } from "react-native-elements";
import firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Entypo } from "@expo/vector-icons";

const SignInScreen = () => {
  const recaptchaVerifier = useRef(null);
  const [screenState, setScreenState] = useState("phone");
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  // Function to validate phone number
  const validatePhoneNumber = () => {
    const argPhone = String(phone).replace(/[^\d]/g, "");
    if (argPhone.length > 10) {
      return String("+" + argPhone);
    } else if (argPhone.length == 10) {
      return String("+91" + argPhone);
    }
  };

  // Function to Sign user in
  const signInUser = async () => {
    console.log("Inside signinuser");
    console.log(firebaseConfig);
    console.log(recaptchaVerifier);

    try {
      setActivityIndicator(true);
      const argPhone = validatePhoneNumber();
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const localVerificationId = await phoneProvider.verifyPhoneNumber(
        argPhone,
        recaptchaVerifier.current
      );
      setVerificationId(localVerificationId);
      setActivityIndicator(false);
      setScreenState("OTP");
    } catch (error) {
      console.log(error);
      setActivityIndicator(false);
      alert("Please enter a valid number and Try again!");
    }
  };

  // Function to verify the user via OTP
  const verifyOTP = async () => {
    try {
      setActivityIndicator(true);
      const credentials = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        OTP
      );
      await firebase.auth().signInWithCredential(credentials);
      setActivityIndicator(false);
      setScreenState("Authenticated");
    } catch (error) {
      console.log(error);
      setActivityIndicator(false);
      alert("Please check OTP and Try again!");
    }
  };

  if (screenState === "OTP") {
    // Display OTP verification component
    return (
      <View style={styles.container}>
        <Text style={styles.OTPtextStyle}>
          Verification code has been sent to{" "}
          {
            <Text style={[styles.OTPtextStyle, { color: "blue" }]}>
              {phone}
            </Text>
          }
        </Text>
        <Input
          label="Verification Code"
          leftIcon={
            <Entypo
              name="lock"
              size={22}
              color="black"
              style={styles.iconStyle}
            />
          }
          keyboardType="numeric"
          placeholder="OTP"
          value={OTP}
          onChangeText={(otp) => {
            setOTP(otp);
          }}
        />
        {activityIndicator ? <ActivityIndicator size="large" /> : null}

        <Button
          title="Submit"
          onPress={verifyOTP}
          buttonStyle={styles.buttonStyle}
          containerStyle={{ width: "70%", marginTop: 15 }}
        />
      </View>
    );
  } else if (screenState == "Authenticated") {
    // Display After authenticated component
    return (
      <View style={styles.finalContainer}>
        <Text style={styles.welcomeTextStyle}>
          Welcome you have been succesfully logged in !{" "}
        </Text>
      </View>
    );
  } else {
    // Display Phone number input and Recaptcha Modal components
    return (
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Input
          label="Phone number"
          leftIcon={
            <Entypo
              name="phone"
              size={22}
              color="black"
              style={styles.iconStyle}
            />
          }
          keyboardType="numeric"
          placeholder="+91xxxxxxxxxx"
          value={phone}
          onChangeText={(number) => {
            setPhone(number);
          }}
        />
        {activityIndicator ? <ActivityIndicator size="large" /> : null}
        <Button
          title="Signin"
          onPress={() => signInUser()}
          buttonStyle={styles.buttonStyle}
          containerStyle={{ width: "70%", marginTop: 15 }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  finalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  inputStyle: {
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonStyle: {
    height: 45,
    borderRadius: 22,
  },
  iconStyle: {
    paddingEnd: 7,
    marginEnd: 3,
    borderRightWidth: 0.5,
    borderRightColor: "gray",
  },
  OTPtextStyle: {
    fontSize: 15,
    marginBottom: 25,
    fontWeight: "bold",
  },
  welcomeTextStyle: {
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 1,
    fontWeight:'600',
    marginTop: 100,
  },
});

export default SignInScreen;
