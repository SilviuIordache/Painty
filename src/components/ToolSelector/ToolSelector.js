import React from "react";
export default class Toolbar extends React.Component {
  render() {
    return (
      <div>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => {this.props.changeTool('brush')}}
        >
          <i className="fas fa-paint-brush"></i>
        </button>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => {this.props.changeTool('eraser')}}
        >
          <i className="fas fa-eraser"></i>
        </button>
      </div>
    )
  }
}