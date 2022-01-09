import React from "react";

export default class ChallengeTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      timerInterval: 0
    }
  }

  componentDidMount() {
    this.setState({
      timer: this.props.roundTime,
      timerInterval: setInterval(() => this.tick(), 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInterval);
  }

  tick = () => {
    if (this.state.timer > 0) {
      this.setState({
        timer: this.state.timer - 1
      })
    } else {
      clearInterval(this.state.timerInterval);
      this.props.saveChallengeDrawing();
    }
  }

  render() {
    return (
      <div className="bg-white rounded py-2">
        <i className="fas fa-stopwatch me-2"></i>
        {this.state.timer}
      </div>
    )
  }
}