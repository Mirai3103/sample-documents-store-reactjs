import { useState } from 'react';
// material
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

// ----------------------------------------------------------------------

export default function AddTagDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        Form Dialogs
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>Nhập tên tag vào đây</DialogContentText>
          <TextField autoFocus fullWidth type="email" margin="dense" variant="outlined" label="Tag" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
