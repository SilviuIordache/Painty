import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import toolReducer from './features/toolSlice';
import imagesReducer from './features/imagesSlice';
import snackBarReducer from './features/snackBarSlice';
import challengeReducer from './features/challengeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tool: toolReducer,
    images: imagesReducer,
    snackbar: snackBarReducer,
    challenge: challengeReducer,
  },
});
