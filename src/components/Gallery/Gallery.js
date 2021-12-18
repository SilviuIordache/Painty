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
    this.getDrawingsFromStorage();
  }

  getDrawingsFromStorage = () => {
    const storageImages = JSON.parse(localStorage.getItem('paintyImages'));
    this.setState({
      storageImages
    })
  }

  deleteImage = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this image?');

    if (!confirmDelete)
      return
    const galleryImages = JSON.parse(localStorage.getItem("paintyImages"));

    // find index of id
    const indexToDelete = galleryImages.findIndex((elem) => elem.id === id);
    
    // delete elem at that index
    galleryImages.splice(indexToDelete, 1);

    // update storage
    localStorage.setItem("paintyImages", JSON.stringify(galleryImages));

    this.setState({
      storageImages: galleryImages
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
          id={image.id}
          key={index}
          deleteImage={this.deleteImage}
        />
      );
    } else {
      galleryImages = <p className="text-light">Your saved drawings will appear here</p>
    }
    return (
      <div className="row bg-secondary p-5">
        {galleryImages}
      </div>
    )
  }
}