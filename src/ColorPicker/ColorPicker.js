import React from "react";

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
  }

  componentDidMount() {
    const colors = require('../jsons/colors.json').list;
    this.setState({ colors});
  }

  render() {
    return (
      <div>
        <ColorGrid colors={this.state.colors}/>
      </div>
    )
  }
}

function ColorGrid(props) {
  const colorGrid = props.colors.map((color, index) => {
    const style = {
      backgroundColor: color,
      width: '2rem',
      height: '2rem'
    }
    return (
      <div style={style} key={index}></div>
    )
  });

  return <div className="d-flex">{colorGrid}</div>
}
