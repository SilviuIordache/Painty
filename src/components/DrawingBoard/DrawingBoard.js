import React from "react";
import Toolbar from "../Toolbar/Toolbar.js";
import Canvas from "./Canvas.js";
import ChallengeBar from "../ChallengeBar/ChallengeBar.js";
import ActionsBar from "../ActionsBar/ActionsBar.js";

import { withRouter } from "react-router-dom";
class DrawingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setupBrushSizes();
  }

  setDrawMode = () => {
    const { mode } = this.props.match.params;
    this.setState({
      gameMode: mode
    })
  }

  setupBrushSizes = () => {
    const sizes = require("../../jsons/brushSizes.json").sizes;
    this.setState({
      currentBrushSize: sizes[1],
    });
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

  eraseCanvas = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

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
        <Canvas
          currentTool={this.state.currentTool}
          currentBrushSize={this.state.currentBrushSize}
          currentBrushColor={this.state.currentBrushColor}
        />
        <Toolbar
          selectedColor={this.state.currentBrushColor}
          currentTool={this.state.currentTool}
          currentBrushSize={this.state.currentBrushSize}
          selectBrushSize={this.selectBrushSize}
          selectBrushColor={this.selectBrushColor}
          changeTool={this.changeTool}
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
