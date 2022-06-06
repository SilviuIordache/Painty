import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import MainMenu from './views/MainMenu';
import DrawingBoard from './views/DrawingBoard';
import Gallery from './views/Gallery';
import Explore from './views/Explore';

import DrawingDetails from './views/DrawingDetails';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import ForgotPassword from './views/auth/ForgotPassword';
import Profile from './views/auth/Profile';

import Navigation from './components/Navigation/Navigation';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import parseLoginResponse from './helpers/parseLoginResponse';
import { setCurrentUser, signOut } from './redux/features/authSlice.js';

const style = {
  backgroundColor: 'lightgray',
  minHeight: '100vh',
  maxWidth: '60rem',
};
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

  return ( isLoading ? <div/> :
    <div className="App">
      <ToastContainer />
      <Container style={style}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <PrivateRoute exact path="/">
              <Route element={<MainMenu />} />
            </PrivateRoute>
            <PrivateRoute path="/draw/:mode">
              <Route element={<DrawingBoard />} />
            </PrivateRoute>
            <PrivateRoute path="/gallery">
              <Route element={<Gallery />} />
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
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
