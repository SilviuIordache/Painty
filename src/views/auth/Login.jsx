import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../redux/features/authSlice.js';
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

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(
        signIn({
          email,
          password,
        })
      );
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{ textAlign: 'center' }}
            >
              Log In
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  id="email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                />
              </Box>

              <Button
                disabled={loading}
                size="large"
                variant="contained"
                type="submit"
                sx={{ width: '100%', mt: '1rem' }}
              >
                Log In
              </Button>
              {error && (
                <Alert severity="error" sx={{ mt: '0.5rem' }}>
                  {error}
                </Alert>
              )}
            </form>
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: '0.5rem' }}>
              <Link to="/forgot-password">Forgot password?</Link>
            </Box>
            <Box sx={{ mb: '0.5rem' }}>
              <span>Don't have an account? </span>
              <Link to="/signup">Sign Up</Link>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
