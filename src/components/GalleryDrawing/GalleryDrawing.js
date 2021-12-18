import React from "react";
import "./GalleryDrawing.css";

export default class GalleryDrawing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageHovered: false,
    }
  }
  setImageHover = (cond) => {
    this.setState({
      imageHovered: cond
    })
  }

  downloadImage = () => {
    const link = document.createElement("a");
    link.download = this.props.name;
    link.href = this.props.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  deleteImage = () => {
    this.props.deleteImage(this.props.id)
  }

  render() {
    return (
      <div 
        className="col-12 col-md-6 col-lg-4 mb-3 position-relative"
        onMouseEnter={() => { this.setImageHover(true) }}
        onMouseLeave={() => { this.setImageHover(false) }}
      >
        <div className="name-pill">
          {this.props.name}
        </div>

        <img
          alt={this.props.name}
          src={this.props.src} 
          key={this.props.index}
          width="100%"
        />
        
       <ButtonGroup
        imageHovered={this.state.imageHovered}
        downloadImage={this.downloadImage}
        deleteImage={this.deleteImage}
       />
      </div>
    )
  }
}

function ButtonGroup (props) {
  let btnGroupClass = "button-group";

  if (props.imageHovered) {
    btnGroupClass += " d-block"
  }

  return (
    <div className={btnGroupClass}>
      <button className="btn btn-primary" onClick={props.downloadImage}>
        <i className="fas fa-download"></i>
      </button>
      <button className="btn btn-danger ms-1" onClick={props.deleteImage}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  )
}