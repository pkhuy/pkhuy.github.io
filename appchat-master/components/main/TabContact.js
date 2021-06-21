import React, {useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Api from '../auth/Api';
import firebase from 'firebase'
function TabContact() {
    const [list, setList] = useState([])
    // const user = firebase.auth().currentUser
    let u = firebase.auth().currentUser;
                let user = {
                id: u.uid,
                name: u.displayName,
                avatar: u.photoURL,
                email: u.email
                };
    useEffect(() => {
        const getList = async () => {
        //   let u = firebase.auth().currentUser;
        //         let user = {
        //         id: u.uid,
        //         name: u.displayName,
        //         avatar: u.photoURL,
        //         email: u.email
        //         };

            if (user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results);
            }
        }
        getList();
    }, []);

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);

    }
    // const handleClose = () => {
    //     setShow(false);
    // } 

    return (
       
        <View style={{flex: 1, marginTop: 22}}>
            <FlatList 
                data={list}
                renderItem={({item, index})=>{ index={index}
                    //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                    return (
                    // <FlatListItem item={item} index={index}>

                    // </FlatListItem>
                    <TouchableOpacity onPress={() => addNewChat(item)} style={{
                      flex: 1,
                      flexDirection:'column',                                
                  }}>            
                      <View style={{
                              flex: 1,
                              flexDirection:'row',               
                              backgroundColor: 'white',
                              padding: 5
                      }}>            
                          <Image 
                              source={{uri: item.avatar}}
                              style={{width: 50,
                                height: 50,
                                borderRadius: 70,
                                margin: 5}}
                          >
              
                          </Image>
                          <View style={{
                                  flex: 1,
                                  flexDirection:'column',   
                                  height: 50              
                              }}>            
                                  <Text style={styles.flatListItem}>{item.name}</Text>
                                  <View style={{
                          height: 1,
                          flexDirection:'column',  
                          backgroundColor:'gainsboro',
                          marginHorizontal: 10,
                          marginTop: 12                           
                      }}>
                  
                      </View>  
                          </View>   
                                    
                      </View>
                       {/* <View style={{
                          height: 1,
                          flexDirection:'column',  
                          backgroundColor:'darkgray'                            
                      }}>
                  
                      </View> */}
                </TouchableOpacity>
                    );
                }}
                >

            </FlatList>
        </View>
    )
}

  
export default TabContact


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