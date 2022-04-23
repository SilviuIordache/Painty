import React, { useState } from "react";
import GalleryDrawing from "../components/GalleryDrawing/GalleryDrawing";
import GalleryBar from "../components/GalleryBar/GalleryBar";

export default function Gallery() {
  const [images, setImages] = useState(getImages());

  function deleteCallback() {
    const updatedImages = getImages();
    setImages(updatedImages.reverse());
  }

  function getImages() {
    return JSON.parse(localStorage.getItem("paintyImages"));
  }

  let imageElements = (
    <p className="text-light">Your saved drawings will appear here.</p>
  );

  if (images?.length > 0) {
    imageElements = images
      .reverse()
      .map((image) => (
        <GalleryDrawing
          src={image.src}
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
        <div className="col-12">
          <GalleryBar images={images}/>
        </div>
      </div>
      <div className="row">{imageElements}</div>
    </div>
  );
}
