export default function BucketCursor(props) {

  const style = {
    fontWeight: "0.5rem",
    fontSize: "2rem",
    position: 'absolute',
    pointerEvents: 'none',
    left: `${props.x}px`,
    top: `${props.y}px`,
    transform: 'translate(-52%, -50%)',
  }

  if (props.show) {
    style.visibility = 'hidden'
  }

  return (
    <div style={style}>
      <i className="fas fa-crosshairs"></i>
    </div>
  )
}