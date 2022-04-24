import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawingButtons from "../DrawingButtons/DrawingButtons";

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

      <DrawingTitle mode={props.mode} name={props.name} />

      <img
        alt={props.name}
        src={props.src}
        key={props.index}
        width="100%"
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
    padding: "0.3rem 0.5rem"
  }
  return (
    <div style={style} className="text-truncate">
      {props.mode === 'challenge' && '⏳'} {props.name}
    </div>
  )
}