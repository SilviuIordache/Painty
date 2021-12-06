import React from "react";
import Toolbar from '../Toolbar/Toolbar.js';
import Coordinates from '../Coordinates/Coordinates.js';
import BrushCursor from '../BrushCursor/BrushCursor.js';

import "./canvas.css";
import '../jsons/brushSizes.json';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0,
      cursorY: 0,
      canvasX: 0,
      canvasY: 0,
      ctx: null,
      isDrawing: false,
      brush: [],
      hideBrush: false,
      canvasWidth: 800,
      canvasHeight: 600,
      currentBrushSize: 1,
      currentBrushColor: 'black'
    };
  }

  componentDidMount() {
    this.setupCanvas();
    this.setupBrushSizes();
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

  setupBrushSizes = () => {
    const brushSizes = require('../jsons/brushSizes.json');
    this.setState({ brush: brushSizes.sizes});

  }

  handleMouseMove = (e) => {
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();

    this.setState({
      cursorX: e.clientX - rect.left,
      cursorY: e.clientY - rect.top,
      canvasX: e.clientX,
      canvasY: e.clientY
    });

    // if in drawing state, also draw shape
    if (this.state.isDrawing) {
      this.drawPath();
    }
  };

  handleMouseEnter = () => {
    this.setState({ hideBrush: false})
  }

  handleMouseLeave = () => {
    this.setState({ 
      hideBrush: true,
      isDrawing: false
    })
  }

  selectBrushSize = (size) => {
    this.setState({
      currentBrushSize: size
    })
  }

  selectBrushColor = (color) => {
    this.setState({
      currentBrushColor: color
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
    ctx.lineWidth = this.state.brush[this.state.currentBrushSize - 1];
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.state.currentBrushColor;

    ctx.lineTo(this.state.cursorX, this.state.cursorY);
    ctx.stroke();
    ctx.moveTo(this.state.cursorX, this.state.cursorY);
  }

  eraseCanvas = () => {
    this.state.ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
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
        <BrushCursor 
          size={this.state.currentBrushSize}
          color={this.state.currentBrushColor}
          hideBrush={this.state.hideBrush}
          x={this.state.canvasX}
          y={this.state.canvasY}
        />
        <div className="d-flex justify-content-center">
          <Toolbar
            selectBrushSize={this.selectBrushSize}
            selectBrushColor={this.selectBrushColor}
            selectedColor={this.state.currentBrushColor}
            eraseCanvas={this.eraseCanvas}
            toolbarWidth={this.state.canvasWidth}
          />
        </div>
      </div>
    );
  }
}


// need to improve
// https://www.youtube.com/watch?v=3GqUM4mEYKA&t=351s

// How to move canvas to ref
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258