import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { toolReducer } from './toolReducer'

const rootReducer = combineReducers({
  counter: counterReducer,
  tool: toolReducer
})

export default rootReducer;

