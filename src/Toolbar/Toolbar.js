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
