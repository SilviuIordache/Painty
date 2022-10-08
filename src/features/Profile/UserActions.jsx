import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/features/authSlice.js';
import { useNavigate } from 'react-router-dom';
import {

  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      await dispatch(signOut());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }

  return (
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
  );
}
