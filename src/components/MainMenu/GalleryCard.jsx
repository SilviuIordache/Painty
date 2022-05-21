import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GalleryCard() {
  const navigate = useNavigate();
  const images = useSelector(state => state.images.list);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Gallery
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {images.length} drawing(s)
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          onClick={() => {
            navigate('/gallery');
          }}
          variant="contained"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}