import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

export default function Navigation() {
  const { currentUser } =  useAuth();

  return (
    <div className="row mb-2 py-3 bg-light rounded d-flex justify-content-between">
      <div className="col-4">
        <Link to="/" className="me-5">Home</Link>
      </div>
      <div className="col-3 d-flex justify-content-end">
        { currentUser ?
          <>
            <Link to="/gallery" className="me-2">Gallery</Link>
            <Link to="/profile" className="me-2">{currentUser.displayName}</Link>
          </> :
          <>
            <Link to="/signup" className="me-2">Sign Up</Link>
            <Link to="/login" className="me-2">Login</Link>
          </>
        }
      </div>
    </div>
  )
}