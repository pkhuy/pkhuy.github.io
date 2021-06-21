import React, {useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatListItem from './ChatListItem'
import firebase from 'firebase'
import 'firebase/firestore';

function ListChat() {
    const [chatList, setChatList] = useState([]);
    let u = firebase.auth().currentUser;
    let user = {
        id: u.uid,
        name: u.displayName,
        avatar: u.photoURL,
        email: u.email
    };
     useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                firebase.firestore().collection('users').doc(user.id).onSnapshot((doc) => {
                    if (doc.exists) {
                        let data = doc.data();
                        if (data.chats){
                            setChatList(data.chats);
                        }
                    }
                })
        }
    }
        getList()
    }, []);
    
    return (
       
        <FlatList
        style={{width: '100%'}}
        data={chatList}
        renderItem={({ item,index }) => <ChatListItem chatRoom={item} index={index} />}
        keyExtractor={(item) => item.chatId}
      />
                 
    )
}

  
export default ListChat


const styles = StyleSheet.create({
  flatListItem: {
      color: 'black',
      paddingTop: 20,
      paddingLeft:10,
      paddingBottom: 20,
      fontSize: 16,
      fontWeight: 'bold'  
  }
});