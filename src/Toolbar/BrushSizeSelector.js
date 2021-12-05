import "./BrushSizeSelector.css";

export default function BrushSizeSelector(props) {
  const sizes = [1, 2, 3];

  const brushSizes = sizes.map((size, index) =>
    <button
      key={index}
      onClick={() => props.onBrushSizeSelected(sizes[index])}>
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