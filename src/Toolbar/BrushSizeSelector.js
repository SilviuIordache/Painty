import "./BrushSizeSelector.css";

export default function BrushSizeSelector(props) {
  const sizes = require('../brushSizes.json').sizes;

  const brushSizes = sizes.map((size, index) =>
    <button
      key={index}
      onClick={() => props.onBrushSizeSelected(index)}>
      {index + 1}
    </button>
  )
  
  return (
    <div>
      <span>Brush size:</span>
     {brushSizes}
    </div>
  )
}