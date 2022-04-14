import React from 'react';
import { useNavigate } from 'react-router-dom';
import firebase, { auth } from '../firebase/config';
// eslint-disable-next-line import/no-named-as-default-member
const googleProvider = new firebase.auth.GoogleAuthProvider();
// eslint-disable-next-line import/no-named-as-default-member
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
  const handleLoginGG = () => {
    // eslint-disable-next-line import/no-named-as-default-member
    auth.signInWithPopup(googleProvider);
  };
  const handleLoginFB = () => {
    // eslint-disable-next-line import/no-named-as-default-member
    auth.signInWithPopup(facebookProvider);
  };
  const history = useNavigate();
  auth.onAuthStateChanged((user) => {
    console.log('hu');
    if (user) {
      history('/');
    }
  });
  return (
    <div>
      <h1>Login</h1>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={handleLoginGG}>Login with Google</button>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={handleLoginFB}>Login with Facebook</button>
    </div>
  );
}
