import { useEffect, useState, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DrawingContainer() {
  const [drawingLoaderHeight, setDrawingLoaderHeight] = useState();
  const drawingLoader = useRef();
  useEffect(() => {
    const width = drawingLoader.current.offsetWidth;

    setDrawingLoaderHeight((width * 2) / 3);
  }, []);

  return (
    <Box
      ref={drawingLoader}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: `${drawingLoaderHeight}px`,
        backgroundColor: 'white',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
