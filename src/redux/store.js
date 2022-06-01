import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import toolReducer from './features/toolSlice';
import imagesReducer from './features/imagesSlice';
import snackBarReducer from './features/snackBarSlice';
import challengeReducer from './features/challengeSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    tool: toolReducer,
    images: imagesReducer,
    snackbar: snackBarReducer,
    challenge: challengeReducer,
  },
});
