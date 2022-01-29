import BrushSizeSelector from "../BrushSizeSelector/BrushSizeSelector";
import ColorSelector from "../ColorSelector/ColorSelector";
import ColorPreview from "../ColorPreview/ColorPreview";
import ToolSelector from "../ToolSelector/ToolSelector";

export default function Toolbar(props) {
  function selectBrushSize(size) {
    props.selectBrushSize(size);
  }

  function selectBrushColor(color) {
    props.selectBrushColor(color);
  }

  const style = {
    backgroundColor: "#f0f0f0",
    padding: "1rem 2rem",
    borderRadius: "0.5rem"
  }
  return (
    <div style={style} className="row mt-2">
      <div className="col-3 col-sm-1">
        <ColorPreview selectedColor={props.selectedColor} />
      </div>
      <div className="col-9 col-sm-4">
        <ColorSelector selectBrushColor={selectBrushColor} />
      </div>
      <div className="col-12 col-sm-2">
        <ToolSelector
          changeTool={props.changeTool}
          currentTool={props.currentTool}
        />
      </div>
      <div className="col-12 col-sm-4">
        <BrushSizeSelector
          currentBrushSize={props.currentBrushSize}
          selectBrushSize={selectBrushSize}
        />
      </div>
      <div className="col-12 col-sm-1">
        <div>
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
    </div>
  );
}

function EraseCanvasButton(props) {
  return (
    <button className="btn btn-danger px-3 mb-1 " onClick={props.eraseCanvas}>
      <i className="far fa-trash-alt fa-md"></i>
    </button>
  );
}

function SaveCanvasButton(props) {
  return (
    <button className="btn btn-primary px-3" onClick={props.saveCanvas}>
      <i className="far fa-save fa-md"></i>
    </button>
  );
}
