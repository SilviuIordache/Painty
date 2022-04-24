import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to logout');
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
          <p>
            <strong>ID: </strong> {currentUser.uid}
          </p>
          <p>
            <strong>Email: </strong> {currentUser.email}
          </p>
          <p>
            <strong>Username: </strong> {currentUser.displayName}
          </p>
          <p>
            <strong>Image: </strong>
          </p>
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
