import React from "react";
import GalleryDrawing from "../GalleryDrawing/GalleryDrawing.js"

export default class DrawingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageImages: [],
    }
  }

  componentDidMount() {
    const storageImages = JSON.parse(localStorage.getItem('paintyImages'));
    this.setState({
      storageImages
    })
  }

  render() {
    let galleryImages;
    if (this.state.storageImages) {
      galleryImages = this.state.storageImages.map((image, index) =>
        <GalleryDrawing
          src={image.src}
          alt={image.name}
          name={image.name}
          key={index}
        />
      );
    }
    return (
      <div className="row bg-secondary p-5">
        {galleryImages}
      </div>
    )
  }
}