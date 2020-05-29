# Firebase-OTP-Authentication

It is a Mobile Application developed through React-Native (Expo) which uses Firebase-OTP-Authentication System to log user in.

## Application Overview

![Firebase-OTP-Authentication Application](images/ApplicationOverview/AppOverView.gif)

## Application Screens

[Application Screens](images/ApplicationScreens)

## Application Description

It is a Mobile Application developed through React-Native (Expo) which uses Firebase-OTP-Authentication System to log user in.

- It uses 'firebase' and 'expo-firebase-recaptcha' libraries to generate Recaptcha ,send OTP and verify it.
- Application WorkFlow:
  - It takes phone number as input and takes you to Recaptcha Verification Page.
  - 'expo-firebase-recaptcha' has a functionality to generate a FirebaseRecaptchaVerifierModal to differentiate between Humans and Bot.
  - After Recaptcha Verification a token is generated and firebase Phone Auth function is triggered and 'Phone Number' and 'Recaptcha Token' is passed as an arguments.
  - If a number is valid, Firebase will send a OTP (Verification Code) via SMS to user and generates a Verification ID for developer and App redirects you to OTP Screen.
  - You enter the recieved OTP via SMS to OTP input field and submit it. Submit button triggers the OTP credentials function with 'Verification ID' and 'OTP entered' as an arguments.
  - If both arguments are valid then, Firebase will grant permission.

## Advantages and Security?

1. It enables user to Signup and Signin with Phone number Verification. Which is handeld by Google Firebase Auth system itself.
2. It ease up the task of setting up a backend API by handling all the complexity .

## Documentation Link

- [Add Firebase to your WebApp](https://firebase.google.com/docs/web/setup)
- [Authenticate with Firebase with a Phone Number](https://firebase.google.com/docs/auth/web/phone-auth)
- [FirebaseRecaptcha](https://docs.expo.io/versions/latest/sdk/firebase-recaptcha/)

## Libraries Used

- react-native-elements (npm install react-native-elements )
- firebase (npm install firebase )
- expo-firebase-recaptcha (expo install expo-firebase-recaptcha )
