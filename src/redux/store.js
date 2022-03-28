import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counterSlice";
import toolReducer from './features/toolReducer';
import canvasSlice from './features/canvasSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tool: toolReducer,
    canvas: canvasSlice
  },
})