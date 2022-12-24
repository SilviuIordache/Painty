import { useEffect, useState, useRef } from 'react';
import { getImageFile } from 'dbservices/images/getImageFile.js';
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

  function calculateWidth() {
    const width = drawingLoader?.current?.offsetWidth;
    setDrawingLoaderHeight((width * 2) / 3);
  }
  useEffect(() => {
    calculateWidth();
  }, []);
  
  useEffect(() => {
    const onResize = async (e) => {
      calculateWidth();
    };
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('scroll', onResize);
  });

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
          height="100%"
          width="100%"
        />
      )}
    </Box>
  );
}
