import { useEffect, useState } from 'react';
import useInterval from '../hooks/useInterval';
import { useParams, useNavigate, Prompt, Link } from 'react-router-dom';
import { uploadImage } from '../dbservices/images.js';
import Toolbar from '../components/Toolbar/Toolbar';
import Canvas from '../components/Canvas/Canvas';
import ChallengeBar from '../components/ChallengeBar/ChallengeBar';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { initialiseChallengeMode, setCurrentWord, incrementRound } from "../redux/features/challengeSlice";

import { useSelector } from 'react-redux';


export default function DrawingBoard() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // game logic state
  const [gameMode, setGameMode] = useState();

  const currentWord = useSelector(state => state.challenge.currentWord);
  const roundCurrent = useSelector(state => state.challenge.roundCurrent);
  const roundTime = useSelector(state => state.challenge.roundTime);
  const roundTotal = useSelector(state => state.challenge.roundTotal);

  // countdown timer -----------------------------
  const [delay, setDelay] = useState(1000);
  useEffect(() => {
    if (gameMode === 'practice') {
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
      dispatch(incrementRound());
      setTimer(roundTime);
      dispatch(setCurrentWord());
    } else {
      // pause timer
      setDelay(null);

      // go to the gallery to show what the user has drawn
      setIsBlocking(false);

      setTimeout(() => {
        navigate('/gallery');
      }, 0);
    }
  }

  const urlParams = useParams();
  useEffect(() => {
    const mode = urlParams.mode;
    setGameMode(mode);
    if (mode === 'challenge') {
      dispatch(initialiseChallengeMode());
      dispatch(setCurrentWord())
    }
  }, [dispatch, urlParams.mode]);

  function saveCanvas(drawingTitle) {
    const canvas = document.getElementById('canvas');

    let imageName;
    if (!drawingTitle) {
      imageName = prompt(
        'Assign a name to this image before saving it',
        'NewDrawing'
      );
      if (!imageName) return;
    } else {
      imageName = drawingTitle;
    }

    // convert Canvas data to DataURL
    const dataURL = canvas.toDataURL();
    saveToDB(dataURL, imageName);
  }

  const { currentUser } = useAuth();
  async function saveToDB(dataURL, imageName) {
    try {
      await uploadImage({
        name: imageName,
        src: dataURL,
        mode: gameMode,
        userID: currentUser.uid,
      });
      toast.success("Image saved");
    } catch (err) {
      console.log(err);
      toast.error("Error saving image. Please retry");
    }
    
  }

  function eraseCanvas(manualErase) {
    if (manualErase) {
      const confirmErase = window.confirm('Erase current canvas?');
      if (!confirmErase) return;
    }

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  let [isBlocking, setIsBlocking] = useState(true);

  return (
    <div className="drawing-board">
      <Prompt
        when={isBlocking}
        message={`Are you sure you want to leave this page?`}
      />
      {gameMode === 'challenge' && (
        <ChallengeBar
          timer={timer}
          endRound={roundEndLogic}
        />
      )}
      <Canvas />
      <Toolbar
        gameMode={gameMode}
        eraseCanvas={eraseCanvas}
        saveCanvas={saveCanvas}
      />
    </div>
  );
}
