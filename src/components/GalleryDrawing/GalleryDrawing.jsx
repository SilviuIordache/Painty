import { useState } from 'react';
import DrawingContainer from './DrawingContainer';
import TopBanner from './TopBanner';
import BottomBanner from './BottomBanner';
import { Grid } from '@mui/material';

export default function GalleryDrawing(props) {
  const [imageHovered, setImageHover] = useState(false);

  return (
    <Grid
      item xs={12} md={6} xl={4}
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
      <DrawingContainer name={props.name} id={props.id} path={props.path} />
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
