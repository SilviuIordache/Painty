import React, { useState } from "react";
import GalleryDrawing from "../components/GalleryDrawing/GalleryDrawing";

export default function Gallery() {
  const [images, setImages] = useState(
    JSON.parse(localStorage.getItem("paintyImages"))
  );

  function deleteCallback() {
    const updatedImages = JSON.parse(localStorage.getItem("paintyImages"));
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
  return <div className="row bg-secondary p-5">{imageElements}</div>;
}
