import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import FloodFill from "q-floodfill";
import BrushCursor from "../BrushCursor/BrushCursor";
import useEventListener from "../../hooks/useEventListener";

export default function Canvas() {
  useEventListener("mousemove", handleMouseMove);
  useEventListener("mousedown", handleMouseDown);
  useEventListener("mouseup", handleMouseUp);
  useEventListener("resize", handleWindowResize);

  function handleMouseMove(e) {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect();

    setCursorX(e.clientX + window.pageXOffset);
    setCursorY(e.clientY + window.pageYOffset);

    const canvasAbsoluteX = e.clientX - rect.left;
    const canvasAbsoluteY = e.clientY - rect.top;
    const canvasRelativeX =
      (canvasAbsoluteX * canvasAbsoluteWidth) / canvasRelativeWidth;
    const canvasRelativeY =
      (canvasAbsoluteY * canvasAbsoluteHeight) / canvasRelativeHeight;
    setCanvasRelativeX(canvasRelativeX);
    setCanvasRelativeY(canvasRelativeY);

    // line below draws
    if (mousePressed) {
      drawPath();
    }
  }

  const currentToolType = useSelector(state => state.tool.type);
  function handleMouseDown() {
    setMousePressed(true);

    switch (currentToolType) {
      case "bucket":
        if (canvasHovered) {
          floodFill();
        }
        break;
      case "brush":
        drawPath();
        break;
      default:
        drawPath();
        break;;
    }
  }

  function handleMouseUp() {
    setMousePressed(false);
    ctx.beginPath();
  }

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

  function calculcateCanvasRelativeSize() {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setCanvasRelativeWidth(canvasRect.width);
    setCanvasRelativeHeight(canvasRect.height);
  }

  const canvasRef = useRef();
  const [ctx, setCtx] = useState(0);

  // initialize canvas
  useEffect(() => {
    setupCanvas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setupCanvas() {
    const canvas = canvasRef.current;

    canvas.style.backgroundColor = "white";
    canvas.width = canvasAbsoluteWidth;
    canvas.height = canvasAbsoluteHeight;
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    const newCTX = canvas.getContext("2d");

    newCTX.fillStyle = "#ffffff";
    newCTX.fillRect(0, 0, canvasAbsoluteWidth, canvasAbsoluteHeight);

    setCtx(newCTX);
    calculcateCanvasRelativeSize();
  }

  const [mousePressed, setMousePressed] = useState(false);
  let [canvasHovered, setCanvasHovered] = useState(true);

  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const [canvasRelativeX, setCanvasRelativeX] = useState(0);
  const [canvasRelativeY, setCanvasRelativeY] = useState(0);

  const [canvasAbsoluteWidth] = useState(800);
  const [canvasAbsoluteHeight] = useState(600);

  const [canvasRelativeWidth, setCanvasRelativeWidth] = useState(0);
  const [canvasRelativeHeight, setCanvasRelativeHeight] = useState(0);

  function floodFill() {
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
    floodFill.fill(
      currentBrushColor,
      Math.round(canvasRelativeX),
      Math.round(canvasRelativeY),
      100
    );

    // put the modified data back in context
    ctx.putImageData(floodFill.imageData, 0, 0);
  }

  const currentBrushColor = useSelector(state => state.tool.color);
  const currentBrushSize = useSelector(state => state.tool.size);

  function drawPath(e) {
    ctx.lineCap = "round";
    ctx.lineWidth = currentBrushSize;
    ctx.strokeStyle = currentBrushColor;

    ctx.lineTo(canvasRelativeX, canvasRelativeY);
    ctx.stroke();
    ctx.moveTo(canvasRelativeX, canvasRelativeY);
  }

  const canvasBackgroundStyle = {
    backgroundColor: "darkgray",
    padding: "2rem",
    borderRadius: "0.5rem"
  }

  return (
    <div>
      <div style={canvasBackgroundStyle} className="row">
        <div className="col-12">
          <canvas
            id="canvas"
            ref={canvasRef}
            style={{cursor: "none"}}
            onMouseEnter={handleMouseEnterCanvas}
            onMouseLeave={handleMouseLeaveCanvas}
          />
        </div>
      </div>

      <BrushCursor
        hideBrush={!canvasHovered}
        x={cursorX}
        y={cursorY}
      />
    </div>
  );
}
