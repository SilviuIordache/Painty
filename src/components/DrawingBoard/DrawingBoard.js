import React from "react";
import Toolbar from "../Toolbar/Toolbar.js";
import BrushCursor from "../BrushCursor/BrushCursor.js";

import "./DrawingBoard.css";
import "../jsons/brushSizes.json";

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
      mousePressed: false,
      canvasHovered: false,
      canvasWidth: 800,
      canvasHeight: 600,
      currentBrushSize: 1,
      currentBrushColor: "black",
      currentTool: "brush",
      dataURL: "",
    };
  }

  componentDidMount() {
    this.setupCanvas();
    this.setupBrushSizes();

    document.addEventListener("mousemove", this.draw);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.draw);
    document.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  setupCanvas = () => {
    const canvas = document.getElementById("canvas");

    canvas.style.backgroundColor = "white";
    canvas.style.borderRadius = "0.5rem";
    canvas.width = this.state.canvasWidth;
    canvas.height = this.state.canvasHeight;

    this.setState(
      {
        ctx: canvas.getContext("2d"),
      },
      () => {
        this.applyWhiteBackground();
      }
    );
  };

  applyWhiteBackground = () => {
    this.drawRectangle(
      0,
      0,
      this.state.canvasWidth,
      this.state.canvasHeight,
      "white"
    );
  };

  draw = (e) => {

    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();

    this.setState({
      cursorX: e.clientX + window.pageXOffset,
      cursorY: e.clientY + window.pageYOffset,
      canvasX: e.clientX - rect.left,
      canvasY: e.clientY - rect.top,
    });

    // line below draws
    if (this.state.isDrawing) {
      this.drawPath();
    }
  };

  handleMouseDown = () => {
    this.setState({
      mousePressed: true
    });

    this.enableDrawing();
  }

  handleMouseUp = () => {
    this.setState({
      mousePressed: false
    });

    this.disableDrawing();
  }

  drawPath = (e) => {
    const ctx = this.state.ctx;
    ctx.lineWidth = this.state.currentBrushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = this.state.currentBrushColor;

    ctx.lineTo(this.state.canvasX, this.state.canvasY);
    ctx.stroke();
    ctx.moveTo(this.state.canvasX, this.state.canvasY);
  };

  setupBrushSizes = () => {
    const sizes = require("../jsons/brushSizes.json").sizes;
    this.setState({
      currentBrushSize: sizes[0],
    });
  };

  handleMouseEnterCanvas = () => {
    this.setState(
      {
        canvasHovered: false,
      },
      () => {
        if (this.state.mousePressed) {
          this.enableDrawing();
        }
      }
    );
  };

  handleMouseLeaveCanvas = () => {
    this.setState(
      {
        canvasHovered: true,
      },
      () => {
        this.disableDrawing();
      }
    );
  };

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

  enableDrawing = () => {
    this.setState({ isDrawing: true }
    );
  };

  disableDrawing = () => {
    this.setState({
      isDrawing: false,
    });
    this.state.ctx.beginPath();
  };

  eraseCanvas = () => {
    this.state.ctx.clearRect(
      0,
      0,
      this.state.canvasWidth,
      this.state.canvasHeight
    );
    this.applyWhiteBackground();
  };

  saveCanvas = () => {
    const canvas = document.getElementById("canvas");

    const imageName = prompt("Assign a name to this image before saving it");
    if (imageName) {
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
    }
  };

  drawRectangle = (x, y, width, height, color) => {
    const ctx = this.state.ctx;
    ctx.fillStyle = color || "black";

    ctx.fillRect(x, y, width, height);

    this.setState({
      ctx,
    });
  };

  changeTool = (tool) => {
    const sizes = require("../jsons/brushSizes.json").sizes;
    if (tool === "brush") {
      this.setState({
        currentTool: tool,
        currentBrushColor: "black",
        currentBrushSize: sizes[1],
      });
    }

    if (tool === "eraser") {
      this.setState({
        currentTool: tool,
        currentBrushColor: "white",
        currentBrushSize: sizes[sizes.length - 1],
      });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 bg-secondary pb-5">
          <canvas
            id="canvas"
            className="no-cursor mt-5"
            onMouseEnter={this.handleMouseEnterCanvas}
            onMouseLeave={this.handleMouseLeaveCanvas}
          />
          <BrushCursor
            size={this.state.currentBrushSize}
            color={this.state.currentBrushColor}
            hideBrush={this.state.canvasHovered}
            x={this.state.cursorX}
            y={this.state.cursorY}
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
    );
  }
}

// need to improve
// https://www.youtube.com/watch?v=3GqUM4mEYKA&t=351s

// How to move canvas to ref
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
