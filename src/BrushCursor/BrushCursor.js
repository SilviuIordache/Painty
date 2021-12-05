import "./BrushCursor.css";

export default function BrushCursor(props) {
  const className = `cursor-brush brush-size-${props.size}`
  return (
    <div id="brush-cursor" className={className} />
  )
}