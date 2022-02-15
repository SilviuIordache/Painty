import DownloadImageButton from "./DownloadImageButton";
import DeleteImageButton from "./DeleteImageButton";

export default function DrawingButtons(props) {

  let btnGroupStyle = {};
  if (props.dynamic) {
    btnGroupStyle = {
      display: "none",
      position: "absolute",
      bottom: "0.5rem",
      right: "1.3rem"
    }
  
    if (props.imageHovered) {
      btnGroupStyle.display = "block"
    }
  }

  return (
    <div style={btnGroupStyle}>
      <DownloadImageButton/>
      <DeleteImageButton/>
    </div>
  );
}
