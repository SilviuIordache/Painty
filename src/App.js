import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import MainMenu from "./views/MainMenu";
import DrawingBoard from "./views/DrawingBoard";
import Gallery from "./views/Gallery";
import DrawingDetails from "./views/DrawingDetails";

let theme = createTheme({
  palette: {
    mode: 'light'
  }
});
function App() {
  return (
    <div className="App">
      <div className="container">
        
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Navigation />
            <Routes>
              <Route exact path="/" element={<MainMenu />} />
              <Route path="/draw/:mode" element={<DrawingBoard />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/drawing/:id" element={<DrawingDetails/>} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
