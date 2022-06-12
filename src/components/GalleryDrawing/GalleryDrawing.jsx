import { useState } from 'react';
import DrawingContainer from './DrawingContainer';
import TopBanner from './TopBanner';
import BottomBanner from './BottomBanner';

export default function GalleryDrawing(props) {
  const [imageHovered, setImageHover] = useState(false);

  const className = 'col-12 col-md-6 col-lg-4 mb-3 position-relative';

  return (
    <div
      className={className}
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
    </div>
  );
}
