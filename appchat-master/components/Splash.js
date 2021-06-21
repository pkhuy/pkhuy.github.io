import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions
} from 'react-native'
import {
    COLOR_PINK, COLOR_PINK_LIGHT, 
    COLOR_FACEBOOK, COLOR_PINK_MEDIUM} 
from './auth/myColors'
var {height, width} = Dimensions.get('window')
const Splash = () =>{
    const navigation = useNavigation();
    
    const logoOpacity= useRef(new Animated.Value(0)).current;
     const titleMarginTop= useRef(new Animated.Value(height / 2)).current;

     useEffect(() =>  {
        // LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        //Add animations here
        Animated.sequence([
            //animations by sequence
            Animated.timing(logoOpacity,{
                toValue: 1,                  
                duration: 1500,
                useNativeDriver:true           
            }),
            //Animate Text ?
            Animated.timing(titleMarginTop, {
                toValue: 10,
                duration: 1000, //1000 milliseconds = 1 second
                useNativeDriver: false
            })
        ]).start(()=> {
            navigation.navigate("Login")
        });

    
    },[]);
   
        return ( 
            <View style={styles.container}>
            <Animated.Image  source={require('../images/logo.png')}
                style={{...styles.logo, opacity: logoOpacity}}>                
            </Animated.Image>
            <Animated.Text style={{...styles.title, 
                                marginTop: titleMarginTop}}>
                                    App chat for everyone
            </Animated.Text>
            </View>
        )
    
 }

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_PINK_LIGHT    
    },
    logo: {
        width: 130,
        height: 130,
        borderRadius: 130 / 2,
    },
    title: {        
        color: COLOR_PINK_MEDIUM,
        marginTop: 10,    
        textAlign: 'center',
        width: 400,
        fontSize: 21
    }
})