import "./BrushSizeSelector.css";

export default function BrushSizeSelector(props) {
  const sizes = require('../brushSizes.json').sizes;

  const brushSizes = sizes.map((size, index) => {

      const brushIconStyle = {
        width: `${size/1.5}px`,
        height: `${size/1.5}px`,
        borderRadius: '50%',
        backgroundColor: 'black',
      }

      return (
        <button
          key={index}
          onClick={() => props.onBrushSizeSelected(index)}
          className='d-flex align-items-center justify-content-center brush-size-button btn btn-outline-secondary me-1'
        >
          <div style={brushIconStyle}></div>  
        </button>
      )
    }
  )
  
  return (
    <div className='d-flex align-items-center'>
     {brushSizes}
    </div>
  )
}

