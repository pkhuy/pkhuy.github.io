import firebaseConfig from "./firebaseConfig";

const addUser = async (name, email, uid, profileImg) => {
    try {
        return await firebaseConfig.database().ref('users/' + uid).set({
            name: name,
            email: email,
            uuid: uid,
            profileImg: profileImg,
        });
    } catch (error) {
        return error;
    }
}