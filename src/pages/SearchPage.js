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
import { TagInfoMemo } from '../components/TagInfo';

// ----------------------------------------------------------------------let dataSearch = [];
export default function PageHome() {
  const [state, setState] = useContext(StoreContext).data;
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
                  <CopyButton id={document.document_id} content={document.content} />
                  <TagInfoMemo documentId={document.document_id} allTags={state.allTags} />
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
