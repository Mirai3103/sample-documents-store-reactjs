// material
import { CircularProgress, Container, Stack } from '@mui/material';

// hooks
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import PageNumber from './pagenumber/PageNumber';
import { StoreContext } from '../store';
import SurveyDialog from '../layouts/dashboard/SurveyDialog';
import { setData, setHomeTotalPage } from '../store/reducer';
import { BASE_URL } from '../config';

import { AuthContext } from '../contexts/AuthProvider';

import { mapDoc } from './mapFunction';
// ----------------------------------------------------------------------

export default function PageHome() {
  const AuthData = useContext(AuthContext);
  const [state, dispatch] = useContext(StoreContext).data;
  const { themeStretch } = useSettings();
  const [expanded, setExpanded] = useState(false);
  // const [totalPage, setTotalPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  useEffect(() => {
    if (state.data.length === 0) {
      fetch(`${BASE_URL}/api/home?page=${searchParams.get('page')}`, { mode: 'cors' })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setData(data));
          const TOTAL_PAGE = Math.ceil(data[0].full_count / 20);
          dispatch(setHomeTotalPage(TOTAL_PAGE));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setHomeTotalPage(1));
        });
    }
    return () => {
      dispatch(setData([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Page title="Home Page | Văn mẫu">
      <SurveyDialog />
      <h1 style={{ marginBottom: '1rem' }}>Tất cả văn mẫu</h1>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {state.data[0] === undefined ? (
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" className="loading-spinner">
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          state.data.map(mapDoc(expanded, handleChange, AuthData, state))
        )}
        <PageNumber searchParams={searchParams} pageCount={state.homeTotalPage} setSearchParam={setSearchParams} />
      </Container>
    </Page>
  );
}
