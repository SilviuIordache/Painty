import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

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
        <Container style={style}>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <PrivateRoute>
                <Route exact path="/" element={<MainMenu />} />
              </PrivateRoute>
              <PrivateRoute>
                <Route path="/draw/:mode" element={<DrawingBoard />} />
              </PrivateRoute>
              <PrivateRoute>
                <Route path="/gallery" element={<Gallery />} />
              </PrivateRoute>
              <PrivateRoute>
                <Route path="/drawing/:id" element={<DrawingDetails />} />
              </PrivateRoute>
              <PrivateRoute>
                <Route path="/profile" element={<Profile />} />
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
