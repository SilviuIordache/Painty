import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Navigation() {
  const { currentUser } = useSelector(state => state.auth);
  return (
    <div className="row mb-2 py-3 bg-light rounded d-flex justify-content-between">
      <div className="col-4">
        <Link to="/" className="me-5">Home</Link>
      </div>
      <div className="col-3 d-flex justify-content-end">
        <Link to="/feed" className="me-2">Feed</Link>
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