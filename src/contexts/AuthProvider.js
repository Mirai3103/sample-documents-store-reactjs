import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { queryDocument } from '../firebase/service';

export const AuthContext = React.createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  // const history = useNavigate();
  React.useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { uid } = user;
        const { docId, data } = await queryDocument(uid);
        setUser({
          ...data,
          thisId: docId
        });
      } else {
        setUser({});
      }
    });
  }, []);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
