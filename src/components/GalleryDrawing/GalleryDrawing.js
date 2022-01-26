import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GalleryDrawing.css";

import DrawingButtons from "../DrawingButtons/DrawingButtons.js";

export default function GalleryDrawing (props) {
  const navigate = useNavigate();
  const [imageHovered, setImageHover] = useState(false);

  function goToDrawingDetails () {
    navigate(`/drawing/${props.id}`)
  }

  let className="col-12 col-md-6 col-lg-4 mb-3 position-relative image-container";
  if (imageHovered) {
    className += " hovered-image"
  }
  return (
    <div
      className={className}
      onMouseEnter={() => { setImageHover(true) }}
      onMouseLeave={() => { setImageHover(false) }}
      onClick={goToDrawingDetails}
      
    >
      <div className="name-pill">
        {props.mode === 'challenge' && '⏳'} {props.name}
      </div>

      <img
        alt={props.name}
        src={props.src} 
        key={props.index}
        width="100%"
      />
      
      <DrawingButtons
        id={props.id}
        name={props.name}
        src={props.src}
        deleteCallback={props.deleteCallback}
        imageHovered={imageHovered}
        dynamic={true}
      />
    </div>
  )
}