import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import MainMenu from "./components/MainMenu/MainMenu";
import DrawingBoard from "./components/DrawingBoard/DrawingBoard";
import Gallery from "./components/Gallery/Gallery";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<MainMenu />} />
            <Route path="/draw/:mode" element={<DrawingBoard />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
