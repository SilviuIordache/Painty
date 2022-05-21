import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counterSlice";
import toolReducer from './features/toolSlice';
import imagesReducer from './features/imagesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tool: toolReducer,
    images: imagesReducer
  },
})