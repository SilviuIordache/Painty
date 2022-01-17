import React, { useEffect, useState } from "react";
import useInterval from "../../hooks/useInterval";
import { useParams } from "react-router-dom";

import Toolbar from "../Toolbar/Toolbar.js";
import Canvas from "./Canvas.js";
import ChallengeBar from "../ChallengeBar/ChallengeBar.js";
import ActionsBar from "../ActionsBar/ActionsBar.js";

export default function DrawingBoard () {

  // tools state
  const [currentTool, setTool] = useState("Brush Tool")
  const [currentBrushColor, setBrushColor] = useState("#000000");
  const [currentBrushSize, setBrushSize] = useState( require("../../jsons/brushSizes.json").sizes[0]);
  
  // game logic state
  const [gameMode, setGameMode] = useState();
  const [roundCurrent, setRoundCurrent] = useState(1);
  const [roundTotal] = useState(5);
  const [roundTime] = useState(3)
  let [timer, setTimer] = useState(roundTime);
  useInterval(() => {
    if (timer === 0) {
      roundEndLogic();
    } else {
      setTimer(timer - 1);
    }
  }, 1000);

  function roundEndLogic() {
     if (roundCurrent < roundTotal) {
      saveCanvas(currentWord);
      eraseCanvas();
      setRoundCurrent(roundCurrent + 1);
      setTimer(roundTime);
      setCurrentWord(getNewRoundWord());
    } else {
      // go to challenge mode gallery
    }
  }

  const [words] = useState(require("../../jsons/words.json").list);
  let [currentWord, setCurrentWord] = useState(getNewRoundWord());

  function getNewRoundWord() {
    const randomWordIndex = Math.floor(Math.random() * words.length);
    return words[randomWordIndex];
  }
  
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
      mode: gameMode
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
  }

  function eraseCanvas () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // context.fillStyle = "#ffffff";
    // context.fillRect(0, 0, canvasAbsoluteWidth, canvasAbsoluteHeight);
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
          // saveChallengeDrawing={saveChallengeDrawing}
          currentWord={currentWord}
          roundCurrent={roundCurrent}
          roundTotal={roundTotal}
          timer={timer}
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