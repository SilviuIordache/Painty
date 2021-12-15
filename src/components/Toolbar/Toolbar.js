import React from "react";
import BrushSizeSelector from "../BrushSizeSelector/BrushSizeSelector.js";
import ColorSelector from "../ColorSelector/ColorSelector.js";
import ColorPreview from "../ColorPreview/ColorPreview.js";
import ToolSelector from "../ToolSelector/ToolSelector.js"

import "./Toolbar.css";

export default class Toolbar extends React.Component {
  selectBrushSize = (size) => {
    this.props.selectBrushSize(size);
  };

  selectBrushColor = (color) => {
    this.props.selectBrushColor(color);
  }

  eraseCanvas = (props) => {
    this.props.eraseCanvas();
  };

  saveCanvas = (props) => {
    this.props.saveCanvas();
  }

  render() {
    return (
      <div className="row toolbar-container mt-2">
          <div className="col-3 col-sm-1">
            <ColorPreview selectedColor={this.props.selectedColor} />
          </div>
          <div className="col-9 col-sm-4">
            <ColorSelector selectBrushColor={this.selectBrushColor}/>
          </div>
          <div className="col-12 col-sm-2">
            <ToolSelector 
              changeTool={this.props.changeTool}
              currentTool={this.props.currentTool}
            />
          </div>
          <div className="col-12 col-sm-3">
            <BrushSizeSelector
              currentBrushSize={this.props.currentBrushSize}
              selectBrushSize={this.selectBrushSize}
            />
          </div>
          <div className="col-12 col-sm-2 d-flex">
            <EraseCanvasButton eraseCanvas={this.eraseCanvas} />
            <SaveCanvasButton saveCanvas={this.saveCanvas}/>
          </div>
      </div>
    );
  }
}

function EraseCanvasButton(props) {
  return (
    <button className="btn btn-danger px-2 me-1" onClick={props.eraseCanvas}>
      <i className="far fa-trash-alt fa-md"></i>
    </button>
  );
}

function SaveCanvasButton(props) {
  return (
    <button className="btn btn-primary px-2" onClick={props.saveCanvas}>
      <i className="far fa-save fa-md"></i>
    </button>
  );
}
