import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { passReset, resetErrorAndMessage } from 'redux/features/authSlice.js';

import {
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect } from 'react';

export default function ForgotPassword() {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState();

  useEffect(() => {
    dispatch(resetErrorAndMessage());
  }, [dispatch])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(passReset({email}))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ padding: '1rem 0'}}>
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{ textAlign: 'center', fontWeight: 'bold' }}
            >
              Password Reset
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  inputProps={{
                    autoComplete: 'name',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                />
              </Box>
              <Button
                variant="contained"
                disabled={loading}
                sx={{ width: '100%', mt: '1rem' }}
                type="submit"
              >
                Reset Password
              </Button>
              <Box sx={{ mt: '1rem'}}>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
              </Box>
            </form>
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/login">Log in</Link>
            <Box sx={{ mt: '0.5rem' }}>
              <span>Don't have an account?</span>{' '}
              <Link to="/signup">Sign Up</Link>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
