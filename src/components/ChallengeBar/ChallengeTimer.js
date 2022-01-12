import React, { useState } from "react";
import useInterval from "../../hooks/useInterval";

export default function ChallengeTimer(props) {
  let [timer, setTimer] = useState(props.roundTime);

  useInterval(() => {
    if (timer === 0) {
      console.log("timer reached 0");
    } else {
      setTimer(timer - 1);
    }
  }, 1000);

  return (
    <div className="bg-white rounded py-2">
      <i className="fas fa-stopwatch me-2"></i>
      {timer}
    </div>
  );
}
