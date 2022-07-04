import React, { useState, useEffect, useRef } from 'react';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { useSelector } from 'react-redux';
import FloodFill from 'q-floodfill';
import BrushCursor from '../BrushCursor/BrushCursor';
import useEventListener from '../../hooks/useEventListener';
import { Grid, Box } from '@mui/material';

export default function Canvas() {
  useEventListener('mousedown', handleMouseDown);
  useEventListener('touchstart', handleTouchStart);

  useEventListener('mousemove', handleMouseMove);
  useEventListener('touchmove', handleTouchMove);

  useEventListener('mouseup', handleMouseUp);
  useEventListener('touchend', handleTouchEnd);

  useEventListener('resize', handleWindowResize);

  const [mousePressed, setMousePressed] = useState(false);
  const [canvasHovered, setCanvasHovered] = useState(true);
  const [lastTouch, setLastTouch] = useState();

  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const [canvasRelativeX, setCanvasRelativeX] = useState(0);
  const [canvasRelativeY, setCanvasRelativeY] = useState(0);

  const [canvasAbsoluteWidth] = useState(800);
  const [canvasAbsoluteHeight] = useState(600);

  const [canvasRelativeWidth, setCanvasRelativeWidth] = useState(0);
  const [canvasRelativeHeight, setCanvasRelativeHeight] = useState(0);

  const mobileScreen = useCheckMobileScreen();

  const currentToolType = useSelector((state) => state.tool.type);

  // ---- TOOL START LOGIC --------
  function handleTouchStart(e) {
    e.preventDefault();

    switch (currentToolType) {
      case 'bucket':
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const { canvasRelativeX, canvasRelativeY } =
          getCanvasRelativeCoordinates(x, y);

        if (touchIsOnCanvas(x, y)) {
          floodFill(canvasRelativeX, canvasRelativeY);
        }
        break;
      case 'brush':
        drawPathMobile(e);
        break;
      default:
        drawPathMobile(e);
        break;
    }
  }

  function handleMouseDown(e) {
    if (mobileScreen) {
      return;
    }
    setMousePressed(true);
    switch (currentToolType) {
      case 'bucket':
        if (canvasHovered) {
          floodFill(canvasRelativeX, canvasRelativeY);
        }
        break;
      case 'brush':
        drawPath();
        break;
      default:
        drawPath();
        break;
    }
  }

  // ------------------------------

  // ---- TOOL MOVE LOGIC ---------
  function handleMouseMove(e) {
    const { canvasRelativeX, canvasRelativeY } = getCanvasRelativeCoordinates(
      e.clientX,
      e.clientY
    );

    setCursorX(e.clientX + window.pageXOffset);
    setCursorY(e.clientY + window.pageYOffset);

    setCanvasRelativeX(canvasRelativeX);
    setCanvasRelativeY(canvasRelativeY);

    // line below draws (draw when mouse pressed)
    if (mousePressed && currentToolType === 'brush') {
      drawPath();
    }
  }

  function handleTouchMove(e) {
    drawPathMobile(e);
  }

  function drawPathMobile(e) {
    setLastTouch(e);
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const { canvasRelativeX, canvasRelativeY } = getCanvasRelativeCoordinates(
      x,
      y
    );

    const elem = document.elementFromPoint(x, y);
    if (elem?.id === 'canvas') {
      ctx.lineCap = 'round';
      ctx.lineWidth = currentBrushSize;
      ctx.strokeStyle = currentBrushColor;
      ctx.lineTo(canvasRelativeX, canvasRelativeY);
      ctx.stroke();
      ctx.moveTo(canvasRelativeX, canvasRelativeY);
    }
  }

  // ------------------------------

  // ---- TOOL END LOGIC ----------
  function handleMouseUp() {
    setMousePressed(false);
    // end current path by beggining new one
    ctx.beginPath();
  }

  function handleTouchEnd(e) {
    const x = lastTouch.touches[0].clientX;
    const y = lastTouch.touches[0].clientY;
    if (touchIsOnCanvas(x, y)) {
      ctx.beginPath();
      e.preventDefault();
    }
  }
  // --------------------------------

  function handleMouseEnterCanvas() {
    setCanvasHovered(true);
    if (mousePressed) {
      handleMouseDown();
    }
  }

  function handleMouseLeaveCanvas() {
    setCanvasHovered(false);
  }

  function handleWindowResize() {
    calculcateCanvasRelativeSize();
  }

  // ----- HELPER FUNCTIONS --------
  function calculcateCanvasRelativeSize() {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setCanvasRelativeWidth(canvasRect.width);
    setCanvasRelativeHeight(canvasRect.height);
  }

  function touchIsOnCanvas(x, y) {
    const elem = document.elementFromPoint(x, y);
    if (elem?.id === 'canvas') {
      return true;
    } else {
      return false;
    }
  }

  function getCanvasRelativeCoordinates(x = 0, y = 0) {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();

    const canvasAbsoluteX = x - rect.left;
    const canvasAbsoluteY = y - rect.top;

    const canvasRelativeX =
      (canvasAbsoluteX * canvasAbsoluteWidth) / canvasRelativeWidth;
    const canvasRelativeY =
      (canvasAbsoluteY * canvasAbsoluteHeight) / canvasRelativeHeight;

    return { canvasRelativeX, canvasRelativeY };
  }
  // --------------------------------------------

  const canvasRef = useRef();
  const [ctx, setCtx] = useState(0);

  // initialize canvas
  useEffect(() => {
    setupCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setupCanvas() {
    const canvas = canvasRef.current;

    canvas.style.backgroundColor = 'white';
    canvas.width = canvasAbsoluteWidth;
    canvas.height = canvasAbsoluteHeight;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    const newCTX = canvas.getContext('2d');

    newCTX.fillStyle = '#ffffff';
    newCTX.fillRect(0, 0, canvasAbsoluteWidth, canvasAbsoluteHeight);

    setCtx(newCTX);
    calculcateCanvasRelativeSize();
  }

  function floodFill(x, y) {
    // get image data
    const imgData = ctx.getImageData(
      0,
      0,
      canvasAbsoluteWidth,
      canvasAbsoluteHeight
    );

    // Construct flood fill instance
    const floodFill = new FloodFill(imgData);

    // Modify image data
    floodFill.fill(currentBrushColor, Math.round(x), Math.round(y), 100);

    // put the modified data back in context
    ctx.putImageData(floodFill.imageData, 0, 0);
  }

  const currentBrushColor = useSelector((state) => state.tool.color);
  const currentBrushSize = useSelector((state) => state.tool.size);

  function drawPath() {
    ctx.lineCap = 'round';
    ctx.lineWidth = currentBrushSize;
    ctx.strokeStyle = currentBrushColor;

    ctx.lineTo(canvasRelativeX, canvasRelativeY);
    ctx.stroke();
    ctx.moveTo(canvasRelativeX, canvasRelativeY);
  }

  // prevent panning on component load; add back panning on component destroy
  useEffect(() => {
    const html = document.documentElement;
    html.style.touchAction = 'none';

    return function cleanup() {
      html.style.touchAction = 'auto';
    };
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <canvas
            id="canvas"
            ref={canvasRef}
            style={{ cursor: 'none' }}
            onMouseEnter={handleMouseEnterCanvas}
            onMouseLeave={handleMouseLeaveCanvas}
          />
        </Grid>
      </Grid>

      <BrushCursor
        hideBrush={!canvasHovered || mobileScreen}
        x={cursorX}
        y={cursorY}
      />
    </Box>
  );
}
