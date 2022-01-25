import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import MainMenu from "./components/MainMenu/MainMenu";
import DrawingBoard from "./components/DrawingBoard/DrawingBoard";
import Gallery from "./components/Gallery/Gallery";
import DrawingDetails from "./components/DrawingDetails/DrawingDetails";
import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
