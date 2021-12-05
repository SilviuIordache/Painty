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
        <BrushSizeSelector onBrushSizeSelected={this.selectBrushSize}/>
        <div>
          <button onClick={this.eraseCanvas}>Erase</button>
        </div>
      </div>
    )
  }
}

function BrushSizeSelector(props) {
  return (
    <div>
      <button onClick={() => props.onBrushSizeSelected(1)}>small</button>
      <button onClick={() => props.onBrushSizeSelected(2)}>medium</button>
      <button onClick={() => props.onBrushSizeSelected(3)}>big</button>
    </div>
  )
}