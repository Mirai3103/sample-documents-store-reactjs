// material
import { CircularProgress, Container, Stack } from '@mui/material';
// hooks
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import PageNumber from './pagenumber/PageNumber';
import { BASE_URL } from '../config';

import { StoreContext } from '../store';
import { AuthContext } from '../contexts/AuthProvider';
import { mapDoc } from './mapFunction';

// ----------------------------------------------------------------------

export default function PageTag({ id, title }) {
  const AuthData = useContext(AuthContext);
  const { themeStretch } = useSettings();
  const state = useContext(StoreContext).data[0];
  const [expanded, setExpanded] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/api/${id}?page=${searchParams.get('page')}`, { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        const TOTAL_PAGE = Math.ceil(data[0].full_count / 20);
        setTotalPage(TOTAL_PAGE);
      })
      .catch((err) => {
        console.log(err);
        setTotalPage(1);
      });
    return () => {
      setDocuments([]);
    };
  }, [searchParams, id]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Page title={`${title} | văn mẫu`}>
      <h1 style={{ marginBottom: '1rem' }}>{title}</h1>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {documents[0] === undefined ? (
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" className="loading-spinner">
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          documents.map(mapDoc(expanded, handleChange, AuthData, state))
        )}
        <PageNumber searchParams={searchParams} pageCount={totalPage} setSearchParam={setSearchParams} />
      </Container>
    </Page>
  );
}
