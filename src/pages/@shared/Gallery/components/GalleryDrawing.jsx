import { useState } from 'react';
import DrawingContainer from '../../DrawingContainer';
import TopBanner from './TopBanner';
import BottomBanner from './BottomBanner';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function GalleryDrawing(props) {
  const [imageHovered, setImageHover] = useState(false);
  const navigate = useNavigate();

  function goToDetails() {
    navigate(`/drawing/${props.id}`);
  }

  return (
    <Grid
      item
      xs={12}
      md={4}
      xl={4}
      onMouseEnter={() => {
        setImageHover(true);
      }}
      onMouseLeave={() => {
        setImageHover(false);
      }}
    >
      <TopBanner
        authorID={props.authorID}
        id={props.id}
        path={props.path}
        name={props.name}
        mode={props.mode}
        imageHovered={imageHovered}
      />
      <Box onClick={goToDetails} sx={{ cursor: 'pointer' }}>
        <DrawingContainer name={props.name} id={props.id} path={props.path} />
      </Box>
      <BottomBanner
        mode={props.mode}
        name={props.name}
        size={props.size}
        id={props.id}
        likes={props.likes}
      />
    </Grid>
  );
}
