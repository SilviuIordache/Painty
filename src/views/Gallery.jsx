import React, { useEffect } from 'react';
// import GalleryBar from '../components/GalleryBar/GalleryBar';
import GalleryDrawing from '../components/GalleryDrawing/GalleryDrawing';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../redux/features/imagesSlice.js';
import { useLocation } from 'react-router-dom';

export default function Gallery() {
  const images = useSelector((state) => state.images.list);
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    if (location.pathname.includes('gallery')) {
      dispatch(fetchImages(currentUser.uid));
    } else {
      dispatch(fetchImages());
    }
  }, [dispatch, currentUser.uid, location]);

  return (
    <div className="row p-5">
      {/* <div className="row mb-3">
        <div className="col-12">
          <GalleryBar images={images} />
        </div>
      </div> */}
      <div className="row">
        {images.length === 0 && (
          <p className="text-light">Your saved drawings will appear here.</p>
        )}
        {images.length > 0 && <GalleryDrawingList images={images} />}
      </div>
    </div>
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
