import React from "react";
import Toolbar from '../Toolbar/Toolbar'
import "./canvas.css";

export default class PaintApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0,
      cursorY: 0,
      ctx: null,
      isDrawing: false,
      brush: [
        { size: 10 },
        { size: 15 },
        { size: 20 }
      ],
      canvasWidth: 800,
      canvasHeight: 600,
      currentBrushSize: 3
    };
  }

  componentDidMount() {
    this.setupCanvas();
  }

  setupCanvas = () => {
    const canvas = document.getElementById("canvas");

    canvas.style.backgroundColor = "lightgray";
    canvas.width = this.state.canvasWidth;
    canvas.height = this.state.canvasHeight;

    this.setState({
      ctx: canvas.getContext("2d"),
    });
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

  selectBrushSize = (size) => {
    this.setState({
      currentBrushSize: size
    })
  }

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
    ctx.lineWidth = this.state.brush[this.state.currentBrushSize - 1].size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = "black";

    ctx.lineTo(this.state.cursorX, this.state.cursorY);
    ctx.stroke();
    ctx.moveTo(this.state.cursorX, this.state.cursorY);
  }

  eraseCanvas = () => {
    this.state.ctx.clearRect(0, 1, this.state.canvasWidth, this.state.canvasHeight);
  }

  render() {
    return (
      <div>
        
        <Coordinates
          x={this.state.cursorX}
          y={this.state.cursorY}
        />
        <canvas
          id="canvas"
          className="no-cursor"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.startDrawing}
          onMouseUp={this.stopDrawing}
        />
        <Brush size={this.state.currentBrushSize}/>
        <Toolbar
          selectBrushSize={this.selectBrushSize}
          eraseCanvas={this.eraseCanvas}
        />
      </div>
    );
  }
}

function Brush(props) {
  const className = `cursor-brush brush-size-${props.size}`
  return (
    <div id="brush-cursor" className={className} />
  )
}

function Coordinates(props) {
  return (
    <div id="coordinates">
      <p> x: {props.x} </p>
      <p> y: {props.y} </p>
    </div>
  )
}


// need to improve
// https://www.youtube.com/watch?v=3GqUM4mEYKA&t=351s

// How to move canvas to ref
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258