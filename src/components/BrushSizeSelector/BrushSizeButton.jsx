export default function BrushSizeButton(props) {
  let brushSizeButtonStyle = {
    width: "4rem",
    height: "4rem",
    padding: "0"
  }

  if (props.active) {
    const activeButtonStyle = {
      border: "2px solid black",
      backgroundColor: "#ebab34",
      color: "black",
    };

    brushSizeButtonStyle = {...brushSizeButtonStyle, ...activeButtonStyle}
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
      onClick={() => props.selectBrushSize(props.size)}
      className="brush-size-button d-flex align-items-center justify-content-center btn btn-outline-secondary me-1"
    >
      <div style={brushIconStyle}></div>
    </button>
  );
}