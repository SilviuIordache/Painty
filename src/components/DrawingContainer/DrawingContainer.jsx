import { useEffect, useState, useRef } from 'react';
import { getImageFile } from '../../dbservices/images/getImageFile.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DrawingContainer(props) {
  const [imageSrc, setImageSrc] = useState();
  useEffect(() => {
    let imageRetrieved = false;
    const fetchData = async () => {
      const data = await getImageFile(props.path);
      if (!imageRetrieved) {
        setImageSrc(data);
      }
    };
    fetchData().catch((err) => {});
    return () => {
      imageRetrieved = false;
      setImageSrc();
    };
  }, [props.path]);

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
      {!imageSrc ? (
        <CircularProgress />
      ) : (
        <img
          id={props.id}
          src={imageSrc}
          alt={props.name}
          key={props.index}
          width="100%"
          height="100%"
        />
      )}
    </Box>
  );
}
