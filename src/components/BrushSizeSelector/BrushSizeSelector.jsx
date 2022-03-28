import BrushSizeButton from './BrushSizeButton';
import { useSelector } from 'react-redux';


export default function BrushSizeSelector(props) {
  const sizes = require("../../jsons/brushSizes.json").sizes;
  const currentBrushSize = useSelector(state => state.tool.size);
  
  const brushSizes = sizes.map((size, index) => {
    return (
      <BrushSizeButton
        active={size === currentBrushSize}
        key={index}
        size={size}
      />
    );
  });

  return (
    <div className="d-flex justify-content-end">
      {brushSizes}
    </div>
  )
}