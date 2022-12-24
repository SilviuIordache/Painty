import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import { toggleLike } from 'dbservices/images/toggleLike';
import { useSelector } from 'react-redux';

export default function LikeButton(props) {
  const { currentUser } = useSelector((state) => state.auth);

  const [likes, setLikes] = useState(() => {
    return props.likes ? props.likes.length : 0;
  });

  const [liked, setLiked] = useState(() => {
    return !props?.likes?.includes(currentUser.uid);
  });
  function handleLike() {
    // set local state
    setLiked(!liked);

    // update local likes counter
    if (liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }

    // upload server state
    toggleLike(props.id, currentUser.uid);
  }

  return (
    <div>
      <IconButton onClick={handleLike}>
        {liked ? (
          <FavoriteBorderIcon />
        ) : (
          <FavoriteIcon style={{ color: 'red' }} />
        )}
      </IconButton>
      {likes}
    </div>
  );
}
