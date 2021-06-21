import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Home from './Home';
import Profile from './Profile';
import Setting from './Setting';
import DrawerContent from '../DrawerContent';
import DrawerButton from '../DrawerButton'
const Drawer = createDrawerNavigator();
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../redux/actions'

export class Authorized extends Component {
  componentDidMount() {
    this.props.fetchUser();
}
render() {
  // function getHeaderTitle(route) {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Chat';
  
  //   switch (routeName) {
  //     case 'Chat':
  //       return 'Chat';
  //     case 'Contact':
  //       return 'Contact';
  
  //   }
  // }

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} 
       options={({route}) => ({
        drawerIcon: ({ color }) => (
          <Ionicons name="home" size={24} color={color} />
        ),
        // headerTitle: getHeaderTitle(route),
        headerShown: false,
    
      })
    } />
      <Drawer.Screen name="Profile" component={Profile} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="profile" size={24} color={color} />
        ),
        title: 'Profile',
        headerShown: true,
        
      }} />
      <Drawer.Screen name="Setting" component={Setting} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="setting" size={24} color={color} />
        ),
        title: 'Setting',
        headerShown: true,
       
      }} />
    </Drawer.Navigator>
    
  );
 }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Authorized);
