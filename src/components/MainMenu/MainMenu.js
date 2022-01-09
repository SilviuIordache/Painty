import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div>
      <div className="mb-5 mt-5">
        <h1>Welcome to Painty 🎨</h1>
        <p>Painty is a drawing game in which you draw agaisnt the clock</p>
      </div>
        <Link to="/draw/challenge" className="me-5">Start ⏳</Link>
        <Link to="/draw/practice" className="me-5">Practice 🖌</Link>
        <Link to="/gallery">Gallery 🖼</Link>
    </div>
  )
}
