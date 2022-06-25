import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../redux/features/authSlice.js';
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
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await dispatch(signUp({ username, email, password }));
      if (!res.error) {
        navigate('/');
      }
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
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit} autoComplete="off">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  inputProps={{
                    autoComplete: 'name',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                />
                <TextField
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  inputProps={{
                    autoComplete: 'username',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  inputProps={{
                    autoComplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                />
              </Box>
              <Button
                disabled={loading}
                size="large"
                variant="contained"
                type="submit"
                sx={{ width: '100%', mt: '1rem' }}
              >
                Sign Up
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
              <span>Already have an account? </span>
              <Link to="/login">Log In</Link>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
