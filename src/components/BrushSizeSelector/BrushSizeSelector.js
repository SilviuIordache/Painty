import "./BrushSizeSelector.css";

export default function BrushSizeSelector(props) {
  const sizes = require('../jsons/brushSizes.json').sizes;

  const brushSizes = sizes.map((size, index) => {
      return (
        <BrushSize
          active={size === props.currentBrushSize}
          key={index}
          size={size}
          selectBrushSize={props.selectBrushSize}
        />
      )
    }
  )
  
  return (
    <div className='d-flex align-items-center'>
     {brushSizes}
    </div>
  )
}

function BrushSize(props) {
  let activeStyle;
  if (props.active) {
    activeStyle = {
      border: '2px solid black',
      color: 'black'
    } 
  }

  const brushIconStyle = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    borderRadius: '50%',
    backgroundColor: 'black',
  }

  return (
    <button
      style={activeStyle}
      onClick={() => props.selectBrushSize(props.size)}
      className='brush-size-button d-flex align-items-center justify-content-center btn btn-outline-secondary me-1'
    >
      <div style={brushIconStyle}></div>  
    </button>
  )
}