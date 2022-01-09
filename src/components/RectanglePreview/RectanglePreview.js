import React from "react";

export default class RectanglePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const previewRectStyle = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      position: 'absolute',
      backgroundColor: 'pink',
      top: `${this.props.y}px`,
      left: `${this.props.x}px`
    }

    return (
      <div
        style={previewRectStyle}
        width="30px"
        height="30px"
      />
    )
  }
}