import React from "react";
export default class Toolbar extends React.Component {
  render() {
    return (
      <div>
        <button className="btn btn-outline-secondary">
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button className="btn btn-outline-secondary">
          <i className="fas fa-eraser"></i>
        </button>
      </div>
    )
  }
}