import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import moment from "moment";


const ChatMessage = (props) => {
  const { message, myId } = props;

  const isMyMessage = () => {
    return message.author === myId;
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.messageBox, {
          backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
          marginLeft: isMyMessage() ? 50 : 0,
          marginRight: isMyMessage() ? 0 : 50,
        }
      ]}>
        {!isMyMessage() && <Text style={styles.name}>{message.title}</Text>}
        <Text style={styles.message}>{message.body}</Text>
        <Text style={styles.time}>{moment(message.date).fromNow()}</Text>
      </View>
    </View>
  )
}

export default ChatMessage;
const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    messageBox: {
      borderRadius: 5,
      padding: 10,
    },
    name: {
      color: '#0C6157',
      fontWeight: "bold",
      marginBottom: 5,
    },
    message: {
  
    },
    time: {
      alignSelf: "flex-end",
      color: 'grey'
    }
  });