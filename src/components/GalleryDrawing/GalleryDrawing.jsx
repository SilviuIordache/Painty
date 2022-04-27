import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawingButtons from "../DrawingButtons/DrawingButtons";
import DrawingContainer from "./DrawingContainer";

export default function GalleryDrawing(props) {
  const navigate = useNavigate();
  const [imageHovered, setImageHover] = useState(false);

  function goToDrawingDetails() {
    navigate(`/drawing/${props.id}`)
  }

  const className = "col-12 col-md-6 col-lg-4 mb-3 position-relative";

  let style = {
    transition: "all 0.5s ease-in-out"
  }

  if (imageHovered) {
    const hoverStyle = {
      cursor: "pointer",
      transform: "scale(1.05)"
    }
    style = { ...style, ...hoverStyle }
  }
  return (
    <div
      className={className} style={style}
      onMouseEnter={() => { setImageHover(true) }}
      onMouseLeave={() => { setImageHover(false) }}
      onClick={goToDrawingDetails}
    >

      <DrawingTitle mode={props.mode} name={props.name} size={props.size} />

      <DrawingContainer
        name={props.name}
        index={props.index}
        path={props.path}
      />

      <DrawingButtons
        id={props.id}
        name={props.name}
        mode={props.mode}
        src={props.src}
        deleteCallback={props.deleteCallback}
        imageHovered={imageHovered}
        dynamic={true}
      />
    </div>
  )
}


function DrawingTitle(props) {
  const style = {
    backgroundColor: "lightgray",
    fontSize: "1rem",
    padding: "0.3rem 0.5rem",
    display: "flex",
    justifyContent: "space-between"
  }
  const size = (props.size / 1024).toFixed(0)
  return (
    <div style={style} className="text-truncate">
      <div className="d-flex">
        <div className="me-1">
          {props.mode === 'challenge' && '⏳'} 
          {props.mode === 'practice' && '🖌'} 
        </div>
        {props.name}
      </div>
      <div>
        {size}KB
      </div>
    </div>
  )
}