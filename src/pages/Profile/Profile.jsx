import React from 'react';
import { Grid, Card } from '@mui/material';
import UserActions from './components/UserActions.jsx';
import UserInfo from './components/UserInfo.jsx';
import UserDrawings from './components/UserDrawings';

export default function Profile() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Card sx={{ height: '100%' }}>
          <UserInfo />
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <UserActions />
      </Grid>
      <Grid item xs={12}>
        <UserDrawings />
      </Grid>
    </Grid>
  );
}
