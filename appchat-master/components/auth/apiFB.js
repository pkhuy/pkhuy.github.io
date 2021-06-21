import { Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import Api from './Api'
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig';

  
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
const LoginAPI = {
    async logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '1455376728134432',
            });
            const {
                type, token
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });

            if (type === 'success') {
        //         // res.token = token
        //         const tokenData = await AccessToken.getCurrentAccessToken();
        //         const token = tokenData.accessToken.toString();
        //         const credential = firebase.auth.FacebookAuthProvider.credential(token);
        //         const user = await firebase.auth().signInWithCredential(credential);
        // //   let user = firebase.auth().currentUser;
        //           let newUser = {
        //         id: user.uid,
        //         name: user.displayName,
        //         avatar: user.photoURL,
        //         email: user.email
        //         };
        //        Api.addUser(newUser);
           
             
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=birthday,email,hometown,picture,link,education,name&access_token=${token}`);
                const res =  await response.json();
                // token.toString()
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                await firebase.auth().signInWithCredential(credential);
                // let user = firebase.auth().currentUser;
                // let newUser = {
                //     id: user.uid,
                //     name: user.displayName,
                //     avatar: user.photoURL,
                //     email: user.email
                //   };
                // Api.addUser(newUser);
                
            } else {
                // type === 'cancel'
                Alert.alert('Loggin with facebook has error!');
            }
        } catch ({ message }) {
            console.log(`Facebook Login Error: ${message}`);
        }
        return null;
    },
//  getUserAsync() {
//         const res = await this.requestAsync('me');
//         // console.log(res)
//         return res
//     },

    // Learn more https://developers.facebook.com/docs/graph-api/using-graph-api/
    async requestAsync(path, token) {
        let resolvedToken = token;
        if (!token) {
            const auth = await Facebook.getAuthenticationCredentialAsync();
            if (!auth) {
                throw new Error(
                'User is not authenticated. Ensure `logInWithReadPermissionsAsync` has successfully resolved before attempting to use the FBSDK Graph API.'
                );
            }
            resolvedToken = auth.token;
        }
        const response = await fetch(
        `https://graph.facebook.com/${path}?access_token=${encodeURIComponent(resolvedToken)}`
        );
        const body = await response.json();
        return body;
    }
}

export default LoginAPI