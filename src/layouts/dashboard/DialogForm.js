import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import { StoreContext } from '../../store';
// import { toolbarFull, toolbarSimple } from '../../components/editor/draft/DraftEditorToolbar';

export default function DialogForm({ openFormDialog, handleCloseFormDialog }) {
  let selectedTags = [];
  // eslint-disable-next-line no-unused-vars
  const [tagState, dispatch] = useContext(StoreContext).data;
  const defaultValues = {
    password: '',
    forWhat: '',
    document: ''
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
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(JSON.stringify({ ...data, tags: selectedTags }, null, 2));
    reset();
  };
  return (
    <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth>
      <DialogTitle>Đóng góp văn mẫu</DialogTitle>
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
                <TextField {...field} label="Dùng để" error={Boolean(error)} helperText={error?.message} />
              )}
            />

            <Autocomplete
              onChange={(e, value) => {
                selectedTags = value;
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
          <Button type="submit" onClick={handleCloseFormDialog} variant="contained">
            Gửi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
