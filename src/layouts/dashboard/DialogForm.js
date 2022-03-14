import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import { StoreContext } from '../../store';

// import { toolbarFull, toolbarSimple } from '../../components/editor/draft/DraftEditorToolbar';
const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);
export default function DialogForm({ openFormDialog, handleCloseFormDialog }) {
  const [selectedTags, setSelectedTags] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [tagState, dispatch] = useContext(StoreContext).data;
  const defaultValues = {
    password: '',
    forWhat: '',
    document: ''
  };
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
    console.log(selectedTags);
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(JSON.stringify({ ...data, selectedTags }, null, 2));
    setSelectedTags([]);
    reset();
    handleClick();
  };
  return (
    <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth>
      <DialogTitle>Đóng góp văn mẫu</DialogTitle>
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
        <DialogContent>
          <Stack marginTop={`${1}em`} spacing={3}>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Password (Để trống)" error={Boolean(error)} helperText={error?.message} />
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
        <DialogActions>
          <Button onClick={handleCloseFormDialog} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Gửi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
