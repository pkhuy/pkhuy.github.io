import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet} from "react-native";
import Api from '../auth/Api'
import firebase from 'firebase'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';

const InputBox = (props) => {

  const { chatRoomID } = props;
  const [messages, setMessages] = useState([]);
   const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await firebase.auth().currentUser;
      setMyUserId(userInfo.uid);
    }
    fetchUser();
  }, [])
  useEffect(() => {
    setMessages([]);
    let unsub = Api.onChatContent(chatRoomID, setMessages, setUsers);
    return unsub;
}, [chatRoomID]);

const onMicrophonePress = () => {
    console.warn('Microphone')
  }
 
  const handleInputKeyUp = (e) => {
    if (e.keyCode === 13) {
        handleSendClick();
    }
}

const handleSendClick = () => {
    if (message !== '') {
        Api.sendMessage(chatRoomID, myUserId, 'text', message, users);
        setMessage('');
        
    }
}
const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
        handleSendClick();
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{width: '100%'}}
    >
      <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder={"Type a message"}
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          onKeyUp={handleInputKeyUp}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message
            ? <MaterialCommunityIcons name="microphone" size={25} color="white" />
            : <MaterialIcons name="send" size={28} color="white" />}
        </View>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default InputBox;
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      margin: 10,
      alignItems: 'flex-end',
    },
    mainContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 25,
      marginRight: 10,
      flex: 1,
      alignItems: 'flex-end',
    },
    textInput: {
      flex: 1,
      marginHorizontal: 10
    },
    icon: {
      marginHorizontal: 5,
    },
    buttonContainer: {
      backgroundColor: '#0C6157',
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
  
  