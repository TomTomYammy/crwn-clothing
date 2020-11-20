import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDSetlcKoZMKSqYN3pSX0_s1Gkhwjm8C1c",
    authDomain: "crwn-db-57104.firebaseapp.com",
    databaseURL: "https://crwn-db-57104.firebaseio.com",
    projectId: "crwn-db-57104",
    storageBucket: "crwn-db-57104.appspot.com",
    messagingSenderId: "313756301465",
    appId: "1:313756301465:web:1f65217b30f77ccb882008",
    measurementId: "G-RNVKKCDNEJ",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
