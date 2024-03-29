import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageIcon from '@mui/icons-material/Image';
import { deleteImage } from 'dbservices/images/deleteImage'


export default function DrawingOptions(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);

  let navigate = useNavigate();

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
    const link = document.createElement('a');
    link.download = props.name;
    // attach the img src to the link
    link.href = img.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setAnchorEl(null);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this image?'
    );
    if (!confirmDelete) return;

    deleteImage(props.id, props.path);

    if (location.pathname.includes('drawing')) {
      navigate('/explore');
      return
    }

    setAnchorEl(null);
  };

  const handleNavigateToDetails = () => {
    navigate(`/drawing/${props.id}`);
  };

  const [privateOption] = useState(() => {
    return props.authorID === currentUser.uid;
  });

  const [locationIsDetails] = useState(() => {
    return location.pathname.includes('drawing');
  });

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>

        {!locationIsDetails && (
          <MenuItem onClick={handleNavigateToDetails}>
            <ListItemIcon>
              <ImageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Details</ListItemText>
          </MenuItem>
        )}

        {privateOption && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
