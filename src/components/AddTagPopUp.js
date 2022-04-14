import { Button, Chip, IconButton, Popover, TextField } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
// import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
// import { BASE_URL } from '../config';

function AddTagPopUp({ documentId, allTags, closeParent }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const handleSetOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSetClosePopover = () => {
    setAnchorEl(null);
  };
  const handleAddTag = () => {
    axios.post(`${BASE_URL}/add/tagtodoc`, {
      documentId,
      selectedTags
    });
    handleSetClosePopover();
    closeParent();
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton onClick={handleSetOpenPopover} aria-describedby={`${open ? documentId : undefined}addTag-popover`}>
        <AddCircleIcon />
      </IconButton>

      <Popover
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handleSetClosePopover}
        id={`${open ? documentId : undefined}addTag-popover`}
        anchorEl={anchorEl}
      >
        <Autocomplete
          style={{ width: '15em' }}
          value={selectedTags}
          onChange={(e, value) => {
            setSelectedTags(value);
          }}
          sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
          autoFocus
          fullWidth
          multiple
          id="tags-filled"
          options={allTags}
          getOptionLabel={(option) => option.tag_name}
          // defaultValue={}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={index} variant="outlined" label={option.tag_name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => <TextField {...params} variant="filled" label="Tags name" placeholder="Nhập tags" />}
        />
        {/* eslint-disable-next-line react/button-has-type */}
        <Button color="primary" onClick={handleAddTag}>
          Add
        </Button>
      </Popover>
    </>
  );
}
export default AddTagPopUp;
