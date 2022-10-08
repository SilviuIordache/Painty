import React from 'react';
import ProfileInfo from '../../features/Profile/UserInfo.jsx';
import ProfileActions from '../../features/Profile/UserActions.jsx';
import {
  
  Grid,
  Card,
} from '@mui/material';
import UserDrawings from '../../features/Profile/UserDrawings.jsx';

export default function Profile() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Card sx={{ height: '100%' }}>
          <ProfileInfo/>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <ProfileActions/>
      </Grid>
      <Grid item xs={12}>
        <UserDrawings/>
      </Grid>
    </Grid>
  );
}
