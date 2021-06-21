import {StyleSheet } from 'react-native'
import {
    COLOR_PINK, COLOR_PINK_LIGHT, COLOR_PINK_MEDIUM} 
  from './myColors'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',  
      backgroundColor: COLOR_PINK_LIGHT
    },
    up: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    down: {
      flex: 7,//70% of column
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    title: {
      color: 'white',
      color: COLOR_PINK_MEDIUM,
      textAlign: 'center',
      width: 400,
      fontSize: 23
    },
    textInputContainer: {
      paddingHorizontal: 10,
      borderRadius: 6,
      marginBottom: 20,
      backgroundColor: 'rgba(255,255,255,0.2)'//a = alpha = opacity
    },
    textInput: {
      width: 280,
      height: 45
    },
    loginButton: {
      width: 300,
      height: 45,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: COLOR_PINK
    },
    signupButton: {
      width: 300,
      height: 45,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'darkseagreen'
    },
    loginButtonTitle: {
      fontSize: 18,
      color: 'white'
    },
    facebookButton: {
      width: 300,
      height: 45,
      borderRadius: 6,
      justifyContent: 'center',
    },
    googleButton: {
      width: 300,
      height: 45,
      borderRadius: 6,
      justifyContent: 'center',
    },
    line: {
      height: 1,
      flex: 2,
      backgroundColor: 'black'
    },
    textOR: {
      flex: 1,
      textAlign: 'center'
    },
    divider: {
      flexDirection: 'row',
      height: 40,
      width: 298,
      justifyContent: 'center',
      alignItems: 'center'
    },
    clearBoth: {
      height: 20
  },
  goToLogin: {
    marginVertical: 20
 }
  })
  export default styles;