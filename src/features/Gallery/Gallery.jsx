import React, { useEffect } from 'react';
import GalleryDrawing from './GalleryDrawing';
import LoadMoreDrawings from './LoadMoreDrawings';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchImages,
  resetBatchRetrieved,
} from '../../redux/features/imagesSlice.js';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

export default function Gallery(props) {
  const images = useSelector((state) => state.images.list);

  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.user) {
      dispatch(fetchImages({ userId: currentUser.uid }));
    } else {
      dispatch(fetchImages());
    }
  }, [dispatch, currentUser.uid, location, props.user]);

  useEffect(() => {
    dispatch(resetBatchRetrieved());
  }, [dispatch, location]);

  return (
    <Grid container>
      <Grid item xs={12}>
        {images.length === 0 ? (
          <p className="text-light">No images to display.</p>
        ) : (
          <>
            <Grid container spacing={2}>
              <GalleryDrawingList images={images} />
              <Grid item xs={12} md={6} xl={4}>
                <LoadMoreDrawings />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

function GalleryDrawingList(props) {
  let mappedImages = props.images.map((image) => (
    <GalleryDrawing
      path={image.path}
      alt={image.name}
      name={image.name}
      mode={image.mode}
      size={image.size}
      id={image.id}
      key={image.id}
      authorID={image.authorID}
      likes={image.likes}
    />
  ));

  return mappedImages;
}
