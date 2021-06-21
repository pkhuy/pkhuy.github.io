import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
// import DrawerButton from '../DrawerButton';

const Profile = ({navigation}) =>{
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
           
            <Text>Profile</Text>
            <TouchableHighlight style={{ 
                                            margin: 20, 
                                            width: 200, 
                                            height: 45,
                                            backgroundColor: 'darkviolet',
                                            padding: 10,
                                            alignItems: 'center',
                                         }}
                                         onPress={() => navigation.navigate('Home')}                       
                    >
                    <Text style={{color: 'white', fontSize: 18}}>Back to Home</Text>
            </TouchableHighlight>
        </View>
    );
}

export default Profile;
