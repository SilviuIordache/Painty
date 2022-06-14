import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import UserName from '../GalleryDrawing/UserName';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import ExploreIcon from '@mui/icons-material/Explore';

export default function Navigation() {

  const { currentUser } = useSelector(state => state.auth);
  return (
    <div className="row mb-2 py-3 bg-light rounded d-flex justify-content-between">
      <div className="col-4">
        <Link to="/" className="me-5 d-flex">
          <HomeIcon/>
          <span className="ms-1">Home</span>
        </Link>
      </div>
      <div className="col-4 d-flex justify-content-between">
        { currentUser ?
          <>
            <Link to="/explore" className="me-2 d-flex">
              <ExploreIcon/>
              <span className="ms-1">Explore</span>
            </Link>
            <Link to="/gallery" className="me-2 d-flex">
              <CollectionsIcon/>
              <span className="ms-1">Gallery</span>
            </Link>
            <Link to="/profile" className="me-2 d-flex">
              <AccountCircleIcon/>
              <UserName uid={currentUser.uid}/>
            </Link>
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