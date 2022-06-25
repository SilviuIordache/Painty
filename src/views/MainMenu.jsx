import { useNavigate } from 'react-router-dom';
import React from 'react';
import BasicCard from '../components/BasicCard/BasicCard';
import GalleryCard from '../components/MainMenu/GalleryCard';
import Grid from '@mui/material/Grid';

import { fetchImages } from '../redux/features/imagesSlice.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function MainMenu() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchImages(currentUser.uid));
    }
  }, [dispatch, currentUser]);

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
