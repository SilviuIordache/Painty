export default function BottomBanner(props) {
  const style = {
    backgroundColor: "lightgray",
    fontSize: "1rem",
    padding: "0.3rem 0.5rem",
    display: "flex",
    justifyContent: "space-between"
  }
  const size = (props.size / 1024).toFixed(0)
  return (
    <div style={style} className="text-truncate">
      <div className="d-flex">
        <div className="me-1">
          {props.mode === 'challenge' && '⏳'} 
          {props.mode === 'practice' && '🖌'} 
        </div>
        {props.name}
      </div>
      <div>
        {size}KB
      </div>
    </div>
  )
}