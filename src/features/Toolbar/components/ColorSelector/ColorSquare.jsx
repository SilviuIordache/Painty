import "./ColorSquare.css";
import { useDispatch } from 'react-redux';
import { changeColor } from "../../../../redux/features/toolSlice";

export default function ColorSquare(props) {

  const dispatch = useDispatch();

  const style = {
    backgroundColor: props.color,
  };

  let className = "color-square d-inline-block"
  if (props.pos === 'top') {
    className += " color-square-top"
  } else {
    className += " color-square-bottom"
  }

  return (
    <div
      style={style}
      key={props.index}
      className={className}
      onClick={() => { dispatch(changeColor(props.color))}}
    />
  );
}
