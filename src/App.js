import { 
  Switch, 
  Route, 
  BrowserRouter as Router 
} from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import MainMenu from "./components/MainMenu/MainMenu";
import DrawingBoard from "./components/DrawingBoard/DrawingBoard";
import Gallery from "./components/Gallery/Gallery";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <MainMenu />
            </Route>
            <Route path="/draw/:mode">
              <DrawingBoard />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
