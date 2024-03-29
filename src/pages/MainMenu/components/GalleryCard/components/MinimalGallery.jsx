import { Box, Grid } from '@mui/material';
import DrawingContainer from 'pages/@shared/DrawingContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, resetImageList } from 'redux/features/imagesSlice';
import { useNavigate } from 'react-router-dom';

export default function MinimalGallery(props) {
  const images = useSelector((state) => state.images.list);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetImageList());
    dispatch(fetchImages({ amount: props.amount }));
  }, [dispatch, props.amount]);

  let mappedImages = images.map((image) => (
    <Grid
      item
      xs={6}
      key={image.id}
      onClick={() => {
        navigate(`/drawing/${image.id}`);
      }}
    >
      <Box sx={{ cursor: 'pointer' }}>
        <DrawingContainer name={image.name} id={image.id} path={image.path} />
      </Box>
    </Grid>
  ));

  return (
    <Grid container spacing={1}>
      {mappedImages}
    </Grid>
  );
}
