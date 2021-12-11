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
    const style = {
      width: this.props.toolbarWidth,
    };
    return (
      <div
        className="toolbar-container d-flex justify-content-end align-items-center"
        style={style}
      >
        <div className="me-4">
          <ColorPreview selectedColor={this.props.selectedColor} />
        </div>
        <div className="me-4">
          <ColorSelector selectBrushColor={this.selectBrushColor}/>
        </div>
        <div className="me-4">
          <ToolSelector 
            changeTool={this.props.changeTool}
            currentTool={this.props.currentTool}
          />
        </div>
        <BrushSizeSelector
          currentBrushSize={this.props.currentBrushSize}
          selectBrushSize={this.selectBrushSize}
        />
        <div className="ms-3 d-flex ">
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
