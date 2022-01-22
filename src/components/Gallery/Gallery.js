import React, { useState } from "react";
import GalleryDrawing from "../GalleryDrawing/GalleryDrawing.js";

export default function Gallery() {
  const [images, setImages] = useState(
    JSON.parse(localStorage.getItem("paintyImages"))
  );

  function deleteImage(id) {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    const updatedImages = JSON.parse(localStorage.getItem("paintyImages"));

    // find index of id
    const indexToDelete = updatedImages.findIndex((elem) => elem.id === id);

    // delete elem at that index
    updatedImages.splice(indexToDelete, 1);
    
    // update storage
    localStorage.setItem("paintyImages", JSON.stringify(updatedImages));

    setImages(updatedImages.reverse());
  }

  let imageElements = (
    <p className="text-light">Your saved drawings will appear here</p>
  );
  if (images) {
    imageElements = images.reverse().map((image, index) => (
      <GalleryDrawing
        src={image.src}
        alt={image.name}
        name={image.name}
        mode={image.mode}
        id={image.id}
        key={index}
        deleteImage={deleteImage}
      />
    ));
  }
  return <div className="row bg-secondary p-5">{imageElements}</div>;
}
