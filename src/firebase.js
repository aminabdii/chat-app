import firebase from "firebase/app";
import "firebase/auth";

export const auth =firebase.initializeApp({
    apiKey: "AIzaSyABRHl37uF72vqfIJGyg-q2bMdpNsSIsYc",
    authDomain: "messenger-6273a.firebaseapp.com",
    projectId: "messenger-6273a",
    storageBucket: "messenger-6273a.appspot.com",
    messagingSenderId: "261885775243",
    appId: "1:261885775243:web:1357c5e014f3ea549bb38e"
}).auth();