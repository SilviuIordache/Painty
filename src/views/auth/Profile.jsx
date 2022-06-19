import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../redux/features/authSlice.js';
import { useNavigate } from 'react-router-dom';
import UserName from '../../components/GalleryDrawing/UserName';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  async function handleLogout() {
    try {
      await dispatch(signOut());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }

  function goToUpdateProfile() {
    navigate('/update-profile');
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <h1 className="mb-4">Profile</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <div>
              <strong>ID: </strong> {currentUser.uid}
            </div>
            <div>
              <strong>Email: </strong> {currentUser.email}
            </div>
            <div>
              <strong>Username: </strong> <UserName uid={currentUser.uid} />
            </div>
            <div>
              <strong>Image: </strong>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card sx={{ height: '100%', minHeight: '10rem', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
          <CardContent>
            <h1 className="mb-4">Actions</h1>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Button
                variant="contained"
                size="large"
                onClick={goToUpdateProfile}
              >
                Update Profile
              </Button>

              <Button variant="text" size="large" onClick={handleLogout}>
                Log out
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
