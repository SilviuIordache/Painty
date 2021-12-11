import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <Link to="/">Draw</Link> | {" "}
      <Link to="gallery">Gallery</Link>
    </div>
  )
}