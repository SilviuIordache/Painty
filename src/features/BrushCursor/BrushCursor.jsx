import RegularCursor from "./RegularCursor";
import BucketCursor from "./BucketCursor"
import { useSelector } from 'react-redux';

export default function BrushCursor(props) {

  const tool = useSelector(state => state.tool.type);

  return (
    <div>
      { tool === 'bucket' ?
        <BucketCursor x={props.x} y={props.y} show={props.hideBrush}/> :
        <RegularCursor x={props.x} y={props.y} show={props.hideBrush}/>
      }
    </div>
  )
}