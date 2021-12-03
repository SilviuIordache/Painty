import React from "react";
import "./cursor.css";
export default class PaintApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0,
      cursorY: 0,
      ctx: null,
      isDrawing: false,
    };
  }

  componentDidMount() {
    this.setupCanvas();
    // setTimeout(() => {
    //   this.pathDrawingTest();
    // }, 1);
  }

  setupCanvas = () => {
    const canvas = document.getElementById("canvas");

    canvas.style.backgroundColor = "lightgray";
    canvas.width = 800;
    canvas.height = 600;

    this.setState({
      ctx: canvas.getContext("2d"),
    });
  };

  handleMouseEnter = (e) => {
    // console.log('entering canvas')
  };

  handleMouseLeave = (e) => {
    // const brushCursor = document.getElementById('brush-cursor');
    // brushCursor.style.className += "hidden"
  };

  handleMouseMove = (e) => {
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();

    this.setState({
      cursorX: e.clientX - rect.left,
      cursorY: e.clientY - rect.top,
    });

    // set brush cursor position
    const brushCursor = document.getElementById("brush-cursor");
    brushCursor.style.top = e.clientY + "px";
    brushCursor.style.left = e.clientX + "px";

    // if in drawing state, also draw shape
    if (this.state.isDrawing) {
      this.drawPath();
    }
  };

  createRectangleAtCoordinates = (x, y, width, height, color) => {
    const newCTX = this.state.ctx;
    newCTX.fillStyle = color || "black";

    newCTX.fillRect(x, y, width, height);

    this.setState({
      ctx: newCTX,
    });
  };

  pathDrawingTest = () => {
    const ctx = this.state.ctx;
    ctx.lineWidth = 16;
    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  startDrawing = () => {
    this.setState({
      isDrawing: true,
    });
    this.drawPath();
  };

  stopDrawing = () => {
    this.setState({
      isDrawing: false,
    });
    this.state.ctx.beginPath();
  };

  drawPath = (e) => {
    if (!this.state.isDrawing) return

    const ctx = this.state.ctx;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = "black";

    ctx.lineTo(this.state.cursorX, this.state.cursorY);
    ctx.stroke();
    ctx.moveTo(this.state.cursorX, this.state.cursorY);
  }

  render() {
    return (
      <div>
        <div id="coordinates">
          <p> x: {this.state.cursorX} </p>
          <p> y: {this.state.cursorY} </p>
        </div>
        <canvas
          id="canvas"
          className="no-cursor"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.startDrawing}
          onMouseUp={this.stopDrawing}
        />
        <div id="brush-cursor" className="cursor-brush" />
      </div>
    );
  }
}


// need to improve
// https://www.youtube.com/watch?v=3GqUM4mEYKA&t=351s