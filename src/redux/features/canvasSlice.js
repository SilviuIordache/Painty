import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  canvasDirty: false
};

export const canvasSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setCanvasDirty: (state, action) => {
      state.canvasDirty = action.payload;
    }
  }
});

export const { setCanvasDirty } = canvasSlice.actions
export default canvasSlice.reducer;
