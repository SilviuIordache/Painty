import React from "react";
import FloodFill from 'q-floodfill';
import BrushCursor from "../BrushCursor/BrushCursor.js";


import "./DrawingBoard.css";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0,
      cursorY: 0,
      canvasAbsoluteX: 0,
      canvasAbsoluteY: 0,
      canvasRelativeX: 0,
      canvasRelativeY: 0,
      canvasAbsoluteWidth: 800,
      canvasAbsoluteHeight: 600,
      canvasRelativeWidth: 0,
      canvasRelativeHeight: 0,
      ctx: null,
      mousePressed: false,
      canvasHovered: true,
    };
  }

  componentDidMount() {
    this.setupCanvas();

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  setupCanvas = () => {
    const canvas = document.getElementById("canvas");
    canvas.style.backgroundColor = "white";
    canvas.width = this.state.canvasAbsoluteWidth;
    canvas.height = this.state.canvasAbsoluteHeight;

    canvas.style.width ='90%';
    canvas.style.height='auto';

    this.setState(
      { ctx: canvas.getContext("2d")},
      () => {
        this.applyWhiteBackground();
      }
    );
    this.calculcateCanvasRelativeSize();
  };


  applyWhiteBackground = () => {
    this.drawRectangle(
      0,
      0,
      this.state.canvasAbsoluteWidth,
      this.state.canvasAbsoluteHeight,
      "#ffffff"
    );
  };

  handleMouseMove = (e) => {
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();

    const cursorX = e.clientX + window.pageXOffset;
    const cursorY = e.clientY + window.pageYOffset;
    const canvasAbsoluteX = e.clientX - rect.left;
    const canvasAbsoluteY =  e.clientY - rect.top;
    const canvasRelativeX = (canvasAbsoluteX * this.state.canvasAbsoluteWidth)/ this.state.canvasRelativeWidth;
    const canvasRelativeY = (canvasAbsoluteY * this.state.canvasAbsoluteHeight)/ this.state.canvasRelativeHeight;

    this.setState({
      cursorX,
      cursorY,
      canvasAbsoluteX,
      canvasAbsoluteY,
      canvasRelativeX,
      canvasRelativeY
    });

    // line below draws
    if (this.state.mousePressed) {
      if(this.props.currentTool) {
          this.drawPath();
      }
    }
  };

  floodFill = () => {
    console.log('aaa')
    // get image data
    const imgData = this.state.ctx.getImageData(
      0, 
      0, 
      this.state.canvasAbsoluteWidth,
      this.state.canvasAbsoluteHeight)

    // Construct flood fill instance
    const floodFill = new FloodFill(imgData)

    // Modify image data
    floodFill.fill(
      this.props.currentBrushColor,
      Math.round(this.state.canvasRelativeX),
      Math.round(this.state.canvasRelativeY),
      100
    )

    // put the modified data back in context ?
    this.state.ctx.putImageData(floodFill.imageData, 0, 0)
  }

  handleMouseDown = () => {
    this.setState({ mousePressed: true });

    if (this.props.currentTool === "Paint Bucket Tool") {
      if (this.state.canvasHovered) {
        this.floodFill();
      }
    } else {
      // this line allows for single dots by 1-click
      this.drawPath();
    }
  }

  handleMouseUp = () => {
    this.setState({ mousePressed: false });
    this.state.ctx.beginPath();
  }

  drawPath = (e) => {
    const ctx = this.state.ctx;
    ctx.lineWidth = this.props.currentBrushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = this.props.currentBrushColor;

    ctx.lineTo(this.state.canvasRelativeX, this.state.canvasRelativeY);
    ctx.stroke();
    ctx.moveTo(this.state.canvasRelativeX, this.state.canvasRelativeY);
  };

  handleMouseEnterCanvas = () => {
    this.setState({ canvasHovered: true },
      () => {
        if (this.state.mousePressed) {
          this.handleMouseDown();
        }
      }
    );
  };

  handleMouseLeaveCanvas = () => {
    this.setState({ canvasHovered: false });
  };

  handleWindowResize = () => {
    this.calculcateCanvasRelativeSize();
  }

  calculcateCanvasRelativeSize = () => {
    const canvas = document.getElementById('canvas').getBoundingClientRect()

    this.setState({
      canvasRelativeWidth: canvas.width,
      canvasRelativeHeight: canvas.height
    })
  }
  
  drawRectangle = (x, y, width, height, color) => {
    const ctx = this.state.ctx;
    ctx.fillStyle = color || "black";

    ctx.fillRect(x, y, width, height);

    this.setState({
      ctx,
    });
  };

  render() {
    return (
        <div>
          <div className="row canvas-bg">
            <div className="col-12 position-relative">
              <canvas
                id="canvas"
                className="no-cursor my-3"
                onMouseEnter={this.handleMouseEnterCanvas}
                onMouseLeave={this.handleMouseLeaveCanvas}
              />
            </div>
          </div>

          <BrushCursor
            hideBrush={!this.state.canvasHovered}
            size={this.props.currentBrushSize}
            color={this.props.currentBrushColor}
            currentTool={this.props.currentTool}
            x={this.state.cursorX}
            y={this.state.cursorY}
          />
        </div>
        
    );
  }
}