import React from "react";
export default class PaintApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0, 
      cursorY: 0
    };
  }
  // setupCanvas = () => {
  //   this.setState({
  //     ctx: this.state.canvas.getContext('2d')
  //   })
  // }

  handleMouseMove = (e) => {
    this.setState({
      canvas: undefined,
      ctx: undefined,
      cursorX: e.clientX,
      cursorY: e.clientY
    })
  }

  
  createRectangleAtCoordinates = (ctx, x, y, width, height, color) => {
    ctx.fillStyle = color || 'green';
    ctx.fillRect(x, y, width, height);
  }

  handleMouseClick = (e) => {
    this.createRectangleAtCoordinates(e.clientX, e.clientY, 10, 10, 'red')
  }


  componentDidMount() {
    document.onmousemove = this.handleMouseMove;
    document.onclick = this.handleMouseClick;

    const canvas = document.getElementById('canvas');
    canvas.style.backgroundColor = 'lightgray';
    const ctx = canvas.getContext('2d');


    this.createRectangleAtCoordinates(ctx, 10, 10, 150, 100, 'green');
    this.createRectangleAtCoordinates(ctx, 100, 100, 150, 100, 'red')
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