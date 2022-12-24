import React from 'react';
import { useSelector } from 'react-redux';
import UserName from 'pages/@shared/UserName';
import {
  Alert,
  Card,
  CardContent,
} from '@mui/material';

export default function ProfileInfo() {
  const { currentUser } = useSelector((state) => state.auth);

  const { error } = useSelector((state) => state.auth);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <h1 className="mb-4">Profile</h1>
        {error && <Alert severity="error">{error}</Alert>}
        <div>
          <strong>ID: </strong> {currentUser.uid}
        </div>
        <div>
          <strong>Email: </strong> {currentUser.email}
        </div>
        <div>
          <strong>Username: </strong> <UserName uid={currentUser.uid} />
        </div>
      </CardContent>
    </Card>
  );
}
