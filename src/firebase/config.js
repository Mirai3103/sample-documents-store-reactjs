import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';
import { firebaseConfig } from './configKey';

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
