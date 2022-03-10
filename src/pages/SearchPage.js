// material
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  Stack,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// hooks
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CopyButton from './CopyButton';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import PageNumber from './pagenumber/PageNumber';
import { StoreContext } from '../store';

import { setData } from '../store/reducer';
// ----------------------------------------------------------------------

export default function PageHome() {
  const [state, dispatch] = useContext(StoreContext).data;
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
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
          </Stack>
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
                <Stack direction="row" spacing={2}>
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
