import { IconButton, Popover, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { useState, memo } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

function TagInfo({ documentId, allTags }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tagInfo, setTagInfo] = useState([]);
  const handleSetOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
    axios
      .post(`${BASE_URL}/api/gettagofdocument`, {
        documentId
      })
      .then((res) => {
        setTagInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSetClosePopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const tagsListString = tagInfo.map((tag) => allTags[Number(tag.tag_id) - 1].tag_name).join(', ');
  return (
    <>
      <IconButton onClick={handleSetOpenPopover} aria-describedby={`${open ? documentId : undefined}-popover`}>
        <InfoIcon />
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
        id={`${open ? documentId : undefined}-popover`}
        anchorEl={anchorEl}
      >
        <Typography sx={{ p: 2 }}>{tagsListString === '' ? 'Không có' : tagsListString}</Typography>
      </Popover>
    </>
  );
}
export const TagInfoMemo = memo(TagInfo);
