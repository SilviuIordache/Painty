import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ToastHandler from './components/Toast/ToastHandler';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import parseLoginResponse from './utils/parseLoginResponse';
import { setCurrentUser, signOut } from './redux/features/authSlice.js';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import MainMenu from './pages/MainMenu';
import DrawingBoard from './pages/DrawingBoard';
import Gallery from './pages/Gallery';

import DrawingDetails from './pages/DrawingDetails';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/auth/Profile';
import Navigation from './features/Navigation/Navigation';

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
              maxWidth: '60rem',
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
                <Route element={<Gallery />} />
              </PrivateRoute>
              <PrivateRoute path="/drawing/:id">
                <Route element={<DrawingDetails />} />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Route element={<Profile />} />
              </PrivateRoute>
              <Route path="/explore" element={<Gallery />} />
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
