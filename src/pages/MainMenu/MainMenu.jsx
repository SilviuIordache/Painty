import { useNavigate } from 'react-router-dom';
import React from 'react';
import BasicCard from './components/BasicCard';
import GalleryCard from './components/GalleryCard/GalleryCard';
import Grid from '@mui/material/Grid';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {/* <ChallengeCard /> */}
      <Grid item xs={12} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BasicCard
              title={'Free Draw'}
              subTitle={'no restrictions'}
              buttonCallback={() => {
                navigate('/draw/practice');
              }}
              buttonText={'DRAW'}
            />
          </Grid>

          <Grid item xs={12}>
            <BasicCard
              title={'Challenge Draw'}
              subTitle={'time-attack mode'}
              buttonCallback={() => {
                navigate('/draw/challenge');
              }}
              buttonText={'Draw'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <GalleryCard />
      </Grid>
    </Grid>
  );
}
