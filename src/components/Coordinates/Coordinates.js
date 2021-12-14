export default function Coordinates(props) {
  return (
    <div id="coordinates"> 
      <p> cursorX: {props.cursorX} </p>
      <p> cursorY: {props.cursorY} </p>
      <p> canvasX: {props.canvasX} </p>
      <p> canvasY: {props.canvasY} </p>
    </div>
  )
}