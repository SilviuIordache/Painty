import React from "react";
import './cursor.css'
export default class PaintApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0, 
      cursorY: 0,
      ctx: null,
      isDrawing: false
    };
  }

  componentDidMount() {
    this.setupCanvas();
  }

  setupCanvas = () => {
    const canvas = document.getElementById('canvas');
    canvas.style.backgroundColor = 'lightgray';
    this.setState({
      ctx: canvas.getContext('2d')
    });
  }

  handleMouseEnter = (e) => {
    // console.log('entering canvas')
  }

  handleMouseLeave = (e) => {
    const brushCursor = document.getElementById('brush-cursor');
    brushCursor.style.className += "hidden"
  }

  handleMouseMove = (e) => {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();

    this.setState({
      cursorX: e.clientX - rect.left,
      cursorY: e.clientY - rect.top
    });

    // set brush cursor position
    const brushCursor = document.getElementById('brush-cursor');
    brushCursor.style.top = e.clientY + 'px';
    brushCursor.style.left = e.clientX + 'px';

    // if in drawing state, also draw shape
    if (this.state.isDrawing) {
      this.createRectangleAtCoordinates(this.state.cursorX, this.state.cursorY, 10, 10)

    }
  }

  createRectangleAtCoordinates = (x, y, width, height, color) => {
    const newCTX = this.state.ctx;
    newCTX.fillStyle = color || 'black';
    newCTX.fillRect(x, y, width, height);

    this.setState({
      ctx: newCTX
    })

  }

  enableDrawing = () => {
    this.setState({
      isDrawing: true
    });
  }

  disableDrawing = () => {
    this.setState({
      isDrawing: false
    });
  }
  

  render() {
    return (
      <div>
        <div id="coordinates">
          <p> x: {this.state.cursorX} </p>
          <p> y: {this.state.cursorY} </p>
        </div>
        <canvas 
          width="1000" 
          height="500"
          id="canvas"
          className="no-cursor"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.enableDrawing}
          onMouseUp={this.disableDrawing}
        />
        <div id="brush-cursor" className="cursor-brush"/>
      </div>
    )
  }
}