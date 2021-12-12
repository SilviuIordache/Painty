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
        <img src={image} key={index} width="300" className="me-2"/>
      );
    }
    return (
      <div className="d-flex">
        {galleryImages}
      </div>
    )
  }

}