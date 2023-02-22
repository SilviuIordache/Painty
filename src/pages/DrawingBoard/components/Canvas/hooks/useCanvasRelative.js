import { useState } from 'react';
import useEventListener from '../../../../../hooks/useEventListener';

const useCanvasRelative = (canvasRef) => {
  const [canvasRelativeWidth, setCanvasRelativeWidth] = useState(0);
  const [canvasRelativeHeight, setCanvasRelativeHeight] = useState(0);

  function calculcateCanvasRelativeSize() {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setCanvasRelativeWidth(canvasRect.width);
    setCanvasRelativeHeight(canvasRect.height);
  }

  function handleWindowResize() {
    calculcateCanvasRelativeSize();
  }

  useEventListener('resize', handleWindowResize);

  return {
    canvasRelativeWidth,
    canvasRelativeHeight,
  };
};

export default useCanvasRelative;
