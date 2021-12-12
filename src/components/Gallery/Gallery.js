import React from "react";


export default class DrawingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageImages: []
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

function GalleryDrawing(props) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
      <div className="small position-absolute bg-white border rounded px-3 py-1 ms-1 mt-1">
        {props.name}
      </div>
      <img
        alt={props.name}
        src={props.src} 
        key={props.index}
        width="100%"
      />
    </div>
  )
}