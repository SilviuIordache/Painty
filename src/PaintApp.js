import React from "react";
export default class PaintApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0, 
      cursorY: 0,
      ctx: null
    };
  }
  setupCanvas = () => {
    const canvas = document.getElementById('canvas');
    canvas.style.backgroundColor = 'lightgray';
    this.setState({
      ctx: canvas.getContext('2d')
    });
  }

  handleMouseMove = (e) => {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();

    this.setState({
      cursorX: e.clientX - rect.left,
      cursorY: e.clientY - rect.top
    })
  }

  
  createRectangleAtCoordinates = (x, y, width, height, color) => {
    const newCTX = this.state.ctx;
    newCTX.fillStyle = color || 'green';
    newCTX.fillRect(x, y, width, height);

    this.setState({
      ctx: newCTX
    })

  }

  handleMouseClick = (e) => {
    this.createRectangleAtCoordinates(this.state.cursorX, this.state.cursorY, 10, 10, 'red')
  }


  componentDidMount() {
    document.onmousemove = this.handleMouseMove;
    document.onclick = this.handleMouseClick;

    this.setupCanvas();
  }

  render() {
    return (
      <div>
        <div id="coordinates">
          <p> x: {this.state.cursorX} </p>
          <p> y: {this.state.cursorY} </p>
        </div>
        <canvas width="1000" height="500" id="canvas"></canvas>
      </div>
    )
  }
}