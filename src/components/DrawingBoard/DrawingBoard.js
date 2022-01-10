import React from "react";
import Toolbar from "../Toolbar/Toolbar.js";
import BrushCursor from "../BrushCursor/BrushCursor.js";
import ChallengeBar from "../ChallengeBar/ChallengeBar.js";
import FloodFill from 'q-floodfill';

// import RectanglePreview from "../RectanglePreview/RectanglePreview.js"
// import DebugComponent from "../DebugComponent/DebugComponent.js";

import { withRouter } from "react-router-dom";

import "./DrawingBoard.css";
import "../../jsons/brushSizes.json";
import ActionsBar from "../ActionsBar/ActionsBar.js";

class DrawingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0,
      cursorY: 0,
      canvasAbsoluteX: 0,
      canvasAbsoluteY: 0,
      canvasRelativeX: 0,
      canvasRelativeY: 0,
      rectPreviewX: 0,
      rectPreviewY: 0,
      canvasAbsoluteWidth: 800,
      canvasAbsoluteHeight: 600,
      canvasRelativeWidth: 0,
      canvasRelativeHeight: 0,
      ctx: null,
      mousePressed: false,
      canvasHovered: true,
      currentBrushSize: 4,
      currentBrushColor: "#000000",
      currentTool: "Brush Tool",
      dataURL: "",
      roundCurrent: 1,
      roundTotal: 5,
      roundTimeInitial: 10,
      roundTime: 10,
      mode: ''
    };
  }

  componentDidMount() {
    this.setDrawMode();
    this.setupCanvas();
    this.setupBrushSizes();

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
    // canvas.style.borderRadius = "0.5rem";
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

  setDrawMode = () => {
    const { mode } = this.props.match.params;
    this.setState({
      gameMode: mode
    })
  }

  applyWhiteBackground = () => {
    this.drawRectangle(
      0,
      0,
      this.state.canvasAbsoluteWidth,
      this.state.canvasAbsoluteHeight,
      "white"
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
      if(this.state.currentTool) {
          this.drawPath();
      }
    }
  };

  floodFill = () => {
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
      this.state.currentBrushColor,
      Math.round(this.state.canvasRelativeX),
      Math.round(this.state.canvasRelativeY),
      100
    )

    // put the modified data back in context
    this.state.ctx.putImageData(floodFill.imageData, 0, 0)
  }

  handleMouseDown = () => {
    this.setState({ mousePressed: true });

    if (this.state.currentTool === "Paint Bucket Tool") {
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
    ctx.lineWidth = this.state.currentBrushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = this.state.currentBrushColor;

    ctx.lineTo(this.state.canvasRelativeX, this.state.canvasRelativeY);
    ctx.stroke();
    ctx.moveTo(this.state.canvasRelativeX, this.state.canvasRelativeY);
  };

  setupBrushSizes = () => {
    const sizes = require("../../jsons/brushSizes.json").sizes;
    this.setState({
      currentBrushSize: sizes[1],
    });
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

  selectBrushSize = (size) => {
    this.setState({
      currentBrushSize: size,
    });
  };

  selectBrushColor = (color) => {
    this.setState({
      currentBrushColor: color,
    });
  };

  eraseCanvas = () => {
    this.applyWhiteBackground();
  };

  saveCanvas = (drawingTitle) => {
    const canvas = document.getElementById("canvas");

    let imageName
    if (!drawingTitle) {
      imageName = prompt("Assign a name to this image before saving it", "NewDrawing");
      if (!imageName)
        return
    } else {
      imageName = drawingTitle
    }
    
    const dataURL = canvas.toDataURL();

    // check for stored images
    const galleryImages = JSON.parse(localStorage.getItem("paintyImages"));

    const imgID = galleryImages
      ? galleryImages[galleryImages.length - 1].id + 1
      : 0;

    // build image object
    const imgObject = {
      id: imgID,
      src: dataURL,
      name: imageName,
    };

    if (galleryImages) {
      // add to array and store it back
      galleryImages.push(imgObject);
      localStorage.setItem("paintyImages", JSON.stringify(galleryImages));
    } else {
      // create an array
      let arr = [];
      arr.push(imgObject);
      localStorage.setItem("paintyImages", JSON.stringify(arr));
    }
  };

  saveChallengeDrawing = (word) => {
    this.saveCanvas(word);
    
    // advanced rounds
    if (this.state.roundCurrent < this.state.roundTotal) {
      this.setState({
        roundCurrent: this.state.roundCurrent + 1,
        roundTime: this.state.roundTimeInitial 
      });
    }
  }

  drawRectangle = (x, y, width, height, color) => {
    const ctx = this.state.ctx;
    ctx.fillStyle = color || "black";

    ctx.fillRect(x, y, width, height);

    this.setState({
      ctx,
    });
  };

  changeTool = (tool) => {
    const sizes = require("../../jsons/brushSizes.json").sizes;
    if (tool === "Brush Tool") {
      this.setState({
        currentTool: tool,
        currentBrushSize: sizes[1],
      });
    }

    if (tool === "Eraser Tool") {
      this.setState({
        currentTool: tool,
        currentBrushColor: "#ffffff",
        currentBrushSize: sizes[3],
      });
    }

    if (tool === "Paint Bucket Tool") {
      this.setState({
        currentTool: tool,
        currentBrushSize: sizes[0],
      });
    }
  };

  render() {
    return (
      <div className="drawing-board">
        { this.state.gameMode === 'challenge' && 
          <ChallengeBar
            saveChallengeDrawing={this.saveChallengeDrawing}
            roundCurrent={this.state.roundCurrent}
            roundTotal={this.state.roundTotal}
            roundTime={this.state.roundTime}
          />
        }
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
          size={this.state.currentBrushSize}
          color={this.state.currentBrushColor}
          hideBrush={!this.state.canvasHovered}
          currentTool={this.state.currentTool}
          x={this.state.cursorX}
          y={this.state.cursorY}
        />
        <Toolbar
          selectBrushSize={this.selectBrushSize}
          selectBrushColor={this.selectBrushColor}
          selectedColor={this.state.currentBrushColor}
          changeTool={this.changeTool}
          currentTool={this.state.currentTool}
          currentBrushSize={this.state.currentBrushSize}
        />
        <ActionsBar
          eraseCanvas={this.eraseCanvas}
          saveCanvas={this.saveCanvas}
        />
      </div>
    );
  }
}

export default withRouter(DrawingBoard);

// need to improve
// https://www.youtube.com/watch?v=3GqUM4mEYKA&t=351s

// How to move canvas to ref
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
