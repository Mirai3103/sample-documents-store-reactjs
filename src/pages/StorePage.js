import React, { useContext, useState } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import useSettings from '../hooks/useSettings';
import Page from '../components/Page';
import SurveyDialog from '../layouts/dashboard/SurveyDialog';
import { mapDoc } from './mapFunction';
import { StoreContext } from '../store';
import { BASE_URL } from '../config';
import { setData } from '../store/reducer';

export default function StorePage() {
  const AuthData = useContext(AuthContext);
  const [state, dispatch] = useContext(StoreContext).data;
  const { themeStretch } = useSettings();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    axios
      .post(`${BASE_URL}/api/userStore`, {
        documentsId: AuthData.user.likedDocument
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      dispatch(setData([]));
    };
  }, [dispatch, AuthData]);
  return (
    <Page title="User Store | Văn mẫu">
      <SurveyDialog />
      <h1 style={{ marginBottom: '1rem' }}>Kho Luu tru</h1>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {state.data[0] === undefined ? (
          <h1>Khong co</h1>
        ) : (
          state.data.map(mapDoc(expanded, handleChange, AuthData, state))
        )}
      </Container>
    </Page>
  );
}
