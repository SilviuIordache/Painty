import { CardContent, Card, Grid } from '@mui/material';
import React from 'react';
import Gallery from '../Gallery/Gallery';

export default function UserDrawings() {
  return (
    <>
      <Grid container sx={{ marginBottom: '1rem' }}>
        <Grid item xs={12}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <h1 className="mb-4">My drawings</h1>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Gallery user={true} />
    </>
  );
}
