import React, { Component } from 'react'
import { StyleSheet,Text,View, TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native'
import {COLOR_PINK}  from './myColors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase'
import "firebase/firestore";
import firebaseConfig from './firebaseConfig';
import Api from './Api'
import styles from "./styleTypes";

const signUpRequest = async (email, password) => {
  try {
    return await firebaseConfig.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
export class RegisterScreen extends Component {
    // navigation = useNavigation();
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            repassword: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
               firebase.auth().currentUser.updateProfile({
                  displayName: name,
                  photoURL: "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
                }).then()
              })
             
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                  }
              
                  if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                  }
              
                  console.error(error);
            })

    }
    
     Divider (props)  {
        return <View {...props}>
          <View style={styles.line}></View>
          <Text style={styles.textOR}>OR</Text>
          <View style={styles.line}></View>
        </View>
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.up}>
                <Ionicons
                  name="ios-speedometer"
                  size={100}
                  color={COLOR_PINK}>
                </Ionicons>
                <Text style={styles.title}>
                  App chat for everyone
              </Text>
              </View>
              <View style={styles.down}>
                <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your name"
                    autoCapitalize='none'
                    onChangeText={
                        (name) => this.setState({ name })
                    }
                  >
                    </TextInput>
                    </View>
                    <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    placeholder="Enter your email"
                    autoCapitalize='none'
                    onChangeText={
                        (email) => this.setState({ email })
                    }
                  >
                  </TextInput>
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                        onChangeText={
                            (password) => this.setState({ password })
                        }
                  >
                  </TextInput>
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Re-enter your password"
                    secureTextEntry={true}
                        onChangeText={
                            (repassword) => this.setState({ repassword })
                        }
                  >
                  </TextInput>
                </View>
                <TouchableOpacity style={styles.signupButton}
                  onPress={this.onSignUp}>
                  <Text style={styles.loginButtonTitle}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton}
                  style={styles.goToLogin}
                  onPress={() => this.props.navigation.navigate("Login")}
                >     
                 <Text style={styles.loginButtonTitle}>Switch to Login Screen</Text>
                </TouchableOpacity>

             </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default RegisterScreen