import { useEffect, useState } from 'react';
import useInterval from '../hooks/useInterval';
import { useParams, useNavigate, Prompt } from 'react-router-dom';
import { uploadImage } from '../dbservices/images.js';
import Toolbar from '../components/Toolbar/Toolbar';
import Canvas from '../components/Canvas/Canvas';
import ChallengeBar from '../components/ChallengeBar/ChallengeBar';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  initialiseChallengeMode,
  setCurrentWord,
  incrementRound,
  updateTimer,
  resetTimer,
} from '../redux/features/challengeSlice';

import { useSelector } from 'react-redux';

export default function DrawingBoard() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const currentWord = useSelector((state) => state.challenge.currentWord);
  const roundCurrent = useSelector((state) => state.challenge.roundCurrent);
  const timer = useSelector((state) => state.challenge.timer);
  const roundTotal = useSelector((state) => state.challenge.roundTotal);

  // game logic state
  const [gameMode, setGameMode] = useState();
  const urlParams = useParams();
  useEffect(() => {
    const mode = urlParams.mode;
    setGameMode(mode);

    // this should be moved inside challengeBar on initialise
    if (mode === 'challenge') {
      dispatch(initialiseChallengeMode());
      dispatch(setCurrentWord());
    }
  }, [dispatch, urlParams.mode]);

  // countdown timer -----------------------------
  const [delay, setDelay] = useState(1000);
  useEffect(() => {
    if (gameMode === 'practice') {
      setDelay(null);
    }
  }, [gameMode]);

  useInterval(() => {
    if (timer === 0) {
      roundEndLogic();
    } else {
      dispatch(updateTimer());
    }
  }, delay);
  // ---------------------------------------------

  function roundEndLogic() {
    saveCanvas(currentWord);
    eraseCanvas();
    if (roundCurrent < roundTotal) {
      dispatch(incrementRound());
      dispatch(resetTimer());
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

  const { currentUser } = useSelector((state) => state.auth);
  async function saveToDB(dataURL, imageName) {
    try {
      await uploadImage({
        name: imageName,
        src: dataURL,
        mode: gameMode,
        userID: currentUser.uid,
      });
      if (gameMode === 'practice') {
        toast.success('Image saved');
      }
    } catch (err) {
      console.log(err);
      if (gameMode === 'practice') {
        toast.error('Error saving image. Please retry');
      }
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
    <div>
      <Prompt
        when={isBlocking}
        message={`Leave this page? Unsaved work could be lost.`}
      />
      {gameMode === 'challenge' && <ChallengeBar endRound={roundEndLogic} />}
      <Canvas />
      <Toolbar
        gameMode={gameMode}
        eraseCanvas={eraseCanvas}
        saveCanvas={saveCanvas}
      />
    </div>
  );
}
