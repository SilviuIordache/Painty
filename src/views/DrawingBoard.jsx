import { useState, useEffect } from 'react';
import { Prompt, useParams } from 'react-router-dom';
import Toolbar from '../features/Toolbar/Toolbar';
import Canvas from '../features/Canvas/Canvas';
import ChallengeBar from '../features/ChallengeBar/ChallengeBar';

export default function DrawingBoard() {
  const [gameMode, setGameMode] = useState();
  const urlParams = useParams();
  useEffect(() => {
    const mode = urlParams.mode;
    setGameMode(mode);
  }, [urlParams.mode]);

  return (
    <div>
      {/* <Prompt
        when={isBlocking}
        message={`Leave this page? Unsaved work could be lost.`}
      /> */}
      {gameMode === 'challenge' && <ChallengeBar />}
      <Canvas />
      <Toolbar gameMode={gameMode} />
    </div>
  );
}
