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
        <div className="col-12 col-sm-5">
          <BrushSizeSelector
            currentBrushSize={this.props.currentBrushSize}
            selectBrushSize={this.selectBrushSize}
          />
        </div>
      </div>
    );
  }
}