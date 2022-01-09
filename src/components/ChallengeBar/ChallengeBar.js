import React from "react";
import ChallengeTimer from "./ChallengeTimer";

export default class ChallengeBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      currentWord: '',
    }
  }
  componentDidMount() {
    this.chooseWord();
  }

  saveChallengeDrawing = () => {
    this.props.saveChallengeDrawing(this.state.currentWord);
  }

  chooseWord = () => {
    const words = require('../jsons/words.json').list;
    this.setState({ words });

    // generate random number
    const randomWordIndex = Math.floor(Math.random() * words.length);

    // assign that value to the current word
    this.setState({
      currentWord: words[randomWordIndex]
    })
  }

  render() {
    return (
      <div className="row bg-secondary rounded py-3 d-flex justify-content-center">
        <div className="col-2 bg-white rounded py-2">
          ROUND: {this.props.roundCurrent} / {this.props.roundTotal}
        </div>
        <div className="col-2">
          <ChallengeTimer 
            roundTime={this.props.roundTime}
            saveChallengeDrawing={this.saveChallengeDrawing}
          />
        </div>
        <div className="col-6">
          <div className="bg-white rounded py-2">
            <span className="text-muted">Draw this: </span>
            <span className="font-weight-bold">
              {this.state.currentWord.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    )
  }
}