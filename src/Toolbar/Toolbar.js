import React from "react";
import BrushSizeSelector from "../BrushSizeSelector/BrushSizeSelector.js";
import ColorPicker from "../ColorPicker/ColorPicker.js";

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

  render() {
    const style = {
      width: this.props.toolbarWidth,
    };
    return (
      <div
        className="toolbar-container d-flex justify-content-end align-items-center"
        style={style}
      >
        <ColorPicker selectBrushColor={this.selectBrushColor}/>
        <BrushSizeSelector selectBrushSize={this.selectBrushSize}/>
        <div className="ms-3 h-100">
          <EraseCanvasButton eraseCanvas={this.eraseCanvas} />
        </div>
      </div>
    );
  }
}

function EraseCanvasButton(props) {
  return (
    <button className="btn btn-danger px-4 h-100" onClick={props.eraseCanvas}>
      <i className="far fa-trash-alt fa-2x"></i>
    </button>
  );
}
