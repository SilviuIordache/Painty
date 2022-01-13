import { useState, useEffect } from "react";
import ChallengeTimer from "./ChallengeTimer";

export default function ChallengeBar (props) {

  const [words] = useState(require("../../jsons/words.json").list);
  let [currentWord, setCurrentWord] = useState('');
  useEffect(() => {
    const randomWordIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomWordIndex]);
  }, [words]);

  function timerEnded () {
    // this.props.timerEnded(this.state.currentWord);
    console.log("i am here");
  };

  return (
    <div className="row bg-secondary rounded py-3 d-flex justify-content-center">
      <div className="col-2 bg-white rounded py-2">
        ROUND: {props.roundCurrent} / {props.roundTotal}
      </div>
      <div className="col-2">
        <ChallengeTimer
          roundTime={props.roundTime}
          timerEnded={timerEnded}
        />
      </div>
      <div className="col-6">
        <div className="bg-white rounded py-2">
          <span className="text-muted">Draw this: </span>
          <span className="font-weight-bold">
            {currentWord.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );

}
