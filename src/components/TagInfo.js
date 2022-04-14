import { IconButton, Popover, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState, memo, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import AddTagPopUp from './AddTagPopUp';
import { AuthContext } from '../contexts/AuthProvider';

function TagInfo({ documentId, allTags }) {
  const AuthData = useContext(AuthContext);
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
        console.log('hu');
        console.log(allTags);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSetClosePopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const tagsListString = tagInfo
    .map((tag) => {
      let rs = '';
      for (let i = 0; i < allTags.length; i += 1) {
        if (allTags[i].tag_id === tag.tag_id) {
          rs = allTags[i].tag_name;
          break;
        }
      }
      return rs;
    })
    .join(', ');
  return (
    <>
      <IconButton onClick={handleSetOpenPopover} aria-describedby={`${open ? documentId : undefined}-popover`}>
        <InfoIcon />
      </IconButton>

      <Popover
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handleSetClosePopover}
        id={`${open ? documentId : undefined}-popover`}
        anchorEl={anchorEl}
      >
        <Typography sx={{ p: 2 }} noWrap={false}>
          {tagsListString === '' ? 'Không có' : tagsListString},{' '}
        </Typography>
        {AuthData.user.uid === 'RIrcjAX7YFf32qwYaGEqIfV7AgK2' ? (
          <AddTagPopUp documentId={documentId} allTags={allTags} closeParent={handleSetClosePopover} />
        ) : null}
      </Popover>
    </>
  );
}
export const TagInfoMemo = memo(TagInfo);
