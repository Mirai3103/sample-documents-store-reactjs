import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

export const AuthContext = React.createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useNavigate();
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setUser({ displayName, email, photoURL, uid });
      } else {
        setUser({});
      }
    });
  }, []);
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
