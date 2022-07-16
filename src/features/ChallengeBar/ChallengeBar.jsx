import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInterval from '../../hooks/useInterval';
import saveCanvas from '../../shared/canvas/saveCanvas';
import eraseCanvas from '../../shared/canvas/eraseCanvas';
import { Grid } from '@mui/material';
import { setCanvasDirty } from "../../redux/features/canvasSlice"
import CurrentRound from './components/CurrentRound';
import RoundTimer from './components/RoundTimer';
import CurrentWord from './components/CurrentWord';

import {
  initialiseChallengeMode,
  setCurrentWord,
  incrementRound,
  updateTimer,
  resetTimer,
} from '../../redux/features/challengeSlice';

export default function ChallengeBar(props) {
  const { currentUser } = useSelector((state) => state.auth);
  const { canvasDirty } = useSelector((state) => state.canvas);

  const currentWord = useSelector((state) => state.challenge.currentWord);
  const roundTotal = useSelector((state) => state.challenge.roundTotal);
  const roundCurrent = useSelector((state) => state.challenge.roundCurrent);
  const timer = useSelector((state) => state.challenge.timer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetTimer());
    dispatch(initialiseChallengeMode());
    dispatch(setCurrentWord());
  }, [dispatch]);

  // countdown timer -----------------------------
  const [delay, setDelay] = useState(1000);
  useInterval(async () => {
    if (timer === 0) {
      await roundEndLogic();
    } else {
      dispatch(updateTimer());
    }
  }, delay);
  // ---------------------------------------------

  async function roundEndLogic() {
    if (canvasDirty) {
      await saveCanvas('challenge', currentWord, currentUser.uid);
      eraseCanvas();
    }
    dispatch(setCanvasDirty(false));
    if (roundCurrent < roundTotal) {
      dispatch(incrementRound());
      dispatch(resetTimer());
      dispatch(setCurrentWord());
    } else {
      // pause timer
      setDelay(null);

      // go to the gallery to show what the user has drawn
      setTimeout(() => {
        navigate('/gallery');
      }, 0);
    }
  }

  return (
    <Grid container spacing={1} sx={{ marginBottom: '0.5rem' }}>
      <Grid item xs={8} lg={4}>
        <CurrentRound
          roundCurrent={roundCurrent}
          roundTotal={roundTotal}
          roundEndLogic={roundEndLogic}
        />
      </Grid>
      <Grid item xs={4} lg={4}>
        <RoundTimer timer={timer}/>
      </Grid>
      <Grid item xs={12} lg={4}>
        <CurrentWord currentWord={currentWord}/>
      </Grid>
    </Grid>
  );
}
