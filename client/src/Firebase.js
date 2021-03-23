import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBU6cQWgYhSNNPZL1alfxAEk67_7gjUrMo",
    authDomain: "onechatter-f3ffa.firebaseapp.com",
    projectId: "onechatter-f3ffa",
    storageBucket: "onechatter-f3ffa.appspot.com",
    messagingSenderId: "932983429656",
    appId: "1:932983429656:web:70818d399faa83bef9816d",
    measurementId: "G-P8G2XBDSSX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;