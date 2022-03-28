import "./ColorSquare.css";
import { useDispatch } from 'react-redux';
import { changeColor } from "../../redux/features/toolReducer";

export default function ColorSquare(props) {

  const dispatch = useDispatch();

  const style = {
    backgroundColor: props.color,
  };
  return (
    <div
      style={style}
      key={props.index}
      className="color-square d-inline-block"
      onClick={() => { dispatch(changeColor(props.color))}}
    />
  );
}
