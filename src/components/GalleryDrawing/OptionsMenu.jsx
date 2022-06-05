import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteImage } from '../../dbservices/images.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../redux/features/imagesSlice.js';

export default function OptionsMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const { currentUser } = useSelector(state => state.auth);

  let navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleDownload = () => {
    const img = document.getElementById(props.id);
    const link = document.createElement("a");
    link.download = props.name;
    // attach the img src to the link
    link.href = img.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setAnchorEl(null);
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    deleteImage(props.id, props.path);
    
    if (location.pathname.includes('gallery')) {
      dispatch(fetchImages(currentUser.uid));
    } else if (location.pathname.includes('drawing')) {
      navigate('/gallery')
    }

    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        OPT
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDownload}>Download</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
