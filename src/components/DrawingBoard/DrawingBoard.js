import React, { useEffect, useState } from "react";
import useInterval from "../../hooks/useInterval";
import { useParams, useNavigate, Prompt } from "react-router-dom";

import Toolbar from "../Toolbar/Toolbar.js";
import Canvas from "./Canvas.js";
import ChallengeBar from "../ChallengeBar/ChallengeBar.js";
import ActionsBar from "../ActionsBar/ActionsBar.js";

export default function DrawingBoard() {
  let navigate = useNavigate();

  // tools state
  const [currentTool, setTool] = useState("Brush Tool");
  const [currentBrushColor, setBrushColor] = useState("#000000");
  const [currentBrushSize, setBrushSize] = useState(
    require("../../jsons/brushSizes.json").sizes[0]
  );

  // game logic state
  const [gameMode, setGameMode] = useState();
  const [roundCurrent, setRoundCurrent] = useState(1);
  const [roundTotal] = useState(3);
  const [roundTime] = useState(3);

  const [delay, setDelay] = useState(1000);
  useEffect(() => {
    if (gameMode === "practice") {
      setDelay(null);
    }
  }, [gameMode]);

  let [timer, setTimer] = useState(roundTime);
  useInterval(() => {
    if (timer === 0) {
      roundEndLogic();
    } else {
      setTimer(timer - 1);
    }
  }, delay);

  function roundEndLogic() {
    saveCanvas(currentWord);
    eraseCanvas();
    if (roundCurrent < roundTotal) {
      setRoundCurrent(roundCurrent + 1);
      setTimer(roundTime);
      setCurrentWord(challengeWords[roundCurrent]);
    } else {
      // pause timer
      setDelay(null);

      // go to the gallery to show what the user has drawn
      setIsBlocking(false);

      setTimeout(() => {
        navigate('/gallery')
      }, 0)
    }
  }

 
  const urlParams = useParams();
  useEffect(() => {
    const mode = urlParams.mode;
    setGameMode(mode);
    if (mode === 'challenge') {
      setChallengeWords(generateChallengeWords())
    }
    
    function generateChallengeWords () {
      const words = require("../../jsons/words.json").list;
      
      // generate unique random index numbers
      const randomNumbers = [];
      while(randomNumbers.length < roundTotal) {
        const randomNumber = Math.floor(Math.random() * words.length) + 1;
        if(randomNumbers.indexOf(randomNumber) === -1) {
          randomNumbers.push(randomNumber);
        }
      }
      
      // populate words array with words found at above indexes
      let wordsArray = []
      randomNumbers.forEach((num) => {
        wordsArray.push(words[num]);
      })
      
      setCurrentWord(wordsArray[roundCurrent - 1]);
      return wordsArray
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  let [currentWord, setCurrentWord] = useState();
  const [challengeWords, setChallengeWords] = useState([]);

  function saveCanvas(drawingTitle) {
    const canvas = document.getElementById("canvas");

    let imageName;
    if (!drawingTitle) {
      imageName = prompt(
        "Assign a name to this image before saving it",
        "NewDrawing"
      );
      if (!imageName) return;
    } else {
      imageName = drawingTitle;
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
      mode: gameMode,
      date: new Date().toISOString()
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

  function eraseCanvas() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function changeTool(tool) {
    const sizes = require("../../jsons/brushSizes.json").sizes;
    if (tool === "Brush Tool") {
      setTool(tool);
      setBrushSize(sizes[1]);
    }

    if (tool === "Eraser Tool") {
      setTool(tool);
      setBrushColor("#ffffff");
      setBrushSize(sizes[3]);
    }

    if (tool === "Paint Bucket Tool") {
      setTool(tool);
      setBrushSize(sizes[0]); // ???? <--- not really needed ??
    }
  }

  let [isBlocking, setIsBlocking] = useState(true);

  return (
    <div className="drawing-board">
      <Prompt
        when={isBlocking}
        message={`Are you sure you want to leave this page?`}
      />
      {gameMode === "challenge" && (
        <ChallengeBar
          currentWord={currentWord}
          roundCurrent={roundCurrent}
          roundTotal={roundTotal}
          timer={timer}
        />
      )}
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
      {gameMode === "practice" && (
        <ActionsBar eraseCanvas={eraseCanvas} saveCanvas={saveCanvas} />
      )}
    </div>
  );
}
