// import React, { Component, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Keyboard
// } from 'react-native'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import {
//   COLOR_PINK, COLOR_PINK_LIGHT, 
//   COLOR_FACEBOOK, COLOR_PINK_MEDIUM} 
// from './myColors'
// //Login Facebook
// // import * as Facebook from 'expo-facebook';
// import * as firebase from 'firebase';
// // import auth from '@react-native-firebase/auth';
// // import firebase from '@react-native-firebase/app';
// // import '@react-native-firebase/auth';
// // import Button from 'react-native-button'
// console.disableLogBox = true;
// var firebaseConfig1 = {
//     apiKey: "AIzaSyBdMczlDG1ME1Iw9sBrrtvj0IUn9xbNGi8",
//     authDomain: "app-chat-a35c2.firebaseapp.com",
//     // For databases not in the us-central1 location, databaseURL will be of the
//     // form https://[databaseName].[region].firebasedatabase.app.
//     // For example, https://your-database-123.europe-west1.firebasedatabase.app
//     databaseURL: "https://app-chat-a35c2.asia-southeast2.firebasedatabase.app",
//     storageBucket: "app-chat-a35c2.appspot.com"
//   };
//   firebase.initializeApp(firebaseConfig1);
// // import {LoginManager} from 'react-native-fbsdk'
// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.unsubscriber = null;
//     this.state = {
//         isAuthenticated: false,
//         typedEmail: '',
//         typedPassword: '',
//         user: null,
//     };
//   }
  
//   componentDidMount() {
  
//     this.unsubscriber = firebase.auth().onAuthStateChanged(changedUser => {
//         console.log(`changed User : ${JSON.stringify(changedUser.toJSON())}`);
//         this.setState({ user: changedUser });
//         this.setState({isAuthenticated: true});
//     });
// }
// componentWillUnmount() {
//     if (this.unsubscriber) {
//         this.unsubscriber();
//     }
// }
//   // async loginFacebook() {
//   //   LoginManager.logInWithPermissions(["public_profile"]).then(
//   //     function(result) {
//   //       if (result.isCancelled) {
//   //         console.log("Login cancelled");
//   //       } else {
//   //         console.log(
//   //           "Login success with permissions: " +
//   //             result.grantedPermissions.toString()
//   //         );
//   //       }
//   //     },
//   //     function(error) {
//   //       console.log("Login fail with error: " + error);
//   //     }
//   //   );
//   // }
//   onRegister = () => {
//       firebase.auth()
//         .createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
//         .then((loggedInUser) => {
//             this.setState({ user: loggedInUser })
//             console.log(`Register with user : ${JSON.stringify(loggedInUser.toJSON())}`);
//         }).catch((error) => {
//           if (error.code === 'auth/email-already-in-use') {
//             console.log('That email address is already in use!');
//           }
      
//           if (error.code === 'auth/invalid-email') {
//             console.log('That email address is invalid!');
//           }
      
//           console.error(error);
//         });
// }
// onLogin = () => {
//     firebase.auth()
//         .signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
//         .then((loggedInUser) => {
//             console.log(`Login success`);
//         }).catch((error) => {
//             console.log(`Login fail with error: ${error}`);
//         });
// }
//   render() {
//     const Divider = (props) => {
//       return <View {...props}>
//         <View style={styles.line}></View>
//         <Text style={styles.textOR}>OR</Text>
//         <View style={styles.line}></View>
//       </View>
//     }
//     return (
//       //Do not dismiss Keyboard when click outside of TextInput
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <View style={styles.up}>
//             <Ionicons
//               name="ios-speedometer"
//               size={100}
//               color={COLOR_PINK}>
//             </Ionicons>
//             <Text style={styles.title}>
//               App chat for everyone
//           </Text>
//           </View>
//           <View style={styles.down}>
//             <View style={styles.textInputContainer}>
//               <TextInput
//                 style={styles.textInput}
//                 textContentType='emailAddress'
//                 keyboardType='email-address'
//                 placeholder="Enter your email"
//                 autoCapitalize='none'
//                 onChangeText={
//                     (text) => {
//                         this.setState({ typedEmail: text });
//                     }
//                 }
//               >
//               </TextInput>
//             </View>
//             <View style={styles.textInputContainer}>
//               <TextInput
//                 style={styles.textInput}
//                 placeholder="Enter your password"
//                 secureTextEntry={true}
//                     onChangeText={
//                         (text) => {
//                             this.setState({ typedPassword: text });
//                         }
//                     }
//               >
//               </TextInput>
//             </View>
//             <TouchableOpacity style={styles.loginButton}
//               onPress={this.onLogin}>
//               <Text style={styles.loginButtonTitle}>LOG IN</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.signupButton}
//               onPress={this.onRegister}>
//               <Text style={styles.loginButtonTitle}>SIGN UP</Text>
//             </TouchableOpacity>
//             <Divider style={styles.divider}></Divider>
//             <FontAwesome.Button
//               style={styles.facebookButton}
//               name="facebook"
//               onPress={this.loginFacebook}
//               backgroundColor={COLOR_FACEBOOK}
//             >
//               <Text style={styles.loginButtonTitle}>Continue with Facebook</Text>
//             </FontAwesome.Button>
          
//           </View>
//         </View>
//       </TouchableWithoutFeedback>

//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'stretch',  
//     backgroundColor: COLOR_PINK_LIGHT
//   },
//   up: {
//     flex: 3,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   down: {
//     flex: 7,//70% of column
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center'
//   },
//   title: {
//     color: 'white',
//     color: COLOR_PINK_MEDIUM,
//     textAlign: 'center',
//     width: 400,
//     fontSize: 23
//   },
//   textInputContainer: {
//     paddingHorizontal: 10,
//     borderRadius: 6,
//     marginBottom: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)'//a = alpha = opacity
//   },
//   textInput: {
//     width: 280,
//     height: 45
//   },
//   loginButton: {
//     width: 300,
//     height: 45,
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: COLOR_PINK
//   },
//   signupButton: {
//     width: 300,
//     height: 45,
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'darkseagreen'
//   },
//   loginButtonTitle: {
//     fontSize: 18,
//     color: 'white'
//   },
//   facebookButton: {
//     width: 300,
//     height: 45,
//     borderRadius: 6,
//     justifyContent: 'center',
//   },
//   line: {
//     height: 1,
//     flex: 2,
//     backgroundColor: 'black'
//   },
//   textOR: {
//     flex: 1,
//     textAlign: 'center'
//   },
//   divider: {
//     flexDirection: 'row',
//     height: 40,
//     width: 298,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })