import React from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase'

const Setting = ()=>{
    const onLogout = () => {
        firebase.auth().signOut();
    }
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text>Setting</Text>
            <Button
                        title="Logout"
                        onPress={() => onLogout()}
                    />
        </View>
    );
    };

export default Setting;
