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

  const colorsArray1 = props.colors.slice(0, 7);
  const colorsArray2 = props.colors.slice(7, 14);


  const colorsRow1 = colorsArray1.map((color, index) => {
    return (
      <ColorSquare
        color={color}
        onClick={() => { props.selectBrushColor(color) }}
        key={index}
      />
    )
  });

  const colorsRow2 = colorsArray2.map((color, index) => {
    return (
      <ColorSquare
        color={color}
        onClick={() => { props.selectBrushColor(color) }}
        key={index}
      />
    )
  });

  return (
    <div>
      <div className="d-flex">{colorsRow1}</div>
      <div className="d-flex">{colorsRow2}</div>
    </div>
  )
}

function ColorSquare(props) {
  const style = {
    backgroundColor: props.color,
  }
  return (
    <div
      style={style}
      key={props.index}
      className="color-square d-inline-block"
      onClick={props.onClick}
    ></div>
  )
}