import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar.js";
import Canvas from "./Canvas.js";
import ChallengeBar from "../ChallengeBar/ChallengeBar.js";
import ActionsBar from "../ActionsBar/ActionsBar.js";

export default function DrawingBoard () {

  const [currentTool, setTool] = useState("Brush Tool")
  const [currentBrushColor, setBrushColor] = useState("#000000");
  const [currentBrushSize, setBrushSize] = useState( require("../../jsons/brushSizes.json").sizes[0]);
  
  const [roundCurrent, setRoundCurrent] = useState(1);
  const [roundTotal, setRoundTotal] = useState(5);
  const [roundTimeInitial, setRoundTimeInitial] = useState(10);
  const [roundTime, setRoundTime] = useState(10);
  const [gameMode, setGameMode] = useState();
  
  const urlParams = useParams();
  useEffect(() => {
    setGameMode(urlParams.mode)
  }, [urlParams.mode])

  function saveCanvas (drawingTitle) {
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

  function saveChallengeDrawing (word) {
    saveCanvas(word);
    
    // advanced rounds
    if (roundCurrent < roundTotal) {
      setRoundCurrent(roundCurrent + 1);
      setRoundTime(roundTimeInitial);
    }
  }

  function eraseCanvas () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function changeTool (tool) {
    const sizes = require("../../jsons/brushSizes.json").sizes;
    if (tool === "Brush Tool") {
      setTool(tool);
      setBrushSize(sizes[1]);
    }

    if (tool === "Eraser Tool") {
      setTool(tool);
      setBrushColor("#ffffff");
      setBrushSize(sizes[3])
    }

    if (tool === "Paint Bucket Tool") {
      setTool(tool);
      setBrushSize(sizes[0]); // ???? <--- not really needed ??
    }
  };

  return (
    <div className="drawing-board">
      { gameMode === 'challenge' && 
        <ChallengeBar
          saveChallengeDrawing={saveChallengeDrawing}
          roundCurrent={roundCurrent}
          roundTotal={roundTotal}
          roundTime={roundTime}
        />
      }
      <Canvas
        currentTool={currentTool}
        currentBrushSize={currentBrushSize}
        currentBrushColor={currentBrushColor}
      />
      <Toolbar
        selectedColor={currentBrushColor}
        currentTool={currentTool}
        currentBrushSize={currentBrushSize}
        selectBrushSize={setBrushSize}
        selectBrushColor={setBrushColor}
        changeTool={changeTool}
      />
      <ActionsBar
        eraseCanvas={eraseCanvas}
        saveCanvas={saveCanvas}
      />
    </div>
  );
}