export * from './Authenticate';

import firebase from 'firebase';
import {USER_STATE_CHANGE} from  '../constants/index';
export function fetchUser() {
    return ((dispatch) => {
        firebase.database().ref('users')
        .on('value', snapshot => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
        }
    )
}
