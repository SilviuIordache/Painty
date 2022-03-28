import { useSelector, useDispatch } from 'react-redux';
import { increment, incrementByAmount, decrement  } from "../../redux/features/counterSlice";
import { changeTool } from "../../redux/features/toolReducer"

export default function TestCounter() {
  const counter = useSelector(state => state.counter.value);
  const tool = useSelector(state => state.tool.tool)
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => { dispatch(incrementByAmount(10))}}>++ </button>
        <button onClick={() => { dispatch(increment())}}>+</button>
        <p>{counter}</p>
        <button onClick={() => { dispatch(decrement())}}>-</button>
      </div>
      <div>
        <p>{tool}</p>
        <button onClick={() => {dispatch(changeTool('brush'))}}>set brush</button>
        <button onClick={() => {dispatch(changeTool('eraser'))}}>set eraser</button>
        <button onClick={() => {dispatch(changeTool('bucket'))}}>set bucket</button>
      </div>
    </div>
  );
}
