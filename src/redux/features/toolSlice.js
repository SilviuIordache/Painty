import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'brush',
  size: require("data/brushSizes.json").sizes[1],
  color: '#000000'
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    changeTool: (state, action) => {
      state.type = action.payload;
    },
    changeColor: (state, action) => {
      state.color = action.payload;
    },
    changeBrushSize: (state, action) => {
      state.size = action.payload;
    }
  }
});

export const { changeTool, changeColor, changeBrushSize } = toolSlice.actions
export default toolSlice.reducer