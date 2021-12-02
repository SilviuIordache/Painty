import React from "react";

export default class PaintApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0, 
      cursorY: 0
    };
  }
  
  handleMouseMove = (e) => {
    this.setState({
      cursorX: e.clientX,
      cursorY: e.clientY
    })
  }
  
  componentDidMount() {
    document.onmousemove = this.handleMouseMove

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
  }

  render() {
    return (
      <div>
        <div id="coordinates">
          <p> x: {this.state.cursorX} </p>
          <p> y: {this.state.cursorY} </p>
        </div>
        <canvas id="canvas"></canvas>
      </div>
    )
  }
}