import { useState } from "react";
import "./GalleryDrawing.css";

export default function GalleryDrawing (props) {
  const [imageHovered, setImageHover] = useState(false);

  function downloadImage () {
    const link = document.createElement("a");
    link.download = props.name;
    link.href = props.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function deleteImage () {
    props.deleteImage(props.id)
  }

  return (
    <div 
      className="col-12 col-md-6 col-lg-4 mb-3 position-relative"
      onMouseEnter={() => { setImageHover(true) }}
      onMouseLeave={() => { setImageHover(false) }}
    >
      <div className="name-pill">
        {props.name}
      </div>

      <img
        alt={props.name}
        src={props.src} 
        key={props.index}
        width="100%"
      />
      
      <ButtonGroup
        imageHovered={imageHovered}
        downloadImage={downloadImage}
        deleteImage={deleteImage}
      />
    </div>
  )
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