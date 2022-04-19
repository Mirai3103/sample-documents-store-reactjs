import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import firebase, { auth } from '../firebase/config';
import { addDocument } from '../firebase/service';
// eslint-disable-next-line import/no-named-as-default-member
const googleProvider = new firebase.auth.GoogleAuthProvider();
// eslint-disable-next-line import/no-named-as-default-member
// const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
  const handleLoginGG = async () => {
    // eslint-disable-next-line import/no-named-as-default-member
    const { additionalUserInfo, user } = await auth.signInWithPopup(googleProvider);

    if (additionalUserInfo.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: user.providerId,
        likedDocument: []
      });
    } else {
      console.log('user already exist');
    }
  };

  // const handleLoginFB = () => {
  //   // eslint-disable-next-line import/no-named-as-default-member
  //   auth.signInWithPopup(facebookProvider);
  // };
  const history = useNavigate();
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history('/');
      }
    });
  }, [history]);

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h1>Login</h1>
      <div style={{ width: '50%', margin: '0.5em auto' }}>
        <Button color="primary" onClick={handleLoginGG} variant="outlined" fullWidth>
          Login with Google
        </Button>
      </div>
      {/* <div style={{ width: '50%', margin: '0.5em auto' }}> */}
      {/*  <Button color="primary" onClick={handleLoginFB} variant="contained" fullWidth> */}
      {/*    Login with Facebook */}
      {/*  </Button> */}
      {/* </div> */}
    </div>
  );
}
