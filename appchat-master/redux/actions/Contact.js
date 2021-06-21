import firebase from 'firebase';
import { SnapshotViewIOSComponent } from 'react-native'
require('firebase/firestore')
import {
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR
} from '../constants/index';

export const fetchListContact = ({ me }) => {
    console.log('fetchListContact');
    return (dispatch) => {
        firebase.database().ref('users')
        .on('value', snap => {
            const contacts = [];
            snap.forEach(contact => {
                if (contact.key !== me.uid) {
                    const ct = contact.val();
                    contacts.push({
                        uid: contact.key,
                        displayName: ct.displayName,
                        email: ct.email,
                        photoURL: ct.photoURL
                    });
                }
            });
        // firebase.firestore()
        // .collection('users')
        // // .doc(firebase.auth().currentUser.uid)
        // .get() 
        // .then((snap) => {
        //         const contacts = [];
        //         snap.forEach(contact => {
        //             if (contact.key !== me.uid) {
        //                 const ct = contact.val();
        //                 contacts.push({
        //                     uid: contact.key,
        //                     displayName: ct.displayName,
        //                     email: ct.email,
        //                     photoURL: ct.photoURL
        //                 });
        //             }
        //         });

                dispatch({
                    type: FETCH_CONTACT_SUCCESS,
                    contacts
                });
            }, error => {
                console.log('error', error);
                dispatch({
                    type: FETCH_CONTACT_ERROR,
                });
            });
    };
};