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
};

export const createUserProfileDocument = async( userAuth, additionalData ) => {
    
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        //bijvullen in onze database
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set( {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user ', error.message );
        }
    }

    return userRef; // misschien kunnen we elders deze ref nog gebruiken

};




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;