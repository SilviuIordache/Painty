export default function BrushCursor(props) {

  const brushStyle = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    position: 'absolute',
    border: '2px solid black',
    borderRadius: '50%',
    backgroundColor: `${props.color}`,
    pointerEvents: 'none',
    left: `${props.x}px`,
    top: `${props.y}px`,
    transform: 'translate(-50%, -50%)'
  }

  if (props.hideBrush) {
    brushStyle.visibility = 'hidden'
  }

  return <div style={brushStyle}/>
}