import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppAuth from "expo-app-auth";
import * as Google from "expo-google-app-auth";
import * as firebase from 'firebase';
import Api from './Api'
const config = {
      iosClientId: "898857693745-596fb9q5n1oisutgk4lmsu7etvlquch0.apps.googleusercontent.com",
      androidClientId: "898857693745-9fai5d8ogsratt41o1qbd8jd5u8rn513.apps.googleusercontent.com",
      copes: ["profile", "email"]
}

const GGAPI = {
    
  async signInAsync() {
      const {idToken, accessToken,type } = await Google.logInAsync(config);

      if (type === "success") {
      //     let currentUser = user;

      //     currentUser.accessToken = accessToken;
      //     await this.cacheAuthAsync(currentUser);
      //     return currentUser;
      // }
       const credential = firebase.auth.GoogleAuthProvider.credential(idToken,accessToken);
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(res => {
              alert(`Login google success!`)
            //   let user = firebase.auth().currentUser;
            //   let newUser = {
            //     id: user.uid,
            //     name: user.displayName,
            //     avatar: user.photoURL,
            //     email: user.email
            //   };
            // Api.addUser(newUser);
            })
            .catch(error => {
              console.log("firebase cred err:", error);
            });
        } else {
          return { cancelled: true };
        }
      
      // let authState = await AppAuth.authAsync(config);
      // await cacheAuthAsync(authState);
      // console.log('signInAsync', authState);
      // return authState;
  },
  async cacheAuthAsync(authState) {
      return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  },
  async getCachedAuthAsync() {
      let value = await AsyncStorage.getItem(StorageKey);
      let authState = JSON.parse(value);
      if (authState) {
          if (checkIfTokenExpired(authState)) {
              return refreshAuthAsync(authState);
          } else {
              return authState;
          }
      }
      return null;
  },
  checkIfTokenExpired({ accessTokenExpirationDate }) {
      return new Date(accessTokenExpirationDate) < new Date();
  },
  checkIfTokenExpired({ accessTokenExpirationDate }) {
      return new Date(accessTokenExpirationDate) < new Date();
  },
  async refreshAuthAsync({ refreshToken }) {
      let authState = await AppAuth.refreshAsync(config, refreshToken);
      console.log("refreshAuth", authState);
      await cacheAuthAsync(authState);
      return authState;
  },
  // async signOutAsync(props) {
  //     const { accessToken } = props || {};

  //     if (accessToken) {
  //         try {
  //             firebase.auth().signOut();

  //             await AppAuth.revokeAsync(config, {
  //                 token: accessToken,
  //                 isClientIdProvided: true,
  //             });
  //             await AsyncStorage.removeItem(StorageKey);
  //             requestLogout(accessToken)
  //             return null;
  //         } catch (e) {
  //             alert(`Failed to revoke token: ${e.message}`);
  //         }
  //     } else {
  //         try {
  //             await AsyncStorage.removeItem(StorageKey);
  //         } catch (e) {
  //             alert(`Failed to revoke token: ${e.message}`);
  //         }
  //     }
  // },
};
export default GGAPI;