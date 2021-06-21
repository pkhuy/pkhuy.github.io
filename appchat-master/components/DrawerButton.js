import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {  DrawerActions } from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native'

const DrawerButton = ({navigation}) => {
    return (
        < TouchableOpacity  
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
            
            <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity >
    );
}

export default { DrawerButton };
