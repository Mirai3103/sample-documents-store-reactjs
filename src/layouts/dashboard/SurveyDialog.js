import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { TextField } from '@mui/material';
import { BASE_URL } from '../../config';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const finished = localStorage.getItem('finished');
  const [isFinishedSurvey, setIsFinishedSurvey] = React.useState(finished === 'yes');
  const [reason, setReason] = React.useState('');
  const handleAgree = () => {
    axios
      .post(`${BASE_URL}/update/survey`, {
        isAgree: true
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
    setIsFinishedSurvey(true);
  };
  const handleDisagree = () => {
    const reasons = reason.trim() === '' ? null : reason;
    axios
      .post(`${BASE_URL}/update/survey`, {
        isAgree: false,
        reason: reasons
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.setItem('finished', 'yes');
    setOpen(false);
    setIsFinishedSurvey(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setReason(event.target.value);
  };
  return (
    <div id="needcenter">
      {!isFinishedSurvey ? (
        <Button variant="outlined" onClick={handleClickOpen}>
          Khảo sát
        </Button>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bạn có thích giao diện hiện tại?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vì văn mẫu quá nhiều, hiện đã có tìm theo nhiều tag nhưng chưa các văn chưa được bổ xung tag đầy đủ. Tương
            lai sẽ có thêm đăng nhập, có quyền thêm sửa xóa với 1 số người.
            <br />
            <TextField variant="filled" placeholder="Gop y" value={reason} onChange={handleChange} size="medium" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Không Thích</Button>
          <Button onClick={handleAgree} autoFocus>
            Thích
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
