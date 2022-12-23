import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ToastHandler from './pages/@shared/App/ToastHandler';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import parseLoginResponse from './utils/parseLoginResponse';
import { setCurrentUser, signOut } from './redux/features/authSlice.js';

import PrivateRoute from './pages/@shared/App/PrivateRoute';

import MainMenu from './pages/MainMenu/MainMenu';
import DrawingBoard from './pages/DrawingBoard/DrawingBoard';

import DrawingDetails from './pages/DrawingDetails/DrawingDetails';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/Profile/Profile';
import Navigation from './pages/@shared/Navigation';
import Explore from './pages/Explore/Explore';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const parsedUser = parseLoginResponse(user);
        dispatch(setCurrentUser(parsedUser));
      } else {
        dispatch(signOut);
      }
      setIsLoading(false);
    });
  }, [dispatch]);

  return isLoading ? (
    <div />
  ) : (
    <div className="App" style={{ backgroundColor: '#525252' }}>
      <ToastHandler />
      <BrowserRouter>
        <Grid container>
          <Navigation />
          <Container
            style={{
              minHeight: '100vh',
              maxWidth: '56rem',
              backgroundColor: 'gray',
              paddingTop: '5.5rem',
            }}
          >
            <Routes>
              <PrivateRoute exact path="/">
                <Route element={<MainMenu />} />
              </PrivateRoute>
              <PrivateRoute path="/draw/:mode">
                <Route element={<DrawingBoard />} />
              </PrivateRoute>
              <PrivateRoute path="/explore">
                <Route element={<Explore />} />
              </PrivateRoute>
              <PrivateRoute path="/drawing/:id">
                <Route element={<DrawingDetails />} />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Route element={<Profile />} />
              </PrivateRoute>
              <Route path="/explore" element={<Explore />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Container>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default App;
