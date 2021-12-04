import React from "react";

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
        <div>
          <button onClick={() => this.selectBrushSize(1)}>small</button>
          <button onClick={() => this.selectBrushSize(2)}>medium</button>
          <button onClick={() => this.selectBrushSize(3)}>big</button>
        </div>
        <div>
          <button onClick={this.eraseCanvas}>Erase</button>
        </div>
      </div>
    )
  }
}