import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import MainMenu from "./views/MainMenu";
import DrawingBoard from "./views/DrawingBoard";
import Gallery from "./views/Gallery";
import DrawingDetails from "./views/DrawingDetails";

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
            <Route path="/drawing/:id" element={<DrawingDetails/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
