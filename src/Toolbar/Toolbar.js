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
      <div className='d-flex justify-content-around align-items-center'>
        <BrushSizeSelector onBrushSizeSelected={this.selectBrushSize}/>
          <button 
            className='btn btn-danger' 
            onClick={this.eraseCanvas}
          >
            Erase
          </button>
      </div>
    )
  }
}
