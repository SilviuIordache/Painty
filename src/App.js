import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation"
import DrawingBoard from "./components/DrawingBoard/DrawingBoard";
import Gallery from "./components/Gallery/Gallery"


import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route index path='/' element={<DrawingBoard/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
