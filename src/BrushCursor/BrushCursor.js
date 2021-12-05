import "./BrushCursor.css";

export default function BrushCursor(props) {
  let className = `cursor-brush brush-size-${props.size}`

  if (props.hideBrush) {
    className += ' hidden'
  }
  return (
    <div id="brush-cursor" className={className} />
  )
}