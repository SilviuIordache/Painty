import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../redux/features/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import UserName from '../../components/GalleryDrawing/UserName';


export default function Profile() {
  const { currentUser } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  async function handleLogout() {
    try {
      await dispatch(signOut());
      navigate('/login');
    } catch(err) {
      console.log(err)
    }
  }

  const style = {
    minWidth: '30rem',
  };
  return (
    <div className="d-flex justify-content-center">
      <Card style={style}>
        <Card.Body>
          <h1 className="mb-4">Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <div>
            <strong>ID: </strong> {currentUser.uid}
          </div>
          <div>
            <strong>Email: </strong> {currentUser.email}
          </div>
          <div>
            <strong>Username: </strong> <UserName uid={currentUser.uid}/>
          </div>
          <div>
            <strong>Image: </strong>
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </Card>
    </div>
  );
}
