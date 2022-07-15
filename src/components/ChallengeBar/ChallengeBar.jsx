import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInterval from '../../hooks/useInterval';
import saveCanvas from '../../shared/canvas/saveCanvas';
import eraseCanvas from '../../shared/canvas/eraseCanvas';
import { Box, Grid } from '@mui/material';

import {
  initialiseChallengeMode,
  setCurrentWord,
  incrementRound,
  updateTimer,
  resetTimer,
} from '../../redux/features/challengeSlice';

export default function ChallengeBar(props) {
  const { currentUser } = useSelector((state) => state.auth);
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
  // // ---------------------------------------------

  async function roundEndLogic() {
    await saveCanvas('challenge', currentWord, currentUser.uid);
    eraseCanvas();
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fffae3',
            padding: '0.5rem',
          }}
        >
          <span>
            ROUND: {roundCurrent} / {roundTotal}
          </span>
          <button onClick={props.endRound} className="btn btn-warning ms-2">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ marginRight: '0.2rem' }}>
                <span>NEXT</span>
              </Box>
              <i className="fas fa-fast-forward fa-xs"></i>
            </Box>
          </button>
        </Box>
      </Grid>
      <Grid item xs={4} lg={4}>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#fffae3',
            padding: '0.5rem',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <i className="fas fa-stopwatch me-2"></i>
            {timer}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#fffae3',
            padding: '0.5rem',
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <span className="text-muted">Draw this: </span>
          <span className="font-weight-bold">{currentWord.toUpperCase()}</span>
        </Box>
      </Grid>
    </Grid>
  );
}
