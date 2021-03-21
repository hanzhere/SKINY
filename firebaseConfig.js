import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyDnGkFpTddADeUpKvsDIN40Fwuxd_i3FwQ",
    authDomain: "skiny-7ca0d.firebaseapp.com",
    projectId: "skiny-7ca0d",
    storageBucket: "skiny-7ca0d.appspot.com",
    messagingSenderId: "958958021465",
    appId: "1:958958021465:web:f0c29be7ce6ebbbd68fa48",
    measurementId: "G-ET78SDX3BK"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth
export const db = firebase.database()