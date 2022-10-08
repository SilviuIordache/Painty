import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Toolbar from '../features/Toolbar/Toolbar';
import Canvas from '../features/Canvas/Canvas';
import ChallengeBar from '../features/ChallengeBar/ChallengeBar';
import { Box, Grid } from '@mui/material';

export default function DrawingBoard() {
  const [gameMode, setGameMode] = useState();
  const urlParams = useParams();
  useEffect(() => {
    const mode = urlParams.mode;
    setGameMode(mode);
  }, [urlParams.mode]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          {/* <Prompt
        when={isBlocking}
        message={`Leave this page? Unsaved work could be lost.`}
      /> */}
          {gameMode === 'challenge' && <ChallengeBar />}
          <Canvas />
          <Toolbar gameMode={gameMode} />
        </Grid>
      </Grid>
    </Box>
  );
}
