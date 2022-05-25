import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import CustomSnackbar from './components/CustomSnackbar/CustomSnackbar'
import Navigation from './components/Navigation/Navigation';
import MainMenu from './views/MainMenu';
import DrawingBoard from './views/DrawingBoard';
import Gallery from './views/Gallery';
import DrawingDetails from './views/DrawingDetails';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import ForgotPassword from './views/auth/ForgotPassword';
import Profile from './views/auth/Profile';

import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';

const style = {
  backgroundColor: 'lightgray',
  minHeight: '100vh',
  maxWidth: '60rem',
};
function App() {
  return (
    // delete top wrapper?
    <div className="App">
      <AuthProvider>
        <CustomSnackbar/>
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
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
