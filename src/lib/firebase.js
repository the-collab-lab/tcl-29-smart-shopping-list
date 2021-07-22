// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: 'AIzaSyB1pamXP9wq65aAUlJuS1P7NRWPGi5FJ5g',
  authDomain: 'tcl-29-shopping-list.firebaseapp.com',
  projectId: 'tcl-29-shopping-list',
  storageBucket: 'tcl-29-shopping-list.appspot.com',
  messagingSenderId: '166083757710',
  appId: '1:166083757710:web:d959706ebc407afbc1abdf',
};

let fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();
export default db;
