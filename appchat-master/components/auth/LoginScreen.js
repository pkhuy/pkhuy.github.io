import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLOR_PINK, COLOR_FACEBOOK, COLOR_GOOGLE }
  from './myColors'
import styles from "./styleTypes";
import { loginSuccess } from '../../redux/actions/Authenticate';
import * as firebase from 'firebase';
import GGAPI from './apiGG'
import LoginAPI from './apiFB';
import firebaseConfig from './firebaseConfig';
import { connect } from 'react-redux';
import Api from './Api'

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      email: '',
      password: '',
      loggedIn: false
    }
    this.onLogin = this.onLogin.bind(this)
  }

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

  onLogin = () => {
    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((loggedInUser) => {
        console.log(`Login success`);
        let user = firebase.auth().currentUser;
        this.setState({
          loggedIn: true,
        })
      }).catch((error) => {
        console.log(`Login fail with error: ${error}`);
      });
  }
  handleLoginWithFB = () => {
    LoginAPI.logIn().then((token) => {
      if (token) {
        this.setState({
          loggedIn: true,
        })
      }

      // this.props.loginSuccess(user);
    });
  };
  /*handleLoginWithGG = () => {
    GGAPI.signInAsync().then((user) => {

      this.setState({
        loggedIn: true,
      })
      // this.props.loginSuccess(user);
    });
  };*/
  handleLoginWithGG = async () => {
    let result = await Api.ggPopup();
    if (result) {
      result.user;
    } else {
      alert("Error!");
    }
  };

  render() {
    const Divider = (props) => {
      return <View {...props}>
        <View style={styles.line}></View>
        <Text style={styles.textOR}>OR</Text>
        <View style={styles.line}></View>
      </View>
    }

    return (
      //Do not dismiss Keyboard when click outside of TextInput
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
            <TouchableOpacity style={styles.loginButton}
              onPress={this.onLogin}>
              <Text style={styles.loginButtonTitle}>LOG IN</Text>
            </TouchableOpacity>
            <Text >Don't have an account yet?</Text>
            <TouchableOpacity style={styles.signupButton}
              style={styles.goToLogin}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text style={styles.loginButtonTitle}>Go to Register</Text>
            </TouchableOpacity>
            <Divider style={styles.divider}></Divider>
            <FontAwesome.Button
              style={styles.facebookButton}
              name="facebook"
              onPress={() => this.handleLoginWithFB()}
              backgroundColor={COLOR_FACEBOOK}
            >
              <Text style={styles.loginButtonTitle}>Continue with Facebook</Text>
            </FontAwesome.Button>
            <View style={styles.clearBoth}></View>
            <FontAwesome.Button
              style={styles.googleButton}
              name="google"
              onPress={() => this.handleLoginWithGG()}
              backgroundColor={COLOR_GOOGLE}
            >
              <Text style={styles.loginButtonTitle}>Continue with Google</Text>
            </FontAwesome.Button>

          </View>
        </View>
      </TouchableWithoutFeedback>

    )
  }
}
export default LoginScreen;