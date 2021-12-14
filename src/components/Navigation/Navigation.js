import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="row">
      <div className="col-12 bg-light py-4 d-flex justify-content-center">
        <Link to="/" className="me-5">Draw</Link>
        <Link to="gallery">Gallery</Link>
      </div>
    </div>
  )
}