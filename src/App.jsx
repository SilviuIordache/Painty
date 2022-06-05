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
import AuthCheck from './components/AuthCheck/AuthCheck'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';


const style = {
  backgroundColor: 'lightgray',
  minHeight: '100vh',
  maxWidth: '60rem',
};
function App() {
  return (
    // delete top wrapper?
    <div className="App">
      <ToastContainer />
      <Container style={style}>
        <BrowserRouter>
        <AuthCheck/>
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
