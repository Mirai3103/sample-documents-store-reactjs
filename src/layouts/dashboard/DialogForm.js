import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useContext, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import axios from 'axios';

import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { StoreContext } from '../../store';
import { setAllTags } from '../../store/reducer';
import generateToken, { BASE_URL } from '../../config';
// import { toolbarFull, toolbarSimple } from '../../components/editor/draft/DraftEditorToolbar';
const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);
export default function DialogForm({ openFormDialog, handleCloseFormDialog }) {
  const [selectedTags, setSelectedTags] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [tagState, dispatch] = useContext(StoreContext).data;
  const [isAddTagTab, setIsAddTagTab] = React.useState(false);
  const [tagName, setTagName] = React.useState('');
  const defaultValues = {
    password: '',
    forWhat: '',
    document: ''
  };
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleAddTag = async () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/add/tag`, {
        tag: tagName,
        key: generateToken(new Date().getMinutes())
      })
      .then((res) => {
        const { data } = res;
        console.log(res);
        dispatch(setAllTags([...tagState.allTags, { tag_id: data.tagIdValue, tag_name: tagName }]));
        setOpen(true);
        setTagName('');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  // const handlesubmit = () => {
  //   console.log('submit');
  // };
  // const fileInputRef = useRef(null);

  const {
    // eslint-disable-next-line no-unused-vars
    watch,
    reset,
    control,
    // eslint-disable-next-line no-unused-vars
    register,
    // eslint-disable-next-line no-unused-vars
    setValue,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    mode: 'onTouched',
    defaultValues
  });
  const onSubmit = async (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/add/document`, {
        ...data,
        selectedTags,
        key: generateToken(new Date().getMinutes())
      })
      .then((res) => {
        if (res.status === 200) {
          reset();
          handleClick();
          setSelectedTags([]);
          setOpen(true);
          setLoading(false);
        }
        if (res.status === 500) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(
    () => () => {
      setIsAddTagTab(false);
      setOpen(false);
      setLoading(false);
      handleCloseFormDialog();
    },
    [handleCloseFormDialog, openFormDialog]
  );
  return (
    <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth>
      <DialogTitle>{isAddTagTab ? 'Thêm tag' : 'Đóng góp văn mẫu'}</DialogTitle>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Gửi thành công!
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isAddTagTab ? (
          <DialogContent>
            <TextField
              value={tagName}
              onChange={(e) => {
                setTagName(e.target.value);
              }}
              autoFocus
              fullWidth
              type="email"
              margin="dense"
              variant="outlined"
              label="Tag"
            />
          </DialogContent>
        ) : (
          <DialogContent>
            <Stack marginTop={`${1}em`} spacing={3}>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Password (Để trống)"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name="forWhat"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    autoComplete="off"
                    {...field}
                    label="Dùng để"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />

              <Autocomplete
                value={selectedTags}
                onChange={(e, value) => {
                  setSelectedTags(value);
                }}
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                autoFocus
                fullWidth
                multiple
                id="tags-filled"
                options={tagState.allTags}
                getOptionLabel={(option) => option.tag_name}
                // defaultValue={}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} variant="outlined" label={option.tag_name} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="filled" label="Tags name" placeholder="Nhập tags" />
                )}
              />
              <Controller
                name="document"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Nhập văn"
                    multiline
                    rows={5}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </DialogContent>
        )}
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              if (!isAddTagTab) {
                setIsAddTagTab(true);
              } else {
                setIsAddTagTab(false);
              }
            }}
          >
            {isAddTagTab ? 'Thêm văn' : 'Thêm tag'}
          </Button>
          <Button onClick={handleCloseFormDialog} color="inherit">
            Cancel
          </Button>
          <LoadingButton
            type={isAddTagTab ? 'button' : 'submit'}
            variant="contained"
            loading={loading}
            loadingPosition="end"
            onClick={isAddTagTab ? handleAddTag : () => {}}
            endIcon={<SendIcon />}
          >
            Gửi
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
