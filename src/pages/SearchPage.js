// material
import { Accordion, AccordionDetails, AccordionSummary, Container, Alert, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// hooks
import { useContext, useState } from 'react';
import CopyButton from './CopyButton';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { StoreContext } from '../store';

// ----------------------------------------------------------------------

export default function PageHome() {
  const state = useContext(StoreContext).data[0];
  const { themeStretch } = useSettings();
  console.log(state);
  const [expanded, setExpanded] = useState(false);
  // const [totalPage, setTotalPage] = useState(1);
  // const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  // useEffect(() => {
  //   if (state.data.length === 0) {
  //     fetch(`http://localhost:8081/api/home?page=${searchParams.get('page')}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         dispatch(setData(data));
  //         const TOTAL_PAGE = Math.ceil(data[0].full_count / 10);
  //         setTotalPage(TOTAL_PAGE);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setTotalPage(1);
  //       });
  //   }
  // }, [dispatch, searchParams]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Page title="Search Page | Văn mẫu">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {state.searchData[0] === undefined ? (
          <Alert severity="info">Khong tim thay van mau nao chua cac tag tren</Alert>
        ) : (
          state.searchData.map((document) => (
            <Accordion
              key={document.document_id}
              expanded={expanded === document.document_id}
              onChange={handleChange(document.document_id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{document.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{document.content}</Typography>
                <br />
                <Stack className="copy-button" direction="row" spacing={2}>
                  <CopyButton content={document.content} />
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))
        )}
        {/* <PageNumber searchParams={searchParams} pageCount={totalPage} setSearchParam={setSearchParams} /> */}
      </Container>
    </Page>
  );
}
