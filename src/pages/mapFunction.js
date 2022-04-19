import { Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Like from './Like';
import CopyButton from './CopyButton';
import { TagInfoMemo } from '../components/TagInfo';
import { BASE_URL } from '../config';

const handleDelete = (event, documentId) => {
  axios
    .post(`${BASE_URL}/deleteDocument`, {
      documentId
    })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};
export function mapDoc(expanded, handleChange, AuthData, state) {
  return (document) => (
    <Accordion
      key={document.document_id}
      expanded={expanded === document.document_id}
      onChange={handleChange(document.document_id)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <div style={{ width: '80%' }}>{document.title}</div>
        <div style={{ width: '20%', textAlign: 'end' }}>
          {AuthData.user.isAdmin === true ? (
            <IconButton aria-label="delete" size="small" onClick={(e) => handleDelete(e, document.document_id)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          ) : null}
          <Like
            isLiked={AuthData.user.likedDocument && AuthData.user.likedDocument.includes(document.document_id)}
            Auth={AuthData}
            documentId={document.document_id}
          />
        </div>
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
  );
}
