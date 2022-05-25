import { useSelector } from 'react-redux';

export default function ChallengeBar(props) {

  const currentWord = useSelector(state => state.challenge.currentWord);
  const roundTotal = useSelector(state => state.challenge.roundTotal);
  const roundCurrent = useSelector(state => state.challenge.roundCurrent);
  const timer = useSelector((state) => state.challenge.timer);

  return (
    <div className="row bg-secondary rounded py-2 d-flex justify-content-center">
      <div className="col-3 bg-white rounded py-1 d-flex align-items-center justify-content-around">
        ROUND: {roundCurrent} / {roundTotal}
        <button onClick={props.endRound} className="btn btn-warning ms-2">
          <i className="fas fa-fast-forward fa-xs"></i>
        </button>
      </div>

      <div className="col-2">
        <div className="bg-white rounded py-1 d-flex justify-content-around h-100">
          <div className="d-flex align-items-center">
            <i className="fas fa-stopwatch me-2"></i>
            {timer}
          </div>
        </div>
      </div>
      <div className="col-5 ">
        <div className="bg-white rounded py-1 h-100 d-flex align-items-center justify-content-center">
          <span className="text-muted">Draw this: </span>
          <span className="font-weight-bold">
            {currentWord.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
