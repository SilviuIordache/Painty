import { useDispatch } from 'react-redux';
import { changeBrushSize } from "../../../../redux/features/toolSlice";

export default function BrushSizeButton(props) {
  const dispatch = useDispatch();

  let brushSizeButtonStyle = {
    width: "3.6rem",
    height: "3.6rem",
    padding: "0"
  }
  
  if (props.active) {
    const activeButtonStyle = {
      border: "2px solid black",
      backgroundColor: "#ebab34",
      color: "black",
    };

    brushSizeButtonStyle = {
      ...brushSizeButtonStyle, 
      ...activeButtonStyle
    }
  }

  const brushIconStyle = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    borderRadius: "50%",
    backgroundColor: "black",
  };

  return (
    <button
      style={brushSizeButtonStyle}
      onClick={() => { dispatch(changeBrushSize(props.size))}}
      className="brush-size-button d-flex align-items-center justify-content-center btn btn-outline-secondary me-1"
    >
      <div style={brushIconStyle}></div>
    </button>
  );
}