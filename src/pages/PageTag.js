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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CopyButton from './CopyButton';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import PageNumber from './pagenumber/PageNumber';
import { BASE_URL } from '../config';

// ----------------------------------------------------------------------

export default function PageTag({ id, title }) {
  const { themeStretch } = useSettings();
  const [expanded, setExpanded] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/api/${id}?page=${searchParams.get('page')}`)
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        const TOTAL_PAGE = Math.ceil(data[0].full_count / 10);
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
          documents.map((document) => (
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
        <PageNumber searchParams={searchParams} pageCount={totalPage} setSearchParam={setSearchParams} />
      </Container>
    </Page>
  );
}
