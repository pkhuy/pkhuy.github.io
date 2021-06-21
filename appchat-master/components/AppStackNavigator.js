import React, { Component } from 'react';
import Splash from './Splash'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();

 RootStack =() => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ title: null, header: () => (null) }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: null, header: () => (null) }}
        // initialParams={{ user: 'me' }}
      />
    </Stack.Navigator>
    
  );
    
}
const AppStackNavigator =() => {
   
    return (
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    );
  
}
export default AppStackNavigator;
