// material
import { Container, Alert } from '@mui/material';

// hooks
import { useContext, useState } from 'react';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { StoreContext } from '../store';
import { AuthContext } from '../contexts/AuthProvider';
import { mapDoc } from './mapFunction';

// ----------------------------------------------------------------------let dataSearch = [];
export default function PageHome() {
  const AuthData = useContext(AuthContext);
  const state = useContext(StoreContext).data[0];
  const { themeStretch } = useSettings();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Page title="Search Page | Văn mẫu">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {state.searchData[0] === undefined ? (
          <Alert severity="info">Khong tim thay van mau nao chua cac tag tren</Alert>
        ) : (
          state.searchData.map(mapDoc(expanded, handleChange, AuthData, state))
        )}
        {/* <PageNumber searchParams={searchParams} pageCount={totalPage} setSearchParam={setSearchParams} /> */}
      </Container>
    </Page>
  );
}
