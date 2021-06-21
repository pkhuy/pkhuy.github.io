import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
// import { connect } from 'react-redux';
import firebase from 'firebase'
import {
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

class DrawerContent extends Component {
    render() {
        const { container, profile, avatar, name } = styles;
        const user = firebase.auth().currentUser
        return (
            <View style={container}>
                <View style={profile}>
                    <Image source={{ uri : user.photoURL }} style={avatar} />
                    <Text style={name}>{user.displayName || ''}</Text>
                </View>
                <DrawerItemList {...this.props} />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    profile: {
        height: 300,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    }
};

  export default DrawerContent;
