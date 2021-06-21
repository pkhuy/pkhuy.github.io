import React, {Component} from 'react';
import * as firebase from 'firebase'
import firebaseConfig from './components/auth/firebaseConfig';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Reducer from './redux/reducer'
import thunk from 'redux-thunk'
import Api from './components/auth/Api'
import Authorized from './components/main/Authorized';
import Splash from './components/Splash'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'

const store = createStore(Reducer, applyMiddleware(thunk))
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
const Stack = createStackNavigator();
export class App extends Component {
  constructor() {
    super()
    this.unsubscriber = null;
    this.state = {
      loggedIn: false,
      user: null,
      chaList: []
    }
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((u) => {
      if (!u) {
        this.setState({
          loggedIn: false,
          user: null,
        })
        
      } else {
        let newUser = {
          id: u.uid,
          name: u.displayName,
          avatar: u.photoURL,
          email: u.email
        };
        Api.addUser(newUser);
        this.setState({ loggedIn: true })
        this.setState({ user: newUser });
      }
    })
  }
  componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }
  render() {
    
    if (!this.state.loggedIn) {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        </NavigationContainer>
      )
    }
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Authorized/>
          </NavigationContainer>
       </Provider>
      );
    
    }

}

export default App

