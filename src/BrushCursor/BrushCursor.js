import "./BrushCursor.css";

export default function BrushCursor(props) {
  let className = `cursor-brush brush-size-${props.size}`

  if (props.hideBrush) {
    console.log(1)
    className += ' hidden'
  }
  return (
    <div id="brush-cursor" className={className} />
  )
}