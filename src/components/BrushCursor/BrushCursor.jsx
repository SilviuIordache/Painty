import { useSelector } from 'react-redux';

export default function BrushCursor(props) {
  const currentColor = useSelector(state => state.tool.color);
  const currentBrushSize = useSelector(state => state.tool.size);
  const brushStyle = {
    width: `${currentBrushSize}px`,
    height: `${currentBrushSize}px`,
    position: 'absolute',
    border: '1px solid black',
    borderRadius: '50%',
    backgroundColor: `${currentColor}`,
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