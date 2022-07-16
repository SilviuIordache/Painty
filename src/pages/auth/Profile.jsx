import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../redux/features/authSlice.js';
import { useNavigate } from 'react-router-dom';
import UserName from '../../components/UserName/UserName';
import {
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <h1 className="mb-4">Profile</h1>
            {error && <Alert severity="error">{error}</Alert>}
            <div>
              <strong>ID: </strong> {currentUser.uid}
            </div>
            <div>
              <strong>Email: </strong> {currentUser.email}
            </div>
            <div>
              <strong>Username: </strong> <UserName uid={currentUser.uid} />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card
          sx={{
            height: '100%',
            minHeight: '10rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            <h1 className="mb-4">Actions</h1>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" size="large" onClick={handleLogout}>
                Log out
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
