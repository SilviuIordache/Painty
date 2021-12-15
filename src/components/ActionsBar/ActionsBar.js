import React from "react";

export default class ActionsBar extends React.Component {

  eraseCanvas = (props) => {
    this.props.eraseCanvas();
  };

  saveCanvas = (props) => {
    this.props.saveCanvas();
  }

  render() {
    return (
      <div className="row py-2">
        <div className="col-12 d-flex justify-content-start">
          <div className="d-flex">
            <EraseCanvasButton eraseCanvas={this.eraseCanvas} />
            <SaveCanvasButton saveCanvas={this.saveCanvas}/>
          </div>
        </div>
      </div>
    );
  }
}

function EraseCanvasButton(props) {
  return (
    <button className="btn btn-danger px-3 me-1" onClick={props.eraseCanvas}>
      <i className="far fa-trash-alt fa-md"></i>
    </button>
  );
}

function SaveCanvasButton(props) {
  return (
    <button className="btn btn-primary px-3" onClick={props.saveCanvas}>
      <i className="far fa-save fa-md"></i>
    </button>
  );
}
