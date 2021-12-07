import React from "react";
import "./ColorSelector.css"

export default class ColorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
  }

  selectBrushColor = (color) => {
    this.props.selectBrushColor(color)
  }

  componentDidMount() {
    const colors = require('../jsons/colors.json').list;
    this.setState({ colors});
  }

  render() {
    return (
      <div>
        <ColorGrid 
          colors={this.state.colors}
          selectBrushColor={this.selectBrushColor}/>
      </div>
    )
  }
}

function ColorGrid(props) {
  const colorSquares = props.colors.map((color, index) => {
    const style = {
      backgroundColor: color,
    }
    return (
      <div
        style={style}
        key={index}
        className="color-square d-inline-block"
        onClick={() => {props.selectBrushColor(color)}}
      ></div>
    )
  });

  return <div>{colorSquares}</div>
}
