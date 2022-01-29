import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="row mb-2 bg-light rounded">
      <div className="col-12 py-3 d-flex justify-content-around">
        <Link to="/" className="me-5">Home</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
    </div>
  )
}