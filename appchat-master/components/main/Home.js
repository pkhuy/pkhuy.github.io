import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import TabContact from './TabContact';
import TabChat from './TabChat';
import { createStackNavigator } from '@react-navigation/stack';
import {  DrawerActions } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const ContactStack = createStackNavigator();

function ContactStackScreen({navigation}) {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="Contact"
        component={TabContact}
        options={{  headerLeft: () => (
          < TouchableOpacity  style={{marginLeft: 5}}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
              
              <MaterialIcons name="menu" size={24} color="black" />
          </TouchableOpacity >     
        ) }}
      />
    </ContactStack.Navigator>
  );
}
function Home () {
  // function getHeaderTitle(route) {
  //   // If the focused route is not found, we need to assume it's the initial screen
  //   // This can happen during if there hasn't been any navigation inside the screen
  //   // In our case, it's "Feed" as that's the first screen inside the navigator
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Chat';
  
  //   switch (routeName) {
  //     case 'Chat':
  //       return 'Chat';
  //     case 'Contact':
  //       return 'Contact';
  //   }
  // }
        return (           
            <Tab.Navigator 
            initialRouteName="Chat"
            tabBarOptions={{
             activeTintColor: 'black',
             inactiveTintColor: 'grey',
             style: {
             backgroundColor: 'aliceblue',
             },
            }}
           >
              <Tab.Screen name="Chat" component={TabChat}
             options={() =>({
              // headerTitle: getHeaderTitle(route),
              tabBarLabel: 'Chat',
              style: { backgroundColor: 'aliceblue' },
                tabBarIcon: ({ color }) => (
                    <Ionicons name="chatbubble" size={24} color={color} />
                ),
              })} />
            <Tab.Screen name="Contact" component={ContactStackScreen}
             options={{
              tabBarLabel: 'Contact',
                tabBarIcon: ({ color}) => (
                  <MaterialIcons name="group" size={25} color={color} />
                ),
              }} />
           
            </Tab.Navigator>
           
            
        );
            
    
}


export default Home
