export default function ChallengeBar (props) {

  return (
    <div className="row bg-secondary rounded py-3 d-flex justify-content-center">
      <div className="col-2 bg-white rounded py-2">
        ROUND: {props.roundCurrent} / {props.roundTotal}
      </div>
      <div className="col-2">
        <div className="bg-white rounded py-2">
          <i className="fas fa-stopwatch me-2"></i>
          {props.timer}
        </div>
      </div>
      <div className="col-6">
        <div className="bg-white rounded py-2">
          <span className="text-muted">Draw this: </span>
          <span className="font-weight-bold">
            {props.currentWord.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}