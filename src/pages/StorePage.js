import React, { useContext, useState } from 'react';
import { CircularProgress, Container, Stack } from '@mui/material';
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
    if (AuthData.user.likedDocument !== undefined && AuthData.user.likedDocument.length !== 0) {
      axios
        .post(`${BASE_URL}/api/userStore`, {
          documentsId: AuthData.user.likedDocument
        })
        .then((res) => {
          dispatch(setData(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      dispatch(setData([]));
    };
  }, [dispatch, AuthData]);
  let isShowDontHave = false;
  if (AuthData.user.likedDocument === undefined) {
    isShowDontHave = true;
  } else isShowDontHave = AuthData.user.likedDocument.length === 0;
  return (
    <Page title="User Store | Văn mẫu">
      <SurveyDialog />
      <h1 style={{ marginBottom: '1rem' }}>Kho Luu tru</h1>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isShowDontHave ? (
          <h1>Bạn chưa like văn mẫu nào cả </h1>
        ) : state.data[0] === undefined ? (
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" className="loading-spinner">
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          state.data.map(mapDoc(expanded, handleChange, AuthData, state))
        )}
      </Container>
    </Page>
  );
}
