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

  render() {
    let btnGroupClass = "button-group";

    if (this.state.imageHovered) {
      btnGroupClass += " d-block"
    }
    return (
      <div 
        className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 position-relative"
        onMouseEnter={() => { this.setImageHover(true) }}
        onMouseLeave={() => { this.setImageHover(false) }}
      >
        <div className="small position-absolute bg-white border rounded px-3 py-1 ms-1 mt-1">
          {this.props.name}
        </div>

        <img
          alt={this.props.name}
          src={this.props.src} 
          key={this.props.index}
          width="100%"
        />
        
        <div className={btnGroupClass}>
          <button className="btn btn-primary" onClick={this.downloadImage}>
            <i className="fas fa-download"></i>
          </button>
        </div>
      </div>
    )
  }
}