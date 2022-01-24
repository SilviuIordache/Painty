import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { hotjar } from 'react-hotjar';

import Navigation from "./components/Navigation/Navigation";
import MainMenu from "./components/MainMenu/MainMenu";
import DrawingBoard from "./components/DrawingBoard/DrawingBoard";
import Gallery from "./components/Gallery/Gallery";
import DrawingDetails from "./components/DrawingDetails/DrawingDetails";


import "./App.css";

function App() {

  useEffect(() => {
    hotjar.initialize('2797800', 6);
  }, [])

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
