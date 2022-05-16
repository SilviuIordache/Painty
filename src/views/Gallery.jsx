import React, { useState, useEffect } from 'react';
import GalleryDrawing from '../components/GalleryDrawing/GalleryDrawing';
import GalleryBar from '../components/GalleryBar/GalleryBar';
import { useAuth } from '../contexts/AuthContext';
import { getImages } from '../dbservices/images.js';

export default function Gallery() {
  const [images, setImages] = useState();

  const { currentUser } = useAuth();
  useEffect(() => {
    let dataRetrieved = false;
    const fetchData = async () => {
      const data = await getImages(currentUser.uid);
      if (!dataRetrieved) {
        setImages(data);
      }
    };
    fetchData().catch(console.error);

    return () => dataRetrieved = false;
  }, [currentUser.uid]);

  async function deleteCallback() {
    const updatedImages = await getImages(currentUser.uid);
    setImages(updatedImages);
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
          size={image.size}
          id={image.id}
          key={image.id}
          deleteCallback={deleteCallback}
        />
      ));
  }
  return (
    <div className="row bg-secondary p-5">
      <div className="row mb-3">
        <div className="col-12"><GalleryBar images={images}/></div>
      </div>
      <div className="row">{imageElements}</div>
    </div>
  );
}
