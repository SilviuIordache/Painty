import React from "react";
import ColorGrid from "./ColorGrid";
export default class ColorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
    };
  }

  selectBrushColor = (color) => {
    this.props.selectBrushColor(color);
  };

  componentDidMount() {
    const colors = require("../jsons/colors.json").list;
    this.setState({ colors });
  }

  render() {
    return (
      <div>
        <ColorGrid
          colors={this.state.colors}
          selectBrushColor={this.selectBrushColor}
        />
      </div>
    );
  }
}