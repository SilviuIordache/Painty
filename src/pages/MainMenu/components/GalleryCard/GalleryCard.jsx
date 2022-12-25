import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import MinimalGallery from './components/MinimalGallery';

export default function GalleryCard() {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Online Gallery
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Latest community drawings
        </Typography>

        <MinimalGallery amount={4}/>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          onClick={() => {
            navigate('/explore');
          }}
          variant="outlined"
        >
          See more
        </Button>
      </CardActions>
    </Card>
  );
}
