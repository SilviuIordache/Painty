import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="row mb-2">
      <div className="col-12 bg-light py-4 d-flex justify-content-center">
        <Link to="/" className="me-5">Home</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
    </div>
  )
}