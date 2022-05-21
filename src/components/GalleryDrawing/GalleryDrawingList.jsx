import GalleryDrawing from './GalleryDrawing';

export default function GalleryDrawingList(props) {
  let mappedImages = props.images.map((image) => (
    <GalleryDrawing
      path={image.path}
      alt={image.name}
      name={image.name}
      mode={image.mode}
      size={image.size}
      id={image.id}
      key={image.id}
      deleteCallback={props.deleteCallback}
    />
  ));

  return mappedImages;
}


