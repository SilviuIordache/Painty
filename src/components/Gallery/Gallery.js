import React from "react";


export default class DrawingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataURL: ''
    }
  }

  componentDidMount() {
    const imgSrc = localStorage.getItem('img');
    this.setState({
      dataURL: imgSrc
    })
  }

  render() {
    return (
      <div className="drawing-gallery">
        <img src={this.state.dataURL}/>
      </div>
    )
  }

}