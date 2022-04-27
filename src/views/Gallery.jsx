import React, { useState, useEffect } from 'react';
import GalleryDrawing from '../components/GalleryDrawing/GalleryDrawing';
import GalleryBar from '../components/GalleryBar/GalleryBar';
import { useAuth } from '../contexts/AuthContext';

export default function Gallery() {
  const { getImages } = useAuth();
  const [images, setImages] = useState();

  useEffect(() => {
    let dataRetrieved = false;
    const fetchData = async () => {
      const data = await getImages();
      if (!dataRetrieved) {
        setImages(data);
      }
    };
    fetchData().catch(console.error);

    return () => dataRetrieved = false;
  }, [getImages]);

  function deleteCallback() {
    const updatedImages = getImages();
    setImages(updatedImages.reverse());
  }

  let imageElements = (
    <p className="text-light">Your saved drawings will appear here.</p>
  );

  if (images?.length > 0) {
    imageElements = images
      .reverse()
      .map((image) => (
        <GalleryDrawing
          path={image.path}
          alt={image.name}
          name={image.name}
          mode={image.mode}
          id={image.id}
          key={image.id}
          deleteCallback={deleteCallback}
        />
      ));
  }
  return (
    <div className="row bg-secondary p-5">
      <div className="row mb-3">
        <div className="col-12">{/* <GalleryBar images={images}/> */}</div>
      </div>
      <div className="row">{imageElements}</div>
    </div>
  );
}
