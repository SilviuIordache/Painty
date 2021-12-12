import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="container">
      <div className="row">
        <div className="bg-light py-4 d-flex justify-content-center">
          <Link to="/" className="me-5">Draw</Link>
          <Link to="gallery">Gallery</Link>
        </div>
      </div>
    </div>
  )
}