import React from "react";
import Toolbar from '../Toolbar/Toolbar.js';
import Coordinates from '../Coordinates/Coordinates.js';
import BrushCursor from '../BrushCursor/BrushCursor.js';

import "./DrawingBoard.css";
import '../jsons/brushSizes.json';

export default class DrawingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0,
      cursorY: 0,
      canvasX: 0,
      canvasY: 0,
      ctx: null,
      isDrawing: false,
      hideBrush: false,
      canvasWidth: 800,
      canvasHeight: 600,
      currentBrushSize: 1,
      currentBrushColor: 'black',
      currentTool: 'brush',
      dataURL: ''
    };
  }

  componentDidMount() {
    this.setupCanvas();
    this.setupBrushSizes();
  }

  setupCanvas = () => {
    const canvas = document.getElementById("canvas");

    canvas.style.backgroundColor = "white";
    canvas.style.borderRadius ="0.5rem";
    canvas.width = this.state.canvasWidth;
    canvas.height = this.state.canvasHeight;

    this.setState({
      ctx: canvas.getContext("2d"),
    }, () => {
      this.applyWhiteBackground();
    });

  };

  applyWhiteBackground = () => {
    this.drawRectangle(0, 0, this.state.canvasWidth, this.state.canvasHeight, 'white')
  }

  setupBrushSizes = () => {
    const sizes = require('../jsons/brushSizes.json').sizes;
    this.setState({ 
      currentBrushSize: sizes[0]
    });
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

  drawPath = (e) => {
    if (!this.state.isDrawing) return

    const ctx = this.state.ctx;
    ctx.lineWidth = this.state.currentBrushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.state.currentBrushColor;

    ctx.lineTo(this.state.cursorX, this.state.cursorY);
    ctx.stroke();
    ctx.moveTo(this.state.cursorX, this.state.cursorY);
  }

  handleMouseEnter = () => {
    this.setState({ hideBrush: false})
  }

  handleMouseLeave = () => {
    this.setState({ 
      hideBrush: true,
    });
    this.stopDrawing();
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

  startDrawing = () => {
    this.setState({
      isDrawing: true,
    },
    () => {
      this.drawPath();
    });
  };

  stopDrawing = () => {
    this.setState({
      isDrawing: false,
    });
    this.state.ctx.beginPath();
  };

  eraseCanvas = () => {
    this.state.ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    this.applyWhiteBackground();
  }

  saveCanvas = () => {
    const canvas = document.getElementById("canvas");

    const dataURL = canvas.toDataURL();

    const galleryImages = JSON.parse(localStorage.getItem('paintyImages'));

    if (galleryImages) {
      // add to array and store it back
      galleryImages.push(dataURL);
      localStorage.setItem('paintyImages', JSON.stringify(galleryImages));
    } else {
      // create an array
      let arr = [];
      arr.push(dataURL)
      localStorage.setItem('paintyImages', JSON.stringify(arr));
    }
  }

  drawRectangle = (x, y, width, height, color) => {
    const ctx = this.state.ctx;
    ctx.fillStyle = color || "black";

    ctx.fillRect(x, y, width, height);

    this.setState({
      ctx
    });
  };

  changeTool = (tool) => {
    const sizes = require('../jsons/brushSizes.json').sizes;
    if (tool === 'brush') {
      this.setState({
        currentTool: tool,
        currentBrushColor: 'black',
        currentBrushSize: sizes[1]
      });
    }
    
    if (tool === 'eraser') { 
      this.setState({
        currentTool: tool,
        currentBrushColor: 'white',
        currentBrushSize: sizes[sizes.length -1]
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 bg-secondary pb-3">
            {/* <Coordinates
            x={this.state.cursorX}
            y={this.state.cursorY}
          /> */}
          <canvas
            id="canvas"
            className="no-cursor mt-5"
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
              saveCanvas={this.saveCanvas}
              toolbarWidth={this.state.canvasWidth}
              changeTool={this.changeTool}
              currentTool={this.state.currentTool}
              currentBrushSize={this.state.currentBrushSize}
            />
            </div>  
          </div>    
        </div>
      </div>
    );
  }
}


// need to improve
// https://www.youtube.com/watch?v=3GqUM4mEYKA&t=351s

// How to move canvas to ref
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258