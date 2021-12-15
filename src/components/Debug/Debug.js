export default function Debug(props) {
  return (
    <div id="debug">
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-start text-left">
          <div>
            <p> {props.p1} </p>
            <p> {props.p2} </p>
          </div>
        </div>
        <div className="d-flex justify-content-start text-left">
          <div>
            <p> {props.p3} </p>
            <p> {props.p4} </p>
          </div>
        </div>
        <div className="d-flex justify-content-start text-left">
          <div>
            <p> {props.p5} </p>
            <p> {props.p6} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
