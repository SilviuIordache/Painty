import { useEffect, useState } from "react";
import useInterval from "../hooks/useInterval";
import { useParams, useNavigate, Prompt, Link } from "react-router-dom";

import Toast from "../components/Toast/Toast";
import Toolbar from "../components/Toolbar/Toolbar";
import Canvas from "../components/Canvas/Canvas";
import ChallengeBar from "../components/ChallengeBar/ChallengeBar";

export default function DrawingBoard() {
  let navigate = useNavigate();

  // game logic state
  const [gameMode, setGameMode] = useState();
  const [roundCurrent, setRoundCurrent] = useState(1);
  const [roundTotal] = useState(3);
  const [roundTime] = useState(30);

  // countdown timer -----------------------------
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
  // ---------------------------------------------

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
        navigate("/gallery");
      }, 0);
    }
  }

  const urlParams = useParams();
  useEffect(() => {
    const mode = urlParams.mode;
    setGameMode(mode);
    if (mode === "challenge") {
      setChallengeWords(generateChallengeWords());
    }

    function generateChallengeWords() {
      const words = require("../jsons/words.json").list;

      // generate unique random index numbers
      const randomNumbers = [];
      while (randomNumbers.length < roundTotal) {
        const randomNumber = Math.floor(Math.random() * words.length) + 1;
        if (randomNumbers.indexOf(randomNumber) === -1) {
          randomNumbers.push(randomNumber);
        }
      }

      // populate words array with words found at above indexes
      let wordsArray = [];
      randomNumbers.forEach((num) => {
        wordsArray.push(words[num]);
      });

      setCurrentWord(wordsArray[roundCurrent - 1]);
      return wordsArray;
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
    
    // convert Canvas data to DataURL
    const dataURL = canvas.toDataURL();

    // check for stored images
    const galleryImages = JSON.parse(localStorage.getItem("paintyImages"));

    const imgID =
      galleryImages?.length > 0
        ? galleryImages[galleryImages.length - 1].id + 1
        : 0;

    // build image object
    const imgObject = {
      id: imgID,
      src: dataURL,
      name: imageName,
      mode: gameMode,
      date: new Date().toISOString(),
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
    if (gameMode === 'practice') {
      setSavedFeedback(true);
    }
  }

  function eraseCanvas(manualErase) {
    if (manualErase) {
      const confirmErase = window.confirm("Erase current canvas?");
      if (!confirmErase) return;
    }

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  let [isBlocking, setIsBlocking] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

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
          endRound={roundEndLogic}
        />
      )}
      <Canvas/>
      <Toolbar
        gameMode={gameMode}
        eraseCanvas={eraseCanvas}
        saveCanvas={saveCanvas}
      />
      <Toast 
        show={savedFeedback}
        showCb={setSavedFeedback}
        message={
          <div className="d-flex">
            <p>Drawing saved in the&nbsp;</p>
            <Link to="/gallery" className="me-5">
              Gallery
            </Link>
          </div>
        }
      />
    </div>
  );
}
