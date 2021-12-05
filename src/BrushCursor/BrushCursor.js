import "./BrushCursor.css";

export default function BrushCursor(props) {
  const brushSizes = require('../jsons/brushSizes.json');
  const sizes = brushSizes.sizes;

  const brushStyle = {
    width: `${sizes[props.size]}px`,
    height: `${sizes[props.size]}px`,
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'black',
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