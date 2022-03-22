import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import { BASE_URL } from '../config';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function CopyButton({ id, content }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '50%' }}>
      <Button
        variant="outlined"
        startIcon={<ContentCopyIcon />}
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(content);
          axios.post(`${BASE_URL}/update/document`, { documentId: id });
          handleClick();
        }}
      >
        Copy
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Copy thành công!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
