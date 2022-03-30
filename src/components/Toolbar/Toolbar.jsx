import BrushSizeSelector from "../BrushSizeSelector/BrushSizeSelector";
import ColorSelector from "../ColorSelector/ColorSelector";
import ColorPreview from "../ColorPreview/ColorPreview";
import ToolSelector from "../ToolSelector/ToolSelector";

export default function Toolbar(props) {
  const style = {
    backgroundColor: "#f0f0f0",
    padding: "1rem 2rem",
    borderRadius: "0.5rem"
  }
  return (
    <div style={style} className="row mt-2">
      <div className="col-9 col-sm-4 d-flex">
        <div className="me-2">
          <ColorPreview/>
        </div>
        <ColorSelector/>
      </div>
      <div className="col-12 col-sm-3">
        <ToolSelector/>
      </div>
      <div className="col-12 col-sm-3">
        <BrushSizeSelector/>
      </div>
      <div className="col-12 col-sm-2 d-flex justify-content-end">
        <EraseCanvasButton
          eraseCanvas={() => {
            props.eraseCanvas(true);
          }}
        />
        {props.gameMode === "practice" && (
          <SaveCanvasButton
            saveCanvas={() => {
              props.saveCanvas();
            }}
          />
        )}
      </div>
    </div>
  );
}

const actionButtonStyle = {
  width: '3.6rem',
  height: '3.6rem',
  fontSize: '1.3rem'
}
function EraseCanvasButton(props) {
  return (
    <button style={actionButtonStyle} className="btn btn-danger px-3 me-1 " onClick={props.eraseCanvas}>
      <i className="far fa-trash-alt"></i>
    </button>
  );
}

function SaveCanvasButton(props) {
  return (
    <button style={actionButtonStyle} className="btn btn-primary px-3" onClick={props.saveCanvas}>
      <i className="far fa-save"></i>
    </button>
  );
}
