import React from "react";
import BrushSizeSelector from './BrushSizeSelector';
import "./Toolbar.css";

export default class Toolbar extends React.Component {

  selectBrushSize = (size) => {
    this.props.selectBrushSize(size)
  }

  eraseCanvas = (props) => {
    this.props.eraseCanvas();
  }

  render() {
    const style = {
      width: this.props.toolbarWidth
    }
    return (
      <div className='toolbar-container d-flex justify-content-around align-items-center' style={style}>
        <BrushSizeSelector onBrushSizeSelected={this.selectBrushSize}/>
        <EraseCanvasButton eraseCanvas={this.eraseCanvas}/>
      </div>
    )
  }
}

function EraseCanvasButton(props) {
  return (
    <button 
      className='btn btn-danger' 
      onClick={props.eraseCanvas}
    >
      Erase
    </button>
  )
}
