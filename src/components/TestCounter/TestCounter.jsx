import { useSelector, useDispatch } from 'react-redux';
import { increment, incrementCustom, decrement, setBrushActive, setEraserActive, setBucketActive } from "../../redux/actions";

export default function TestCounter() {
  const counter = useSelector(state => state.counter);
  const tool = useSelector(state => state.tool)
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => { dispatch(incrementCustom(10))}}>++ </button>
        <button onClick={() => { dispatch(increment())}}>+</button>
        <p>{counter}</p>
        <button onClick={() => { dispatch(decrement())}}>-</button>
      </div>
      <div>
        <p>{tool.name}</p>
        <button onClick={() => {dispatch(setBrushActive())}}>set brush</button>
        <button onClick={() => {dispatch(setEraserActive())}}>set eraser</button>
        <button onClick={() => {dispatch(setBucketActive())}}>set bucket</button>
      </div>
    </div>
  );
}
