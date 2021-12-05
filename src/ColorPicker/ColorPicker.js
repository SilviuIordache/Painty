import React from "react";

export default class ColorPicker extends React.Component {
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
  const colorGrid = props.colors.map((color, index) => {
    const style = {
      backgroundColor: color,
      width: '2rem',
      height: '2rem',
      cursor: 'pointer'
    }
    return (
      <div 
        style={style}
        key={index}
        className="d-inline-block"
        onClick={() => {props.selectBrushColor(color)}}
      ></div>
    )
  });

  return <div>{colorGrid}</div>
}
