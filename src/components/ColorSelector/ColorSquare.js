import "./ColorSquare.css";

export default function ColorSquare(props) {
  const style = {
    backgroundColor: props.color,
  };
  return (
    <div
      style={style}
      key={props.index}
      className="color-square d-inline-block"
      onClick={props.onClick}
    />
  );
}