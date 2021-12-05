import "./BrushSizeSelector.css";

export default function BrushSizeSelector(props) {
  const sizes = require('../brushSizes.json').sizes;

  const brushSizes = sizes.map((size, index) => {

      const brushIconStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'black',
      }

      return (
        <button
          key={index}
          onClick={() => props.onBrushSizeSelected(index)}
          className='d-flex align-items-center justify-content-center brush-size-button btn btn-outline-secondary'
        >
          <div style={brushIconStyle}></div>  
        </button>
      )
    }
  )
  
  return (
    <div className='d-flex align-items-center'>
      <span className='me-4'>Brush size:</span>
     {brushSizes}
    </div>
  )
}

