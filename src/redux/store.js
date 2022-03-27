import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counterSlice";
// import { toolReducer } from './toolReducer'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // tool: toolReducer
  },
})