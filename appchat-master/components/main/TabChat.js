import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import ListChat from './ListChat'
import ChatScreen from './ChatScreen'
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {  DrawerActions } from '@react-navigation/native';
const Stack = createStackNavigator();

const TabChat = ({ navigation })=>{
 
  return (  
    <Stack.Navigator initialRouteName="List Chat">
    <Stack.Screen name="List Chat" component={ListChat} 
    options={{
      headerShown:true,
      headerLeft: () => (
        < TouchableOpacity  style={{marginLeft: 5}}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
            
            <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity >     
      )}} />
    <Stack.Screen name="Chat" component={ChatScreen}   
    options={({ route })  => ({
          headerShown:true,
          title: route.params.name,
        })}/>
    </Stack.Navigator>
  )
}
export default TabChat;
