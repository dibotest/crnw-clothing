import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyA3lm3LigWF_6rL8A4BoMRfT4HbDFaGPgU",
    authDomain: "crwn-db-17b8a.firebaseapp.com",
    databaseURL: "https://crwn-db-17b8a.firebaseio.com",
    projectId: "crwn-db-17b8a",
    storageBucket: "crwn-db-17b8a.appspot.com",
    messagingSenderId: "1084689258916",
    appId: "1:1084689258916:web:f2ee264f6ff79750498931",
    measurementId: "G-KKJ8KK9KDJ"
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;