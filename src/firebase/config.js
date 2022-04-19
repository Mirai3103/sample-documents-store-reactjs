import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDQe8cnIFlGvnTldtMF4dl_O4G814XeNLs',
  authDomain: 'vanmau-904dc.firebaseapp.com',
  projectId: 'vanmau-904dc',
  storageBucket: 'vanmau-904dc.appspot.com',
  messagingSenderId: '1040213183971',
  appId: '1:1040213183971:web:f2782bbe1d14032ac864d6',
  measurementId: 'G-26JDXPKYZ8'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', 8080);
}
export { auth, db };
export default firebase;
