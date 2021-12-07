import "./BrushSizeSelector.css";

export default function BrushSizeSelector(props) {
  const sizes = require('../jsons/brushSizes.json').sizes;

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
          onClick={() => props.selectBrushSize(size)}
          className='brush-size-button d-flex align-items-center justify-content-center btn btn-outline-secondary me-1'
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

