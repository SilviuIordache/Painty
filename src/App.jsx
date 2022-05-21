import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import Navigation from "./components/Navigation/Navigation";
import MainMenu from "./views/MainMenu";
import DrawingBoard from "./views/DrawingBoard";
import Gallery from "./views/Gallery";
import DrawingDetails from "./views/DrawingDetails";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import ForgotPassword from "./views/auth/ForgotPassword";
import Profile from "./views/auth/Profile";

import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";

const style = {
  backgroundColor: "lightgray",
  minHeight: "100vh",
  maxWidth: "60rem"
}
function App() {
  return (
    // delete top wrapper?
    <div className="App">
      <AuthProvider>
        <Container style={style}>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route exact path="/" element={<MainMenu/>} />
              <Route path="/draw/:mode" element={<DrawingBoard/>} />
              <Route path="/gallery" element={<Gallery/>} />
              <Route path="/drawing/:id" element={<DrawingDetails/>} />
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <PrivateRoute>
                <Route path="/profile" element={<Profile/>}/>
              </PrivateRoute>
            </Routes>
          </BrowserRouter>
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
