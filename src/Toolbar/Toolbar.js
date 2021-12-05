import React from "react";
import BrushSizeSelector from './BrushSizeSelector'

export default class Toolbar extends React.Component {

  selectBrushSize = (size) => {
    this.props.selectBrushSize(size)
  }

  eraseCanvas = () => {
    this.props.eraseCanvas();
  }

  render() {
    return (
      <div>
        <BrushSizeSelector onBrushSizeSelected={this.selectBrushSize}/>
        <div>
          <button onClick={this.eraseCanvas}>Erase</button>
        </div>
      </div>
    )
  }
}
