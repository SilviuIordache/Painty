import BrushSizeSelector from "../BrushSizeSelector/BrushSizeSelector.js";
import ColorSelector from "../ColorSelector/ColorSelector.js";
import ColorPreview from "../ColorPreview/ColorPreview.js";
import ToolSelector from "../ToolSelector/ToolSelector.js";

import "./Toolbar.css";

export default function Toolbar(props) {
  function selectBrushSize(size) {
    props.selectBrushSize(size);
  }

  function selectBrushColor(color) {
    props.selectBrushColor(color);
  }

  return (
    <div className="row toolbar-container mt-2">
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
        {props.gameMode === "practice" && (
          <div>
            <EraseCanvasButton eraseCanvas={() =>{ props.eraseCanvas()}}/>
            <SaveCanvasButton saveCanvas={() =>{ props.saveCanvas()}}/>
          </div>
        )}
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
