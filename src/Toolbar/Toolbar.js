import React from "react";

export default class Toolbar extends React.Component {

  selectBrushSize = (size) => {
    this.props.handleBrushSizeChange(size)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.selectBrushSize(1)}>small</button>
        <button onClick={() => this.selectBrushSize(2)}>medium</button>
        <button onClick={() => this.selectBrushSize(3)}>big</button>
      </div>
    )
  }
}