import React from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
import { updateDocument } from '../firebase/service';

export default function Like({ documentId, Auth, isLiked }) {
  const [isLikedState, setIsLikedState] = React.useState(isLiked);
  const handleLike = () => {
    const { user } = Auth;
    if (isLikedState) {
      setIsLikedState(false);
      user.likedDocument = user.likedDocument.filter((document) => Number(document) !== documentId);
    } else {
      user.likedDocument.push(documentId);
      setIsLikedState(true);
    }
    Auth.setUser(user);
    updateDocument(user.thisId, user);
  };
  return (
    <IconButton aria-label="delete" size="small" onClick={handleLike}>
      {isLikedState ? (
        <ThumbUpIcon color="primary" fontSize="inherit" />
      ) : (
        <ThumbUpOutlinedIcon color="primary" fontSize="inherit" />
      )}
    </IconButton>
  );
}
