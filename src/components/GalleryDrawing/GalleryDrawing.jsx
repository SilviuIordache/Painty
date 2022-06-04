import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawingButtons from "../DrawingButtons/DrawingButtons";
import DrawingContainer from "./DrawingContainer";
import TopBanner from './TopBanner';
import BottomBanner from './BottomBanner';

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

      <TopBanner authorID={props.authorID}/>
      <DrawingContainer
        name={props.name}
        id={props.id}
        path={props.path}
      />
      <BottomBanner mode={props.mode} name={props.name} size={props.size} />

      <DrawingButtons
        id={props.id}
        path={props.path}
        name={props.name}
        mode={props.mode}
        deleteCallback={props.deleteCallback}
        imageHovered={imageHovered}
        dynamic={true}
      />
    </div>
  )
}